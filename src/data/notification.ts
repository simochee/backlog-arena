import type { Notification } from "@/client";
import { NORMAL_COMMENT } from "@/data/comment.ts";
import { NORMAL_ISSUE } from "@/data/issue.ts";
import { NORMAL_PROJECT } from "@/data/project.ts";
import { NORMAL_USER } from "@/data/user.ts";
import { any } from "@/data/utils.ts";

export const NORMAL_NOTIFICATION: Notification = {
	id: any.int,
	alreadyRead: true,
	reason: 1,
	resourceAlreadyRead: true,
	project: NORMAL_PROJECT,
	issue: NORMAL_ISSUE,
	comment: NORMAL_COMMENT,
	sender: NORMAL_USER,
	created: any.iosDate,
};
