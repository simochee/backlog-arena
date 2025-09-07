import type { Meta, StoryObj } from "@storybook/react";
import { SettingsLayout } from "./index";

const meta: Meta<typeof SettingsLayout> = {
	title: "Settings/SettingsLayout",
	component: SettingsLayout,
	tags: ["autodocs"],
	args: { children: undefined },
	argTypes: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
