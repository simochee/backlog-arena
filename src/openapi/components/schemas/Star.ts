import * as z from "zod";
import { User } from "@/openapi/components/schemas/User.ts";

export const Star = z
	.object({
		id: z.number(),
		comment: z.string().openapi(),
		url: z.string(),
		title: z.string(),
		presenter: User,
		created: z.string(),
	})
	.openapi("Star");
