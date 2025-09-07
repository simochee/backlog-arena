import { Button, Dialog, Heading } from "react-aria-components";

type Props = {
	children: React.ReactNode;
};

export const UiModalDialog: React.FC<Props> = ({ children }) => {
	return (
		<Dialog>
			<Heading>フロントエンド</Heading>
			<Content>{children}</Content>
			<Button>Cancel</Button>
			<Button>Submit</Button>
		</Dialog>
	);
};
