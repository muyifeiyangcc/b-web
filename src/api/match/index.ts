import { http } from "~/composables/request"
import type { MatchUserData, StartMatchOpt, GetRobotVideoOpt, RobotVideoData } from './type'
//匹配用户接口
export const getStartMatch = (data: StartMatchOpt) => http.post<MatchUserData>('/api/match/v2/userStartMatch', data)
//匹配机器人接口
export const getStartMatchRobot = (data: StartMatchOpt) => http.post<MatchUserData>('/api/match/userReqMatchRobot', data)
// 获取机器人通话视频列表
export const getRobotVideo = (data: GetRobotVideoOpt) => http.post<RobotVideoData>('/api/user/getRobotVideoList', data)
//机器人通话完成调用
export const getRobotFinish = (data: any) => http.post('/api/match/robotCallFinish', data)