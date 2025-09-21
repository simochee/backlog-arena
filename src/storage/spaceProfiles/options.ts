import { mutationOptions, queryOptions } from "@tanstack/react-query";
import type { Entity } from "backlog-js";
import type { Space, User } from "@/client";
import type { SpaceProfile } from "@/storage/spaceProfiles/types.ts";
import { spaceProfilesStorage } from "./storage";

export const spaceProfilesOptions = queryOptions({
	queryKey: ["space-profiles"],
	queryFn: async () => {
		const storageValue = await spaceProfilesStorage.getValue();
		return storageValue.spaceProfiles;
	},
});

export const addSpaceProfileOptions = mutationOptions({
	mutationFn: async (variables: {
		domain: string;
		space: Space;
		user: User;
		accessToken: Entity.OAuth2.AccessToken;
	}) => {
		const { domain, space, user, accessToken } = variables;
		const storageValue = await spaceProfilesStorage.getValue();

		const spaceProfile: SpaceProfile = {
			id: crypto.randomUUID(),
			space: {
				spaceKey: space.spaceKey,
				name: space.name,
				domain,
			},
			user: {
				id: user.id,
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

		await spaceProfilesStorage.setValue(storageValue);
	},
});

export const removeSpaceProfileOptions = mutationOptions({
	mutationFn: async (id: string) => {
		// スペースプロファイルから削除
		const { spaceProfiles } = await spaceProfilesStorage.getValue();

		const newSpaceProfile = spaceProfiles.filter(
			(spaceProfile) => spaceProfile.id !== id,
		);

		await spaceProfilesStorage.setValue({ spaceProfiles: newSpaceProfile });
	},
});

export const setSpaceProfileActivationsOptions = mutationOptions({
	mutationFn: async (activeSpaceProfiles: string[]) => {
		const { spaceProfiles } = await spaceProfilesStorage.getValue();

		for (const spaceProfile of spaceProfiles) {
			spaceProfile.configuration.isDisabled = !activeSpaceProfiles.includes(
				spaceProfile.id,
			);
		}

		await spaceProfilesStorage.setValue({ spaceProfiles });
	},
});
