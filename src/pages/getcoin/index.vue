<template>
    <div>
        <!-- 头部导航栏 -->
        <div ref="myRef">
            <van-nav-bar left-arrow @click-left="router.go(-1)" @click-right="" :border="false" fixed="true">
                <template #right>
                    <div>
                        <van-space :size="5">
                            <div class="i-my-icons-diamond" />
                            <div class="c-#fff text-14 font-medium">{{ userStore.mineInfo.diamondNum }}</div>
                        </van-space>
                    </div>
                </template>
                <template #title>
                    <div class="c-#fff text-21 font-semibold">Get Coins</div>
                </template>
                <template #left>
                    <van-icon name="arrow-left" :size="22" color="#fff" />
                </template>
            </van-nav-bar>
        </div>
        <div class="pt60 px20 flex flex-wrap justify-between text-0">
            <div class="  pt12 pb28 relative text-center b-2 b-#B25BFF rounded-5 w102 h102 mt47">
                <van-space direction="vertical" align="center" :size="6">
                    <div class="i-my-icons-diamond w40 h40" />
                    <div class="c-#fff text-14 font-semibold">1250</div>
                    <van-button
                        class="bg-gradient-to-r from-#4D09C1  via-#7F04BA to-#D016C8 w89 h29 b-0 rounded-15 c-#fff text-14 font-semibold absolute left-50% ml--45 bottom--15">
                        get
                    </van-button>
                </van-space>
                <img src="../../assets/free_coin.png" class="w54 h54 absolute top--2 right--1">
            </div>
            <div class="  pt12 pb28 relative text-center b-2 b-#B25BFF rounded-5 w102 h102 mt47"
                v-for="item, index in rechargeList">
                <van-space direction="vertical" align="center" :size="6">
                    <div class="i-my-icons-diamond w40 h40" />
                    <div class="c-#fff text-14 font-semibold">{{ item.diamondNum }}</div>
                    <van-button
                        class="bg-gradient-to-r from-#4D09C1  via-#7F04BA to-#D016C8 w89 h29 b-0 rounded-15 c-#fff text-14 font-semibold absolute left-50% ml--45 bottom--15"
                        @click="recharge(item.batchNo)">
                        ${{ item.price }}
                    </van-button>
                </van-space>
            </div>
        </div>
        <van-toast></van-toast>
    </div>
</template>


<script  setup>
import { getRechargeList } from '~/api/wallet'
import { showSuccessToast } from 'vant';
const router = useRouter()
const rechargeList = ref([])
const userStore = useUserStore()
const getRechargeListData = async () => {
    rechargeList.value = await getRechargeList()
    console.log(rechargeList.value)
}
//充值
const recharge = async (batchNo) => {
    const result = await window.Recharge.postMessage(batchNo)
    userStore.getMineInfoData()
    console.log(result);
}
onMounted(() => {
    getRechargeListData()
    //组件挂载完成设置背景色
    document.querySelector('body').setAttribute('style', 'background-color:#130021')
})
onBeforeUnmount(() => {
    //组件卸载前去掉背景色
    document.querySelector('body').removeAttribute('style')
})

</script>

<style scoped></style>