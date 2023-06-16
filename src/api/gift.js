import request from "~/composables/request"
//获取礼物列表
export const getGiftList= ()=>request.post('/api/gift/getGiftList')
