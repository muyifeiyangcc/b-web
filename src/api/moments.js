import request from "~/composables/request"
//获取朋友圈信息
export const getFriendsCircle=(data)=>request.post('/api/expand/friendsCircle/queryList',data)