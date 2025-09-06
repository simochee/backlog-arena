import { IconSettings, IconUser } from "@tabler/icons-react";
import { UiLink } from "@/components/Ui/Link";

export const SettingsNav: React.FC = () => {
	return (
		<nav className="flex flex-col gap-1">
			<UiLink
				className="flex items-center gap-2 py-2 px-4 hover:bg-gray-100 current:bg-gray-100 rounded-lg"
				to="/settings/general"
			>
				<span className="w-8 h-8 grid place-items-center bg-teal-300 text-teal-800 rounded-lg">
					<IconSettings className="w-5 h-5" />
				</span>
				一般
			</UiLink>
			<UiLink
				className="flex items-center gap-2 py-2 px-4 hover:bg-gray-100 current:bg-gray-100 rounded-lg"
				to="/settings/account"
			>
				<span className="w-8 h-8 grid place-items-center bg-sky-300 text-sky-800 rounded-lg">
					<IconUser className="w-5 h-5" />
				</span>
				アカウント
			</UiLink>
		</nav>
	);
};
