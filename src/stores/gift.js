import { defineStore } from 'pinia'
import{ getGiftList } from '~/api/gift'
export const useGiftStore = defineStore('useGiftStore',{
state:()=>({
    showGiftView:false,//直播间送礼弹窗
    giftList:[],//礼物列表
}),
actions:{
    //获取礼物列表
    async getGiftListData(){
        this.giftList=  await getGiftList()
        console.warn('liftList:',this.giftList);
    },
}
})
export default useGiftStore