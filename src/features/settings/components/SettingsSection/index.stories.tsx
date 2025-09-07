import type { Meta, StoryObj } from "@storybook/react";
import { SettingsSection } from "./index";

const meta: Meta<typeof SettingsSection> = {
	title: "Settings/SettingsSection",
	component: SettingsSection,
	tags: ["autodocs"],
	args: { title: undefined, description: undefined, children: undefined },
	argTypes: { title: { control: "text" } },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
