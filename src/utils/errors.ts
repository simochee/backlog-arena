/** スペースが登録されていないことを表すエラー */
export class NoSpaceProfileError extends Error {
	constructor() {
		super("スペースが登録されていません。");
	}
}
