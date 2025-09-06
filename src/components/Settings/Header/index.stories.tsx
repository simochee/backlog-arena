import type { Meta, StoryObj } from "@storybook/react";

import { SettingsHeader } from "./index";

const meta: Meta<typeof SettingsHeader> = {
	title: "Settings/Header",
	component: SettingsHeader,
	tags: ["autodocs"],
	args: {},
	argTypes: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
