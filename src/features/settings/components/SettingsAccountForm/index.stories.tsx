import type { Meta, StoryObj } from "@storybook/react";
import { NORMAL_SPACE } from "@/data/space.ts";
import { SettingsAccountForm } from "./index";

const meta: Meta<typeof SettingsAccountForm> = {
	title: "Settings/AccountForm",
	component: SettingsAccountForm,
	tags: ["autodocs"],
	args: { space: NORMAL_SPACE },
	argTypes: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
