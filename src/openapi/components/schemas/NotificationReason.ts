import * as z from "zod";

enum NotificationReasonEnum {
	AssignedToIssue = 1,
	IssueCommented = 2,
	IssueCreated = 3,
	IssueUpdated = 4,
	FileAdded = 5,
	ProjectUserAdded = 6,
	Other = 9,
	AssignedToPullRequest = 10,
	PullRequestCommented = 11,
	PullRequestCreated = 12,
	PullRequestUpdated = 13,
}

export const NotificationReason = z
	.enum(NotificationReasonEnum)
	.openapi("NotificationReason");
