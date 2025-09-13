import { storage } from "#imports";
import type { CurrentSpaceProfile } from "@/storage/currentSpaceProfile/types.ts";

export const currentSpaceProfileStorage =
	storage.defineItem<CurrentSpaceProfile | null>("local:currentSpaceProfile", {
		fallback: null,
		version: 1,
	});
