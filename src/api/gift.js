import request from "~/composables/request"
//获取首页tab标签
export const getGiftList= ()=>request.post('/api/gift/getGiftList')
