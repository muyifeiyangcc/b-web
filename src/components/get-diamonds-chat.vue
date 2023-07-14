<template>
    <div>
        <van-popup v-model:show="homeStore.getDiamondsVisible" position="bottom" :style="{
            height: '60%', background: 'radial-gradient(at 50% -50px,#D016C8 0%, #7F04BA 60%, #4D09C1 100%)'
        }" class="rounded-t-24">
            <template #default>
                <div class=" c-#fff  text-center">
                    <div class="mt32 text-18 font-semibold">Get more diamonds and start chatting</div>
                    <!-- <div class="mx-30 px15 py13 flex justify-between items-center bg-#fff/20 rounded-12 mt24">
                        <div>
                            <van-space>
                                <div class="i-my-icons-diamond text-18" />
                                <div class="text-15">Free Coins</div>
                                <div class="text-15 font-bold">+200</div>
                            </van-space>
                        </div>
                        <div class="py6 px22 bg-#fff font-medium rounded-20 text-15 c-#4E09C1">
                            Get
                        </div>
                    </div> -->

                    <div class="mx-30 px15 py13 flex justify-between items-center bg-#fff/20 rounded-12 mt10"
                        v-for="item, index in rechargeList" :key="index">
                        <div>
                            <van-space>
                                <div class="i-my-icons-diamond text-18" />
                                <div class="text-15 font-bold">{{ item.diamondNum }}</div>
                            </van-space>
                        </div>
                        <div class="py6 px22 bg-#fff font-medium rounded-20 text-15 c-#4E09C1"
                            @click="recharge(item.batchNo)">
                            ${{ item.price }}
                        </div>
                    </div>
                </div>
            </template>
        </van-popup>
    </div>
</template>


<script  setup>
import { getRechargeList } from '~/api/wallet'

const rechargeList = ref([])
const homeStore = useHomeStore()

const getRechargeListData = () => {
    getRechargeList().then((res) => {
        rechargeList.value = res
        console.log(rechargeList.value)
    })
}

//充值
const recharge = (batchNo) => {
    window.flutter_inappwebview.callHandler('recharge', batchNo);
}
onMounted(() => {
    getRechargeListData()
})
</script>

<style scoped></style>