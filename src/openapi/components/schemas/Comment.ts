import * as z from "zod";
import { CommentNotification } from "@/openapi/components/schemas/CommentNotification.ts";
import { IssueChangeLog } from "@/openapi/components/schemas/IssueChangeLog.ts";
import { Star } from "@/openapi/components/schemas/Star.ts";
import { User } from "@/openapi/components/schemas/User.ts";

export const Comment = z.object({
	id: z.number(),
	projectId: z.number(),
	issueId: z.number(),
	content: z.string(),
	changeLog: IssueChangeLog,
	createdUser: User,
	created: z.string(),
	updated: z.string(),
	stars: z.array(Star),
	notifications: z.array(CommentNotification),
});
