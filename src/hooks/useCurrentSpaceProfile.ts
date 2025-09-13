import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { currentSpaceProfileOptions } from "@/storage/currentSpaceProfile/options.ts";
import { currentSpaceProfileStorage } from "@/storage/currentSpaceProfile/storage.ts";
import { spaceProfilesStorage } from "@/storage/spaceProfiles/storage.ts";

export const useCurrentSpaceProfile = () => {
	const queryClient = useQueryClient();
	const { data } = useSuspenseQuery(currentSpaceProfileOptions);

	useEffect(() => {
		return currentSpaceProfileStorage.watch(async () => {
			await queryClient.invalidateQueries({
				queryKey: currentSpaceProfileOptions.queryKey,
			});
		});
	}, [queryClient]);

	useEffect(() => {
		return spaceProfilesStorage.watch(async () => {
			await queryClient.invalidateQueries({
				queryKey: currentSpaceProfileOptions.queryKey,
			});
		});
	}, [queryClient]);

	return data;
};
