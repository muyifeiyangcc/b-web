import { http } from "~/composables/request"
import type { GetRechargeListOpt, HeartbeatOpt, HeartbeatData } from './type'
//获取充值列表
export const getRechargeList = () => http.post<GetRechargeListOpt[]>('/api/wallet/rechargeListV2', {})
//用户通话心跳
export const heartbeat = (data: HeartbeatOpt) => http.post<HeartbeatData>('/api/chat/v5/heartbeat', data)

