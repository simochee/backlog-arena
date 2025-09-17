import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { Toaster } from "react-hot-toast";

export const Route = createRootRoute({ component: RootLayout });

function RootLayout() {
	return (
		<>
			<Outlet />
			<Toaster position="bottom-right" />
			<TanStackRouterDevtools />
			<ReactQueryDevtools />
		</>
	);
}
