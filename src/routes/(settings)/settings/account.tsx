import { IconDirectionSignFilled, IconLoader2 } from "@tabler/icons-react";
import { useForm } from "@tanstack/react-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Button } from "react-aria-components";
import * as z from "zod";
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
			console.log("on submit", value);

			await new Promise((r) => setTimeout(r, 5000));

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

	return (
		<div>
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
								<Button
									type="submit"
									className="grid grid-cols-[1fr_auto] font-bold items-center gap-1 pl-3 pr-2 h-9 rounded bg-green-600 border-2 transition border-green-600 text-white cursor-pointer disabled:cursor-default hover:bg-transparent hover:text-green-600"
									isPending={isSubmitting}
									isDisabled={!canSubmit}
								>
									{({ isPending }) => (
										<>
											認証
											{isPending ? (
												<IconLoader2 className="size-5 animate-spin" />
											) : (
												<IconDirectionSignFilled className="size-5" />
											)}
										</>
									)}
								</Button>
							)}
						</form.Subscribe>
					</div>
				</form>
				<ul>
					{data?.map(({ id, space }) => (
						<li key={space.spaceKey}>
							{space.name}
							<UiButton onClick={() => removeSpaceProfileMutation(id)}>
								削除
							</UiButton>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}
