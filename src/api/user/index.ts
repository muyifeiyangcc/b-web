import { http } from '~/composables/request'
import type {
    CountryData,
    BlackListData,
    BlackOpt,
    FollowListOpt,
    FollowListData,
    FollowUserOpt,
    MineInfo,
    SetMineInfoOpt,
    UserDetailOpt,
    FeedbackOpt
} from './type'
//获取国家信息
export const getCountryList = () => http.post<CountryData[]>('/api/index/getCountryList')
//获取黑名单列表
export const getBlackList = () => http.post<BlackListData[]>('/api/user/blackList', {})
//拉黑用户
export const blockUser = (data: BlackOpt) => http.post<null>('/api/user/blockUser', data)
//移除黑名单
export const removeBlack = (data: BlackOpt) => http.post<null>('/api/user/removeBlockUser', data)
//查询好友、粉丝、关注数列表
export const getFriends = (data: FollowListOpt) => http.post<FollowListData[]>('/api/user/userFriend', data)
//用户关注/取消关注/拉黑
export const getFollowUser = (data: FollowUserOpt) => http.post<null>('/api/user/followUser', data)
//获取自身信息
export const getMineInfo = () => http.post<MineInfo>('/api/user/getUserInfo', {})
//修改用户信息
export const setUserInfo = (data: SetMineInfoOpt) => http.post<null>('/api/user/updateUserInfo', data)
//查看用户详情
export const getUserDetail = (data: UserDetailOpt) => http.post('/api/index/getUserDetail', data)
//反馈
export const getFeedback = (data: FeedbackOpt) => http.post<null>('/api/feedback/save', data)
