import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/settings/")({
	component: RouteComponent,
});

function RouteComponent() {
	return <p>Settings</p>;
}
