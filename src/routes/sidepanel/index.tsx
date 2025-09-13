import { createFileRoute } from "@tanstack/react-router";
import { GridList } from "react-aria-components";
import { NotificationItem } from "@/components/Notification/Item";
import { useApi } from "@/hooks/useApi.ts";

export const Route = createFileRoute("/sidepanel/")({
	component: RouteComponent,
});

function RouteComponent() {
	const { $api } = useApi();
	const { data = [] } = $api.useQuery(
		"get",
		"/notifications",
		{},
		{
			refetchInterval: 60 * 1000,
		},
	);

	return (
		<div>
			<GridList items={data}>
				{(notification) => <NotificationItem notification={notification} />}
			</GridList>
		</div>
	);
}
