import type { Meta, StoryObj } from "@storybook/react";

import { UiButton } from "./index";

const meta: Meta<typeof UiButton> = {
	title: "Ui/Button",
	component: UiButton,
	tags: ["autodocs"],
	args: {
		children: "送信",
	},
	argTypes: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
