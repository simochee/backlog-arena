import { IconCaretDownFilled } from "@tabler/icons-react";
import { useState } from "react";
import {
	Button,
	Input,
	ListBox,
	ListBoxItem,
	Popover,
	Select,
	SelectValue,
} from "react-aria-components";

type Props = {
	defaultValue: string | undefined;
	onChange: (value: string) => void;
	onBlur: () => void;
};

export const SettingFieldSpaceDomain: React.FC<Props> = ({
	defaultValue = "",
	onChange,
	onBlur,
}) => {
	const [, defaultSpaceKey = "", defaultDomain = ".backlog.com"] =
		/^([a-z0-9-]+)(\.backlog\.(?:com|jp))$/i.exec(defaultValue) || [];

	const [spaceKey, setSpaceKey] = useState(defaultSpaceKey);
	const [domain, setDomain] = useState(defaultDomain);

	const handleChange = (inputSpaceKey: string, inputDomain: string) => {
		setSpaceKey(inputSpaceKey);
		setDomain(inputDomain);

		onChange(`${inputSpaceKey}${inputDomain}`);
	};

	return (
		<div className="grid grid-cols-[1fr_140px] gap-1">
			<Input
				className="h-9 px-3 border rounded border-gray-500 outline-none focus:bg-cream-50 focus:border-green-600 focus:shadow-focus"
				placeholder="スペースID"
				defaultValue={defaultSpaceKey}
				onChange={(e) => handleChange(e.target.value, domain)}
				onBlur={onBlur}
			/>
			<Select
				aria-label="スペースドメイン"
				className="w-full"
				defaultSelectedKey={defaultDomain}
				onSelectionChange={(key) => {
					if (typeof key === "string") {
						handleChange(spaceKey, key);
					}
				}}
				onBlur={onBlur}
			>
				<Button className="group w-full grid grid-cols-[1fr_auto] justify-start items-center gap-1 px-3 h-9 border border-gray-500 rounded focus:border-green-600 focus:bg-cream-50 pressed:bg-cream-50 focus:shadow-focus pressed:border-green-600 pressed:shadow-focus outline-none cursor-pointer">
					<SelectValue className="text-left" />
					<IconCaretDownFilled className="size-4 text-gray-800 group-hover:text-green-600" />
				</Button>
				<Popover>
					<ListBox
						className="border grid p-1 gap-1 border-gray-400 rounded bg-white shadow-sm"
						items={[{ key: ".backlog.com" }, { key: ".backlog.jp" }]}
					>
						{({ key }) => (
							<ListBoxItem className="px-2 py-1 focus:bg-cream-100 pressed:bg-cream-100 outline-none rounded cursor-pointer">
								{key}
							</ListBoxItem>
						)}
					</ListBox>
				</Popover>
			</Select>
		</div>
	);
};
