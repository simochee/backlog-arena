import type { RouteConfig } from "@asteasolutions/zod-to-openapi";
import * as z from "zod";
import { Issue } from "@/openapi/components/schemas/Issue.ts";

export default {
	method: "patch",
	path: "/issues/{issueIdOrKey}",
	description: "課題情報の更新",
	summary: "参加しているプロジェクトの課題を更新します。",
	request: {
		params: z.object({
			issueIdOrKey: z
				.union([z.string(), z.number()])
				.openapi({ param: { in: "path", name: "issueIdOrKey" } }),
		}),
		body: {
			content: {
				"application/x-www-form-urlencoded": {
					schema: z.object({
						summary: z.string().optional(),
						parentIssueId: z.number().optional(),
						description: z.string().optional(),
						statusId: z.number().optional(),
						resolutionId: z.number().optional(),
						startDate: z.string().optional(),
						dueDate: z.string().optional(),
						estimatedHours: z.number().optional(),
						actualHours: z.number().optional(),
						issueTypeId: z.number().optional(),
						"categoryId[]": z.array(z.number()).optional(),
						"versionId[]": z.array(z.number()).optional(),
						"milestoneId[]": z.array(z.number()).optional(),
						priorityId: z.number().optional(),
						assigneeId: z.number().optional(),
						"notificationUserId[]": z.array(z.number()).optional(),
						"attachmentId[]": z.array(z.number()).optional(),
						comment: z.string().optional(),
					}),
				},
			},
		},
	},
	responses: {
		200: {
			description: "レスポンスボディ",
			content: {
				"application/json": {
					schema: Issue,
				},
			},
		},
	},
} satisfies RouteConfig;
