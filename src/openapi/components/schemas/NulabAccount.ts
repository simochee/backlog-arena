import * as z from "zod";

export const NulabAccount = z
	.object({
		nulabId: z.string(),
		name: z.string(),
		uniqueId: z.string(),
	})
	.openapi("NulabAccount");
