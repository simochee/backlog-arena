import { useQueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { spaceProfilesOptions } from "@/storage/spaceProfiles/options.ts";
import { spaceProfilesStorage } from "@/storage/spaceProfiles/storage.ts";

export const Route = createRootRoute({ component: RootLayout });

function RootLayout() {
	const queryClient = useQueryClient();

	useEffect(() => {
		return spaceProfilesStorage.watch(async () => {
			await queryClient.invalidateQueries({
				queryKey: spaceProfilesOptions.queryKey,
			});
		});
	}, [queryClient]);

	return (
		<>
			<Outlet />
			<Toaster position="bottom-right" />
			<TanStackRouterDevtools />
			<ReactQueryDevtools />
		</>
	);
}
