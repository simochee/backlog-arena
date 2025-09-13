import * as z from "zod";
import { FileInfo } from "@/openapi/components/schemas/FileInfo.ts";
import { User } from "@/openapi/components/schemas/User.ts";

export const PullRequestFileInfo = FileInfo.extend({
	createdUser: User,
	created: z.string(),
});
