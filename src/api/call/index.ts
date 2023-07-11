import { http } from '~/composables/request'
import type { GetRecordOpt, RecordListData } from './type'
//获取通话列表
export const getRecord = (data: GetRecordOpt) => http.post<RecordListData[]>('/api/chat/v2/getCallRecord', data)