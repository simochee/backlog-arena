import { IconExternalLink } from "@tabler/icons-react";
import { useForm } from "@tanstack/react-form";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Form } from "react-aria-components";
import { Mention, MentionsInput } from "react-mentions";
import { useMeasure } from "react-use";
import type { Issue, PatchIssuesByIssueIdOrKeyData } from "@/client";
import { getUsersOptions } from "@/client/@tanstack/react-query.gen.ts";
import { zPatchIssuesByIssueIdOrKeyData } from "@/client/zod.gen";
import { IssueCommentFormAssignee } from "@/components/Issue/Comment/Form/Assignee";
import { IssueCommentFormStatus } from "@/components/Issue/Comment/Form/Status";
import { UiButton } from "@/components/Ui/Button";
import { UiLink } from "@/components/Ui/Link";
import { UiTooltip } from "@/components/Ui/Tooltip";

type Props = {
	href: string;
	issue: Issue;
	isSubmitting: boolean;
	onSubmit: (issue: NonNullable<PatchIssuesByIssueIdOrKeyData["body"]>) => void;
};

export const IssueCommentForm: React.FC<Props> = ({
	href,
	issue,
	isSubmitting,
	onSubmit,
}) => {
	const [formRef, { width: formWidth }] = useMeasure<HTMLFormElement>();

	const { data = [] } = useSuspenseQuery({
		...getUsersOptions(),
	});

	const form = useForm({
		defaultValues: {
			statusId: issue.status.id,
			assigneeId: issue.assignee?.id,
			description: "",
		} as NonNullable<PatchIssuesByIssueIdOrKeyData["body"]>,
		validators: {
			onChange: zPatchIssuesByIssueIdOrKeyData.shape.body.nonoptional(),
		},
		onSubmit: ({ value }) => {
			return onSubmit(value);
		},
	});

	return (
		<Form
			ref={formRef}
			className="w-full overflow-hidden"
			onSubmit={async (e) => {
				e.preventDefault();
				await form.handleSubmit();
			}}
		>
			<div className="grid gap-1">
				<form.Subscribe selector={(state) => state.values.description}>
					{() => (
						<form.Field name="comment">
							{({ state, handleChange, handleBlur }) => (
								<MentionsInput
									className="react-mentions"
									style={{
										input: { width: formWidth, overflow: "auto" },
										highlighter: { width: formWidth },
									}}
									value={state.value}
									allowSpaceInQuery
									onChange={(e) => handleChange(e.target.value)}
									onBlur={handleBlur}
								>
									<Mention
										trigger="@"
										data={data.map(({ id, name }) => ({ id, display: name }))}
										markup="<@U__id__>"
										displayTransform={(id) =>
											`@${data.find((user) => user.id.toString() === id)?.name}`
										}
									/>
								</MentionsInput>
							)}
						</form.Field>
					)}
				</form.Subscribe>
				<div className="flex items-center gap-1">
					<form.Field name="statusId">
						{({ state, handleChange }) => (
							<IssueCommentFormStatus
								initialStatus={issue.status}
								value={state.value}
								onChange={handleChange}
							/>
						)}
					</form.Field>
					<form.Field name="assigneeId">
						{({ state, handleChange }) => (
							<IssueCommentFormAssignee
								initialAssignee={issue.assignee}
								users={data}
								value={state.value}
								onChange={handleChange}
							/>
						)}
					</form.Field>
					<div className="ml-auto flex items-center gap-1">
						<UiTooltip text="課題を開く">
							<UiLink
								className="size-7 grid place-items-center rounded p-1 rounded-lg border transition border-gray-300 hover:bg-green-100 hover:border-green-400"
								to={href}
								target="_blank"
							>
								<IconExternalLink className="size-4" />
							</UiLink>
						</UiTooltip>
						<form.Subscribe selector={(state) => [state.canSubmit] as const}>
							{([canSubmit]) => (
								<UiButton
									type="submit"
									size="sm"
									isPending={isSubmitting}
									isDisabled={!canSubmit}
								>
									{isSubmitting ? "送信中..." : "送信"}
								</UiButton>
							)}
						</form.Subscribe>
					</div>
				</div>
			</div>
		</Form>
	);
};
