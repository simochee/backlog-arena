import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { ErrorBoundary } from "react-error-boundary";
import { Toaster } from "react-hot-toast";
import { SidepanelError } from "@/components/Sidepanel/Error";

export const Route = createRootRoute({ component: RootLayout });

function RootLayout() {
	return (
		<ErrorBoundary FallbackComponent={SidepanelError}>
			<Outlet />
			<Toaster position="bottom-right" />
			<TanStackRouterDevtools />
			<ReactQueryDevtools />
		</ErrorBoundary>
	);
}
