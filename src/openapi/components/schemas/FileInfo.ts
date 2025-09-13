import * as z from "zod";

export const FileInfo = z
	.object({
		id: z.number(),
		name: z.string(),
		size: z.number(),
	})
	.openapi("FileInfo");
