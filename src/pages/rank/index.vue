<template>
    <div>
        <!-- 顶部导航栏 -->
        <div ref="myRef">
            <van-nav-bar left-arrow @click-left="router.go(-1)" :border="false">
                <template #title>
                    <van-tabs v-model:active="active" background="transparent" title-active-color="#fff"
                        title-inactive-color="rgba(255,255,255,0.6)" line-width="0px" :ellipsis="false">
                        <van-tab title="Charm" title-style="font-size:20px;font-weight:bold"></van-tab>
                        <van-tab title="Rich" title-style="font-size:20px;font-weight:bold"></van-tab>
                        <van-tab title="Couple" title-style="font-size:20px;font-weight:bold"></van-tab>
                    </van-tabs>
                </template>
                <template #left>
                    <van-icon name="arrow-left" :size="22" color="#fff" />
                </template>
            </van-nav-bar>
        </div>
        <!-- 领奖台--前三名 -->
        <div class="h320 relative" style="background: radial-gradient( hsl(287, 82%, 32%) 0%,  #060108 100%)">
            <!-- 第一名 -->
            <div class="absolute bottom-180 mx160">
                <img src="../../assets/one.png" class="w30 h25 absolute top--15 left-50% ml--15 z2">
                <van-space direction="vertical" align="center" :size="0">
                    <div>
                        <van-image round width="16rem" height="16rem"
                            src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" class="b-3 b-#FED530" />
                    </div>
                    <div>
                        <van-space :size="3">
                            <div class="text-14 c-#fff font-semibold">Jeny</div>
                            <div class="i-my-icons-famale text-11" />
                        </van-space>
                    </div>
                    <div>
                        <van-space :size="4">
                            <div class="i-my-icons-diamond text-18" />
                            <div class="text-14 c-#fff font-medium">1220K</div>
                        </van-space>
                    </div>
                </van-space>
            </div>
            <!-- 第二名 -->
            <div class="absolute bottom-120 left-40">
                <img src="../../assets/two.png" class="w30 h25 absolute top--15 left-50% ml--15 z2">
                <van-space direction="vertical" align="center" :size="0">
                    <div>
                        <van-image round width="16rem" height="16rem"
                            src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" class="b-3 b-#E1F8FF" />
                    </div>
                    <div>
                        <van-space :size="3">
                            <div class="text-14 c-#fff font-semibold">Bom</div>
                            <div class="i-my-icons-famale text-11" />
                        </van-space>
                    </div>
                    <div>
                        <van-space :size="4">
                            <div class="i-my-icons-diamond text-18" />
                            <div class="text-14 c-#fff font-medium">1220K</div>
                        </van-space>
                    </div>
                </van-space>
            </div>
            <!-- 第三名 -->
            <div class="absolute right-50 bottom-80">
                <img src="../../assets/three.png" class="w30 h25 absolute top--15 left-50% ml--15 z2">
                <van-space direction="vertical" align="center" :size="0">
                    <div>
                        <van-image round width="16rem" height="16rem"
                            src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" class="b-3 b-#FFB784" />
                    </div>
                    <div>
                        <van-space :size="3">
                            <div class="text-14 c-#fff font-semibold">admin</div>
                            <div class="i-my-icons-famale text-11" />
                        </van-space>
                    </div>
                    <div>
                        <van-space :size="4">
                            <div class="i-my-icons-diamond text-18" />
                            <div class="text-14 c-#fff font-medium">1220K</div>
                        </van-space>
                    </div>
                </van-space>
            </div>
            <!-- 领奖台贴图 -->
            <img src="../../assets/ranking-block.png" class="absolute bottom-0 w321 h176 mx-27">
        </div>
        <!-- 第四名之后 -->
        <div class="mx24">
            <div class="mt10 py16 flex justify-between items-center b-b-1 b-#24003E" v-for="index in 5">
                <div>
                    <van-space :size="0">
                        <div class="c-#BCA1E1 font-bold text-15 mr12">{{ index + 3 }}</div>
                        <div class="mr8">
                            <van-image round width="10rem" height="10rem"
                                src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" />
                        </div>
                        <div>
                            <van-space direction="vertical" :size="0">
                                <div class="text-15 c-#fff font-medium">Johnny Rios</div>
                                <div>
                                    <div class="i-my-icons-famale text-11" />
                                </div>
                            </van-space>
                        </div>
                    </van-space>
                </div>

                <div>
                    <van-space :size="4">
                        <div class="i-my-icons-diamond text-18" />
                        <div class="c-#CE16C8 text-15 font-medium">963294</div>
                    </van-space>
                </div>
            </div>
        </div>
    </div>
</template>


<script  setup>
import { getRankingList } from '~/api/home'
// const myRef = ref()
const active = ref('')
const router = useRouter()
const rankingList = ref({})
const myValues = ref({})
//获取排行榜数据
const getRankingListData = async () => {
    const result = await getRankingList({
        "currentPage": 1,
        "pageSize": 5,
        "rankType": "ANCHOR_DAY"
    })
    rankingList.value = result.rankingMembers
    myValues.value = result.rankingMineVo
}
onMounted(() => {
    //组件挂载完成设置背景色
    // document.querySelector('body').setAttribute('style', 'background:radial-gradient(#3F0454 0%,#060108 100 %)')
    document.querySelector('body').setAttribute('style', 'background-color:#130021')
})
onBeforeUnmount(() => {
    //组件卸载前去掉背景色
    document.querySelector('body').removeAttribute('style')
})
</script>

<style scoped>
.van-nav-bar {
    background-color: #130021;
}
</style>