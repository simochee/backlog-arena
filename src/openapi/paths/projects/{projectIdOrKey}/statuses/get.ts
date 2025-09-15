import type { RouteConfig } from "@asteasolutions/zod-to-openapi";
import * as z from "zod";
import { ProjectStatus } from "@/openapi/components/schemas/ProjectStatus.ts";

export default {
	method: "get",
	path: "/projects/{projectIdOrKey}/statuses",
	description: "プロジェクトの状態一覧の取得",
	summary: "プロジェクト固有の課題に設定できる状態一覧を取得します。",
	request: {
		params: z.object({
			projectIdOrKey: z
				.union([z.number(), z.string()])
				.openapi({ param: { name: "projectIdOrKey", in: "path" } }),
		}),
	},
	responses: {
		200: {
			description: "レスポンスボディ",
			content: {
				"application/json": {
					schema: z.array(ProjectStatus),
				},
			},
		},
	},
} satisfies RouteConfig;
