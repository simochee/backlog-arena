import type { Project } from "@/client";
import { any } from "@/data/utils.ts";

export const NORMAL_PROJECT: Project = {
	id: any.int,
	projectKey: "example",
	name: "Example Inc.",
	chartEnabled: true,
	useResolvedForChart: true,
	subtaskingEnabled: true,
	projectLeaderCanEditProjectLeader: true,
	useWiki: true,
	useFileSharing: true,
	useWikiTreeView: true,
	useOriginalImageSizeAtWiki: true,
	useSubversion: true,
	useGit: true,
	textFormattingRule: "markdown",
	archived: true,
	displayOrder: any.int,
	useDevAttributes: true,
};
