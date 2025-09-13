import { useMutation } from "@tanstack/react-query";
import createFetchClient from "openapi-fetch";
import createClient from "openapi-react-query";
import { useCurrentSpaceProfile } from "@/hooks/useCurrentSpaceProfile.ts";
import type { paths } from "@/openapi/openapi-schema.ts";
import { setSpaceProfileCredentialsOptions } from "@/storage/spaceProfiles/options.ts";
import { refreshAccessToken } from "@/utils/authorize.ts";

export const useApi = () => {
	const { id, space, credentials } = useCurrentSpaceProfile();

	const { mutate } = useMutation(setSpaceProfileCredentialsOptions(id));

	const $fetch = createFetchClient<paths>({
		baseUrl: `https://${space.domain}/api/v2`,
		headers: {
			Authorization: `Bearer ${credentials.accessToken}`,
		},
		fetch: async (init) => {
			const res = await fetch(init);

			if (res.status !== 401) {
				return res;
			}

			const accessToken = await refreshAccessToken(
				space.domain,
				credentials.refreshToken,
			);
			mutate(accessToken);

			init.headers.set("Authorization", `Bearer ${accessToken.access_token}`);

			return await fetch(init);
		},
	});
	const $api = createClient($fetch);

	return { $api, $fetch };
};
