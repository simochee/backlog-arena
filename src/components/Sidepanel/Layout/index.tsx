import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { Menu, MenuItem, MenuTrigger, Popover } from "react-aria-components";
import { BacklogImage } from "@/components/Backlog/Image";
import { UiTooltip } from "@/components/Ui/Tooltip";
import { useCurrentSpaceProfile } from "@/hooks/useCurrentSpaceProfile.ts";
import { useCurrentSpaceUrl } from "@/hooks/useCurrentSpaceUrl.ts";
import { setCurrentSpaceProfileIdOptions } from "@/storage/currentSpaceProfile/options.ts";
import { spaceProfilesOptions } from "@/storage/spaceProfiles/options.ts";

type Props = {
	children: React.ReactNode;
};

export const SidepanelLayout: React.FC<Props> = ({ children }) => {
	const currentSpaceProfile = useCurrentSpaceProfile();
	const { data: spaceProfiles } = useSuspenseQuery(spaceProfilesOptions);
	const _toUrl = useCurrentSpaceUrl();

	const { mutate: setCurrentSpaceProfileMutation } = useMutation(
		setCurrentSpaceProfileIdOptions,
	);

	const switchSpaceProfile = (id: string) => {
		console.log("switch profile", id);

		setCurrentSpaceProfileMutation(id, {
			onSuccess: () => {
				location.reload();
			},
		});
	};

	return (
		<div className="h-full grid grid-rows-[auto_1fr_auto]">
			<header className="bg-green-50 border-b border-gray-300 p-1">
				<div className="flex items-center">
					<MenuTrigger>
						<UiTooltip text="表示するスペースを切り替えます" nonInteractive>
							<BacklogImage className="size-8 rounded-lg" type="space" />
						</UiTooltip>
						<Popover>
							<Menu className="p-1 bg-white border border-gray-300 rounded shadow">
								{spaceProfiles?.map((spaceProfile) => (
									<MenuItem
										key={spaceProfile.id}
										className="flex items-center gap-2 gap-y-px px-2 py-1 cursor-pointer rounded focus:bg-cream-100 pressed:bg-cream-100 outline-none"
										isDisabled={currentSpaceProfile.id === spaceProfile.id}
										onAction={() => switchSpaceProfile(spaceProfile.id)}
									>
										<BacklogImage
											className="size-4 rounded"
											type="space"
											spaceProfile={spaceProfile}
										/>
										{spaceProfile.space.name}
									</MenuItem>
								))}
							</Menu>
						</Popover>
					</MenuTrigger>
				</div>
			</header>
			<main className="overflow-y-auto">{children}</main>
			<footer>
				<p>world</p>
			</footer>
		</div>
	);
};
