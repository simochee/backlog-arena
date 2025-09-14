import {
	IconCopy,
	IconEye,
	IconEyeCheck,
	IconGitMerge,
	IconGitPullRequestClosed,
	IconGitPullRequestDraft,
	IconMessage,
	IconStar,
	IconStarFilled,
} from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { clsx } from "clsx";
import { GridListItem } from "react-aria-components";
import type { Notification, NotificationReason } from "@/client";
import { getProjectsByProjectIdOrKeyGitRepositoriesOptions } from "@/client/@tanstack/react-query.gen.ts";
import { BacklogImage } from "@/components/Backlog/Image";
import { NotificationAction } from "@/components/Notification/Action";
import { UiDescription } from "@/components/Ui/Description";
import { UiTooltip } from "@/components/Ui/Tooltip";
import { useCurrentSpaceProfile } from "@/hooks/useCurrentSpaceProfile.ts";
import { useCurrentSpaceUrl } from "@/hooks/useCurrentSpaceUrl.ts";
import { useNotificationRead } from "@/hooks/useNotificationRead.ts";

type Props = {
	notification: Notification;
};

const getStatusText = (reason: NotificationReason) => {
	switch (reason) {
		case 1:
			return ["課題の", "担当者", "に設定しました。"];
		case 10:
			return ["プルリクエストの", "担当者", "に設定しました。"];
		case 2:
			return ["課題に", "コメント", "しました。"];
		case 11:
			return ["プルリクエストに", "コメント", "しました。"];
		case 3:
			return ["課題を", "追加", "しました。"];
		case 4:
			return ["課題を", "更新", "しました。"];
		case 5:
			return ["ファイルを", "添付", "しました。"];
		case 6:
			return ["プロジェクトに", "追加", "しました。"];
		case 12:
			return ["プルリクエストを", "追加", "しました。"];
		case 13:
			return ["プルリクエストを", "更新", "しました。"];
		case 9:
			return ["", "お知らせ", "しました。"];
		default:
			return reason satisfies never;
	}
};

export const NotificationItem: React.FC<Props> = ({ notification }) => {
	const currentSpaceProfile = useCurrentSpaceProfile();
	const {
		reason,
		pullRequest,
		pullRequestComment,
		issue,
		project,
		comment,
		sender,
		resourceAlreadyRead,
	} = notification;

	const { data: repositories = [] } = useQuery({
		...getProjectsByProjectIdOrKeyGitRepositoriesOptions({
			path: {
				projectIdOrKey: project.projectKey,
			},
		}),
		enabled: pullRequest != null,
	});

	const toUrl = useCurrentSpaceUrl();
	const { mutate: markAsRead } = useNotificationRead();

	const reasonText = getStatusText(reason);
	const hasStarred = notification.comment?.stars.some(
		({ presenter }) => presenter.id === currentSpaceProfile.user.id,
	);
	const isPullRequest = [6, 10, 11, 12, 13].includes(reason);
	const repository = repositories.find(
		({ projectId }) => projectId === notification.project.id,
	);
	const subject = pullRequest
		? `${project.projectKey}/${repository?.name}#${pullRequest.number} ${pullRequest.summary}`
		: `${issue?.issueKey} ${issue?.summary}`;

	return (
		<GridListItem
			id={notification.id}
			href={toUrl(`/globalbar/notifications/redirect/${notification.id}`)}
			target="_blank"
			className={clsx(
				"grid gap-1 p-2 border-t border-t-gray-300 focus-visible:bg-cream-50 hover:bg-cream-50",
				resourceAlreadyRead ? "bg-gray-100" : "",
			)}
		>
			{({ isHovered }) => (
				<>
					<div className="grid h-6 grid-cols-[auto_1fr_auto] items-center gap-1">
						<UiTooltip text={sender.name} nonInteractive>
							<BacklogImage
								type="user"
								variable={sender.id}
								className="size-4 rounded"
							/>
						</UiTooltip>
						<p className="line-clamp-1 text-gray-600 text-xs">
							{reasonText[0]}{" "}
							<span
								className={isPullRequest ? "text-red-500" : "text-green-500"}
							>
								{reasonText[1]}
							</span>{" "}
							{reasonText[2]}
						</p>
						{isHovered ? (
							<div className="flex items-center gap-1">
								<NotificationAction
									tooltip="課題キーと件名をコピーする"
									icon={IconCopy}
								/>
								<NotificationAction
									tooltip="コメントを返信する"
									icon={IconMessage}
								/>
								<NotificationAction
									tooltip="スターをつける"
									icon={hasStarred ? IconStarFilled : IconStar}
									isStarred={hasStarred}
								/>
								<NotificationAction
									tooltip="既読にする"
									icon={resourceAlreadyRead ? IconEyeCheck : IconEye}
									// isDisabled={resourceAlreadyRead}
									onClick={() =>
										markAsRead({
											params: { path: { id: notification.id } },
										})
									}
								/>
							</div>
						) : (
							<div>
								<p>20:30</p>
							</div>
						)}
					</div>
					<p className="line-clamp-1 text-sm min-h-[1.5em]">
						{
							// プロジェクト追加
							reason === 6 ? (
								<span className="grid grid-cols-[1fr_auto] items-center gap-1">
									{project.name} ({project.projectKey})
									<BacklogImage
										type="project"
										variable={project.id}
										className="size-5 rounded"
									/>
								</span>
							) : // コメント
							[2, 11].includes(reason) ? (
								<UiDescription>
									{comment?.content || pullRequestComment?.content}
								</UiDescription>
							) : // 課題・プルリクエストの追加・更新
							[3, 4, 12, 13].includes(reason) ? (
								<UiDescription>
									{issue?.description || pullRequest?.description}
								</UiDescription>
							) : (
								issue?.summary || pullRequest?.summary
							)
						}
					</p>
					{reason !== 6 && (
						<div className="grid grid-cols-[1fr_auto_auto] items-center gap-1">
							<p className="grid grid-cols-[auto_1fr] gap-1 items-center">
								<span className="line-clamp-1 text-gray-600 text-xs">
									{[2, 3, 4, 11, 12, 13].includes(reason)
										? subject
										: issue?.issueKey ||
											`${project.projectKey}/${repository?.name}#${pullRequest?.number}`}
								</span>
							</p>
							<UiTooltip text={subject} nonInteractive>
								<BacklogImage
									type="project"
									variable={project.id}
									className="size-4 rounded"
								/>
							</UiTooltip>
							{issue ? (
								<p
									className="line-clamp-1 rounded px-1 text-xs leading-tight text-white"
									style={{
										backgroundColor: issue?.status.color,
									}}
								>
									{issue?.status.name}
								</p>
							) : pullRequest ? (
								<p
									className={clsx({
										"text-red-500": pullRequest.status.id === 1,
										"text-gray-700": pullRequest.status.id === 2,
										"text-green-500": pullRequest.status.id === 3,
									})}
								>
									{pullRequest.status.id === 1 ? (
										<IconGitPullRequestDraft className="size-4" />
									) : pullRequest.status.id === 2 ? (
										<IconGitPullRequestClosed className="size-4" />
									) : (
										<IconGitMerge className="size-4" />
									)}
								</p>
							) : null}
						</div>
					)}
				</>
			)}
		</GridListItem>
	);
};
