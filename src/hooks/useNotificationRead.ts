import { useQueryClient } from "@tanstack/react-query";
import { useApi } from "@/hooks/useApi.ts";
import type { components } from "@/openapi/openapi-schema.ts";

export const useNotificationRead = () => {
	const queryClient = useQueryClient();
	const { $api } = useApi();

	return $api.useMutation("post", "/notifications/{id}/markAsRead", {
		onMutate: ({
			params: {
				path: { id },
			},
		}) => {
			console.log("run!!!!", queryClient);
			queryClient.setQueryData<components["schemas"]["Notification"][]>(
				$api.queryOptions("get", "/notifications", {}).queryKey,
				(data = []) => {
					for (const item of data) {
						if (item.id === id) {
							item.alreadyRead = true;
							item.resourceAlreadyRead = true;
						}
					}

					return data;
				},
			);
		},
	});
};
