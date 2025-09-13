import * as z from "zod";

export const Category = z
	.object({
		id: z.number(),
		projectId: z.number(),
		name: z.string(),
		displayOrder: z.number(),
	})
	.openapi("Category");
