import { OAuth2 } from "backlog-js";
import { browser } from "wxt/browser";
import { getSpace, getUsersMyself } from "@/client";
import { createClient } from "@/client/client";

const oauth2 = new OAuth2({
	clientId: import.meta.env.VITE_OAUTH2_CLIENT_ID,
	clientSecret: import.meta.env.VITE_OAUTH2_CLIENT_SECRET,
});

const getState = () => {
	const array = new Uint8Array(24);
	crypto.getRandomValues(array);
	return Array.from(array, (byte) => byte.toString(16).padStart(2, "0")).join(
		"",
	);
};

export const authorize = async (domain: string) => {
	const redirectUrl = browser.identity.getRedirectURL();
	const state = getState();
	const authorizationUrl = oauth2.getAuthorizationURL({
		host: domain,
		redirectUri: redirectUrl,
		state: state,
	});

	const responseUrl = await browser.identity.launchWebAuthFlow({
		interactive: true,
		url: authorizationUrl,
	});

	if (!responseUrl) {
		throw new Error(`Unauthorized authentication URL: ${authorizationUrl}`);
	}

	const url = new URL(responseUrl);

	if (state !== url.searchParams.get("state")) {
		throw new Error(`Invalid state: ${state}`);
	}

	const code = url.searchParams.get("code");

	if (!code) {
		throw new Error(`Invalid code: ${code}`);
	}

	const accessToken = await oauth2.getAccessToken({
		host: domain,
		redirectUri: redirectUrl,
		code,
	});

	const client = createClient({
		baseUrl: `https://${domain}/api/v2`,
		headers: {
			Authorization: `Bearer ${accessToken.access_token}`,
		},
	});
	const [{ data: space }, { data: user }] = await Promise.all([
		getSpace({ client }),
		getUsersMyself({ client }),
	]);

	if (!space || !user) {
		throw new Error(`Invalid space: ${accessToken.access_token}`);
	}

	return { space, user, accessToken };
};

export const refreshAccessToken = async (
	domain: string,
	refreshToken: string,
) => {
	return await oauth2.refreshAccessToken({
		host: domain,
		refreshToken,
	});
};
