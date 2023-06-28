import request from "~/composables/request"
//获取礼物列表
export const getGiftList= ()=>request.post('/api/gift/getGiftList')
//打赏
export const sendGift= (data)=>request.post('/api/gift/send',data)
// 用户拒绝索要礼物接口
export const rejectAskGift= (data)=>request.post('/api/gift/rejectAskFor',data)


