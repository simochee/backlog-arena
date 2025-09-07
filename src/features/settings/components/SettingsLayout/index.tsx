import { SettingsHeader } from "@/features/settings/components/SettingsHeader";
import { SettingsNav } from "@/features/settings/components/SettingsNav";

type Props = {
	children: React.ReactNode;
};

export const SettingsLayout: React.FC<Props> = ({ children }) => {
	return (
		<div className="max-w-2xl mx-auto py-6 text-gray-950">
			<div className="grid grid-cols-[200px_1fr] gap-y-6 gap-x-2">
				<div className="col-span-2">
					<SettingsHeader />
				</div>
				<aside>
					<SettingsNav />
				</aside>
				<main>{children}</main>
			</div>
		</div>
	);
};
