import { defineStore } from 'pinia'
import { getCountryList,setUserInfo,getMineInfo,getUserDetail, getFollowUser  }from '~/api/user'
export const useUserStore = defineStore('useUserStore',{
state:()=>({
    countryList:[],//国家列表
    mineInfo:{},//我的信息
    userDetail:{},//用户详情
    matchDetail:{},//匹配到的用户详情
    picList:[],//用户相册列表
    videoList:[]//用户视频列表
}),
actions:{
    //获取国家列表
    async getCountryListData(){
        this.countryList= await getCountryList()
    },
    //获取我的信息
    async getMineInfoData (){
        this.mineInfo = await getMineInfo()
        console.log(this.mineInfo);
    },
    //获取用户详情
    async getUserDetailData (userId="",yxAccid){
    this.userDetail = await getUserDetail({
        userId, yxAccid
    })
    console.log(12313131331,this.userDetail);
    this.picList = this.userDetail.picList.filter((item) => item.mediaType === 1)
    this.videoList = this.userDetail.picList.filter((item) => item.mediaType === 2)
    // console.log(this.userDetail,this. picList, this.videoList);
},  
    //关注/取消关注
// type:1关注 2取关 3拉黑
    async followUser (type, id){
    await getFollowUser({
        "followType": type,
        "followUserId": id
    })
}
}
})
export default useUserStore