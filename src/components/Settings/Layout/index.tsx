import { SettingsHeader } from "@/features/settings/components/SettingsHeader";
import { SettingsNav } from "@/features/settings/components/SettingsNav";

type Props = {
	children: React.ReactNode;
};

export const SettingsLayout: React.FC<Props> = ({ children }) => {
	return (
		<div className="max-w-3xl mx-auto py-2 text-gray-950">
			<div className="bg-white pt-8 pb-12 px-4 md:px-12 md:rounded-lg">
				<div className="grid grid-cols-[200px_1fr] gap-y-8 gap-x-4 md:gap-x-6">
					<div className="col-span-2">
						<SettingsHeader />
					</div>
					<aside>
						<SettingsNav />
					</aside>
					<main>{children}</main>
				</div>
			</div>
		</div>
	);
};
