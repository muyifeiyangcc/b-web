import { http } from "~/composables/request"
//获取朋友圈信息
export const getFriendsCircle = (data: any) => http.post('/api/expand/friendsCircle/queryAnchorFriendsCircleList', data)
// export const getFriendsCircle = (data) => request.post('/api/expand/friendsCircle/queryList', data)
//查询评论信息
export const getMoments = (data: any) => http.post('/api/expand/friendsCircle/getComments', data)
//点赞/取消点赞
export const like = (data: any) => http.post('/api/expand/friendsCircle/like', data)
//发表评论
export const comment = (data: any) => http.post('/api/expand/friendsCircle/comment', data)