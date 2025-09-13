import { clsx } from "clsx";
import {
	Button,
	OverlayArrow,
	Tooltip,
	type TooltipProps,
	TooltipTrigger,
} from "react-aria-components";

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
					"group bg-gray-900 rounded max-w-3xs text-gray-50 p-1",
					"placement-top:mb-2 placement-right:translate-y-1",
					"placement-right:ml-2 placement-right:-translate-x-1",
					"placement-bottom:mt-2 placement-right:-translate-y-1",
					"placement-left:mr-2 placement-right:translate-x-1",
				)}
				containerPadding={4}
				{...props}
			>
				<OverlayArrow>
					<svg
						className={clsx(
							"block fill-gray-900",
							"group-placement-right:rotate-90",
							"group-placement-bottom:rotate-180",
							"group-placement-left:-rotate-90",
						)}
						width={8}
						height={8}
						viewBox="0 0 8 8"
					>
						<title>Arrow</title>
						<path d="M0 0 L4 4 L8 0" />
					</svg>
				</OverlayArrow>
				{text}
			</Tooltip>
			{nonInteractive ? <Button>{children}</Button> : children}
		</TooltipTrigger>
	);
};
