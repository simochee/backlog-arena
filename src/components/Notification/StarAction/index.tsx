import { IconStar, IconStarFilled } from "@tabler/icons-react";
import type { Notification } from "@/client";
import { NotificationAction } from "@/components/Notification/Action";
import { useNotificationStar } from "@/hooks/useNotificationStar.ts";

type Props = {
	userId: number;
	notification: Notification;
};

export const NotificationStarAction: React.FC<Props> = ({
	userId,
	notification,
}) => {
	const myStars =
		notification.comment?.stars.filter(
			({ presenter }) => presenter.id === userId,
		).length || 0;

	const { addStar } = useNotificationStar(notification, userId);

	switch (notification.reason) {
		// 課題
		case 1:
		case 3:
		case 4:
		// プルリクエスト
		case 10:
		case 12:
		case 13:
		// 課題のコメント
		case 2:
		// プルリクエストのコメント
		case 11:
			return (
				<NotificationAction
					tooltip={
						myStars > 0 ? `${myStars}個のスターをつけました` : "スターをつける"
					}
					icon={myStars > 0 ? IconStarFilled : IconStar}
					isStarred={myStars > 0}
					onClick={addStar}
				/>
			);
		default:
			return null;
	}
};
