import { clsx } from "clsx";
import { Button, type ButtonProps } from "react-aria-components";

type Props = ButtonProps & {
	variant?: "primary";
	size?: "md" | "sm";
};

export const UiButton: React.FC<Props> = ({
	variant = "primary",
	size = "md",
	...props
}) => {
	return (
		<Button
			{...props}
			className={clsx("border rounded px-4 py-1 transition", {
				"border-green-600 bg-green-600 text-white hover:bg-white hover:text-green-600":
					variant === "primary",
				"px-4 py-1 text-sm": size === "md",
				"px-2 h-7 text-xs": size === "sm",
			})}
		/>
	);
};
