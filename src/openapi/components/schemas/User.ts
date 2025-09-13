import * as z from "zod";
import { Lang } from "@/openapi/components/schemas/Lang";
import { NulabAccount } from "@/openapi/components/schemas/NulabAccount";

export const User = z
	.object({
		id: z.number(),
		userId: z.string(),
		name: z.string(),
		roleType: z.number(),
		lang: Lang,
		nulabAccount: NulabAccount,
		mailAddress: z.string(),
		lastLoginTime: z.string(),
	})
	.openapi("User");
