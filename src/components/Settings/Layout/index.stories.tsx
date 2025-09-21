import type { Meta, StoryObj } from "@storybook/react";
import { StorybookPlaceholder } from "@/features/storybook/components/StorybookPlaceholder.tsx";
import { SettingsLayout } from "./index";

const meta: Meta<typeof SettingsLayout> = {
	title: "Settings/Layout",
	component: SettingsLayout,
	tags: ["autodocs"],
	args: { children: <StorybookPlaceholder /> },
	argTypes: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
