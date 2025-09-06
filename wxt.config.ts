import tailwindcss from "@tailwindcss/vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import { defineConfig } from "wxt";

export default defineConfig({
	manifest: {
		default_locale: "ja",
		name: "__MSG_ext_name__",
		description: "__MSG_ext_description__",
		action: {},
		page_action: {},
		permissions: ["alarms"],
	},
	modules: ["@wxt-dev/i18n/module", "@wxt-dev/auto-icons"],
	srcDir: "src",
	vite: () => ({
		plugins: [
			tanstackRouter({ target: "react", autoCodeSplitting: true }),
			tailwindcss(),
		],
	}),
});
