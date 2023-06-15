import request from "~/composables/request"
//用户开始匹配
export const getStartMatch=(data)=>request.post('/api/match/anchorStartMatch',data)
