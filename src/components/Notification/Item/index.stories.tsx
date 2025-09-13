import type { Meta, StoryObj } from "@storybook/react";
import { NORMAL_NOTIFICATION } from "@/data/notification.ts";
import { NotificationItem } from "./index";

const meta: Meta<typeof NotificationItem> = {
	title: "Notification/Item",
	component: NotificationItem,
	tags: ["autodocs"],
	args: {
		notification: NORMAL_NOTIFICATION,
	},
	argTypes: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
