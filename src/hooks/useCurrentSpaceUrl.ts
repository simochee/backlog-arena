import { useCurrentSpaceProfile } from "@/hooks/useCurrentSpaceProfile.ts";

export const useCurrentSpaceUrl = () => {
	const spaceProfile = useCurrentSpaceProfile();

	const toUrl = (path: `/${string}`): string => {
		console.log(path, spaceProfile.space.domain);

		const url = new URL(path, `https://${spaceProfile.space.domain}`);
		return url.href;
	};

	return toUrl;
};
