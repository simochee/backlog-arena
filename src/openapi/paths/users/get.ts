import type { RouteConfig } from "@asteasolutions/zod-to-openapi";
import * as z from "zod";
import { User } from "@/openapi/components/schemas/User.ts";

export default {
	method: "get",
	path: "/users",
	description: "ユーザー一覧の取得",
	summary: "スペースのユーザーの一覧を取得します。",
	request: {},
	responses: {
		200: {
			description: "レスポンスボディ",
			content: {
				"application/json": {
					schema: z.array(User),
				},
			},
		},
	},
} satisfies RouteConfig;
