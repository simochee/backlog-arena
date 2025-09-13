import * as z from "zod";
import { Issue } from "@/openapi/components/schemas/Issue.ts";
import { PullRequestFileInfo } from "@/openapi/components/schemas/PullRequestFileInfo.ts";
import { PullRequestStatus } from "@/openapi/components/schemas/PullRequestStatus.ts";
import { Star } from "@/openapi/components/schemas/Star.ts";
import { User } from "@/openapi/components/schemas/User.ts";

export const PullRequest = z
	.object({
		id: z.number(),
		projectId: z.number(),
		repositoryId: z.number(),
		number: z.number(),
		summary: z.string(),
		description: z.string(),
		base: z.string(),
		branch: z.string(),
		status: PullRequestStatus,
		assignee: User.optional(),
		issue: Issue,
		baseCommit: z.string().optional(),
		branchCommit: z.string().optional(),
		mergeCommit: z.string().optional(),
		closeAt: z.string().optional(),
		mergeAt: z.string().optional(),
		createdUser: User,
		created: z.string(),
		updatedUser: User,
		updated: z.string(),
		attachments: z.array(PullRequestFileInfo),
		stars: z.array(Star),
	})
	.openapi("PullRequest");
