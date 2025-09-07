import {
	IconChevronDown,
	IconChevronUp,
	IconSquareRounded,
	IconSquareRoundedCheckFilled,
} from "@tabler/icons-react";
import type { Entity } from "backlog-js";
import { clsx } from "clsx";
import {
	Button,
	Checkbox,
	Disclosure,
	DisclosurePanel,
} from "react-aria-components";
import { SettingsAccountForm } from "@/features/settings/components/SettingsAccountForm";

type Props = {
	space: Entity.Space.Space;
};

export const SettingsAccount: React.FC<Props> = ({ space }) => {
	return (
		<Disclosure>
			{({ isExpanded }) => {
				const Icon = isExpanded ? IconChevronUp : IconChevronDown;

				return (
					<div className="border border-gray-100 rounded-lg p-3">
						<div className="flex items-center justify-between gap-4">
							<Checkbox>
								{({ isSelected }) => {
									const Icon = isSelected
										? IconSquareRoundedCheckFilled
										: IconSquareRounded;

									return (
										<div className="flex items-center gap-3">
											<Icon
												className={clsx(
													"size-6",
													isSelected ? "text-purple-400" : "text-gray-200",
												)}
											/>
											<div className="flex items-center gap-2">
												<img
													className="size-10"
													src="https://placehold.jp/320x320.png"
													alt=""
												/>
												<p className="line-clamp-1">{space.name}</p>
											</div>
										</div>
									);
								}}
							</Checkbox>
							<Button
								slot="trigger"
								className="rounded hover:bg-gray-50 size-10 grid place-items-center"
							>
								<Icon className="size-6 text-gray-700" />
							</Button>
						</div>
						<DisclosurePanel>
							<div className="bg-gray-50 px-8 py-4 rounded mt-2">
								<SettingsAccountForm />
							</div>
						</DisclosurePanel>
					</div>
				);
			}}
		</Disclosure>
	);
};
