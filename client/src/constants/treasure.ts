//treasure box
export interface Treasure {
    userId:            string;
    secUid:            string;
    uniqueId:          string;
    nickname:          string;
    profilePictureUrl: string;
    rollowRole:        number;
    userBadges:        any[];
    userDetails:       UserDetails;
    followInfo:        FollowInfo;
    isModerator:       boolean;
    isNewGifter:       boolean;
    isSubscriber:      boolean;
    topGifterRank:     null;
    coins:             number;
    canOpen:           number;
    timestamp:         number;
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
