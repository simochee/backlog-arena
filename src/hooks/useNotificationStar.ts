import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Notification, Star } from "@/client";
import {
	getNotificationsOptions,
	postStarsMutation,
} from "@/client/@tanstack/react-query.gen.ts";

export const useNotificationStar = (
	notification: Notification,
	userId: number,
) => {
	const queryClient = useQueryClient();

	const { queryKey } = getNotificationsOptions();

	const pushStar = (notification: Notification) => {
		// ほとんど利用しない値なので暫定値を入れる
		const star: Star = {
			id: 0,
			title: "",
			url: "",
			presenter: {
				id: userId,
				userId: "",
				name: "",
				roleType: 1,
				lang: "ja",
				nulabAccount: {
					nulabId: "",
					name: "",
					uniqueId: "",
				},
				mailAddress: "",
				lastLoginTime: "",
			},
			created: new Date().toString(),
		};

		switch (notification.reason) {
			// 課題
			case 1:
			case 3:
			case 4:
				if (notification.issue) {
					notification.issue.stars.push({
						...star,
						id: Math.max(...notification.issue.stars.map(({ id }) => id)) + 1,
					});
				}
				return;
			// プルリクエスト
			case 10:
			case 12:
			case 13:
				if (notification.pullRequest) {
					notification.pullRequest.stars.push({
						...star,
						id:
							Math.max(...notification.pullRequest.stars.map(({ id }) => id)) +
							1,
					});
				}
				return;
			// 課題のコメント
			case 2:
				if (notification.comment) {
					notification.comment.stars.push({
						...star,
						id: Math.max(...notification.comment.stars.map(({ id }) => id)) + 1,
					});
				}
				return;
			// プルリクエストのコメント
			case 11:
				if (notification.pullRequestComment) {
					notification.pullRequestComment.stars.push({
						...star,
						id:
							Math.max(
								...notification.pullRequestComment.stars.map(({ id }) => id),
							) + 1,
					});
				}
				return;
			default:
				return;
		}
	};

	const { mutate } = useMutation({
		...postStarsMutation(),
		onMutate: () => {
			const previousData = queryClient.getQueryData(queryKey);

			queryClient.setQueryData(queryKey, (data = []) => {
				for (const item of data) {
					if (item.id === notification.id) {
						pushStar(item);
					}
				}

				return data;
			});

			return { previousData };
		},
		onError: (_error, _variables, context) => {
			if (context) {
				queryClient.setQueryData(queryKey, context.previousData);
			}
		},
	});

	const addStar = () => {
		switch (notification.reason) {
			// 課題
			case 1:
			case 3:
			case 4:
				mutate({ body: { issueId: notification.issue?.id } });
				return;
			// プルリクエスト
			case 10:
			case 12:
			case 13:
				mutate({ body: { pullRequestId: notification.pullRequest?.id } });
				return;
			// 課題のコメント
			case 2:
				mutate({ body: { commentId: notification.comment?.id } });
				return;
			case 11:
				// プルリクエストのコメント
				return mutate({
					body: { pullRequestCommentId: notification.pullRequestComment?.id },
				});
			default:
				return;
		}
	};

	return { addStar };
};
