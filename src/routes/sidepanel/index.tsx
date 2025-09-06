import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/sidepanel/")({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello "/sidepanel/"! im index.</div>;
}
