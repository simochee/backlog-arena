import type { User } from "@/client";
import { any } from "@/data/utils.ts";

export const NORMAL_USER: User = {
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
