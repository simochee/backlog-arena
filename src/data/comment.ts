import type { Comment } from "@/client";
import { NORMAL_USER } from "@/data/user.ts";
import { any } from "@/data/utils.ts";

export const NORMAL_COMMENT: Comment = {
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
