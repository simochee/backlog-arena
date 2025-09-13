import EmojiConvertor from "emoji-js";
import type React from "react";

type Props = {
	children: string | null | undefined;
};

const emoji = new EmojiConvertor();

export const UiDescription: React.FC<Props> = ({ children }) => {
	const replaced = children && emoji.replace_colons(children);

	return <>{replaced}</>;
};
