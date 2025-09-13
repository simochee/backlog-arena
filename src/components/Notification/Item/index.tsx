import { useMutation } from "@tanstack/react-query";
import { clsx } from "clsx";
import createFetchClient from "openapi-fetch";
import createClient from "openapi-react-query";
import { ListBoxItem } from "react-aria-components";
import { useCurrentSpaceProfile } from "@/hooks/useCurrentSpaceProfile.ts";
import { useCurrentSpaceUrl } from "@/hooks/useCurrentSpaceUrl.ts";
import type { components, paths } from "@/openapi/openapi-schema.ts";
import { setSpaceProfileCredentialsOptions } from "@/storage/spaceProfiles/options.ts";
import { refreshAccessToken } from "@/utils/authorize.ts";

type Props = {
	notification: components["schemas"]["Notification"];
};

const getStatusText = (reason: components["schemas"]["NotificationReason"]) => {
	switch (reason) {
		case 1:
		case 10:
			return ["", "担当者", "に設定しました。"];
		case 2:
		case 11:
			return ["", "コメント", "しました。"];
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
	const { reason, pullRequest, issue, project, comment, sender } = notification;

	const { mutate } = useMutation(
		setSpaceProfileCredentialsOptions(currentSpaceProfile.id),
	);
	const fetchClient = createFetchClient<paths>({
		baseUrl: `https://${currentSpaceProfile.space.domain}/api/v2`,
		headers: {
			Authorization: `Bearer ${currentSpaceProfile.credentials.accessToken}`,
		},
		fetch: async (init) => {
			const res = await fetch(init);

			if (res.status !== 401) {
				return res;
			}

			const accessToken = await refreshAccessToken(
				currentSpaceProfile.space.domain,
				currentSpaceProfile.credentials.refreshToken,
			);
			mutate(accessToken);

			init.headers.set("Authorization", `Bearer ${accessToken.access_token}`);

			return await fetch(init);
		},
	});
	const $api = createClient(fetchClient);

	const { data: repositories = [] } = $api.useQuery(
		"get",
		"/projects/{projectIdOrKey}/git/repositories",
		{
			params: {
				path: {
					projectIdOrKey: notification.project.projectKey,
				},
			},
		},
		{
			enabled: pullRequest != null,
		},
	);

	const toUrl = useCurrentSpaceUrl();

	const reasonText = getStatusText(reason);
	const isPullRequest = [6, 10, 11, 12, 13].includes(reason);
	const repository = repositories.find(
		({ projectId }) => projectId === notification.project.id,
	);
	const subject = pullRequest
		? `${project.projectKey}/${repository?.name}#${pullRequest.number} ${pullRequest.summary}`
		: `${issue?.issueKey} ${issue?.summary}`;

	return (
		<ListBoxItem
			id={notification.id}
			href={toUrl(`/globalbar/notifications/redirect/${notification.id}`)}
			target="_blank"
			className={clsx(
				"grid gap-1 p-2 border-t border-t-gray-300 focus-visible:bg-accent hover:bg-accent",
				notification.resourceAlreadyRead ? "bg-gray-100" : "",
			)}
		>
			<div className="grid grid-cols-[auto_1fr] items-center gap-1">
				<img
					className="size-5 rounded"
					src="https://placehold.jp/320x320.png"
					alt=""
				/>
				<p className="line-clamp-1 text-gray-600 text-xs">
					{sender.name} さんが{reasonText[0]}{" "}
					<span className={isPullRequest ? "text-red-500" : "text-green-500"}>
						{reasonText[1]}
					</span>{" "}
					{reasonText[2]}
				</p>
			</div>
			{reason === 6 ? (
				<p className="line-clamp-1 text-sm">
					{project.name} ({project.projectKey})
				</p>
			) : (
				<>
					<p className="line-clamp-1 text-sm">{comment?.content ?? subject}</p>
					{comment?.content && (
						<p className="line-clamp-1 text-gray-600 text-xs">{subject}</p>
					)}
				</>
			)}
		</ListBoxItem>
	);
};
