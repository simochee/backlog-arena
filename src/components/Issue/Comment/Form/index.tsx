import { Form } from "react-aria-components";
import TextareaAutosize from "react-textarea-autosize";
import type { Issue } from "@/client";
import { IssueCommentFormAssignee } from "@/components/Issue/Comment/Form/Assignee";
import { IssueCommentFormStatus } from "@/components/Issue/Comment/Form/Status";
import { UiButton } from "@/components/Ui/Button";

type Props = {
	issue: Issue;
};

export const IssueCommentForm: React.FC<Props> = ({ issue }) => {
	return (
		<Form>
			<div className="grid gap-1">
				<TextareaAutosize
					className="block w-full resize-none outline-none border rounded-xs focus:shadow-[0_0_2px_var(--color-green-400)] border-gray-200 focus:bg-cream-50 px-2 py-1"
					autoFocus
					maxRows={5}
					placeholder="コメントを入力"
				/>
				<div className="flex items-center gap-1">
					<IssueCommentFormStatus status={issue.status} />
					<IssueCommentFormAssignee assignee={issue.assignee} />
					<div className="ml-auto">
						<UiButton type="submit" size="sm">
							送信
						</UiButton>
					</div>
				</div>
			</div>
		</Form>
	);
};
