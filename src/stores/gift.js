import { defineStore } from 'pinia'
import { getGiftList, sendGift } from '~/api/gift'
import { showSuccessToast } from 'vant';
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
                    showSuccessToast(`送礼成功,余额：${res.diamondNum}`)
                }
                else {
                    showSuccessToast("余额不足")
                }
            })
        }
    }
})
export default useGiftStore