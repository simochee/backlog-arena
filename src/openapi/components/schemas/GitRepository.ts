import * as z from "zod";
import { User } from "@/openapi/components/schemas/User.ts";

export const GitRepository = z.object({
	id: z.number(),
	projectId: z.number(),
	name: z.string(),
	description: z.string(),
	hookUrl: z.string().optional(),
	httpUrl: z.string(),
	sshUrl: z.string(),
	displayOrder: z.number(),
	pushedAt: z.string().optional(),
	createdUser: User,
	created: z.string(),
	updatedUser: User,
	updated: z.string(),
});
