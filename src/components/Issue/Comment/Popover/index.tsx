import {
	Dialog,
	DialogTrigger,
	Popover,
	type PopoverProps,
} from "react-aria-components";
import type { Issue } from "@/client";
import { IssueCommentForm } from "@/components/Issue/Comment/Form";
import { UiOverlayArrow } from "@/components/Ui/OverlayArrow";

type Props = PopoverProps & {
	issue: Issue;
	children: React.ReactNode;
};

export const IssueCommentPopover: React.FC<Props> = ({
	issue,
	children,
	...props
}) => {
	return (
		<DialogTrigger>
			{children}
			<Popover
				{...props}
				containerPadding={0}
				placement="top"
				className="px-2 w-full max-w-xl drop-shadow"
			>
				<UiOverlayArrow className="text-white" size={12} />
				<Dialog className="bg-white rounded p-1">
					<div className="max-h-24 overflow-y-auto">
						<p className="whitespace-pre-line">{issue.description}</p>
					</div>
					<IssueCommentForm issue={issue} />
				</Dialog>
			</Popover>
		</DialogTrigger>
	);
};
