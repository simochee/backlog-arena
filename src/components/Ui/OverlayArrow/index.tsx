import { clsx } from "clsx";
import { OverlayArrow } from "react-aria-components";

type Props = {
	className?: string;
	size?: number;
};

export const UiOverlayArrow: React.FC<Props> = ({ className, size = 8 }) => {
	return (
		<OverlayArrow className="group">
			<svg
				className={clsx(
					"block fill-current",
					"group-placement-right:rotate-90",
					"group-placement-bottom:rotate-180",
					"group-placement-left:-rotate-90",
					className,
				)}
				width={size}
				height={size}
				viewBox={`0 0 ${size} ${size}`}
			>
				<title>Arrow</title>
				<path d={`M0 0 L${size / 2} ${size / 2} L${size} 0`} />
			</svg>
		</OverlayArrow>
	);
};
