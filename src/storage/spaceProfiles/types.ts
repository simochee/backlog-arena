export type SpaceProfileSpace = {
	spaceKey: string;
	domain: string;
	name: string;
};

export type SpaceProfileCredentials = {
	authType: "Bearer";
	accessToken: string;
	refreshToken: string;
};

export type SpaceProfileConfiguration = Partial<{
	showOnBadge: boolean;
}>;

export type SpaceProfile = {
	space: SpaceProfileSpace;
	credentials: SpaceProfileCredentials;
	configuration: SpaceProfileConfiguration;
};

export type SpaceProfiles = {
	spaceProfiles: SpaceProfile[];
};
