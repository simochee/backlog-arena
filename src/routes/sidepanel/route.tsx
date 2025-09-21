import {
	QueryObserver,
	useQueryClient,
	useSuspenseQuery,
} from "@tanstack/react-query";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Suspense, useEffect } from "react";
import { SidepanelLayout } from "@/components/Sidepanel/Layout";
import { currentSpaceProfileOptions } from "@/storage/currentSpaceProfile/options.ts";

export const Route = createFileRoute("/sidepanel")({
	component: RouteComponent,
});

function RouteComponent() {
	const queryClient = useQueryClient();
	const { data } = useSuspenseQuery(currentSpaceProfileOptions);

	useEffect(() => {
		const observer = new QueryObserver(queryClient, currentSpaceProfileOptions);

		return observer.subscribe((result) => {
			if (result.data?.id !== data.id) {
				location.reload();
			}
		});
	}, [queryClient, data]);

	return (
		<SidepanelLayout>
			<Suspense fallback={<p>Loading...</p>}>
				<Outlet />
			</Suspense>
		</SidepanelLayout>
	);
}
