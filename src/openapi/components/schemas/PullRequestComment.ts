import * as z from "zod";
import { ChangeLog } from "@/openapi/components/schemas/ChangeLog.ts";
import { CommentNotification } from "@/openapi/components/schemas/CommentNotification.ts";
import { Star } from "@/openapi/components/schemas/Star.ts";
import { User } from "@/openapi/components/schemas/User.ts";

export const PullRequestComment = z.object({
	id: z.number(),
	content: z.string(),
	changeLog: z.array(ChangeLog),
	createdUser: User,
	created: z.string(),
	updated: z.string(),
	stars: z.array(Star),
	notifications: z.array(CommentNotification),
});
