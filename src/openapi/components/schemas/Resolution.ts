import * as z from "zod";

export const Resolution = z
	.object({
		id: z.number(),
		name: z.string(),
	})
	.openapi("Resolution");
