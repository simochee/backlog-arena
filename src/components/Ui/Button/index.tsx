import { Button, type ButtonProps } from "react-aria-components";

type Props = ButtonProps;

export const UiButton: React.FC<Props> = ({ ...props }) => {
	return <Button {...props} className="border rounded px-4 py-1 text-sm" />;
};
