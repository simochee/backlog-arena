import { IconQuestionMark } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { clsx } from "clsx";
import { currentSpaceProfileOptions } from "@/storage/currentSpaceProfile/options.ts";
import type { SpaceProfile } from "@/storage/spaceProfiles/types.ts";
import { refreshAccessToken } from "@/utils/authorize.ts";

type Props = React.ComponentProps<"img"> & {
	type: "space" | "project" | "user";
	variable?: string | number;
	spaceProfile?: SpaceProfile;
};

export const BacklogImage: React.FC<Props> = ({
	type,
	variable,
	alt,
	spaceProfile,
	className,
	...props
}) => {
	const { data: currentSpaceProfile } = useQuery({
		...currentSpaceProfileOptions,
		enabled: !spaceProfile,
		initialData: spaceProfile,
	});

	const { data: objectUrl, error } = useQuery({
		enabled: !!currentSpaceProfile,
		queryKey: ["backlog-image", currentSpaceProfile?.id, type, variable],
		queryFn: async () => {
			if (!currentSpaceProfile) {
				throw new Error("Space profile not found");
			}

			let pathname = `/v2/${currentSpaceProfile.space.domain}/${type}`;

			if (variable) {
				pathname += `/${variable}`;
			}

			const url = new URL(pathname, "https://blgimg.simochee.net");

			let res = await fetch(url, {
				method: "get",
				headers: new Headers({
					Authorization: `Bearer ${currentSpaceProfile.credentials.accessToken}`,
				}),
			});

			// 401 の場合はトークンリフレッシュをしてリトライ
			if (res.status === 401) {
				try {
					const { access_token } = await refreshAccessToken(
						currentSpaceProfile.space.domain,
						currentSpaceProfile.credentials.refreshToken,
					);

					res = await fetch(url, {
						method: "get",
						headers: new Headers({
							Authorization: `Bearer ${access_token}`,
						}),
					});
				} catch {
					// do nothing
				}
			}

			if (!res.ok) {
				throw new Error(await res.text());
			}

			const blob = await res.blob();

			return new Promise<string>((resolve, reject) => {
				const reader = new FileReader();

				reader.onload = () => {
					if (typeof reader.result === "string") {
						resolve(reader.result);
					} else {
						reject(new Error("Failed to load image"));
					}
				};

				reader.readAsDataURL(blob);
			});
		},
	});

	return (
		<span
			className={clsx(
				"relative block align-middle bg-gray-100 shadow-[inset_0_0_0_1px_var(--color-gray-200)] overflow-hidden",
				className,
			)}
		>
			<img
				className={clsx(
					"absolute inset-0 size-full object-cover border-none outline-none transition",
					objectUrl ? "opacity-100" : "opacity-0 invisible",
				)}
				src={objectUrl}
				alt={alt}
				{...props}
			/>
			{error && (
				<span>
					<IconQuestionMark className="size-2/3 text-gray-500 absolute inset-1/2 -translate-1/2" />
				</span>
			)}
		</span>
	);
};
