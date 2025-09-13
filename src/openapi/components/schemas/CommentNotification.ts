import * as z from "zod";
import { User } from "@/openapi/components/schemas/User.ts";

export const CommentNotification = z
	.object({
		id: z.number(),
		alreadyRead: z.boolean(),
		reason: z.number(),
		user: User,
		resourceAlreadyRead: z.boolean(),
	})
	.openapi("CommentNotification");
