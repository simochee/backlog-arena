export const SettingsHeader: React.FC = () => {
	return (
		<header className="flex items-center gap-4">
			<span className="w-14 h-14 block rounded-full bg-gray-200" />
			<div className="flex flex-col gap-1">
				<h1 className="text-xl">Backlog Arena の設定</h1>
				<p className="text-sm">
					このブラウザでの Backlog Arena 拡張機能の動作をカスタマイズします。
				</p>
			</div>
		</header>
	);
};
