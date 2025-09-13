import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import * as z from "zod";
import { Lang } from "@/openapi/components/schemas/Lang.ts";
import { TextFormattingRule } from "@/openapi/components/schemas/TextFormattingRule.ts";

extendZodWithOpenApi(z);

export const Space = z
	.object({
		spaceKey: z.string(),
		name: z.string(),
		ownerId: z.number(),
		lang: Lang,
		timezone: z.string(),
		reportSendTime: z.string(),
		textFormattingRule: TextFormattingRule,
		created: z.string(),
		updated: z.string(),
	})
	.openapi("Space");
