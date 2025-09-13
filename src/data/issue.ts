import { NORMAL_USER } from "@/data/user.ts";
import { any } from "@/data/utils.ts";
import type { components } from "@/openapi/openapi-schema.ts";

export const NORMAL_ISSUE: components["schemas"]["Issue"] = {
	id: any.int,
	projectId: any.int,
	issueKey: "EXAMPLE-1",
	keyId: 1,
	issueType: {
		id: any.int,
		projectId: any.int,
		name: "バグ",
		color: "#990000",
		displayOrder: any.int,
	},
	summary: "件名",
	description: "説明",
	resolution: undefined,
	priority: {
		id: any.int,
		name: "中",
	},
	status: {
		id: any.int,
		projectId: any.int,
		name: "未対応",
		color: "#eda62a",
		displayOrder: any.int,
	},
	assignee: NORMAL_USER,
	category: [],
	versions: [],
	milestone: [],
	startDate: undefined,
	dueDate: undefined,
	estimatedHours: undefined,
	actualHours: undefined,
	parentIssueId: undefined,
	createdUser: NORMAL_USER,
	created: any.iosDate,
	updatedUser: NORMAL_USER,
	updated: any.iosDate,
	// TODO: 複雑な型なので必要になったら定義する
	customFields: [],
	attachments: [],
	sharedFiles: [],
	stars: [],
};
