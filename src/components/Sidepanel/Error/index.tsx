import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { Button } from "react-aria-components";
import type { FallbackProps } from "react-error-boundary";
import { browser } from "wxt/browser";
import { spaceProfilesStorage } from "@/storage/spaceProfiles/storage.ts";
import { NoSpaceProfileError } from "@/utils/errors.ts";

export const SidepanelError: React.FC<FallbackProps> = ({
	error,
	resetErrorBoundary,
}) => {
	const queryClient = useQueryClient();

	const message =
		error instanceof Error ? error.message : "不明なエラーが発生しました。";

	useEffect(() => {
		return spaceProfilesStorage.watch(async () => {
			queryClient.clear();
			resetErrorBoundary();
		});
	}, [queryClient, resetErrorBoundary]);

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
