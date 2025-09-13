import type { RouteConfig } from "@asteasolutions/zod-to-openapi";

export default {
	method: "get",
	path: "/space",
	description: "スペース情報の取得",
	summary: "スペースの情報を取得します。",
	request: {},
	responses: {
		200: {
			description: "Hello World",
		},
	},
} satisfies RouteConfig;
