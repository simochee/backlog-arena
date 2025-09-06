import type { Preview } from "@storybook/react-vite";
import "../src/main.css";
import {
	createRootRoute,
	createRouter,
	RouterProvider,
} from "@tanstack/react-router";

export default {
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},

		a11y: {
			// 'todo' - show a11y violations in the test UI only
			// 'error' - fail CI on a11y violations
			// 'off' - skip a11y checks entirely
			test: "todo",
		},
	},

	decorators: [
		(Story) => {
			const rootRoute = createRootRoute({ component: Story });
			const router = createRouter({ routeTree: rootRoute });

			return <RouterProvider router={router} />;
		},
	],
} satisfies Preview;
