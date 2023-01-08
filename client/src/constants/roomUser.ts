//top viewers
export interface RoomUserResponse {
    topViewers:  TopViewer[];
    viewerCount: number;
}

export interface TopViewer {
    user:      User;
    coinCount: number;
}

export interface User {
    userId:            string;
    secUid:            string;
    uniqueId:          string;
    nickname:          string;
    profilePictureUrl: string;
    followRole:        number;
    userBadges:        any[];
    userDetails:       UserDetails;
    followInfo:        FollowInfo;
    isModerator:       boolean;
    isNewGifter:       boolean;
    isSubscriber:      boolean;
    topGifterRank:     null;
}

export interface FollowInfo {
    followingCount: number;
    followerCount:  number;
    followStatus:   number;
    pushStatus:     number;
}

export interface UserDetails {
    createTime:         string;
    bioDescription:     string;
    profilePictureUrls: string[];
}
