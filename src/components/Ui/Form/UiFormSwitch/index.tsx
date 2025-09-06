import { Switch, type SwitchProps } from "react-aria-components";

type Props = Omit<SwitchProps, "children"> & {
	label: string;
};

export const UiFormSwitch: React.FC<Props> = ({ label, ...props }) => {
	return (
		<Switch
			{...props}
			className="group relative flex gap-2 items-center justify-between text-black text-sm"
		>
			{label}
			<div className="flex h-5 w-8 shrink-0 cursor-default rounded-full shadow-inner bg-clip-padding border border-solid border-white/30 p-px box-border transition duration-200 ease-in-out bg-teal-600 group-pressed:bg-teal-700 group-selected:bg-teal-800 group-selected:group-pressed:bg-teal-900 outline-hidden group-focus-visible:ring-2 ring-black">
				<span className="h-4 w-4 transform rounded-full bg-white shadow-sm transition duration-200 ease-in-out translate-x-0 group-selected:translate-x-3" />
			</div>
		</Switch>
	);
};
