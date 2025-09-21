import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
	getNotificationsInfiniteOptions,
	postNotificationsByIdMarkAsReadMutation,
} from "@/client/@tanstack/react-query.gen.ts";

export const useNotificationRead = () => {
	const queryClient = useQueryClient();

	const { queryKey } = getNotificationsInfiniteOptions({
		query: { count: 10 },
	});

	return useMutation({
		...postNotificationsByIdMarkAsReadMutation(),
		onMutate: ({ path: { id } }) => {
			const previousData = queryClient.getQueryData(queryKey);

			queryClient.setQueryData(queryKey, (data) => {
				if (data) {
					for (const page of data.pages) {
						for (const item of page) {
							if (item.id === id) {
								console.log(item);

								item.alreadyRead = true;
								item.resourceAlreadyRead = true;
							}
						}
					}
				}

				return data;
			});

			return { previousData };
		},
		onSuccess: () => {
			toast.success("Notification read successfully!");
		},
		onError: (_error, _variables, context) => {
			if (context) {
				queryClient.setQueryData(queryKey, context.previousData);
			}
		},
	});
};
