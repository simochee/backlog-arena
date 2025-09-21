import { IconCheck, IconUserScan, IconX } from "@tabler/icons-react";
import { useForm } from "@tanstack/react-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Suspense } from "react";
import { Checkbox, CheckboxGroup } from "react-aria-components";
import * as z from "zod";
import { BacklogImage } from "@/components/Backlog/Image";
import { SettingFieldSpaceDomain } from "@/components/Setting/Field/SpaceDomain";
import { UiButton } from "@/components/Ui/Button";
import {
	addSpaceProfileOptions,
	removeSpaceProfileOptions,
	spaceProfilesOptions,
} from "@/storage/spaceProfiles/options.ts";
import { authorize } from "@/utils/authorize.ts";

export const Route = createFileRoute("/(settings)/settings/account")({
	component: RouteComponent,
});

function RouteComponent() {
	const queryClient = useQueryClient();
	const { data } = useQuery(spaceProfilesOptions);
	const { mutate: addSpaceProfileMutation } = useMutation(
		addSpaceProfileOptions,
	);

	const { mutate: removeSpaceProfileMutation } = useMutation({
		...removeSpaceProfileOptions,
	});

	const form = useForm({
		defaultValues: {
			domain: "",
		},
		validators: {
			onChange: z.object({
				domain: z
					.string()
					.regex(
						/^[a-z0-9-]+\.backlog\.(?:jp|com)$/,
						"スペースID は英数字とハイフンのみ利用できます。",
					),
			}),
		},
		onSubmit: async ({ value }) => {
			const result = await authorize(value.domain);
			addSpaceProfileMutation(
				{
					...result,
					domain: value.domain,
				},
				{
					onSettled: async () => {
						await queryClient.invalidateQueries({
							queryKey: spaceProfilesOptions.queryKey,
						});
						form.reset();
					},
				},
			);
		},
	});

	const handleRemoveSpaceProfile = (id: string) => {
		removeSpaceProfileMutation(id, {
			onSettled: async () => {
				await queryClient.invalidateQueries({
					queryKey: spaceProfilesOptions.queryKey,
				});
			},
		});
	};

	return (
		<div className="grid gap-6">
			<div className="grid gap-3">
				<div className="grid gap-1">
					<h2 className="font-bold text-lg">別のスペースを追加</h2>
					<p className="text-gray-800">
						別のスペースを Backlog Arena
						に登録するために、アカウントへ拡張機能からのアクセスを許可します。
					</p>
				</div>
				<form
					onSubmit={(e) => {
						e.preventDefault();
						e.stopPropagation();
						form.handleSubmit();
					}}
				>
					<div className="grid grid-cols-[1fr_auto] gap-2">
						<form.Field name="domain">
							{(field) => (
								<div className="grid gap-2">
									<SettingFieldSpaceDomain
										defaultValue={field.state.value}
										onChange={field.handleChange}
										onBlur={field.handleBlur}
									/>
									{field.state.meta.errors.map(
										(error, _i) =>
											error && (
												<p key={error.message} className="text-red-700 px-3">
													{error.message}
												</p>
											),
									)}
								</div>
							)}
						</form.Field>
						<form.Subscribe
							selector={(state) => [state.isSubmitting, state.canSubmit]}
						>
							{([isSubmitting, canSubmit]) => (
								<UiButton
									type="submit"
									icon={IconUserScan}
									isPending={isSubmitting}
									isDisabled={!canSubmit}
								>
									認証
								</UiButton>
							)}
						</form.Subscribe>
					</div>
				</form>
			</div>
			<CheckboxGroup className="grid gap-2">
				{data?.map(({ id, space, credentials }) => (
					<div
						key={space.spaceKey}
						className="flex items-center justify-between gap-2 border border-gray-300 rounded-lg p-3"
					>
						<Checkbox value={id} className="group">
							{({ isSelected }) => (
								<div className="grid grid-cols-[auto_1fr] gap-2 items-center">
									<div aria-hidden="true">
										<div className="size-5 rounded group-focus-visible:shadow-focus grid place-items-center border-2 border-gray-300 group-selected:border-green-600 group-selected:bg-green-600">
											{isSelected && (
												<IconCheck className="size-4 text-white" />
											)}
										</div>
									</div>
									<div className="flex items-center gap-2 min-w-0">
										<div className="flex-shrink-0">
											<Suspense
												fallback={<div className="size-7 bg-gray-200" />}
											>
												<BacklogImage
													className="size-7"
													type="space"
													domain={space.domain}
													accessToken={credentials.accessToken}
												/>
											</Suspense>
										</div>
										<h3 className="text-sm line-clamp-1 overflow-hidden">
											{space.name}
										</h3>
									</div>
								</div>
							)}
						</Checkbox>
						<div className="flex flex-shrink-0 items-center gap-1">
							<UiButton
								variant="danger"
								icon={IconX}
								size="sm"
								onClick={() => handleRemoveSpaceProfile(id)}
							>
								削除
							</UiButton>
						</div>
					</div>
				))}
			</CheckboxGroup>
		</div>
	);
}
