import { http } from '~/composables/request'
import type { GiftListData, SendGiftOpt, SendGiftData, RejectSendGiftOpt } from './type'
//获取礼物列表
export const getGiftList = () => http.post<GiftListData[]>('/api/gift/getGiftList')
//打赏
export const sendGift = (data: SendGiftOpt) => http.post<SendGiftData>('/api/gift/send', data)
// 用户拒绝索要礼物接口
export const rejectAskGift = (data: RejectSendGiftOpt) => http.post<null>('/api/gift/rejectAskFor', data)


