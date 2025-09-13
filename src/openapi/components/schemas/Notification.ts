import * as z from "zod";
import { Comment } from "@/openapi/components/schemas/Comment.ts";
import { Issue } from "@/openapi/components/schemas/Issue.ts";
import { NotificationReason } from "@/openapi/components/schemas/NotificationReason.ts";
import { Project } from "@/openapi/components/schemas/Project.ts";
import { PullRequest } from "@/openapi/components/schemas/PullRequest.ts";
import { PullRequestComment } from "@/openapi/components/schemas/PullRequestComment.ts";
import { User } from "@/openapi/components/schemas/User.ts";

export const Notification = z
	.object({
		id: z.number(),
		alreadyRead: z.boolean(),
		reason: NotificationReason,
		resourceAlreadyRead: z.boolean(),
		project: Project,
		issue: Issue.optional(),
		comment: Comment.optional(),
		pullRequest: PullRequest.optional(),
		pullRequestComment: PullRequestComment.optional(),
		sender: User,
		created: z.string(),
	})
	.openapi("Notification");
