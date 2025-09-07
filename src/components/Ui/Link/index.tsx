import { createLink } from "@tanstack/react-router";
import { clsx } from "clsx";
import { Link } from "react-aria-components";

const Component = createLink(Link);

type Props = React.ComponentProps<typeof Component> & {
	styled?: boolean;
};

export const UiLink: React.FC<Props> = ({ styled, ...props }) => {
	return (
		<Component
			{...props}
			className={clsx(
				{
					"text-blue-600 underline hover:no-underline": styled,
				},
				props.className,
			)}
		/>
	);
};
