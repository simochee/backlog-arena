type Props = {
	title: string;
	children: React.ReactNode;
};

export const SettingsHeading: React.FC<Props> = ({ title, children }) => {
	return (
		<div className="grid gap-1">
			<h2 className="font-bold text-lg">{title}</h2>
			<div className="text-gray-800">{children}</div>
		</div>
	);
};
