import type { Meta, StoryObj } from "@storybook/react";

import { UiLink } from "./index";

const meta: Meta<typeof UiLink> = {
	title: "Ui/Link",
	component: UiLink,
	tags: ["autodocs"],
	args: {
		href: "https://tanstack.com/router/latest/docs/framework/react/guide/custom-link",
		children: "react-aria-components の Link コンポーネント",
	},
	argTypes: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
