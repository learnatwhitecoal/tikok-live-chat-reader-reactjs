export interface GiftResponse {
    giftId:            number;
    repeatCount:       number;
    repeatEnd:         boolean;
    groupId:           string;
    monitorExtra:      MonitorExtra;
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
    msgId:             string;
    createTime:        string;
    displayType:       string;
    label:             string;
    gift:              Gift;
    describe:          string;
    giftType:          number;
    diamondCount:      number;
    giftName:          string;
    giftPictureUrl:    string;
    timestamp:         number;
    extendedGiftInfo:  ExtendedGiftInfo;
    receiverUserId:    string;
}

export interface ExtendedGiftInfo {
}

export interface FollowInfo {
    followingCount: number;
    followerCount:  number;
    followStatus:   number;
    pushStatus:     number;
}

export interface Gift {
    gift_id:      number;
    repeat_count: number;
    repeat_end:   number;
    gift_type:    number;
}

export interface MonitorExtra {
    anchor_id:                         number;
    from_idc:                          string;
    from_user_id:                      number;
    gift_id:                           number;
    gift_type:                         number;
    log_id:                            string;
    msg_id:                            number;
    repeat_count:                      number;
    repeat_end:                        number;
    room_id:                           number;
    send_gift_profit_core_start_ms:    number;
    send_gift_send_message_success_ms: number;
    to_user_id:                        number;
}

export interface UserDetails {
    createTime:         string;
    bioDescription:     string;
    profilePictureUrls: string[];
}
