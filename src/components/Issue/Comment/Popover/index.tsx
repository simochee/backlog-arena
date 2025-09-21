import { IconCornerUpLeft } from "@tabler/icons-react";
import { useMutation } from "@tanstack/react-query";
import { Suspense, useState } from "react";
import {
	Dialog,
	DialogTrigger,
	Popover,
	type PopoverProps,
} from "react-aria-components";
import type {
	Comment,
	Issue,
	PatchIssuesByIssueIdOrKeyData,
	User,
} from "@/client";
import { patchIssuesByIssueIdOrKeyMutation } from "@/client/@tanstack/react-query.gen.ts";
import { BacklogImage } from "@/components/Backlog/Image";
import { IssueCommentForm } from "@/components/Issue/Comment/Form";
import { UiDescription } from "@/components/Ui/Description";
import { UiOverlayArrow } from "@/components/Ui/OverlayArrow";
import { UiTooltip } from "@/components/Ui/Tooltip";

type Props = PopoverProps & {
	href: string;
	issue: Issue;
	comment: Comment | undefined;
	sender: User;
	children: React.ReactNode;
};

export const IssueCommentPopover: React.FC<Props> = ({
	href,
	issue,
	comment,
	sender,
	children,
	...props
}) => {
	const [isOpen, setIsOpen] = useState(false);

	const handleOpenChange = (value: boolean) => {
		setIsOpen(value);
		props.onOpenChange?.(value);
	};

	const { mutate, isPending } = useMutation({
		...patchIssuesByIssueIdOrKeyMutation(),
		onSuccess() {
			handleOpenChange(false);
		},
	});

	const handleSubmit = async (
		values: NonNullable<PatchIssuesByIssueIdOrKeyData["body"]>,
	) => {
		mutate({
			path: { issueIdOrKey: issue.id },
			body: values,
		});
	};

	return (
		<DialogTrigger onOpenChange={handleOpenChange}>
			{children}
			<Popover
				{...props}
				isOpen={isOpen}
				onOpenChange={handleOpenChange}
				containerPadding={0}
				placement="top"
				className="group px-2 w-full max-w-xl drop-shadow"
			>
				<UiOverlayArrow
					className="text-white group-placement-bottom:text-green-600"
					size={12}
				/>
				<Dialog className="bg-white rounded-lg grid gap-2 overflow-hidden">
					<div className="grid grid-cols-[auto_1fr] bg-green-600 p-2 items-center gap-1 border-b border-gray-200">
						<UiTooltip
							text={`${issue.issueKey} ${issue.summary}`}
							nonInteractive
						>
							<BacklogImage
								className="size-4 rounded"
								type="project"
								variable={issue.projectId}
							/>
						</UiTooltip>
						<div className="leading-none flex flex-col gap-1">
							<p className="line-clamp-1 text-white">
								{issue.issueKey} {issue.summary}
							</p>
						</div>
					</div>
					<div className="grid gap-1 px-2">
						{comment && (
							<div className="grid grid-cols-[auto_1fr] gap-1 text-gray-700">
								<IconCornerUpLeft className="size-4" />
								<p className="line-clamp-1">{sender.name}</p>
							</div>
						)}
						<p className="max-h-48 overflow-y-auto grid gap-1">
							<UiDescription breaks>
								{comment?.content || issue.description}
							</UiDescription>
						</p>
					</div>
					<Suspense fallback={<p>loading...</p>}>
						<div className="px-2 pb-2">
							<IssueCommentForm
								type={comment ? "comment" : "issue"}
								href={href}
								issue={issue}
								isSubmitting={isPending}
								onSubmit={handleSubmit}
							/>
						</div>
					</Suspense>
				</Dialog>
			</Popover>
		</DialogTrigger>
	);
};
