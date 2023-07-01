import { defineStore } from 'pinia'
import { getGiftList, sendGift } from '~/api/gift'
import { showSuccessToast, showFailToast } from 'vant';
export const useGiftStore = defineStore('useGiftStore', {
    state: () => ({
        showGiftView: false,//直播间送礼弹窗
        giftList: [],//礼物列表
    }),
    actions: {
        //获取礼物列表
        async getGiftListData() {
            this.giftList = await getGiftList()
            console.warn('liftList:', this.giftList);
        },
        //送礼
        async postGift(giftId, num, scene, yxAccid) {
            await sendGift({
                giftId,
                num,
                scene,
                yxAccid
            }).then((res) => {
                if (res) {
                    showSuccessToast(`Gift successful,balance:${res.diamondNum}`)
                }
                else {
                    showFailToast(`Insufficient Balance`)
                }
            })
        }
    }
})
export default useGiftStore