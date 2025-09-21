import { IconExternalLink } from "@tabler/icons-react";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import type { FallbackProps } from "react-error-boundary";
import { UiButton } from "@/components/Ui/Button";
import { spaceProfilesStorage } from "@/storage/spaceProfiles/storage.ts";
import { NoSpaceProfileError } from "@/utils/errors.ts";
import { openSettings } from "@/utils/tab.ts";

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
			<div className="h-full grid place-items-center">
				<div className="flex flex-col items-center gap-6">
					<p className="text-sm" aria-live="polite" role="alert">
						{message}
					</p>
					<UiButton icon={IconExternalLink} onClick={openSettings}>
						スペースを追加する
					</UiButton>
				</div>
			</div>
		);
	}

	return (
		<p aria-live="polite" role="alert">
			{message}
		</p>
	);
};
