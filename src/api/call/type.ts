export interface GetRecordOpt {
    endTime?: string
    keyword?: string
    onlineStatus?: 1 | 2,
    startTime?: string
    currentPage: number,
    pageSize: number,
    type: 1 | 2
}
export interface RecordListData {
    channelId?: string,
    icon: string,
    userId: number,
    yxAccid: string,
    nickname: string,
    createTime: number,
    duration: number,
    type: 1 | 2,
    countryId: string,
    gender: 1 | 2,
    onlineStatus: 1 | 2,
    followed: boolean,
    age: number,
    birthday: number,
    videoPrice?: number
}