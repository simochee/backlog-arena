import { useForm } from "@tanstack/react-form";
import { Form } from "react-aria-components";
import TextareaAutosize from "react-textarea-autosize";
import type { Issue, PatchIssuesByIssueIdOrKeyData } from "@/client";
import { zPatchIssuesByIssueIdOrKeyData } from "@/client/zod.gen";
import { IssueCommentFormAssignee } from "@/components/Issue/Comment/Form/Assignee";
import { IssueCommentFormStatus } from "@/components/Issue/Comment/Form/Status";
import { UiButton } from "@/components/Ui/Button";

type Props = {
	issue: Issue;
	isSubmitting: boolean;
	onSubmit: (issue: NonNullable<PatchIssuesByIssueIdOrKeyData["body"]>) => void;
};

export const IssueCommentForm: React.FC<Props> = ({
	issue,
	isSubmitting,
	onSubmit,
}) => {
	const form = useForm({
		defaultValues: {
			statusId: issue.status.id,
			assigneeId: issue.assignee?.id,
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
			onSubmit={async (e) => {
				e.preventDefault();
				await form.handleSubmit();
			}}
		>
			<div className="grid gap-1">
				<form.Field name="comment">
					{({ handleChange, handleBlur }) => (
						<TextareaAutosize
							className="block w-full resize-none outline-none border rounded-xs focus:shadow-[0_0_2px_var(--color-green-400)] border-gray-200 focus:bg-cream-50 px-2 py-1"
							autoFocus
							maxRows={5}
							placeholder="コメントを入力"
							onChange={(e) => handleChange(e.target.value)}
							onBlur={handleBlur}
						/>
					)}
				</form.Field>
				<div className="flex items-center gap-1">
					<IssueCommentFormStatus status={issue.status} />
					<IssueCommentFormAssignee assignee={issue.assignee} />
					<div className="ml-auto">
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
