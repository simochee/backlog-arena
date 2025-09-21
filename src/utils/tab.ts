import { browser } from "wxt/browser";

export const openSettings = async () => {
	const { href: settingsUrl } = new URL("settings.html", location.origin);

	const [settingsTab] = await browser.tabs.query({ url: settingsUrl });

	if (settingsTab) {
		await browser.tabs.update(settingsTab.id, { active: true });
	} else {
		await browser.tabs.create({ url: settingsUrl });
	}
};
