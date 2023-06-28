import { defineStore } from 'pinia'
import{ getGiftList,sendGift } from '~/api/gift'
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
    //送礼
    async postGift(giftId, num, scene, yxAccid) {
        await sendGift({
            giftId,
            num,
            scene,
            yxAccid
        })
    }
}
})
export default useGiftStore