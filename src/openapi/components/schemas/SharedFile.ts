import * as z from "zod";
import { User } from "@/openapi/components/schemas/User.ts";

export const SharedFile = z
	.object({
		id: z.number(),
		projectId: z.number(),
		type: z.string(),
		dir: z.string(),
		name: z.string(),
		size: z.number(),
		createdUser: User,
		created: z.string(),
		updatedUser: User,
		updated: z.string(),
	})
	.openapi("SharedFile");
