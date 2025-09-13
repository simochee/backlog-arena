import type { RouteConfig } from "@asteasolutions/zod-to-openapi";
import { User } from "@/openapi/components/schemas/User";

export default {
	method: "get",
	path: "/users/myself",
	description: "認証ユーザー情報の取得",
	summary: "APIとの認証に使用しているユーザーの情報を取得します。",
	request: {},
	responses: {
		200: {
			description: "レスポンスボディ",
			content: {
				"application/json": {
					schema: User,
				},
			},
		},
	},
} satisfies RouteConfig;
