//国家信息
export interface CountryData {
    code: number,
    lng: number,
    emoji: string,
    en: string,
    locale: string,
    lat: number
}
//黑名单列表
export interface BlackListData {
    userId: string,
    nickname: string,
    gender: number,
    icon: string
    userType: 1 | 2 | 3 | 4,
    status?: null,
    countryId: string,
    yxAccid: string,
    age: number,
    birthday: number,
    createTime: number
}
//拉黑
export interface BlackOpt {
    type: 1 | 2,
    userId: number,
    yxAccid: string
}
//关注列表
export interface FollowListOpt {
    currentPage: number,
    endTime?: string,
    keyword?: string,
    pageSize: number,
    startTime?: string,
    type: 1 | 2 | 3,
    userId?: number
}
export interface FollowListData {
    userId: number,
    yxAccid: string,
    nickname: string,
    icon: string,
    countryId: string,
    level: number,
    followed: boolean,
    videoPrice: number,
    gender: number,
    age: number,
    birthday: number,
    status: number,
    vip: number,
    isOpenNotify: number,
    userType: 1 | 2 | 3 | 4
}
//关注/取关
export interface FollowUserOpt {
    followType: 1 | 2 | 3,
    followUserId: number
}
//我的信息
export interface MineInfo {
    userId: number,
    yxAccid: string,
    nickname: string,
    email?: string,
    phone: string,
    icon: string,
    signature: string,
    description: string,
    countryId: string,
    gender: 1 | 2,
    userType: 1 | 2 | 3 | 4,
    userLevel: string,
    levelId?: number,
    levelIcon?: string,
    birthday: string,
    videoPrice: number,
    age: number,
    status: 1 | 2 | 10000,
    valid: number,
    token: string,
    imToken: string,
    diamondNum: number,
    callVideoUrl?: string,
    height?: string,
    bodyWeight?: string,
    friendNum: number,
    fansNum: number,
    upsNum: number,
    anchorIncomeMap?: null,
    anchorSettleMap?: null,
    disturbStatus?: 0 | 1,
    isFirstCharge: boolean,
    canApply: true,
    canGetDiamond: boolean,
    vip: number,
    firstPayTime?: string,
    vipExpireMs: number,
    picList?: string[],
    latestIconAndCallVideo?: string[],
    massCount: number,
    canCallLevelId?: string[],
    levelGrowthNum: number,
    greetMsgs?: string[],
    thumbs?: string[],
    connRate: string,
    followed: boolean,
    googleAdUnitID?: string
}
//修改我的信息
export interface SetMineInfoOpt {
    addGreetList?: string[],
    birthday: string,
    bodyWeight?: number,
    callVideoUrl?: string,
    countryId: string,
    delGreetList?: string[],
    description?: string,
    gender: number,
    height?: number,
    icon: string,
    needChargeUrls?: string[],
    nickname: string,
    pics?: string[],
    picsDel?: string[],
    price?: number,
    signature: string,
    videos?: string[],
    videosDel?: string[]
}
//查看用户详情
export interface UserDetailOpt {
    userId?: number,
    yxAccid?: string
}
// 用户详情
export interface UserInfoData {
    userId: number,
    nickname: string,
    gender: 1 | 2,
    icon: string,
    videoPrice: number,
    userType: 1 | 2 | 3 | 4,
    age: number,
    status: 1 | 2 | 10000,
    countryId: string,
    birthday: number,
    yxAccid: string,
    connRate: string,
    vip?: number,
    callVideoUrl?: string
    description: string,
    picList?: PicListData[],
    giftList?: GiftListData[],
    signature?: string,
    userFriendMap: UserFriendMap,
    score: string,
    commentIds?: string[],
    isBlocked: 0 | 1,
    latestIconAndCallVideo?: any,
    canCall: boolean,
    comments?: any,
    thumbs: ThumbsData[],
    level: number,
    levelName: string,
    callForwardingFlag: number,
    followed: boolean
}
interface ThumbsData {
    num: number,
    type: 1 | 2
}
interface UserFriendMap {
    fansNum: number,
    friendNum: number,
    upsNum: number
}
interface GiftListData {
    giftId: number,
    num: number
}
interface PicListData {
    id: number,
    mediaUrl: string,
    videoCover: string,
    mediaType: number,
    unlockStatus: 0 | 1,
    chargeFlag: 0 | 1,
    cost: number,
    vaild: number
}
export interface FeedbackOpt {
    email: string,
    feedbackType: string,
    pics: string[],
    suggestion: string
}
