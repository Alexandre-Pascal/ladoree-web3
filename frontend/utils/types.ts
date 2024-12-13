export type user = {
    userName: string;
    email: string;
    bio: string;
    isCreator: boolean;
};

export type Creator = {
    email: string;
    userName: string;
    bio: string;
    profileImage: string;
}
export type CreatorData = {
    userRegistereds: {
        email: string;
        userName: string;
        bio: string;
        profileImage: string;
        user: user;
    }[];
};