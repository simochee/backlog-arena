import { IconCopy } from "@tabler/icons-react";
import type { GitRepository, Notification } from "@/client";
import { NotificationAction } from "@/components/Notification/Action";
import { useCurrentSpaceUrl } from "@/hooks/useCurrentSpaceUrl.ts";

type Props = {
	notification: Notification;
	repositories?: GitRepository[];
};

export const NotificationCopyAction: React.FC<Props> = ({
	notification,
	repositories,
}) => {
	const toUrl = useCurrentSpaceUrl();

	const copy = async (
		key: string | undefined,
		subject: string | undefined,
		url: string,
	) => {
		const html = `<a href="${url}">${key}</a> ${subject}`;
		const text = `${key} ${subject}`;

		const clipboardItem = new ClipboardItem({
			"text/html": new Blob([html], { type: "text/html" }),
			"text/plain": new Blob([text], { type: "text/plain" }),
		});

		await navigator.clipboard.write([clipboardItem]);
	};

	switch (notification.reason) {
		// プロジェクト
		case 6:
			return (
				<NotificationAction
					tooltip="プロジェクト名とプロジェクトキーをコピー"
					icon={IconCopy}
					onClick={() =>
						copy(
							notification.project.projectKey,
							notification.project.name,
							toUrl(`/projects/${notification.project.projectKey}`),
						)
					}
				/>
			);
		// 課題
		case 1:
		case 3:
		case 4:
		// 課題のコメント
		case 2: {
			return (
				<NotificationAction
					tooltip="課題キーと件名をコピー"
					icon={IconCopy}
					onClick={() =>
						copy(
							notification.issue?.issueKey,
							notification.issue?.summary,
							toUrl(`/view/${notification.issue?.issueKey}`),
						)
					}
				/>
			);
		}
		// プルリクエスト
		case 10:
		case 12:
		case 13:
		// プルリクエストのコメント
		case 11: {
			const repository = repositories?.find(
				({ id }) => id === notification.pullRequest?.repositoryId,
			);

			if (!repository) {
				return null;
			}

			const key = `${notification.project.projectKey}/${repository.name}#${notification.pullRequest?.number}`;
			const url = toUrl(
				`/git/${notification.project.projectKey}/${repository.name}/pullRequests/${notification.pullRequest?.number}`,
			);

			return (
				<NotificationAction
					tooltip="プルリクエストの番号と件名をコピー"
					icon={IconCopy}
					onClick={() => copy(key, notification.pullRequest?.summary, url)}
				/>
			);
		}
		default:
			return null;
	}
};
