import { createFileRoute, Outlet } from "@tanstack/react-router";
import { browser } from "wxt/browser";
import { SettingsHeader } from "@/features/settings/components/SettingsHeader";
import { SettingsNav } from "@/features/settings/components/SettingsNav";

export const Route = createFileRoute("/(settings)")({
	component: RouteComponent,
});

function RouteComponent() {
	console.log(browser.identity.getRedirectURL());

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
