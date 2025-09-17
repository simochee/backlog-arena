import { IconUserQuestion } from "@tabler/icons-react";
import { clsx } from "clsx";
import {
	Autocomplete,
	Button,
	Input,
	ListLayout,
	Popover,
	SearchField,
	Select,
	useFilter,
	Virtualizer,
} from "react-aria-components";
import type { User } from "@/client";
import { BacklogImage } from "@/components/Backlog/Image";
import { UiListBox } from "@/components/Ui/ListBox";
import { UiTooltip } from "@/components/Ui/Tooltip";

type Props = {
	initialAssignee: User | undefined;
	users: User[];
	value: number | undefined;
	onChange: (value: number | undefined) => void;
};

export const IssueCommentFormAssignee: React.FC<Props> = ({
	initialAssignee,
	users,
	value,
	onChange,
}) => {
	const { contains } = useFilter({ sensitivity: "base" });

	const selectedAssignee =
		users.find(({ id }) => id === value) || initialAssignee;

	return (
		<Select
			defaultSelectedKey={selectedAssignee?.id}
			onSelectionChange={(value) =>
				value != null && onChange(typeof value === "number" ? value : undefined)
			}
		>
			<UiTooltip text={`担当者: ${selectedAssignee?.name}`}>
				<Button className="size-7 grid place-items-center rounded p-1 rounded-lg border transition border-gray-300 hover:bg-green-100 hover:border-green-400">
					{selectedAssignee ? (
						<BacklogImage
							className="rounded-full"
							type="user"
							variable={selectedAssignee.id}
						/>
					) : (
						<IconUserQuestion className="size-4 text-green-600" />
					)}
				</Button>
			</UiTooltip>
			<Popover className="w-96 max-w-4/5 bg-white p-1 rounded border border-gray-200 grid gap-1">
				<Autocomplete filter={contains}>
					<SearchField>
						<Input
							className={({ isFocused }) =>
								clsx(
									"w-full text-xs border rounded-sm outline-none border-gray-200 px-2 py-1",
									isFocused
										? "shadow-[0_0_2px_var(--color-green-400)] bg-cream-50"
										: "bg-white",
								)
							}
							placeholder="ユーザーを検索"
						/>
					</SearchField>
					<Virtualizer layout={ListLayout} layoutOptions={{ rowHeight: 28 }}>
						<UiListBox items={users} className="h-48">
							{({ name }) => name}
						</UiListBox>
					</Virtualizer>
				</Autocomplete>
			</Popover>
		</Select>
	);
};
