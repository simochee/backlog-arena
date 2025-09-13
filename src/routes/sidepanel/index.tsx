import { createFileRoute } from "@tanstack/react-router";
import { useCurrentSpaceProfile } from "@/hooks/useCurrentSpaceProfile.ts";

export const Route = createFileRoute("/sidepanel/")({
	component: RouteComponent,
});

function RouteComponent() {
	const currentSpaceProfile = useCurrentSpaceProfile();

	return (
		<div>
			<p>data:</p>
			<pre>{currentSpaceProfile?.space.name}</pre>
		</div>
	);
}
