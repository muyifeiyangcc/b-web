import request from '~/composables/request'
//获取充值列表
export const getRechargeList=()=>request.post('/api/wallet/rechargeListV2',{})
