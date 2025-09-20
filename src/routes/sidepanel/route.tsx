import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Button } from "react-aria-components";
import { ErrorBoundary, type FallbackProps } from "react-error-boundary";
import { browser } from "wxt/browser";
import { SidepanelLayout } from "@/components/Sidepanel/Layout";
import { NoSpaceProfileError } from "@/utils/errors.ts";

export const Route = createFileRoute("/sidepanel")({
	component: RouteComponent,
});

function RouteComponent() {
	const handleFallbackRender = ({ error }: FallbackProps) => {
		const message =
			error instanceof Error ? error.message : "不明なエラーが発生しました。";

		if (error instanceof NoSpaceProfileError) {
			return (
				<div>
					<p aria-live="polite" role="alert">
						{message}
					</p>
					<Button onClick={() => browser.tabs.create({ url: "settings.html" })}>
						スペースを拡張機能に追加する
					</Button>
				</div>
			);
		}

		return (
			<p aria-live="polite" role="alert">
				{message}
			</p>
		);
	};

	return (
		<ErrorBoundary fallbackRender={handleFallbackRender}>
			<SidepanelLayout>
				<Outlet />
			</SidepanelLayout>
		</ErrorBoundary>
	);
}
