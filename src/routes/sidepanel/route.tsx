import { createFileRoute, Outlet } from "@tanstack/react-router";
import { ErrorBoundary } from "react-error-boundary";
import { SidepanelLayout } from "@/components/Sidepanel/Layout";

export const Route = createFileRoute("/sidepanel")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<SidepanelLayout>
			<ErrorBoundary fallback={<p>エラーです！</p>}>
				<Outlet />
			</ErrorBoundary>
		</SidepanelLayout>
	);
}
