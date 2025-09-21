import { useInfiniteQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import {
	Collection,
	GridList,
	GridListLoadMoreItem,
} from "react-aria-components";
import { getNotificationsInfiniteOptions } from "@/client/@tanstack/react-query.gen.ts";
import { NotificationItem } from "@/components/Notification/Item";

export const Route = createFileRoute("/sidepanel/")({
	component: RouteComponent,
});

function RouteComponent() {
	const { data, fetchNextPage, isFetched, isFetchingNextPage, hasNextPage } =
		useInfiniteQuery({
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

	const loadMore = async () => {
		console.log(isFetched, hasNextPage, isFetchingNextPage);

		if (isFetched && hasNextPage && !isFetchingNextPage) {
			await fetchNextPage();
		}
	};

	return (
		<div>
			<GridList>
				<Collection items={data?.pages.flat()}>
					{(notification) => <NotificationItem notification={notification} />}
				</Collection>
				<GridListLoadMoreItem
					onLoadMore={loadMore}
					isLoading={isFetchingNextPage}
				/>
			</GridList>
		</div>
	);
}
