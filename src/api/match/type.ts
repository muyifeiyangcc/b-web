export interface StartMatchOpt {
    gender: 0 | 1 | 2,
    hitRecordId?: number,
    userType?: number
}
export interface MatchUserData {
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
    totalSum: number,
    totalNum: number,
    yxAccid: string,
    imToken: string,
    connRate: string,
    vip?: number,
    callVideoUrl?: string
    followed: boolean
    disturbStatus: number,
    levelId: number,
    userLevel: number,
    canCall: number,
    free: 0 | 1
}
export interface GetRobotVideoOpt {
    userId: number
}
export interface RobotVideoData {
    batchId: string,
    videoUrl: string,
    sort: number
}
