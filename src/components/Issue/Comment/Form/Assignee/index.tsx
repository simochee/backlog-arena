import { IconUserQuestion } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { clsx } from "clsx";
import { useState } from "react";
import {
	Autocomplete,
	Button,
	Input,
	type Key,
	ListBox,
	ListBoxItem,
	ListLayout,
	Popover,
	SearchField,
	Select,
	useFilter,
	Virtualizer,
} from "react-aria-components";
import type { User } from "@/client";
import { getUsersOptions } from "@/client/@tanstack/react-query.gen.ts";
import { BacklogImage } from "@/components/Backlog/Image";
import { UiTooltip } from "@/components/Ui/Tooltip";

type Props = {
	assignee: User | undefined;
};

export const IssueCommentFormAssignee: React.FC<Props> = ({ assignee }) => {
	const { contains } = useFilter({ sensitivity: "base" });

	const [selected, setSelected] = useState<Key | undefined>(assignee?.id);

	const { data = [] } = useQuery({
		...getUsersOptions(),
	});

	return (
		<Select
			defaultSelectedKey={selected}
			onSelectionChange={(value) => value != null && setSelected(value)}
		>
			<UiTooltip text={`担当者: ${assignee?.name}`}>
				<Button className="size-7 grid place-items-center rounded p-1 rounded-lg border transition border-gray-300 hover:bg-green-100 hover:border-green-400">
					{assignee ? (
						<BacklogImage
							className="rounded-full"
							type="user"
							variable={assignee.id}
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
						<ListBox items={data} className="h-48 overflow-y-auto">
							{({ id, name }) => (
								<ListBoxItem
									key={id}
									className="px-2 py-1 rounded focus:bg-cream-100 pressed:bg-cream-100 outline-none line-clamp-1"
								>
									{name}
								</ListBoxItem>
							)}
						</ListBox>
					</Virtualizer>
				</Autocomplete>
			</Popover>
		</Select>
	);
};
