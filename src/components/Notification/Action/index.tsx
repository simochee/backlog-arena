import type { Icon } from "@tabler/icons-react";
import { clsx } from "clsx";
import { Button, type ButtonProps } from "react-aria-components";
import { UiTooltip } from "@/components/Ui/Tooltip";

type Props = ButtonProps & {
	tooltip: string;
	icon: Icon;
	isActive?: boolean;
	isStarred?: boolean;
};

export const NotificationAction: React.FC<Props> = ({
	tooltip,
	icon: Icon,
	isActive,
	isStarred,
	...props
}) => {
	return (
		<UiTooltip text={tooltip}>
			<Button
				className={clsx(
					"size-6 rounded-full grid place-items-center border border-gray-300 bg-gray-50 hover:text-white",
					"disabled:border-gray-100 disabled:text-gray-500",
					{
						"border-green-700 bg-green-700 text-white": isActive,
						"text-cream-400 hover:border-cream-400 hover:bg-cream-400":
							isStarred,
						"hover:border-green-700 hover:bg-green-700": !isStarred,
					},
				)}
				{...props}
			>
				<Icon className="size-4" />
			</Button>
		</UiTooltip>
	);
};
