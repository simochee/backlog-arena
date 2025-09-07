import { IconUser } from "@tabler/icons-react";
import { UiLink } from "@/components/Ui/Link";

export const SettingsNav: React.FC = () => {
	return (
		<nav className="flex flex-col gap-1">
			<UiLink
				className="flex items-center gap-2 p-2 hover:bg-gray-100 current:bg-gray-100 rounded-lg"
				to="/settings/account"
			>
				<span className="w-8 h-8 grid place-items-center bg-purple-200 text-purple-800 rounded-lg">
					<IconUser className="w-5 h-5" />
				</span>
				アカウント
			</UiLink>
		</nav>
	);
};
