export default defineBackground(() => {
	const browserAction = browser.browserAction ?? browser.action;

	browserAction.onClicked.addListener((tab) => {
		browser.sidePanel.open({ windowId: tab.windowId });
	});
});
