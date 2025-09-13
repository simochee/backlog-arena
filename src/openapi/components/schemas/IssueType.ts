import * as z from "zod";

export const IssueType = z
	.object({
		id: z.number(),
		projectId: z.number(),
		name: z.string(),
		color: z
			.enum([
				"#e30000",
				"#990000",
				"#934981",
				"#814fbc",
				"#2779ca",
				"#007e9a",
				"#7ea800",
				"#ff9200",
				"#ff3265",
				"#666665",
			])
			.openapi("IssueTypeColor"),
		displayOrder: z.number(),
		templateSummary: z.string().optional(),
		templateDescription: z.string().optional(),
	})
	.openapi("IssueType");
