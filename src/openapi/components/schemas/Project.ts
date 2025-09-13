import * as z from "zod";
import { TextFormattingRule } from "@/openapi/components/schemas/TextFormattingRule.ts";

export const Project = z
	.object({
		id: z.number(),
		projectKey: z.string(),
		name: z.string(),
		chartEnabled: z.boolean(),
		useResolvedForChart: z.boolean(),
		subtaskingEnabled: z.boolean(),
		projectLeaderCanEditProjectLeader: z.boolean(),
		useWiki: z.boolean(),
		useFileSharing: z.boolean(),
		useWikiTreeView: z.boolean(),
		useOriginalImageSizeAtWiki: z.boolean(),
		useSubversion: z.boolean(),
		useGit: z.boolean(),
		textFormattingRule: TextFormattingRule,
		archived: z.boolean(),
		displayOrder: z.number(),
		useDevAttributes: z.boolean(),
	})
	.openapi("Project");
