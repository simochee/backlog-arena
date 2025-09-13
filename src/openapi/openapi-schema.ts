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
	};
	responses: never;
	parameters: never;
	requestBodies: never;
	headers: never;
	pathItems: never;
}
export type $defs = Record<string, never>;
export type operations = Record<string, never>;
