import { mutationOptions, queryOptions } from "@tanstack/react-query";
import { currentSpaceProfileStorage } from "@/storage/currentSpaceProfile/storage.ts";
import { spaceProfilesStorage } from "@/storage/spaceProfiles/storage.ts";

export const currentSpaceProfileOptions = queryOptions({
	queryKey: ["currentSpaceProfileId"],
	queryFn: async () => {
		const { spaceProfiles } = await spaceProfilesStorage.getValue();
		const currentSpaceProfile = await currentSpaceProfileStorage.getValue();

		const spaceProfile =
			spaceProfiles.find(({ id }) => id === currentSpaceProfile?.id) ||
			spaceProfiles[0];

		if (!spaceProfile) {
			throw new Error("No space profile found");
		}

		return spaceProfile;
	},
});

export const setCurrentSpaceProfileIdOptions = mutationOptions({
	mutationFn: async (id: string | null) => {
		await currentSpaceProfileStorage.setValue(id != null ? { id } : null);
	},
});
