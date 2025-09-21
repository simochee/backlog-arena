import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { GridList } from "react-aria-components";
import { getNotificationsOptions } from "@/client/@tanstack/react-query.gen.ts";
import { NotificationItem } from "@/components/Notification/Item";

export const Route = createFileRoute("/sidepanel/")({
	component: RouteComponent,
});

function RouteComponent() {
	const { data = [] } = useSuspenseQuery({
		...getNotificationsOptions(),
		refetchInterval: 60 * 1000,
	});

	return (
		<div>
			<GridList items={data}>
				{(notification) => <NotificationItem notification={notification} />}
			</GridList>
		</div>
	);
}
