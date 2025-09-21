import { clsx } from "clsx";
import {
	Button,
	Tooltip,
	type TooltipProps,
	TooltipTrigger,
} from "react-aria-components";
import { UiOverlayArrow } from "@/components/Ui/OverlayArrow";

type Props = TooltipProps & {
	text: string;
	nonInteractive?: boolean;
	children: React.ReactNode;
};

export const UiTooltip: React.FC<Props> = ({
	text,
	nonInteractive,
	children,
	...props
}) => {
	return (
		<TooltipTrigger delay={500}>
			<Tooltip
				className={clsx(
					"group bg-gray-900 rounded max-w-3xs text-gray-50 p-1 drop-shadow-sm",
					"placement-top:mb-2 placement-right:translate-y-1",
					"placement-right:ml-2 placement-right:-translate-x-1",
					"placement-bottom:mt-2 placement-right:-translate-y-1",
					"placement-left:mr-2 placement-right:translate-x-1",
				)}
				offset={-2}
				containerPadding={4}
				{...props}
			>
				<UiOverlayArrow className="text-gray-900" />
				{text}
			</Tooltip>
			{nonInteractive ? <Button>{children}</Button> : children}
		</TooltipTrigger>
	);
};
