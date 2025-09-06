import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export const Route = createRootRoute({ component: RootLayout });

function RootLayout() {
	return (
		<>
			<p>Layout</p>
			<button
				type="button"
				onClick={() => browser.tabs.create({ url: "settings.html" })}
			>
				open settings
			</button>
			<Outlet />
			<TanStackRouterDevtools />
		</>
	);
}
