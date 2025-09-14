import type { RouteConfig } from "@asteasolutions/zod-to-openapi";
import * as z from "zod";

export default {
	method: "post",
	path: "/notifications/{id}/markAsRead",
	description: "お知らせの既読化",
	summary: "お知らせを既読にします。",
	request: {
		params: z.object({
			id: z.number().openapi({ param: { name: "id", in: "path" } }),
		}),
	},
	responses: {
		204: {
			description: "No Content",
		},
	},
} satisfies RouteConfig;
