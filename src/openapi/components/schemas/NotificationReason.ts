import * as z from "zod";

enum NotificationReasonEnum {
	SetIssueAssignee = 1,
	AddIssueComment = 2,
	AddIssue = 3,
	UpdateIssue = 4,
	AddFile = 5,
	AddProjectUser = 6,
	Other = 9,
	SetPullRequestAssignee = 10,
	AddPullRequestComment = 11,
	AddPullRequest = 12,
	UpdatePullRequest = 13,
}

export const NotificationReason = z
	.enum(NotificationReasonEnum)
	.openapi("NotificationReason");
