import { mutationOptions, queryOptions } from "@tanstack/react-query";
import { currentSpaceProfileStorage } from "@/storage/currentSpaceProfile/storage.ts";
import { spaceProfilesStorage } from "@/storage/spaceProfiles/storage.ts";
import { NoSpaceProfileError } from "@/utils/errors.ts";

export const currentSpaceProfileOptions = queryOptions({
	queryKey: ["currentSpaceProfileId"],
	queryFn: async () => {
		const { spaceProfiles } = await spaceProfilesStorage.getValue();
		const activeSpaceProfiles = spaceProfiles.filter(
			({ configuration }) => !configuration.isDisabled,
		);
		const currentSpaceProfile = await currentSpaceProfileStorage.getValue();

		const spaceProfile =
			activeSpaceProfiles.find(({ id }) => id === currentSpaceProfile?.id) ||
			activeSpaceProfiles[0];

		if (!spaceProfile) {
			throw new NoSpaceProfileError();
		}

		return spaceProfile;
	},
});

export const setCurrentSpaceProfileIdOptions = mutationOptions({
	mutationFn: async (id: string | null) => {
		await currentSpaceProfileStorage.setValue(id != null ? { id } : null);
	},
});
