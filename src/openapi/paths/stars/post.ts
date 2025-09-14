import type { RouteConfig } from "@asteasolutions/zod-to-openapi";
import * as z from "zod";

export default {
	method: "post",
	path: "/stars",
	description: "スターの追加",
	summary: "課題、コメント、Wikiにスターを1つ追加します。",
	request: {
		body: {
			content: {
				"application/x-www-form-urlencoded": {
					schema: z.object({
						issueId: z.number().optional(),
						commentId: z.number().optional(),
						wikiId: z.number().optional(),
						pullRequestId: z.number().optional(),
						pullRequestCommentId: z.number().optional(),
					}),
				},
			},
		},
	},
	responses: {
		204: {
			description: "No Content",
		},
	},
} satisfies RouteConfig;
