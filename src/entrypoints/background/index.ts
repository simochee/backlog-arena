const browserAction = browser.action ?? browser.browserAction;

const setBadgeCount = (count: number) => {
	if (count === 0) {
		browserAction.setBadgeText({ text: "" });
		return;
	}

	// browserAction.setBadgeText({ text: " " });
	// browserAction.setBadgeBackgroundColor?.({ color: "#fe1aaf" });
};

const updateNotificationCount = async () => {
	setBadgeCount(80);
};

export default defineBackground({
	type: "module",
	main: async () => {
		browser.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });

		browserAction.setBadgeBackgroundColor?.({ color: "#ffffff" });

		browser.alarms.create({
			periodInMinutes: 1,
		});

		await updateNotificationCount();
		browser.alarms.onAlarm.addListener(updateNotificationCount);
	},
});
