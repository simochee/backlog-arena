import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/sidepanel")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div>
			Hello "/sidepanel"!
			<Outlet />
		</div>
	);
}
