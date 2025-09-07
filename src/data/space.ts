import type { Entity } from "backlog-js";
import { ANY_INT, ANY_STRING } from "@/data/utils.ts";

export const NORMAL_SPACE: Entity.Space.Space = {
	spaceKey: "EXAMPLE",
	name: "Example Inc.",
	ownerId: ANY_INT,
	lang: ANY_STRING,
	timezone: ANY_STRING,
	reportSendTime: ANY_STRING,
	textFormattingRule: "markdown",
	created: ANY_STRING,
	updated: ANY_STRING,
};
