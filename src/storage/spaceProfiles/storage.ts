import { storage } from "#imports";
import type { SpaceProfiles } from "@/storage/spaceProfiles/types.ts";

export const spaceProfileStorage = storage.defineItem<SpaceProfiles>(
	"local:spaceProfiles",
	{
		fallback: {
			spaceProfiles: [],
		} satisfies SpaceProfiles,
		version: 1,
	},
);
