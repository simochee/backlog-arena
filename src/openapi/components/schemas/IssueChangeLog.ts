import * as z from "zod";
import { ChangeLog } from "@/openapi/components/schemas/ChangeLog.ts";

export const IssueChangeLog = ChangeLog.extend({
	attachmentInfo: z
		.object({
			id: z.number(),
			type: z.string(),
		})
		.openapi("AttachmentInfo"),
	attributeInfo: z
		.object({
			id: z.number(),
			typeId: z.number(),
		})
		.openapi("AttachmentInfo"),
	notificationInfo: z
		.object({
			type: z.string(),
		})
		.openapi("NotificationInfo"),
});
