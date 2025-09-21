import { createFileRoute, Outlet } from "@tanstack/react-router";
import { SidepanelLayout } from "@/components/Sidepanel/Layout";

export const Route = createFileRoute("/sidepanel")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<SidepanelLayout>
			<Outlet />
		</SidepanelLayout>
	);
}
