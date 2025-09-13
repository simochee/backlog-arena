import * as z from "zod";

export const ProjectStatus = z
	.object({
		id: z.number(),
		projectId: z.number(),
		name: z.string(),
		color: z.enum([
			"#ea2c00",
			"#e87758",
			"#e07b9a",
			"#868cb7",
			"#3b9dbd",
			"#4caf93",
			"#b0be3c",
			"#eda62a",
			"#f42858",
			"#393939",
		]),
		displayOrder: z.number(),
	})
	.openapi("ProjectStatus");
