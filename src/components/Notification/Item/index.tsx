import {
	IconCopy,
	IconEyeX,
	IconGitMerge,
	IconGitPullRequestClosed,
	IconGitPullRequestDraft,
	IconMessage,
	IconStar,
} from "@tabler/icons-react";
import { useMutation } from "@tanstack/react-query";
import { clsx } from "clsx";
import createFetchClient from "openapi-fetch";
import createClient from "openapi-react-query";
import { Button, GridListItem } from "react-aria-components";
import { UiDescription } from "@/components/Ui/Description";
import { UiTooltip } from "@/components/Ui/Tooltip";
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
	} = notification;

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
					projectIdOrKey: project.projectKey,
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
		<GridListItem
			id={notification.id}
			href={toUrl(`/globalbar/notifications/redirect/${notification.id}`)}
			target="_blank"
			className={clsx(
				"grid gap-1 p-2 border-t border-t-gray-300 focus-visible:bg-accent hover:bg-accent",
				notification.resourceAlreadyRead ? "bg-gray-100" : "",
			)}
		>
			{({ isHovered }) => (
				<>
					<div className="grid h-6 grid-cols-[auto_1fr_auto] items-center gap-1">
						<UiTooltip text={sender.name} nonInteractive>
							<img
								className="size-5 rounded"
								src="https://placehold.jp/320x320.png"
								alt=""
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
								<UiTooltip text="課題キーと件名をコピーする">
									<Button className="size-6 rounded-full grid place-items-center border border-gray-300 bg-gray-50 hover:border-green-700 hover:bg-green-700 hover:text-white">
										<IconCopy className="size-4" />
									</Button>
								</UiTooltip>
								<UiTooltip text="コメントを返信する">
									<Button className="size-6 rounded-full grid place-items-center border border-gray-300 bg-gray-50 hover:border-green-700 hover:bg-green-700 hover:text-white">
										<IconMessage className="size-4" />
									</Button>
								</UiTooltip>
								<UiTooltip text="スターをつける">
									<Button className="size-6 rounded-full grid place-items-center border border-gray-300 bg-gray-50 hover:border-green-700 hover:bg-green-700 hover:text-white">
										<IconStar className="size-4" />
									</Button>
								</UiTooltip>
								<UiTooltip text="既読にする">
									<Button className="size-6 rounded-full grid place-items-center border border-gray-300 bg-gray-50 hover:border-green-700 hover:bg-green-700 hover:text-white">
										<IconEyeX className="size-4" />
									</Button>
								</UiTooltip>
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
								`${project.name} (${project.projectKey})`
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
						<div className="grid grid-cols-[1fr_auto] items-center gap-1">
							<p className="grid grid-cols-[auto_1fr] gap-1 items-center">
								<UiTooltip text={subject} nonInteractive>
									<img
										className="size-4 rounded"
										src="https://placehold.jp/320x320.png"
										alt=""
									/>
								</UiTooltip>
								<span className="line-clamp-1 text-gray-600 text-xs">
									{[2, 3, 4, 11, 12, 13].includes(reason)
										? subject
										: issue?.issueKey ||
											`${project.projectKey}/${repository?.name}#${pullRequest?.number}`}
								</span>
							</p>
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
