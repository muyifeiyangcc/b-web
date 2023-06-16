import { defineStore } from 'pinia'
import { getCountryList,setUserInfo,getMineInfo }from '~/api/user'
import{ getGiftList } from '~/api/gift'
export const useUserStore = defineStore('useUserStore',{
state:()=>({
    countryList:[],
    mineInfo:{},
    giftList:[]//礼物列表
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
    //获取礼物列表
    async getGiftListData(){
        this.giftList=  await getGiftList()
        console.warn('liftList:',this.giftList);
    }
}
})
export default useUserStore