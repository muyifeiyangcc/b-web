// 获取朋友圈列表
export interface GetCircleOpt {
    currentPage: number,
    endTime?: string,
    keyword?: string,
    pageSize: number,
    startTime?: string,
    userType?: 1 | 2 | 3 | 4,
}

export interface GetCircleDataList {
    id: number,
    textContent: string,
    nickname: string,
    icon: string,
    userId: number,
    yxAccid: string,
    onlineGroupStatus: number,
    onlineStatus: number,
    imgUrls: string[],
    likeFlag: 1 | 0,
    likeNum: number,
    followFlag: 1 | 0,
    createTime: string,
    commentNum: number,
    userType?: number
}

export interface GetCommentsOpt {
    currentPage: number,
    endTime?: string,
    keyword: number,
    pageSize: number,
    startTime?: string
}
export interface GetCommentsListData {
    userId: number,
    nickname: string,
    icon: string,
    createTime: string,
    commentContent: string,
    id: number,
    parentCommentId?: number,
    subComments?: null
}
export interface LikeOpt {
    id: number,
    optionType: 1 | 0
}
export interface CommentOpt {
    commentContent: any
    friendsCircleId: number,
    parentCommentId: number
}