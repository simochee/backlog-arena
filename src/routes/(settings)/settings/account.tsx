import { IconCheck, IconUserScan, IconX } from "@tabler/icons-react";
import { useForm } from "@tanstack/react-form";
import {
	useMutation,
	useQueryClient,
	useSuspenseQuery,
} from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Suspense } from "react";
import { Checkbox, CheckboxGroup } from "react-aria-components";
import * as z from "zod";
import { BacklogImage } from "@/components/Backlog/Image";
import { SettingFieldSpaceDomain } from "@/components/Setting/Field/SpaceDomain";
import { SettingsHeading } from "@/components/Settings/Heading";
import { UiButton } from "@/components/Ui/Button";
import {
	addSpaceProfileOptions,
	removeSpaceProfileOptions,
	setSpaceProfileActivationsOptions,
	spaceProfilesOptions,
} from "@/storage/spaceProfiles/options.ts";
import { authorize } from "@/utils/authorize.ts";

export const Route = createFileRoute("/(settings)/settings/account")({
	component: RouteComponent,
});

function RouteComponent() {
	const queryClient = useQueryClient();
	const { data: spaceProfiles } = useSuspenseQuery(spaceProfilesOptions);
	const { mutate: addSpaceProfileMutation } = useMutation(
		addSpaceProfileOptions,
	);

	const { mutate: removeSpaceProfileMutation } = useMutation({
		...removeSpaceProfileOptions,
	});
	const { mutate: setSpaceProfileActivationsMutation } = useMutation({
		...setSpaceProfileActivationsOptions,
	});

	const defaultActiveSpaceProfiles = spaceProfiles
		.filter(({ configuration }) => !configuration.isDisabled)
		.map(({ id }) => id);

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

	const handleSetSpaceProfileActivation = (activeSpaceProfiles: string[]) => {
		setSpaceProfileActivationsMutation(activeSpaceProfiles, {
			onSettled: async () => {
				await queryClient.invalidateQueries({
					queryKey: spaceProfilesOptions.queryKey,
				});
			},
		});
	};

	return (
		<div className="grid gap-8">
			<div className="grid gap-3">
				<SettingsHeading title="アカウントとスペース">
					<p>
						このブラウザに登録されている Backlog スペースごとのアカウントです。
					</p>
				</SettingsHeading>
				{spaceProfiles.length > 0 ? (
					<CheckboxGroup
						aria-label="登録されているスペースの一覧"
						className="grid gap-2"
						value={defaultActiveSpaceProfiles}
						onChange={handleSetSpaceProfileActivation}
					>
						{spaceProfiles.map((spaceProfile) => (
							<div
								key={spaceProfile.id}
								className="flex items-center justify-between gap-2 border border-gray-300 rounded-lg p-3"
							>
								<Checkbox value={spaceProfile.id} className="group">
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
															spaceProfile={spaceProfile}
														/>
													</Suspense>
												</div>
												<h3 className="text-sm line-clamp-1 overflow-hidden">
													{spaceProfile.space.name}
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
				) : (
					<div className="grid place-items-center h-13 box-content border border-gray-100 rounded-lg bg-gray-50">
						<p className="text-center">スペースが登録されていません</p>
					</div>
				)}
			</div>
			<div className="grid gap-3">
				<SettingsHeading title="別のアカウントにサインイン">
					<p>このブラウザに別のスペースのアカウントでサインインします。</p>
				</SettingsHeading>
				<form
					onSubmit={async (e) => {
						e.preventDefault();
						e.stopPropagation();
						await form.handleSubmit();
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
		</div>
	);
}
