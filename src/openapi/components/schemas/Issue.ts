import * as z from "zod";
import { Category } from "@/openapi/components/schemas/Category.ts";
import { IssueFileInfo } from "@/openapi/components/schemas/IssueFileInfo.ts";
import { IssueType } from "@/openapi/components/schemas/IssueType.ts";
import { Priority } from "@/openapi/components/schemas/Priority.ts";
import { ProjectStatus } from "@/openapi/components/schemas/ProjectStatus.ts";
import { Resolution } from "@/openapi/components/schemas/Resolution.ts";
import { SharedFile } from "@/openapi/components/schemas/SharedFile.ts";
import { Star } from "@/openapi/components/schemas/Star.ts";
import { User } from "@/openapi/components/schemas/User.ts";
import { Version } from "@/openapi/components/schemas/Version.ts";

export const Issue = z
	.object({
		id: z.number(),
		projectId: z.number(),
		issueKey: z.string(),
		keyId: z.number(),
		issueType: IssueType,
		summary: z.string(),
		description: z.string(),
		resolution: Resolution.optional(),
		priority: Priority.optional(),
		status: ProjectStatus,
		assignee: User.optional(),
		category: z.array(Category),
		versions: z.array(Version),
		milestone: z.array(Version),
		startDate: z.string().openapi(),
		dueDate: z.string().openapi(),
		estimatedHours: z.number().optional(),
		actualHours: z.number().optional(),
		parentIssueId: z.number().optional(),
		createdUser: User,
		created: z.string(),
		updatedUser: User,
		updated: z.string(),
		// TODO: 複雑な型なので必要になったら定義する
		customFields: z.array(z.any()),
		attachments: z.array(IssueFileInfo),
		sharedFiles: z.array(SharedFile),
		stars: z.array(Star),
	})
	.openapi("Issue");
