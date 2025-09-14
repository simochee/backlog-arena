import type { Entity } from "backlog-js";
import type { Client } from "@/client/client";
import { currentSpaceProfileStorage } from "@/storage/currentSpaceProfile/storage.ts";
import { spaceProfilesStorage } from "@/storage/spaceProfiles/storage.ts";
import { refreshAccessToken } from "@/utils/authorize.ts";

/**
 * 現在のスペースプロファイルを Storage から参照する
 */
const getCurrentSpaceProfile = async () => {
	const [{ spaceProfiles }, currentSpaceProfile] = await Promise.all([
		spaceProfilesStorage.getValue(),
		currentSpaceProfileStorage.getValue(),
	]);

	const spaceProfile =
		spaceProfiles.find(({ id }) => id === currentSpaceProfile?.id) ||
		spaceProfiles[0];

	if (!spaceProfile) {
		throw new Error("Unable to get space profile");
	}

	return spaceProfile;
};

/**
 * スペースプロファイルの認証情報を更新する
 */
const updateSpaceProfileCredentials = async (
	id: string,
	accessToken: Entity.OAuth2.AccessToken,
) => {
	const storageValue = await spaceProfilesStorage.getValue();

	storageValue.spaceProfiles = storageValue.spaceProfiles.map(
		(spaceProfile) => {
			if (spaceProfile.id !== id) return spaceProfile;

			spaceProfile.credentials = {
				authType: "Bearer",
				accessToken: accessToken.access_token,
				refreshToken: accessToken.refresh_token,
			};
			return spaceProfile;
		},
	);

	await spaceProfilesStorage.setValue(storageValue);
};

/**
 * 現在のスペースプロファイルのアクセストークンを更新する
 */
const refreshCurrentSpaceProfileAccessToken = async () => {
	const { id, space, credentials } = await getCurrentSpaceProfile();

	const accessToken = await refreshAccessToken(
		space.domain,
		credentials.refreshToken,
	);
	await updateSpaceProfileCredentials(id, accessToken);

	return accessToken;
};

export const registerClientInterceptors = (client: Client) => {
	let refreshAccessTokenPromise: Promise<Entity.OAuth2.AccessToken> | undefined;

	// リクエスト先のドメインと認証情報を Storage に保持している値へ書き換える
	client.interceptors.request.use(async (request) => {
		const { space, credentials } = await getCurrentSpaceProfile();

		const url = new URL(request.url);
		url.protocol = "https:";
		url.host = space.domain;
		url.port = "";

		const newRequest = new Request(url, request);
		newRequest.headers.set(
			"Authorization",
			`Bearer ${credentials.accessToken}`,
		);

		return newRequest;
	});

	// 401 でエラーになったときにトークンリフレッシュを実施してリトライする
	client.interceptors.response.use(async (response, request) => {
		if (response.status !== 401) {
			return response;
		}

		try {
			// 重複実行させないよう Promise をキャッシュする
			if (!refreshAccessTokenPromise) {
				refreshAccessTokenPromise = refreshCurrentSpaceProfileAccessToken();
			}

			const { access_token } = await refreshAccessTokenPromise;

			const newRequest = new Request(request.url, request);
			newRequest.headers.set("Authorization", `Bearer ${access_token}`);

			return await fetch(newRequest);
		} finally {
			refreshAccessTokenPromise = undefined;
		}
	});
};
