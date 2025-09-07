import type { Meta, StoryObj } from "@storybook/react";

import { SettingsNav } from "./index";

const meta: Meta<typeof SettingsNav> = {
	title: "Settings/SettingsNav",
	component: SettingsNav,
	tags: ["autodocs"],
	args: {},
	argTypes: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
