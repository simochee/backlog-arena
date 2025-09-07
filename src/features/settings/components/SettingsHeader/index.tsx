import icon from "@/assets/icon.svg";

export const SettingsHeader: React.FC = () => {
	return (
		<header className="grid grid-flow-row grid-cols-[auto_1fr] items-center gap-x-4 gap-y-0 px-2">
			<img className="w-10 h-10 block row-span-2" src={icon} alt="" />
			<h1 className="text-xl font-semibold">Backlog Arena の設定</h1>
			<p className="text-sm text-gray-700">
				このブラウザでの Backlog Arena 拡張機能の動作をカスタマイズします。
			</p>
		</header>
	);
};
