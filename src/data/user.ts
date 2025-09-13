import { any } from "@/data/utils.ts";
import type { components } from "@/openapi/openapi-schema.ts";

export const NORMAL_USER: components["schemas"]["User"] = {
	id: any.int,
	userId: any.string,
	name: "桜井翔",
	roleType: any.int,
	lang: "ja",
	nulabAccount: {
		nulabId: any.string,
		name: any.string,
		uniqueId: any.string,
	},
	mailAddress: "me@example.com",
	lastLoginTime: any.iosDate,
};
