import { http } from "~/composables/request"
import type { GetCircleOpt, GetCircleDataList, GetCommentsOpt, GetCommentsListData, LikeOpt, CommentOpt } from './type'
//获取朋友圈信息
export const getFriendsCircle = (data: GetCircleOpt) => http.post<GetCircleDataList[]>('/api/expand/friendsCircle/queryAnchorFriendsCircleList', data)
// export const getFriendsCircle = (data) => request.post('/api/expand/friendsCircle/queryList', data)
//查询评论信息
export const getMoments = (data: GetCommentsOpt) => http.post<GetCommentsListData>('/api/expand/friendsCircle/getComments', data)
//点赞/取消点赞
export const like = (data: LikeOpt) => http.post<null>('/api/expand/friendsCircle/like', data)
//发表评论
export const comment = (data: CommentOpt) => http.post('/api/expand/friendsCircle/comment', data)