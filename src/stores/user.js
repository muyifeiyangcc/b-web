import { defineStore } from 'pinia'
import {getCountryList,setUserInfo,getMineInfo}from '~/api/user'
export const useUserStore = defineStore('useUserStore',{
state:()=>({
    countryList:[],
    mineInfo:{}
}),
actions:{
    //获取国家列表
    async getCountryListData(){
        this.countryList= await getCountryList()
    },
    //获取我的信息
    async getMineInfoData (){
        this.mineInfo = await getMineInfo()
    }
}
})
export default useUserStore