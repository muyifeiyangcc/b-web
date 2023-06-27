import request from "~/composables/request"
//获取首页tab标签
export const getIndexTab= ()=>request.post('/api/index/indexTag')
//获取首页列表
export const getIndexList=(data)=>request.post('/api/anchor/v2/anchorList',data)
//保存设备信息
export const setSave=(data)=>request.post('/api/device/save',data)
//排行榜数据
export const getRankingList=(data)=>request.post('/api/ranking/userRank',data)
//获取推荐主播
export const getRecommendAnchor=()=>request.post('/api/ranking/getRankingList/api/index/recommendAnchor')
//获取oss key
export const getOssKey=()=>request.post('/sts/getkey')   

