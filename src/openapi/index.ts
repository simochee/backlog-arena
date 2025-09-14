import { glob, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import {
	extendZodWithOpenApi,
	OpenAPIRegistry,
	OpenApiGeneratorV3,
} from "@asteasolutions/zod-to-openapi";
import yaml from "yaml";
import * as z from "zod";

extendZodWithOpenApi(z);

const registry = new OpenAPIRegistry();

for await (const path of glob(
	fileURLToPath(new URL("paths/**/*.ts", import.meta.url)),
)) {
	const { default: routeConfig } = await import(path);
	registry.registerPath(routeConfig);
}

const generator = new OpenApiGeneratorV3(registry.definitions);
const document = generator.generateDocument({
	openapi: "3.1.0",
	info: {
		title: "Backlog API",
		version: "2.113.3",
	},
	servers: [
		{
			url: "https://example.backlog.com/api/v2",
			description: "Backlog API",
		},
	],
});

const openapiDocs = yaml.stringify(document);
await writeFile(
	new URL("openapi-docs.yaml", import.meta.url),
	openapiDocs,
	"utf-8",
);
