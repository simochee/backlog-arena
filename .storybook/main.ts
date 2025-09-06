import { fileURLToPath } from "node:url";
import type { StorybookConfig } from "@storybook/react-vite";
import { mergeConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default {
	stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
	addons: [
		"@chromatic-com/storybook",
		"@storybook/addon-docs",
		"@storybook/addon-a11y",
		"@storybook/addon-vitest",
	],
	framework: {
		name: "@storybook/react-vite",
		options: {},
	},
	viteFinal: async (config) => {
		const { default: tailwindcss } = await import("@tailwindcss/vite");

		return mergeConfig(config, {
			plugins: [
				tailwindcss(),
				tsconfigPaths({ root: fileURLToPath(new URL("../", import.meta.url)) }),
			],
		});
	},
} satisfies StorybookConfig;
