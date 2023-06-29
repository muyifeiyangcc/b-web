import request from '~/composables/request'
//获取充值列表
export const getRechargeList = () => request.post('/api/wallet/rechargeListV2', {})
//用户通话心跳
export const heartbeat = (data) => request.post('/api/chat/v5/heartbeat', data)

