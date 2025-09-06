import { createFileRoute, Outlet } from "@tanstack/react-router";
import { SettingsHeader } from "@/components/Settings/Header";
import { SettingsNav } from "@/components/Settings/Nav";

export const Route = createFileRoute("/(settings)")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="grid gap-5 py-8 max-w-2xl mx-auto">
			<SettingsHeader />
			<div className="grid grid-cols-[200px_1fr] gap-4">
				<aside>
					<SettingsNav />
				</aside>
				<main>
					<Outlet />
				</main>
			</div>
		</div>
	);
}
