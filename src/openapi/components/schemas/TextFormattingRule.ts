import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import * as z from "zod";

extendZodWithOpenApi(z);

export const TextFormattingRule = z
	.enum(["backlog", "markdown"])
	.openapi("TextFormattingRule");
