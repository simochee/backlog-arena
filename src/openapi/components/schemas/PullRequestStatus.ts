import * as z from "zod";

export const PullRequestStatus = z
	.object({
		id: z.number(),
		name: z.string(),
	})
	.openapi("PullRequestStatus");
