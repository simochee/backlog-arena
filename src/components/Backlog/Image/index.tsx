import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useCurrentSpaceProfile } from "@/hooks/useCurrentSpaceProfile.ts";

type Props = React.ComponentProps<"img"> & {
	type: "space" | "project" | "user";
	variable?: string | number;
	domain?: string;
	accessToken?: string;
};

export const BacklogImage: React.FC<Props> = ({
	type,
	variable,
	alt,
	domain,
	accessToken,
	...props
}) => {
	const currentSpaceProfile = useCurrentSpaceProfile();
	const spaceDomain = domain || currentSpaceProfile.space.domain;
	const spaceAccessToken =
		accessToken || currentSpaceProfile.credentials.accessToken;

	const { data: objectUrl } = useQuery({
		queryKey: ["backlog-image", spaceDomain, spaceAccessToken, type, variable],
		queryFn: async () => {
			let pathname = `/v2/${spaceDomain}/${type}`;

			if (variable) {
				pathname += `/${variable}`;
			}

			const url = new URL(pathname, "https://blgimg.simochee.net");

			const res = await fetch(url, {
				method: "get",
				headers: new Headers({
					Authorization: `Bearer ${spaceAccessToken}`,
				}),
			});
			const blob = await res.blob();
			return URL.createObjectURL(blob);
		},
	});

	useEffect(() => {
		if (!objectUrl) return;

		return () => {
			URL.revokeObjectURL(objectUrl);
		};
	}, [objectUrl]);

	return <img src={objectUrl} alt={alt} {...props} />;
};
