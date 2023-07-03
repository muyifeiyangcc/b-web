import request from "~/composables/request"
//获取通话列表
export const getRecord = (data) => request.post('/api/chat/v2/getCallRecord', data)