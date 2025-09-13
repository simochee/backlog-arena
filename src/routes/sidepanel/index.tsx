import { useMutation } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import createFetchClient from "openapi-fetch";
import createClient from "openapi-react-query";
import { ListBox } from "react-aria-components";
import { NotificationItem } from "@/components/Notification/Item";
import { useCurrentSpaceProfile } from "@/hooks/useCurrentSpaceProfile.ts";
import type { paths } from "@/openapi/openapi-schema.ts";
import { setSpaceProfileCredentialsOptions } from "@/storage/spaceProfiles/options.ts";
import { refreshAccessToken } from "@/utils/authorize.ts";

export const Route = createFileRoute("/sidepanel/")({
	component: RouteComponent,
});

function RouteComponent() {
	const currentSpaceProfile = useCurrentSpaceProfile();
	const { mutate } = useMutation(
		setSpaceProfileCredentialsOptions(currentSpaceProfile.id),
	);
	const fetchClient = createFetchClient<paths>({
		baseUrl: `https://${currentSpaceProfile.space.domain}/api/v2`,
		headers: {
			Authorization: `Bearer ${currentSpaceProfile.credentials.accessToken}`,
		},
		fetch: async (init) => {
			const res = await fetch(init);

			if (res.status !== 401) {
				return res;
			}

			const accessToken = await refreshAccessToken(
				currentSpaceProfile.space.domain,
				currentSpaceProfile.credentials.refreshToken,
			);
			mutate(accessToken);

			init.headers.set("Authorization", `Bearer ${accessToken.access_token}`);

			return await fetch(init);
		},
	});
	const $api = createClient(fetchClient);

	const { data = [] } = $api.useQuery(
		"get",
		"/notifications",
		{},
		{
			refetchInterval: 60 * 1000,
		},
	);

	return (
		<div>
			<p>data:</p>
			<pre>{currentSpaceProfile?.space.name}</pre>
			<img
				alt=""
				src={`https://${currentSpaceProfile.space.domain}/api/v2/space/image`}
			/>
			<ListBox items={data}>
				{(notification) => <NotificationItem notification={notification} />}
			</ListBox>
		</div>
	);
}
