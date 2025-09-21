import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createRootRoute, HeadContent, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { ErrorBoundary } from "react-error-boundary";
import { Toaster } from "react-hot-toast";
import { SidepanelError } from "@/components/Sidepanel/Error";

export const Route = createRootRoute({
	component: RootLayout,
	head: () => ({
		meta: [
			{
				title: "Backlog Arena",
			},
		],
	}),
});

function RootLayout() {
	return (
		<ErrorBoundary FallbackComponent={SidepanelError}>
			<HeadContent />
			<Outlet />
			<Toaster position="bottom-right" />
			<TanStackRouterDevtools />
			<ReactQueryDevtools />
		</ErrorBoundary>
	);
}
