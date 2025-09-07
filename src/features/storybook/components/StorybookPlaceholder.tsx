import { clsx } from "clsx";

type Props = {
	size?: "md" | "lg" | "xl" | "full";
};

export const StorybookPlaceholder: React.FC<Props> = ({ size = "md" }) => {
	return (
		<div
			className={clsx(
				"w-full bg-gray-50 rounded",
				size === "md"
					? "h-[200px]"
					: size === "lg"
						? "h-[400px]"
						: size === "xl"
							? "h-[800px]"
							: "h-full",
			)}
		/>
	);
};
