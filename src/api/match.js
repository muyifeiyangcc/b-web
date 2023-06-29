import request from "~/composables/request"
//匹配用户接口
export const getStartMatch = (data) => request.post('/api/match/v2/userStartMatch', data)
//匹配机器人接口
export const getStartMatchRobot = (data) => request.post('/api/match/userReqMatchRobot', data)
// 获取机器人通话视频列表
export const getRobotVideo = (data) => request.post('/api/user/getRobotVideoList', data)