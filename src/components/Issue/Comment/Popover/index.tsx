import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import {
	Dialog,
	DialogTrigger,
	Popover,
	type PopoverProps,
} from "react-aria-components";
import type { Issue, PatchIssuesByIssueIdOrKeyData } from "@/client";
import { patchIssuesByIssueIdOrKeyMutation } from "@/client/@tanstack/react-query.gen.ts";
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
				<Dialog className="bg-white rounded p-1">
					<div className="max-h-24 overflow-y-auto">
						<p className="whitespace-pre-line">{issue.description}</p>
					</div>
					<IssueCommentForm
						issue={issue}
						isSubmitting={isPending}
						onSubmit={handleSubmit}
					/>
				</Dialog>
			</Popover>
		</DialogTrigger>
	);
};
