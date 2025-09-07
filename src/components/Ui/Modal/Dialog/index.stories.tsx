import type { Meta, StoryObj } from "@storybook/react";

import { UiModalDialog } from "./index";

const meta: Meta<typeof UiModalDialog> = {
	title: "Ui/Modal/Dialog",
	component: UiModalDialog,
	tags: ["autodocs"],
	args: {},
	argTypes: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
