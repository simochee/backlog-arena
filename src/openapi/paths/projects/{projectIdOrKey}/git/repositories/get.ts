import type { RouteConfig } from "@asteasolutions/zod-to-openapi";
import * as z from "zod";
import { GitRepository } from "@/openapi/components/schemas/GitRepository.ts";

export default {
	method: "get",
	path: "/projects/{projectIdOrKey}/git/repositories",
	description: "Gitリポジトリ一覧の取得",
	summary: "Gitリポジトリの一覧を取得します。",
	request: {
		params: z.object({
			projectIdOrKey: z
				.string()
				.openapi({ param: { name: "projectIdOrKey", in: "path" } }),
		}),
	},
	responses: {
		200: {
			description: "レスポンスボディ",
			content: {
				"application/json": {
					schema: z.array(GitRepository),
				},
			},
		},
	},
} satisfies RouteConfig;
