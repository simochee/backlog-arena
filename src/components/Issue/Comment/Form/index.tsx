import { IconExternalLink, IconSend2 } from "@tabler/icons-react";
import { useForm } from "@tanstack/react-form";
import { useQuery } from "@tanstack/react-query";
import { Form } from "react-aria-components";
import TextareaAutosize from "react-textarea-autosize";
import type { Issue, PatchIssuesByIssueIdOrKeyData } from "@/client";
import { getUsersOptions } from "@/client/@tanstack/react-query.gen.ts";
import { zPatchIssuesByIssueIdOrKeyData } from "@/client/zod.gen";
import { IssueCommentFormAssignee } from "@/components/Issue/Comment/Form/Assignee";
import { IssueCommentFormStatus } from "@/components/Issue/Comment/Form/Status";
import { UiButton } from "@/components/Ui/Button";
import { UiLink } from "@/components/Ui/Link";
import { UiTooltip } from "@/components/Ui/Tooltip";

type Props = {
	type?: "issue" | "comment";
	href: string;
	issue: Issue;
	isSubmitting: boolean;
	onSubmit: (issue: NonNullable<PatchIssuesByIssueIdOrKeyData["body"]>) => void;
};

export const IssueCommentForm: React.FC<Props> = ({
	type = "command",
	href,
	issue,
	isSubmitting,
	onSubmit,
}) => {
	const { data = [] } = useQuery({
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
			className="w-full"
			onSubmit={async (e) => {
				e.preventDefault();
				await form.handleSubmit();
			}}
		>
			<div className="grid gap-1">
				<form.Field name="comment">
					{({ state, handleChange, handleBlur }) => (
						<TextareaAutosize
							autoFocus
							className="w-full border border-gray-400 rounded px-3 py-2 resize-none focus:bg-cream-50 focus:shadow-focus  focus:border-green-600 outline-none"
							placeholder="コメント（@メンションには非対応）"
							maxRows={8}
							defaultValue={state.value}
							onChange={(e) => handleChange(e.target.value)}
							onBlur={handleBlur}
						/>
					)}
				</form.Field>
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
						<UiTooltip
							text={`${type === "comment" ? "コメント" : "課題"}を開く`}
						>
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
									icon={IconSend2}
								>
									送信
								</UiButton>
							)}
						</form.Subscribe>
					</div>
				</div>
			</div>
		</Form>
	);
};
