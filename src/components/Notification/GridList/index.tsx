import type {
	InfiniteData,
	UseInfiniteQueryResult,
} from "@tanstack/react-query";
import {
	Collection,
	GridList,
	GridListHeader,
	GridListLoadMoreItem,
	GridListSection,
} from "react-aria-components";
import type { Notification } from "@/client";
import { NotificationItem } from "@/components/Notification/Item";

type Props = {
	queryResult: UseInfiniteQueryResult<
		InfiniteData<Notification[], unknown>,
		Error
	>;
};

const dateFormat = new Intl.DateTimeFormat("ja-JP", { dateStyle: "long" });
const weekdayFormat = new Intl.DateTimeFormat("ja-JP", { weekday: "short" });

export const NotificationGridList: React.FC<Props> = ({ queryResult }) => {
	const { data, fetchNextPage, isFetched, isFetchingNextPage, hasNextPage } =
		queryResult;

	const flatten = data?.pages?.flat() || [];
	const groupByDate = flatten.reduce((accumulator, notification) => {
		const [dateKey] = notification.created.split("T");

		if (dateKey) {
			const group = accumulator.get(dateKey) || [];
			group.push(notification);

			accumulator.set(dateKey, group);
		}

		return accumulator;
	}, new Map<string, Notification[]>());

	const formatDate = (date: string) => {
		const d = new Date(date);

		return `${dateFormat.format(d)} (${weekdayFormat.format(d)})`;
	};

	const formatRelativeDate = (date: string) => {
		const today = new Date();
		today.setHours(0, 0, 0, 0);
		const d = new Date(date);
		d.setHours(0, 0, 0, 0);

		const diffMs = today.getTime() - d.getTime();
		const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));

		switch (diffDays) {
			case 0:
				return "今日";
			case 1:
				return "昨日";
			default:
				return `${diffDays.toLocaleString()}日前`;
		}
	};

	const loadMore = async () => {
		if (isFetched && hasNextPage && !isFetchingNextPage) {
			await fetchNextPage();
		}
	};

	return (
		<GridList aria-label="あなたの受け取ったお知らせ一覧">
			{Array.from(groupByDate.entries()).map(([date, notifications]) => (
				<GridListSection key={date}>
					<GridListHeader className="sticky top-0 z-10">
						<div className="flex items-center justify-between bg-white border-b border-gray-300 p-2">
							<h2 className="font-bold tracking-wide">{formatDate(date)}</h2>
							<p className="text-gray-600">{formatRelativeDate(date)}</p>
						</div>
					</GridListHeader>
					<Collection items={notifications}>
						{(notification) => <NotificationItem notification={notification} />}
					</Collection>
				</GridListSection>
			))}
			<GridListLoadMoreItem
				onLoadMore={loadMore}
				isLoading={isFetchingNextPage}
			/>
		</GridList>
	);
};
