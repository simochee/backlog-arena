import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(settings)/settings/account")({
	component: RouteComponent,
});

function RouteComponent() {
	return <p>Account</p>;
}
