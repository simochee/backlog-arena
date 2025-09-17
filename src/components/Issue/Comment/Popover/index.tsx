import { useMutation } from "@tanstack/react-query";
import { Suspense, useState } from "react";
import {
	Dialog,
	DialogTrigger,
	Popover,
	type PopoverProps,
} from "react-aria-components";
import type { Comment, Issue, PatchIssuesByIssueIdOrKeyData } from "@/client";
import { patchIssuesByIssueIdOrKeyMutation } from "@/client/@tanstack/react-query.gen.ts";
import { BacklogImage } from "@/components/Backlog/Image";
import { IssueCommentForm } from "@/components/Issue/Comment/Form";
import { UiDescription } from "@/components/Ui/Description";
import { UiOverlayArrow } from "@/components/Ui/OverlayArrow";

type Props = PopoverProps & {
	href: string;
	issue: Issue;
	comment: Comment | undefined;
	children: React.ReactNode;
};

export const IssueCommentPopover: React.FC<Props> = ({
	href,
	issue,
	comment,
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
				className="px-2 w-full max-w-xl drop-shadow"
			>
				<UiOverlayArrow className="text-white" size={12} />
				<Dialog className="bg-white rounded p-1 grid gap-1">
					<div className="grid grid-cols-[auto_1fr] gap-1 border-b border-gray-200">
						<BacklogImage
							className="size-6 rounded"
							type="project"
							variable={issue.projectId}
						/>
						<div className="leading-none flex flex-col gap-1">
							<p className="text-[10px]">{issue.issueKey}</p>
							<p className="line-clamp-1">{issue.summary}</p>
						</div>
					</div>
					<p className="max-h-48 overflow-y-auto grid gap-1">
						<UiDescription breaks>
							{comment?.content || issue.description}
						</UiDescription>
					</p>
					<Suspense fallback={<p>loading...</p>}>
						<IssueCommentForm
							href={href}
							issue={issue}
							isSubmitting={isPending}
							onSubmit={handleSubmit}
						/>
					</Suspense>
				</Dialog>
			</Popover>
		</DialogTrigger>
	);
};
