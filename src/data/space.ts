import type { Space } from "@/client";
import { any } from "@/data/utils.ts";

export const NORMAL_SPACE: Space = {
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
