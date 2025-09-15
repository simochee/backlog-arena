import { clsx } from "clsx";
import EmojiConvertor from "emoji-js";
import type React from "react";

type Props = {
	breaks?: boolean;
	children: string | null | undefined;
};

const emoji = new EmojiConvertor();

export const UiDescription: React.FC<Props> = ({ breaks, children }) => {
	const replaced = children && emoji.replace_colons(children);

	return (
		<span className={clsx({ "whitespace-pre-line": breaks })}>{replaced}</span>
	);
};
