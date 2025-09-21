import { useInfiniteQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { getNotificationsInfiniteOptions } from "@/client/@tanstack/react-query.gen.ts";
import { NotificationGridList } from "@/components/Notification/GridList";

export const Route = createFileRoute("/sidepanel/")({
	component: RouteComponent,
});

function RouteComponent() {
	const queryResult = useInfiniteQuery({
		...getNotificationsInfiniteOptions({
			query: {
				count: 10,
			},
		}),
		getNextPageParam: (lastPage, pages) => {
			const perPage = Math.min(100, (pages.length - 1) * 2 * 10);

			if (lastPage.length < perPage) {
				return null;
			}

			return {
				query: {
					maxId: lastPage.at(-1)?.id,
					count: Math.min(100, pages.length * 2 * 10),
				},
			};
		},
		initialPageParam: {},
		refetchInterval: 60_000,
	});

	return (
		<div>
			<NotificationGridList queryResult={queryResult} />
		</div>
	);
}
