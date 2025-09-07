import type { Meta, StoryObj } from "@storybook/react";

import { UiLink } from "./index";

const meta: Meta<typeof UiLink> = {
	title: "Ui/Link",
	component: UiLink,
	tags: ["autodocs"],
	args: {
		styled: true,
	},
	argTypes: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
