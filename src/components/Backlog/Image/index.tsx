import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useCurrentSpaceProfile } from "@/hooks/useCurrentSpaceProfile.ts";

type Props = React.ComponentProps<"img"> & {
	type: "space" | "project" | "user";
	variable?: string | number;
};

export const BacklogImage: React.FC<Props> = ({
	type,
	variable,
	alt,
	...props
}) => {
	const currentSpaceProfile = useCurrentSpaceProfile();

	const { data: objectUrl } = useQuery({
		queryKey: ["backlog-image", type, variable],
		queryFn: async () => {
			let pathname = `/v2/${currentSpaceProfile.space.domain}/${type}`;

			if (variable) {
				pathname += `/${variable}`;
			}

			const url = new URL(pathname, "https://blgimg.simochee.net");

			const res = await fetch(url, {
				method: "get",
				headers: new Headers({
					Authorization: `Bearer ${currentSpaceProfile.credentials.accessToken}`,
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
