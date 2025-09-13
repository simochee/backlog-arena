export interface paths {
	"/users/myself": {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		/**
		 * APIとの認証に使用しているユーザーの情報を取得します。
		 * @description 認証ユーザー情報の取得
		 */
		get: {
			parameters: {
				query?: never;
				header?: never;
				path?: never;
				cookie?: never;
			};
			requestBody?: never;
			responses: {
				/** @description レスポンスボディ */
				200: {
					headers: {
						[name: string]: unknown;
					};
					content: {
						"application/json": components["schemas"]["User"];
					};
				};
			};
		};
		put?: never;
		post?: never;
		delete?: never;
		options?: never;
		head?: never;
		patch?: never;
		trace?: never;
	};
	"/space": {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		/**
		 * スペースの情報を取得します。
		 * @description スペース情報の取得
		 */
		get: {
			parameters: {
				query?: never;
				header?: never;
				path?: never;
				cookie?: never;
			};
			requestBody?: never;
			responses: {
				/** @description レスポンスボディ */
				200: {
					headers: {
						[name: string]: unknown;
					};
					content: {
						"application/json": components["schemas"]["Space"];
					};
				};
			};
		};
		put?: never;
		post?: never;
		delete?: never;
		options?: never;
		head?: never;
		patch?: never;
		trace?: never;
	};
	"/projects/{projectIdOrKey}/git/repositories": {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		/**
		 * Gitリポジトリの一覧を取得します。
		 * @description Gitリポジトリ一覧の取得
		 */
		get: {
			parameters: {
				query?: never;
				header?: never;
				path: {
					projectIdOrKey: string;
				};
				cookie?: never;
			};
			requestBody?: never;
			responses: {
				/** @description レスポンスボディ */
				200: {
					headers: {
						[name: string]: unknown;
					};
					content: {
						"application/json": {
							id: number;
							projectId: number;
							name: string;
							description: string;
							hookUrl?: string;
							httpUrl: string;
							sshUrl: string;
							displayOrder: number;
							pushedAt?: string;
							createdUser: components["schemas"]["User"];
							created: string;
							updatedUser: components["schemas"]["User"];
							updated: string;
						}[];
					};
				};
			};
		};
		put?: never;
		post?: never;
		delete?: never;
		options?: never;
		head?: never;
		patch?: never;
		trace?: never;
	};
	"/notifications": {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		/**
		 * 自分の受け取ったお知らせの一覧を取得します。
		 * @description お知らせ一覧の取得
		 */
		get: {
			parameters: {
				query?: never;
				header?: never;
				path?: never;
				cookie?: never;
			};
			requestBody?: never;
			responses: {
				/** @description レスポンスボディ */
				200: {
					headers: {
						[name: string]: unknown;
					};
					content: {
						"application/json": components["schemas"]["Notification"][];
					};
				};
			};
		};
		put?: never;
		post?: never;
		delete?: never;
		options?: never;
		head?: never;
		patch?: never;
		trace?: never;
	};
}
export type webhooks = Record<string, never>;
export interface components {
	schemas: {
		/** @enum {string} */
		Lang: "ja" | "en";
		NulabAccount: {
			nulabId: string;
			name: string;
			uniqueId: string;
		};
		User: {
			id: number;
			userId: string;
			name: string;
			roleType: number;
			lang: components["schemas"]["Lang"];
			nulabAccount: components["schemas"]["NulabAccount"];
			mailAddress: string;
			lastLoginTime: string;
		};
		/** @enum {string} */
		TextFormattingRule: "backlog" | "markdown";
		Space: {
			spaceKey: string;
			name: string;
			ownerId: number;
			lang: components["schemas"]["Lang"];
			timezone: string;
			reportSendTime: string;
			textFormattingRule: components["schemas"]["TextFormattingRule"];
			created: string;
			updated: string;
		};
		/** @enum {integer} */
		NotificationReason: 1 | 2 | 3 | 4 | 5 | 6 | 9 | 10 | 11 | 12 | 13;
		Project: {
			id: number;
			projectKey: string;
			name: string;
			chartEnabled: boolean;
			useResolvedForChart: boolean;
			subtaskingEnabled: boolean;
			projectLeaderCanEditProjectLeader: boolean;
			useWiki: boolean;
			useFileSharing: boolean;
			useWikiTreeView: boolean;
			useOriginalImageSizeAtWiki: boolean;
			useSubversion: boolean;
			useGit: boolean;
			textFormattingRule: components["schemas"]["TextFormattingRule"];
			archived: boolean;
			displayOrder: number;
			useDevAttributes: boolean;
		};
		/** @enum {string} */
		IssueTypeColor:
			| "#e30000"
			| "#990000"
			| "#934981"
			| "#814fbc"
			| "#2779ca"
			| "#007e9a"
			| "#7ea800"
			| "#ff9200"
			| "#ff3265"
			| "#666665";
		IssueType: {
			id: number;
			projectId: number;
			name: string;
			color: components["schemas"]["IssueTypeColor"];
			displayOrder: number;
			templateSummary?: string;
			templateDescription?: string;
		};
		Resolution: {
			id: number;
			name: string;
		};
		Priority: {
			id: number;
			name: string;
		};
		ProjectStatus: {
			id: number;
			projectId: number;
			name: string;
			/** @enum {string} */
			color:
				| "#ea2c00"
				| "#e87758"
				| "#e07b9a"
				| "#868cb7"
				| "#3b9dbd"
				| "#4caf93"
				| "#b0be3c"
				| "#eda62a"
				| "#f42858"
				| "#393939";
			displayOrder: number;
		};
		Category: {
			id: number;
			projectId: number;
			name: string;
			displayOrder: number;
		};
		Version: {
			id: number;
			projectId: number;
			name: string;
			displayOrder: number;
		};
		FileInfo: {
			id: number;
			name: string;
			size: number;
		};
		SharedFile: {
			id: number;
			projectId: number;
			type: string;
			dir: string;
			name: string;
			size: number;
			createdUser: components["schemas"]["User"];
			created: string;
			updatedUser: components["schemas"]["User"];
			updated: string;
		};
		Star: {
			id: number;
			comment: string;
			url: string;
			title: string;
			presenter: components["schemas"]["User"];
			created: string;
		};
		Issue: {
			id: number;
			projectId: number;
			issueKey: string;
			keyId: number;
			issueType: components["schemas"]["IssueType"];
			summary: string;
			description: string;
			resolution?: components["schemas"]["Resolution"];
			priority?: components["schemas"]["Priority"];
			status: components["schemas"]["ProjectStatus"];
			assignee?: components["schemas"]["User"];
			category: components["schemas"]["Category"][];
			versions: components["schemas"]["Version"][];
			milestone: components["schemas"]["Version"][];
			startDate?: string;
			dueDate?: string;
			estimatedHours?: number;
			actualHours?: number;
			parentIssueId?: number;
			createdUser: components["schemas"]["User"];
			created: string;
			updatedUser: components["schemas"]["User"];
			updated: string;
			customFields: unknown[];
			attachments: (components["schemas"]["FileInfo"] & {
				createdUser: components["schemas"]["User"];
				created: string;
			})[];
			sharedFiles: components["schemas"]["SharedFile"][];
			stars: components["schemas"]["Star"][];
		};
		AttachmentInfo: {
			id: number;
			type: string;
		};
		NotificationInfo: {
			type: string;
		};
		CommentNotification: {
			id: number;
			alreadyRead: boolean;
			reason: number;
			user: components["schemas"]["User"];
			resourceAlreadyRead: boolean;
		};
		Comment: {
			id: number;
			projectId: number;
			issueId: number;
			content: string;
			changeLog: {
				field: string;
				newValue: string;
				originalValue: string;
				attachmentInfo: components["schemas"]["AttachmentInfo"];
				attributeInfo: components["schemas"]["AttachmentInfo"] & {
					id: number;
					typeId: number;
				};
				notificationInfo: components["schemas"]["NotificationInfo"];
			}[];
			createdUser: components["schemas"]["User"];
			created: string;
			updated: string;
			stars: components["schemas"]["Star"][];
			notifications: components["schemas"]["CommentNotification"][];
		};
		PullRequestStatus: {
			id: number;
			name: string;
		};
		PullRequest: {
			id: number;
			projectId: number;
			repositoryId: number;
			number: number;
			summary: string;
			description: string;
			base: string;
			branch: string;
			status: components["schemas"]["PullRequestStatus"];
			assignee?: components["schemas"]["User"];
			issue: components["schemas"]["Issue"];
			baseCommit?: string;
			branchCommit?: string;
			mergeCommit?: string;
			closeAt?: string;
			mergeAt?: string;
			createdUser: components["schemas"]["User"];
			created: string;
			updatedUser: components["schemas"]["User"];
			updated: string;
			attachments: (components["schemas"]["FileInfo"] & {
				createdUser: components["schemas"]["User"];
				created: string;
			})[];
			stars: components["schemas"]["Star"][];
		};
		Notification: {
			id: number;
			alreadyRead: boolean;
			reason: components["schemas"]["NotificationReason"];
			resourceAlreadyRead: boolean;
			project: components["schemas"]["Project"];
			issue?: components["schemas"]["Issue"];
			comment?: components["schemas"]["Comment"];
			pullRequest?: components["schemas"]["PullRequest"];
			pullRequestComment?: {
				id: number;
				content: string;
				changeLog: {
					field: string;
					newValue: string;
					originalValue: string;
				}[];
				createdUser: components["schemas"]["User"];
				created: string;
				updated: string;
				stars: components["schemas"]["Star"][];
				notifications: components["schemas"]["CommentNotification"][];
			};
			sender: components["schemas"]["User"];
			created: string;
		};
	};
	responses: never;
	parameters: never;
	requestBodies: never;
	headers: never;
	pathItems: never;
}
export type $defs = Record<string, never>;
export type operations = Record<string, never>;
