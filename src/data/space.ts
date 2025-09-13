import { any } from "@/data/utils.ts";
import type { components } from "@/openapi/openapi-schema.ts";

export const NORMAL_SPACE: components["schemas"]["Space"] = {
	spaceKey: "EXAMPLE",
	name: "Example Inc.",
	ownerId: any.int,
	lang: "ja",
	timezone: any.string,
	reportSendTime: any.string,
	textFormattingRule: "markdown",
	created: any.string,
	updated: any.string,
};
