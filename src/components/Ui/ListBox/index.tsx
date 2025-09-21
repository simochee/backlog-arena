import { clsx } from "clsx";
import { ListBox, ListBoxItem } from "react-aria-components";

type Props<T extends object> = {
	className?: string;
	items: T[];
	children: (item: T) => React.ReactNode;
};

export const UiListBox = <T extends object>({
	className,
	items,
	children,
}: Props<T>) => {
	return (
		<ListBox
			className={clsx(
				"overflow-x-hidden overflow-y-auto rounded p-1 bg-white",
				className,
			)}
			items={items}
		>
			{(item) => (
				<ListBoxItem className="flex items-center gap-2 gap-y-px px-2 py-1 cursor-pointer rounded focus:bg-cream-100 pressed:bg-cream-100 outline-none">
					{children(item)}
				</ListBoxItem>
			)}
		</ListBox>
	);
};
