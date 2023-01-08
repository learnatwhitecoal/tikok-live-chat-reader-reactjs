export interface ChatResponse {
  comment: string;
  userId: string;
  secUid: string;
  uniqueId: string;
  nickname: string;
  profilePictureUrl: string;
  rollowRole: number;
  userBadges: UserBadge[];
  userDetails: UserDetails;
  followInfo: FollowInfo;
  isModerator: boolean;
  isNewGifter: boolean;
  isSubscriber: boolean;
  topGifterRank: null;
  msgId: string;
  createTime: string;
}

export interface FollowInfo {
  followingCount: number;
  followerCount: number;
  followStatus: number;
  pushStatus: number;
}

export interface UserBadge {
  type: string;
  name?: string;
  displayType?: number;
  url?: string;
}

export interface UserDetails {
  createTime: string;
  bioDescription: string;
  profilePictureUrls: string[];
}
