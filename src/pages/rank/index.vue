<template>
    <div class="pt40">
        <!-- 顶部导航栏 -->
        <div ref="myRef" class="">
            <van-nav-bar left-arrow @click-left="router.go(-1)" :border="false" :fixed="true">
                <template #title>
                    <van-tabs v-model:active="active" background="transparent" title-active-color="#fff"
                        @click-tab="onClickTab" title-inactive-color="rgba(255,255,255,0.6)" line-width="0px"
                        :ellipsis="false">
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
        <div class="h360 absolute top-0 w-full text-center"
            style="background: radial-gradient( hsl(287, 82%, 32%) 0%,  #060108 100%)">
            <!-- 领奖台 -->
            <div class="absolute bottom-0 left-50% ml--160">
                <img src="../../assets/ranking-block.png" class=" w321 h176 ">
                <!-- 第一名 -->
                <div class="absolute text-center w-full top--100" v-if="type === 'Couple'">
                    <img src="../../assets/one.png" class="w30 h25 absolute top--15 left-50% ml--15 z2">
                    <img src="../../assets/love_both.png" class="w34 h31 absolute top-5 left-50% ml--17 z2">
                    <van-space :size="0">
                        <div class="relative right--8">
                            <van-image round width="14rem" height="14rem" :src="rankingListTop[0].anchorIcon"
                                class="b-3 b-#FED530" />
                        </div>
                        <div class="relative left--8">
                            <van-image round width="14rem" height="14rem" :src="rankingListTop[0].userIcon"
                                class="b-3 b-#FED530" />
                        </div>
                    </van-space>
                    <div class="text-14 c-#fff font-medium">
                        {{ rankingListTop[0].anchorNickname }} & {{ rankingListTop[0].userNickname }}
                    </div>
                </div>
                <div class="absolute text-center w-full top--115" v-else>
                    <img src="../../assets/one.png" class="w30 h25 absolute top--15 left-50% ml--15 z2">
                    <van-space direction="vertical" align="center" :size="0" v-if="rankingListTop.length >= 1">
                        <div>
                            <van-image round width="16rem" height="16rem" :src="rankingListTop[0].icon"
                                class="b-3 b-#FED530" />
                        </div>
                        <div>
                            <van-space :size="3">
                                <div class="text-14 c-#fff font-semibold">{{ rankingListTop[0].nickname }}</div>
                                <div class="i-my-icons-famale text-11" />
                            </van-space>
                        </div>
                        <!-- <div>
                            <van-space :size="4">
                                <div class="i-my-icons-diamond text-18" />
                                <div class="text-14 c-#fff font-medium">{{ 1 }}</div>
                            </van-space>
                        </div> -->
                    </van-space>
                    <van-image round width="16rem" height="16rem" src="" class="b-3 b-#FED530" v-else />
                </div>
                <!-- 第二名 -->
                <div class="absolute bottom-145 left--20" v-if="type === 'Couple'">
                    <img src="../../assets/two.png" class="w30 h25 absolute top--15 left-50% ml--15 z2">
                    <img src="../../assets/love_both.png" class="w34 h31 absolute top-5 left-50% ml--17 z2">
                    <van-space :size="0">
                        <div class="relative right--8">
                            <van-image round width="14rem" height="14rem" :src="rankingListTop[1].anchorIcon"
                                class="b-3 b-#E1F8FF" />
                        </div>
                        <div class="relative left--8">
                            <van-image round width="14rem" height="14rem" :src="rankingListTop[1].userIcon"
                                class="b-3 b-#E1F8FF" />
                        </div>
                    </van-space>
                    <div class="text-14 c-#fff font-medium">
                        {{ rankingListTop[1].anchorNickname }} & {{ rankingListTop[1].userNickname }}
                    </div>
                </div>
                <div class="absolute bottom-130 left-10" v-else>
                    <img src="../../assets/two.png" class="w30 h25 absolute top--15 left-50% ml--15 z2">
                    <van-space direction="vertical" align="center" :size="0" v-if="rankingListTop.length >= 2">
                        <div>
                            <van-image round width="16rem" height="16rem" :src="rankingListTop[1].icon"
                                class="b-3 b-#E1F8FF" />
                        </div>
                        <div>
                            <van-space :size="3">
                                <div class="text-14 c-#fff font-semibold">{{ rankingListTop[1].nickname }}</div>
                                <div class="i-my-icons-famale text-11" />
                            </van-space>
                        </div>
                        <!-- <div>
                            <van-space :size="4">
                                <div class="i-my-icons-diamond text-18" />
                                <div class="text-14 c-#fff font-medium">1220K</div>
                            </van-space>
                        </div> -->
                    </van-space>
                    <van-image round width="16rem" height="16rem" src="" class="b-3 b-#E1F8FF" v-else />
                </div>
                <!-- 第三名 -->
                <div class="absolute right--20 bottom-105" v-if="type === 'Couple'">
                    <img src="../../assets/three.png" class="w30 h25 absolute top--15 left-50% ml--15 z2">
                    <img src="../../assets/love_both.png" class="w34 h31 absolute top-5 left-50% ml--17 z2">
                    <van-space :size="0">
                        <div class="relative right--8">
                            <van-image round width="14rem" height="14rem" :src="rankingListTop[2].anchorIcon"
                                class="b-3 b-#FFB784" />
                        </div>
                        <div class="relative left--8">
                            <van-image round width="14rem" height="14rem" :src="rankingListTop[2].userIcon"
                                class="b-3 b-#FFB784" />
                        </div>
                    </van-space>
                    <div class="text-14 c-#fff font-medium">
                        {{ rankingListTop[2].anchorNickname }} & {{ rankingListTop[2].userNickname }}
                    </div>
                </div>
                <div class="absolute right-10 bottom-85" v-else>
                    <img src="../../assets/three.png" class="w30 h25 absolute top--15 left-50% ml--15 z2">
                    <van-space direction="vertical" align="center" :size="0" v-if="rankingListTop.length >= 3">
                        <div>
                            <van-image round width="16rem" height="16rem" :src="rankingListTop[2].icon"
                                class="b-3 b-#FFB784" />
                        </div>
                        <div>
                            <van-space :size="3">
                                <div class="text-14 c-#fff font-semibold">{{ rankingListTop[2].nickname }}</div>
                                <div class="i-my-icons-famale text-11" />
                            </van-space>
                        </div>
                        <!-- <div>
                            <van-space :size="4">
                                <div class="i-my-icons-diamond text-18" />
                                <div class="text-14 c-#fff font-medium">1220K</div>
                            </van-space>
                        </div> -->
                    </van-space>
                    <van-image round width="16rem" height="16rem" src="" class="b-3 b-#FFB784" v-else />
                </div>
            </div>
        </div>
        <!-- 第四名之后 -->
        <div class="mx24 mt360  ">
            <div v-if="type === 'Couple'" class="mt10 py16 b-b-1 b-#24003E flex justify-between items-center"
                v-for="item, index in rankingList">
                <van-space :size="0">
                    <div class="c-#BCA1E1 font-bold text-15 mr12">{{ index + 4 }}</div>
                    <div class="relative">
                        <img src="../../assets/love_both.png" class="w26 h23 absolute top-8 left-50% ml--13 z2">
                        <van-space :size="0">
                            <div class="relative right--5">
                                <van-image round width="10rem" height="10rem" :src="item.anchorIcon" class="" />
                            </div>
                            <div class="relative left--5">
                                <van-image round width="10rem" height="10rem" :src="item.userIcon" class="" />
                            </div>
                        </van-space>
                    </div>
                </van-space>
                <div class="text-15 c-#fff font-medium">
                    {{ item.anchorNickname }} & {{ item.userNickname }}
                </div>
            </div>
            <div v-else class="mt10 py16 flex justify-between items-center b-b-1 b-#24003E"
                v-for="item, index in rankingList">
                <div>
                    <van-space :size="0">
                        <div class="c-#BCA1E1 font-bold text-15 mr12">{{ index + 4 }}</div>
                        <div class="mr8">
                            <van-image round width="10rem" height="10rem" :src="item.icon" />
                        </div>
                        <div>
                            <van-space direction="vertical" :size="0">
                                <div class="text-15 c-#fff font-medium">{{ item.nickname }}</div>
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
const type = ref('Charm')
const router = useRouter()
const rankingList = ref([])
// const myValues = ref({})
const rankingListTop = ref([])
// tab栏切换回调
const onClickTab = (event) => {
    type.value = event.title
    rankingList.value = []
    if (event.title === "Charm") {
        getRankingListData('ANCHOR_CHARM')
    }
    else if (event.title === "Rich")
        getRankingListData('USER_RICH')
    else
        getRankingListData('ANCHOR_USER_COUPLE')
    // getRankingListData()
}
//获取排行榜数据
const getRankingListData = async (type = "ANCHOR_CHARM") => {
    const result = await getRankingList({
        currentPage: 0,
        pageSize: 100,
        rankType: type
    })
    rankingList.value = result//排行榜数据
    rankingListTop.value = rankingList.value.splice(0, 3)
    // myValues.value = result.rankingMineVo//个人信息
    // console.log(rankingList.value, rankingListTop.value);
}
onBeforeMount(() => {
    getRankingListData()
})
onMounted(() => {

    //组件挂载完成设置背景色
    document.querySelector('body').setAttribute('style', 'background-color:#130021')
})
onBeforeUnmount(() => {
    //组件卸载前去掉背景色
    document.querySelector('body').removeAttribute('style')
})
</script>

<style scoped>
:deep(.van-nav-bar) {
    background-color: transparent;
}

:deep(.van-tab--grow) {
    padding: 0 4rem;
}

:deep(.van-nav-bar__title) {
    max-width: 100%;
}
</style>