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

export type SpaceProfileUser = {
	id: number;
};

export type SpaceProfileConfiguration = Partial<{
	showOnBadge: boolean;
}>;

export type SpaceProfile = {
	id: string;
	space: SpaceProfileSpace;
	user: SpaceProfileUser;
	credentials: SpaceProfileCredentials;
	configuration: SpaceProfileConfiguration;
};

export type SpaceProfiles = {
	spaceProfiles: SpaceProfile[];
};
