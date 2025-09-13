import * as z from "zod";

export const Priority = z
	.object({
		id: z.number(),
		name: z.string(),
	})
	.openapi("Priority");
