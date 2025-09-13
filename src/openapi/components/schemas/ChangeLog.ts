import * as z from "zod";

export const ChangeLog = z.object({
	field: z.string(),
	newValue: z.string(),
	originalValue: z.string(),
});
