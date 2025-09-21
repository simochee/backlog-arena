import { createFileRoute, Outlet } from "@tanstack/react-router";
import { SettingsLayout } from "@/components/Settings/Layout";

export const Route = createFileRoute("/(settings)")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<SettingsLayout>
			<Outlet />
		</SettingsLayout>
	);
}
