import type { Meta, StoryObj } from "@storybook/react";
import { IconSend2 } from "@tabler/icons-react";

import { UiButton } from "./index";

const meta: Meta<typeof UiButton> = {
	title: "Ui/Button",
	component: UiButton,
	tags: ["autodocs"],
	args: {
		children: "送信",
	},
	argTypes: {
		variant: { options: ["primary"] },
		size: { options: ["sm", "md"] },
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const Danger: Story = {
	args: {
		variant: "danger",
	},
};

export const Disabled: Story = {
	args: {
		isDisabled: true,
	},
};

export const with_Icon: Story = {
	args: {
		icon: IconSend2,
	},
};

export const Pending_with_Icon: Story = {
	args: {
		icon: IconSend2,
		isPending: true,
	},
};
