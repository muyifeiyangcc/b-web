// import request from "~/composables/request"
import { http } from "~/composables/request"
import type { indexTagRes, indexContentData, indexContentRes, rankListReq, rankListRes, recommendAnchorRes, ossKeyOption } from './type.js'
//获取首页tab标签
export const getIndexTab = () => http.post<indexTagRes>('/api/index/indexTag')
//获取首页列表
export const getIndexList = (data: indexContentData) => http.post<indexContentRes[]>('/api/anchor/v2/anchorList', data)
//排行榜数据
export const getRankingList = (data: rankListReq) => http.post<rankListRes[]>('/api/ranking/userRank', data)
//获取推荐主播
export const getRecommendAnchor = () => http.post<recommendAnchorRes[]>('/api/index/recommendAnchor')
//获取oss key
export const getOssKey = () => http.get<ossKeyOption>('/sts/getkey')

