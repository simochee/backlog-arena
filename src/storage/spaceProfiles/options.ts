import { mutationOptions, queryOptions } from "@tanstack/react-query";
import type { Entity } from "backlog-js";
import type { components } from "@/openapi/openapi-schema";
import type { SpaceProfile } from "@/storage/spaceProfiles/types.ts";
import { spaceProfileStorage } from "./storage";

export const spaceProfilesOptions = queryOptions({
	queryKey: ["space-profiles"],
	queryFn: async () => {
		const storageValue = await spaceProfileStorage.getValue();
		return storageValue.spaceProfiles;
	},
});

export const addSpaceProfileOptions = mutationOptions({
	mutationFn: async ({
		domain,
		space,
		accessToken,
	}: {
		domain: string;
		space: components["schemas"]["Space"];
		accessToken: Entity.OAuth2.AccessToken;
	}) => {
		const storageValue = await spaceProfileStorage.getValue();

		const spaceProfile: SpaceProfile = {
			space: {
				spaceKey: space.spaceKey,
				name: space.name,
				domain,
			},
			credentials: {
				authType: "Bearer",
				accessToken: accessToken.access_token,
				refreshToken: accessToken.refresh_token,
			},
			configuration: {},
		};

		storageValue.spaceProfiles =
			storageValue.spaceProfiles.concat(spaceProfile);

		await spaceProfileStorage.setValue(storageValue);
	},
});
