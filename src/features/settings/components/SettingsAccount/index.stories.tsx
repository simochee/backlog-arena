import type { Meta, StoryObj } from "@storybook/react";
import { NORMAL_SPACE } from "@/data/space.ts";
import { SettingsAccount } from "./index";

const meta: Meta<typeof SettingsAccount> = {
	title: "Settings/Account",
	component: SettingsAccount,
	tags: ["autodocs"],
	args: { space: NORMAL_SPACE },
	argTypes: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
