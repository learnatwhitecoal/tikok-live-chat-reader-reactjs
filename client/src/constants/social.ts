//share
export interface SocialResponse {
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
    msgId:             string;
    createTime:        string;
    displayType:       string;
    label:             string;
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
