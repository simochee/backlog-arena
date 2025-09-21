import { type Icon, IconLoader2 } from "@tabler/icons-react";
import { clsx } from "clsx";
import { Button, type ButtonProps } from "react-aria-components";

type Props = ButtonProps & {
	variant?: "primary" | "outline" | "danger";
	size?: "md" | "sm";
	icon?: Icon;
	children: React.ReactNode;
};

export const UiButton: React.FC<Props> = ({
	variant = "primary",
	size = "md",
	icon: IconComponent,
	children,
	...props
}) => {
	const variantClassName = clsx({
		"bg-green-600 border-green-600 text-white hover:bg-transparent focus:text-green-600 focus:bg-transparent hover:text-green-600 disabled:bg-gray-400 disabled:border-gray-400":
			variant === "primary",
		"bg-transparent border-gray-300 text-gray-950 hover:bg-gray-100 focus:bg-gray-100 disabled:text-gray-700 disabled:bg-gray-200 disabled:border-gray-200":
			variant === "outline",
		"bg-red-600 border-red-600 text-white hover:bg-transparent focus:text-red-600 focus:bg-transparent hover:text-red-600 disabled:bg-gray-400 disabled:border-gray-400":
			variant === "danger",
	});

	const sizeClassName = clsx({
		"px-2 h-7": size === "sm" && IconComponent == null,
		"pl-2 pr-1 h-7": size === "sm" && IconComponent != null,
		"px-3 h-9": size === "md" && IconComponent == null,
		"pl-3 pr-2 h-9": size === "md" && IconComponent != null,
	});

	return (
		<Button
			{...props}
			className={clsx(
				"flex items-center gap-1 text-xs font-bold rounded border-2 transition cursor-pointer disabled:cursor-default pending:cursor-progress outline-none focus:shadow-focus",
				variantClassName,
				sizeClassName,
			)}
		>
			<span className="flex-grow-1">{children}</span>
			{IconComponent && (
				<span className="flex-shrink-0">
					{props.isPending ? (
						<IconLoader2 className="size-5 animate-spin" />
					) : (
						<IconComponent className="size-5" />
					)}
				</span>
			)}
		</Button>
	);
};
