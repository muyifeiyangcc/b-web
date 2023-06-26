import request from '~/composables/request'
//获取国家信息
export const getCountryList=()=>request.post('/api/api/index/getCountryList')
//获取黑名单列表
export const getBlackList=(data)=>request.post('/api/api/user/blackList',data)
//拉黑用户
export const blockUser=(data)=>request.post('/api/api/user/blockUser',data)
//移除黑名单
export const removeBlack=(data)=>request.post('/api/api/user/removeBlockUser',data)
//查询好友、粉丝、关注数列表
export const getFriends=(data)=>request.post('/api/api/user/userFriend',data)
//用户关注/取消关注/拉黑
export const getFollowUser=(data)=>request.post('/api/api/user/followUser',data)
//获取自身信息
export const getMineInfo=()=>request.post('/api/api/user/getUserInfo',{})
//修改用户信息
export const setUserInfo=(data)=>request.post('/api/api/user/updateUserInfo',data)
//查看用户详情
export const getUserDetail=(data)=>request.post('/api/api/index/getUserDetail',data)