type Props = {
	title: string;
	description?: React.ReactNode;
	children: React.ReactNode;
};

export const SettingsSection: React.FC<Props> = ({
	title,
	description,
	children,
}) => {
	return (
		<section className="grid gap-4">
			<div className="grid gap-2">
				<h2 className="font-bold text-lg">{title}</h2>
				{description && (
					<div className="text-sm text-gray-800">{description}</div>
				)}
			</div>
			<main>{children}</main>
		</section>
	);
};
