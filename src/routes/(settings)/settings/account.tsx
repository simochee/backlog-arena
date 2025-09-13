import { useForm } from "@tanstack/react-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import * as z from "zod";
import {
	addSpaceProfileOptions,
	spaceProfilesOptions,
} from "@/storage/spaceProfiles/options.ts";
import { authorize } from "@/utils/authorize.ts";

export const Route = createFileRoute("/(settings)/settings/account")({
	component: RouteComponent,
});

function RouteComponent() {
	const queryClient = useQueryClient();
	const { data } = useQuery(spaceProfilesOptions);
	const { mutate } = useMutation(addSpaceProfileOptions);

	const form = useForm({
		defaultValues: {
			domain: "",
		},
		validators: {
			onChange: z.object({
				domain: z.string(),
			}),
		},
		onSubmit: async ({ value }) => {
			const result = await authorize(value.domain);
			mutate(
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
			<form
				onSubmit={(e) => {
					e.preventDefault();
					e.stopPropagation();
					form.handleSubmit();
				}}
			>
				<form.Field name="domain">
					{(field) => (
						<>
							<label htmlFor={field.name}>Domain</label>
							<input
								type="text"
								id={field.name}
								onBlur={field.handleBlur}
								onChange={(e) => field.handleChange(e.target.value)}
							/>
						</>
					)}
				</form.Field>
				<button type="submit">submit</button>
			</form>
			<ul>
				{data?.map(({ space }) => (
					<li key={space.spaceKey}>{space.name}</li>
				))}
			</ul>
		</div>
	);
}
