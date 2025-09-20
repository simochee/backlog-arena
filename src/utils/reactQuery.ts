import type { QueryClientConfig } from "@tanstack/react-query";

export const reactQueryConfig: QueryClientConfig = {
	defaultOptions: {
		queries: {
			retry: (failureCount, error) => {
				console.log("Retrying to retry retry", { failureCount, error });

				return false;
			},
		},
	},
};
