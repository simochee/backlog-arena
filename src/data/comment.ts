import { NORMAL_USER } from "@/data/user.ts";
import { any } from "@/data/utils.ts";
import type { components } from "@/openapi/openapi-schema.ts";

export const NORMAL_COMMENT: components["schemas"]["Comment"] = {
	id: any.int,
	projectId: any.int,
	issueId: any.int,
	content: "サンプルコメント",
	changeLog: [],
	createdUser: NORMAL_USER,
	created: any.iosDate,
	updated: any.iosDate,
	stars: [],
	notifications: [],
};
