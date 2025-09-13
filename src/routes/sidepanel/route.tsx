import { createFileRoute, Outlet } from "@tanstack/react-router";
import { ErrorBoundary } from "react-error-boundary";
import { browser } from "wxt/browser";

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
			<ErrorBoundary fallback={<p>エラーです！</p>}>
				<Outlet />
			</ErrorBoundary>
		</div>
	);
}
