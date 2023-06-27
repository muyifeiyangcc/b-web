<template>
    <div>
        <!-- 呼叫用户展示 -->
        <div class="text-center pt130">
            <van-space direction="vertical" :size="0">
                <div class="w152 h152 bg-gradient-to-r from-#4D09C1  via-#7F04BA to-#D016C8 rounded-50% p2">
                    <img :src="userDetail.icon" class="w148 h148  rounded-50%">
                    <!-- <div class="w148 h148 bg-amber rounded-50%"></div> -->
                </div>
                <div class="text-22 c-#fff font-bold mt14">
                    {{ userDetail.nickname }}
                </div>
                <div class="mt15">
                    <van-space>
                        <div class="i-my-icons-famale text-14" v-if="userDetail.gender === 2" />
                        <div class="i-my-icons-male text-14" v-else />
                        <div class="text-14 c-#fff">{{ userDetail.age }}</div>
                        <div class="text-14">{{ countryEmoji }}</div>
                    </van-space>
                </div>
            </van-space>
            <!-- 挂断按钮 -->
            <div class="px80 py9 bg-gradient-to-r from-#4D09C1  via-#7F04BA to-#D016C8 rounded-23 mx40 mt160 "
                @click="ringOff" v-if="fromMatch">
                <van-space :size="3" align="center">
                    <img src="../../assets/phone.png" class="w28 h28">
                    <div class="c-#fff text-16 font-semibold">
                        Connection....
                    </div>
                </van-space>
            </div>
            <div @click="ringOff" class=" mt160" v-else>
                <img src="../../assets/hangup.png" class="w69 h69 inline-block">
            </div>
        </div>
        <img src="../../assets/back.png" class="absolute  w-full h-full  top-0 z--1" />
        <audio src='https://1v1firendscircle.s3.ap-southeast-1.amazonaws.com/ios/sender.mp3' autoplay loop></audio>
    </div>
</template>


<script  setup>
import { getEmoji } from '~/utils'
const homeStore = useHomeStore()
const userStore = useUserStore()
const router = useRouter()
const route = useRoute()
const userId = route.query.userId//对象ID
const yxId = route.query.yxId//对象云信ID
const fromMatch = route.query.fromMatch//对象是否来自匹配
const countryEmoji = ref('')
const userDetail = computed(() => userStore.userDetail)

if (fromMatch) {
    setTimeout(() => {
        router.push({ name: 'call', query: { userId } })
    }, 3000);
}
//取消邀请
const ringOff = async () => {
    try {
        let data = await homeStore.nim.signaling.cancelInvite({ channelId: homeStore.inviteData.channelInfo.channelId, toAccid: homeStore.params.toAccid, requestId: homeStore.params.requestId })
        console.warn('取消邀请成功，data：', data)
        router.push('/')
    } catch (error) {
        console.warn('取消邀请失败，error：', error)
        switch (error.code) {
            case 10404:
                console.warn('频道不存在')
                break
            case 10408:
                console.warn('邀请不存在或已过期')
                break
            case 10409:
                console.warn('邀请已经拒绝')
                break
            case 10410:
                console.warn('邀请已经接受')
                break
        }
    }
}
//邀请通话
const invite = async (userId, yxId) => {
    homeStore.params.toAccid = yxId
    try {
        const data = await homeStore.nim.signaling.callEx(homeStore.params)
        const channelInfo = data.channelInfo
        homeStore.inviteData = data
        homeStore.channelInfo = channelInfo
        console.warn('创建频道成功，data：', data, 'channelId 为', channelInfo.channelId, 'name 为', channelInfo.name)
    } catch (error) {
        console.warn('创建频道失败，error：', error)
        if (error.code == 10405) {
            console.warn('频道已存在，请勿重复创建')
        }
    }
}
onMounted(() => {
    //获取通话目标信息
    userStore.getUserDetailData(userId, yxId)
    invite(userId, yxId)
})
// 获取国家emoji
watch(userDetail, (newValue, oldValue) => {
    console.log(newValue.countryId.toUpperCase());
    countryEmoji.value = getEmoji(newValue.countryId.toUpperCase())
})
</script>

<style scoped></style>