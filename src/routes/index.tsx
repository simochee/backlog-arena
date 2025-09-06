import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
	loader: () => {
		if (location.pathname === "/settings.html") {
			throw redirect({ to: "/settings/general" });
		}

		throw redirect({ to: "/sidepanel" });
	},
	component: RouteComponent,
});

function RouteComponent() {
	return null;
}
