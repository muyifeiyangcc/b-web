import request from "~/composables/request"
//获取首页tab标签
export const getIndexTab= ()=>request.post('/api/api/index/indexTag')
//获取首页列表
export const getIndexList=(data)=>request.post('/api/api/anchor/v2/anchorList',data)
//保存设备信息
export const setSave=(data)=>request.post('/api/api/device/save',data)
//排行榜数据
export const getRankingList=(data)=>request.post('/api/api/ranking/getRankingList',data)
//获取推荐主播
export const getRecommendAnchor=()=>request.post('/api/api/ranking/getRankingList/api/index/recommendAnchor')
//获取oss key
export const getOssKey=()=>request.post('/api/sts/getkey')   

