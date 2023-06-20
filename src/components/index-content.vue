<template>
    <!-- gutter="20" -->
    <div class="pt110 pb150 ">
        <van-row gutter="20">
            <van-col span="12" v-for=" (item, index) in homeStore.indexList" :key="index" class="mb20">
                <div class="">
                    <div class="h181  rounded-12 relative overflow-hidden"
                        @click="router.push({ path: 'detail', query: { id: item.userId, yxId: item.yxAccid } })">
                        <van-image :src="item.icon" fit="cover" />
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
                        <div
                            class="text-12 text-#fff font-semibold pl9 pr8 bg-gradient-to-r from-#FF9F00 to-#DE5D5D  rounded-l-10 absolute top-11 right-0">
                            TOP1
                        </div>
                        <div
                            class="text-12 text-#fff font-semibold py6 px8 rounded-13 absolute bottom-5 left-10 bg-gradient-to-r from-#FF8960 to-#FF62A5">
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
                        <div class="i-my-icons-video text-24" @click="invite(item.userId, item.yxAccid)" />
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
const router = useRouter()
//邀请通话
const invite = async (userId, yxId) => {
    try {
        const data = await homeStore.nim.signaling.callEx(homeStore.params)
        const channelInfo = data.channelInfo
        homeStore.inviteData = data
        homeStore.channelInfo = channelInfo
        console.warn('创建频道成功，data：', data, 'channelId 为', channelInfo.channelId, 'name 为', channelInfo.name)
        router.push({ path: 'waitcall', query: { userId, yxId } })
    } catch (error) {
        console.warn('创建频道失败，error：', error)
        if (error.code == 10405) {
            console.warn('频道已存在，请勿重复创建')
        }
    }
}

onMounted(() => {

})
onUnmounted(() => {
    //组件卸载时，停止监听
    // window.removeEventListener("scroll", scrollHandle, true);
});
</script>

<style scoped></style>