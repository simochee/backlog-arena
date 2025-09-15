import { IconProgress } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import {
	Button,
	type Key,
	ListBox,
	ListBoxItem,
	Popover,
	Select,
} from "react-aria-components";
import type { ProjectStatus } from "@/client";
import { getProjectsByProjectIdOrKeyStatusesOptions } from "@/client/@tanstack/react-query.gen.ts";
import { UiTooltip } from "@/components/Ui/Tooltip";

type Props = {
	status: ProjectStatus;
};

export const IssueCommentFormStatus: React.FC<Props> = ({ status }) => {
	const [selected, setSelected] = useState<Key>(status.id);

	const { data = [] } = useQuery({
		...getProjectsByProjectIdOrKeyStatusesOptions({
			path: { projectIdOrKey: status.projectId },
		}),
	});

	const selectedIssue = data.find(({ id }) => id === selected);

	return (
		<Select
			defaultSelectedKey={selected}
			onSelectionChange={(value) => value != null && setSelected(value)}
		>
			<UiTooltip text={`ステータス: ${status.name}`}>
				<Button
					className="size-7 rounded grid place-items-center rounded-lg border transition text-white hover:bg-transparent"
					style={({ isHovered }) => ({
						borderColor: selectedIssue?.color,
						backgroundColor: isHovered ? undefined : selectedIssue?.color,
						color: isHovered ? selectedIssue?.color : undefined,
					})}
				>
					<IconProgress className="size-4" />
				</Button>
			</UiTooltip>
			<Popover>
				<ListBox
					className="border border-gray-300 rounded p-1 max-w-xs bg-white"
					items={data}
				>
					{({ id, name, color }) => (
						<ListBoxItem
							key={id}
							className="flex items-center gap-2 gap-y-px px-2 py-1 rounded focus:bg-cream-100 pressed:bg-cream-100 outline-none"
						>
							<span
								className="block size-3 rounded-full shrink-0"
								style={{ backgroundColor: color }}
							/>
							<span className="min-w-none line-clamp-1">{name}</span>
						</ListBoxItem>
					)}
				</ListBox>
			</Popover>
		</Select>
	);
};
