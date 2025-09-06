import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/sidepanel")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div>
			<button
				type="button"
				onClick={() => browser.tabs.create({ url: "settings.html" })}
			>
				open settings
			</button>
			<Outlet />
		</div>
	);
}
