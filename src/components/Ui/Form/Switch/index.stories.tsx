import type { Meta, StoryObj } from "@storybook/react";

import { UiFormSwitch } from "./index";

const meta: Meta<typeof UiFormSwitch> = {
	title: "Ui/Form/Switch",
	component: UiFormSwitch,
	tags: ["autodocs"],
	args: {
		label: "新着のお知らせをデスクトップに通知する",
	},
	argTypes: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
