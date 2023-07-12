//首页tag
export interface indexTagRes {
    parentTags: fatherTag[]
}
interface fatherTag {
    id: number,
    tagCode: string,
    tagName: string,
    sort: number,
    level: number,
    childrenTags: childrenTag[]
}
interface childrenTag {
    id: number,
    tagCode: string,
    tagName: string,
    sort: number,
    level: number
}

//首页列表
export interface indexContentData {
    currentPage: number,
    onlineStatus: 1 | 2,
    pageSize: number,
    tagId: number
}

export interface indexContentRes {
    userId: number,
    nickname: string,
    gender: number,
    icon: string
    videoPrice: number,
    userType: number,
    age: number,
    status: number,
    countryId: string,
    birthday: number,
    yxAccid: string,
    imToken: string,
    callForwardingFlag: number,
    level: number,
    anchorLevelName: string,
    anchorRanking?: null
}

//排行榜数据
export interface rankListReq {
    currentPage: number,
    pageSize: number,
    rankType: "ANCHOR_CHARM" | "USER_RICH" | "ANCHOR_USER_COUPLE"
}
export interface rankListRes {
    userId: number,
    yxAccid: string,
    nickname: string,
    gender: 1 | 2,
    icon: string,
    userType: 1 | 2 | 3 | 4,
    countryId: string,
    birthday: string,
    age: number
}
//首页推荐主播
export interface recommendAnchorRes {
    userId: number,
    nickname: string,
    gender: 1 | 2,
    icon: string
    videoPrice: number,
    userType: 1 | 2 | 3 | 4,
    age: number,
    status: number,
    countryId: string,
    birthday: number,
    totalSum: number,
    totalNum: number,
    yxAccid: string,
    imToken: string,
    connRate?: null,
    vip?: null,
    callVideoUrl: string
    followed: false,
    disturbStatus: number,
    levelId: number,
    userLevel: number,
    canCall: number,
    free: number
}
// getOssKey
export interface ossKeyOption {
    StatusCode: string,
    AccessKeyId: string,
    AccessKeySecret: string,
    SecurityToken: string,
    Expiration: string
}