import type { RouteConfig } from "@asteasolutions/zod-to-openapi";
import * as z from "zod";
import { Notification } from "@/openapi/components/schemas/Notification.ts";

export default {
	method: "get",
	path: "/notifications",
	description: "お知らせ一覧の取得",
	summary: "自分の受け取ったお知らせの一覧を取得します。",
	request: {},
	responses: {
		200: {
			description: "レスポンスボディ",
			content: {
				"application/json": {
					schema: z.array(Notification),
				},
			},
		},
	},
} as RouteConfig;
