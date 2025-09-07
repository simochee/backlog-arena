import { Form, Input, Label, Text, TextField } from "react-aria-components";
import { UiButton } from "@/components/Ui/Button";
import { UiLink } from "@/components/Ui/Link";

export const SettingsAccountForm: React.FC = () => {
	return (
		<Form>
			<div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-6">
				<TextField className="grid grid-cols-subgrid col-span-2 gap-y-1 items-center">
					<Label className="text-sm">スペースドメイン</Label>
					<Input className="w-full border bg-gray-500 bg-white border-gray-950 px-3 py-1 rounded" />
					<Text
						slot="description"
						className="col-start-2 text-xs text-gray-500"
					>
						example.backlog.com もしくは example.backlog.jp の形式です。
					</Text>
				</TextField>
				<TextField className="grid grid-cols-subgrid col-span-2 gap-y-1 items-center">
					<Label className="text-sm">API キー</Label>
					<Input className="w-full border border-gray-950 bg-white px-3 py-1 rounded" />
					<Text
						slot="description"
						className="col-start-2 text-xs text-gray-500"
					>
						発行方法は{" "}
						<UiLink
							href="https://support-ja.backlog.com/hc/ja/articles/360035641754"
							target="_blank"
							styled
						>
							APIの設定 – Backlog ヘルプセンター
						</UiLink>{" "}
						をご確認ください。
					</Text>
				</TextField>
				<div className="flex col-span-2 justify-end">
					<UiButton>登録</UiButton>
				</div>
			</div>
		</Form>
	);
};
