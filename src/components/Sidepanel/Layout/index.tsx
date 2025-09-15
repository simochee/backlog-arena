import { BacklogImage } from "@/components/Backlog/Image";
import { UiLink } from "@/components/Ui/Link";
import { UiTooltip } from "@/components/Ui/Tooltip";
import { useCurrentSpaceProfile } from "@/hooks/useCurrentSpaceProfile.ts";
import { useCurrentSpaceUrl } from "@/hooks/useCurrentSpaceUrl.ts";

type Props = {
	children: React.ReactNode;
};

export const SidepanelLayout: React.FC<Props> = ({ children }) => {
	const { space } = useCurrentSpaceProfile();
	const toUrl = useCurrentSpaceUrl();

	return (
		<div className="h-full grid grid-rows-[auto_1fr_auto]">
			<header className="bg-green-50 border-b border-gray-300 p-1">
				<div className="flex items-center">
					<UiTooltip text={`${space.name}`}>
						<UiLink to={toUrl("/dashboard")} target="_blank">
							<BacklogImage className="size-8" type="space" />
						</UiLink>
					</UiTooltip>
				</div>
			</header>
			<main className="overflow-y-auto">{children}</main>
			<footer>
				<p>world</p>
			</footer>
		</div>
	);
};
