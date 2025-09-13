import { mutationOptions, queryOptions } from "@tanstack/react-query";
import { currentSpaceProfileStorage } from "@/storage/currentSpaceProfile/storage.ts";
import { spaceProfilesStorage } from "@/storage/spaceProfiles/storage.ts";

export const currentSpaceProfileOptions = queryOptions({
	queryKey: ["currentSpaceProfileId"],
	queryFn: async () => {
		const { spaceProfiles } = await spaceProfilesStorage.getValue();
		const currentSpaceProfile = await currentSpaceProfileStorage.getValue();

		return (
			spaceProfiles.find(({ id }) => id === currentSpaceProfile?.id) ||
			spaceProfiles[0]
		);
	},
});

export const setCurrentSpaceProfileIdOptions = mutationOptions({
	mutationFn: async (id: string | null) => {
		await currentSpaceProfileStorage.setValue(id != null ? { id } : null);
	},
});
