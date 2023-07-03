<template>
    <!-- gutter="20" -->
    <div class="pt110 pb150 ">
        <van-row gutter="20">
            <van-col span="12" v-for=" (item, index) in homeStore.indexList" :key="index" class="mb20">
                <div class="">
                    <div class="h200  rounded-12 relative overflow-hidden"
                        @click="router.push({ path: 'detail', query: { id: item.userId, yxId: item.yxAccid } })">
                        <!-- 背景图 -->
                        <van-image :src="item.icon" fit="cover" />
                        <!-- 在线状态 -->
                        <div class="text-12 text-#fff font-semibold px7 rounded-10 bg-#000/[.06]  absolute top-11 left-10">
                            <van-space :size="2">
                                <div class="w6 h6 rounded-50% bg-#2BC100" v-if="item.status === 1" />
                                <div class="w6 h6 rounded-50% bg-#FE5A05" v-if="item.status === 10000" />
                                <div class="w6 h6 rounded-50% bg-#A0A0A9" v-if="item.status === 2" />
                                <div v-if="item.status === 1">Online</div>
                                <div v-if="item.status === 10000">Busy</div>
                                <div v-if="item.status === 2">Offline</div>
                            </van-space>
                        </div>
                        <!-- top等级 -->
                        <div class="text-12 text-#fff font-semibold px9 py1 rounded-l-10 absolute top-11 right-0"
                            :class="topColorList[index]" v-if="index < 4">
                            TOP {{ index + 1 }}
                        </div>
                        <!-- 评分等级  A、SS、SS-->
                        <div class="text-12 text-#fff font-semibold text-center py6 w29  rounded-13 absolute bottom-5 left-10"
                            v-if="['SS', 'S', 'A'].includes(item.anchorLevelName)"
                            :class="anchorLevelNameColorList[item.anchorLevelName]">
                            {{ item.anchorLevelName }}
                        </div>
                    </div>

                    <div class="mt10 flex justify-between items-center">
                        <van-space :size="0">
                            <van-image round width="32" height="32" class="b-2" :src="item.icon" />
                            <div class="ml4">
                                <van-space direction="vertical" :size="3">
                                    <div>
                                        <van-space :size="3">
                                            <div class="text-14 text-#fff font-semibold">{{ item.nickname }}</div>
                                            <div class="text-14">{{ getEmoji(item.countryId) }}</div>
                                        </van-space>
                                    </div>
                                    <div>
                                        <van-space :size="4">
                                            <div class="text-#fff text-12 opacity-70">{{ item.age }}</div>
                                            <div class="i-my-icons-male text-11 " v-if="item.gender === 1" />
                                            <div class="i-my-icons-famale text-11 " v-if="item.gender === 2" />
                                        </van-space>
                                    </div>
                                </van-space>
                            </div>
                        </van-space>
                        <div class="i-my-icons-video text-24" @click="callHer(item.userId, item.yxAccid)" />
                    </div>
                </div>
            </van-col>
        </van-row>
    </div>
</template>

<script  setup>
import { useHomeStore } from '~/stores';
import { getEmoji } from '~/utils'
const homeStore = useHomeStore()
const userStore = useUserStore()
const router = useRouter()
const anchorLevelNameColorList = {
    SS: 'bg-gradient-to-r from-#FF8960 to-#FF62A5',
    S: 'bg-gradient-to-r from-#4D09C1  via-#7F04BA to-#D016C8',
    A: 'bg-#FFAE60',
}

const topColorList = [
    'bg-gradient-to-r from-#FF9F00 to-#DE5D5D',
    'bg-gradient-to-r from-#97E3DF to-#5DADDE',
    'bg-gradient-to-r from-#D2A03E to-#B57100',
    'bg-gradient-to-r from-#989898 to-#3B3B3B'
]

const callHer = (userId, yxId) => {
    userStore.getUserDetailData(userId, yxId)
    router.push({ path: 'waitcall', query: { userId, yxId } })
}
onMounted(() => {

})
onUnmounted(() => {
    //组件卸载时，停止监听
    // window.removeEventListener("scroll", scrollHandle, true);
});
</script>

<style scoped></style>