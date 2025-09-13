import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import * as z from "zod";

extendZodWithOpenApi(z);

export const TextFormattingRule = z
	.union([z.literal("backlog"), z.literal("markdown")])
	.openapi("TextFormattingRule");
