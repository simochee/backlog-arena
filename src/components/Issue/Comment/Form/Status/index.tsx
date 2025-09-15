import { IconProgress } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { Button, Popover, Select } from "react-aria-components";
import type { ProjectStatus } from "@/client";
import { getProjectsByProjectIdOrKeyStatusesOptions } from "@/client/@tanstack/react-query.gen.ts";
import { UiListBox } from "@/components/Ui/ListBox";
import { UiTooltip } from "@/components/Ui/Tooltip";

type Props = {
	initialStatus: ProjectStatus;
	value: number | undefined;
	onChange: (value: number | undefined) => void;
};

export const IssueCommentFormStatus: React.FC<Props> = ({
	initialStatus,
	value,
	onChange,
}) => {
	const { data = [] } = useQuery({
		...getProjectsByProjectIdOrKeyStatusesOptions({
			path: { projectIdOrKey: initialStatus.projectId },
		}),
	});

	const selectedStatus = data.find(({ id }) => id === value) || initialStatus;

	return (
		<Select
			defaultSelectedKey={value}
			onSelectionChange={(value) =>
				value != null && onChange(typeof value === "number" ? value : undefined)
			}
		>
			<UiTooltip text={`ステータス: ${selectedStatus.name}`}>
				<Button
					className="size-7 rounded grid place-items-center rounded-lg border transition text-white hover:bg-transparent"
					style={({ isHovered }) => ({
						borderColor: selectedStatus?.color,
						backgroundColor: isHovered ? undefined : selectedStatus?.color,
						color: isHovered ? selectedStatus?.color : undefined,
					})}
				>
					<IconProgress className="size-4" />
				</Button>
			</UiTooltip>
			<Popover>
				<UiListBox items={data}>
					{({ name, color }) => (
						<>
							<span
								className="block size-3 rounded-full shrink-0"
								style={{ backgroundColor: color }}
							/>
							<span className="min-w-none line-clamp-1">{name}</span>
						</>
					)}
				</UiListBox>
			</Popover>
		</Select>
	);
};
