import { createRoot } from "react-dom/client";
import "./main.css";
import { createHashHistory } from "@tanstack/history";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { StrictMode } from "react";
import { client } from "@/client/client.gen";
import { registerClientInterceptors } from "@/utils/client.ts";
import { routeTree } from "./routeTree.gen";

registerClientInterceptors(client);

const queryClient = new QueryClient();

const hashHistory = createHashHistory();
const router = createRouter({ routeTree, history: hashHistory });

declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}

const rootEl = document.querySelector("#root");

if (rootEl instanceof HTMLElement) {
	const root = createRoot(rootEl);
	root.render(
		<StrictMode>
			<QueryClientProvider client={queryClient}>
				<RouterProvider router={router} />
			</QueryClientProvider>
		</StrictMode>,
	);
}
