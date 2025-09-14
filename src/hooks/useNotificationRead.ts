import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
	getNotificationsOptions,
	postNotificationsByIdMarkAsReadMutation,
} from "@/client/@tanstack/react-query.gen.ts";

export const useNotificationRead = () => {
	const queryClient = useQueryClient();

	const { queryKey } = getNotificationsOptions();

	return useMutation({
		...postNotificationsByIdMarkAsReadMutation(),
		onMutate: ({ path: { id } }) => {
			const previousData = queryClient.getQueryData(queryKey);

			queryClient.setQueryData(queryKey, (data = []) => {
				for (const item of data) {
					if (item.id === id) {
						item.alreadyRead = true;
						item.resourceAlreadyRead = true;
					}
				}

				return data;
			});

			return { previousData };
		},
		onError: (_error, _variables, context) => {
			if (context) {
				queryClient.setQueryData(queryKey, context.previousData);
			}
		},
	});
};
