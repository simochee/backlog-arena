import { fileURLToPath } from "node:url";
import { defineConfig } from "@hey-api/openapi-ts";

export default defineConfig({
	input: fileURLToPath(
		new URL("src/openapi/openapi-docs.yaml", import.meta.url),
	),
	output: {
		format: "biome",
		lint: "eslint",
		path: "./src/client",
	},
	plugins: [
		"@hey-api/schemas",
		"@hey-api/transformers",
		"@hey-api/typescript",
		{
			name: "@hey-api/sdk",
			transformer: true,
		},
		"zod",
		{
			name: "@tanstack/react-query",
			mutationOptions: true,
		},
	],
});
