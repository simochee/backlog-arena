import { mutationOptions, queryOptions } from "@tanstack/react-query";
import type { Entity } from "backlog-js";
import type { Space, User } from "@/client";
import type {
	SpaceProfile,
	SpaceProfileConfiguration,
} from "@/storage/spaceProfiles/types.ts";
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

export const setSpaceProfileConfigurationOptions = mutationOptions({
	mutationFn: async (variables: { id: string } & SpaceProfileConfiguration) => {
		const { id, ...configuration } = variables;
		const { spaceProfiles } = await spaceProfilesStorage.getValue();

		const newSpaceProfile = spaceProfiles.map((spaceProfile) => {
			spaceProfile.configuration = {
				...spaceProfile.configuration,
				...configuration,
			};

			return spaceProfile;
		});

		await spaceProfilesStorage.setValue({ spaceProfiles: newSpaceProfile });
	},
});

export const setSpaceProfileCredentialsOptions = (spaceProfileId: string) =>
	mutationOptions({
		mutationFn: async (accessToken: Entity.OAuth2.AccessToken) => {
			if (!spaceProfileId) return;

			const storageValue = await spaceProfilesStorage.getValue();

			storageValue.spaceProfiles = storageValue.spaceProfiles.map(
				(spaceProfile) => {
					if (spaceProfile.id !== spaceProfileId) return spaceProfile;

					spaceProfile.credentials = {
						authType: "Bearer",
						accessToken: accessToken.access_token,
						refreshToken: accessToken.refresh_token,
					};
					return spaceProfile;
				},
			);

			await spaceProfilesStorage.setValue(storageValue);
		},
	});
