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
            <div class=" mt160">
                <van-space :size="102">
                    <!-- 挂断按钮 -->
                    <div @click="rejectInvite">
                        <img src="../../assets/hangup.png" class="w69 h69 inline-block">
                    </div>
                    <!-- 接通按钮 -->
                    <div @click="getThrough">
                        <img src="../../assets/answer.png" class="w69 h69 inline-block">
                    </div>
                </van-space>
            </div>
        </div>
        <img src="../../assets/back.png" class="absolute  w-full h-full  top-0 z--1" />
        <audio src='https://1v1firendscircle.s3.ap-southeast-1.amazonaws.com/ios/receive.mp3' autoplay loop></audio>
    </div>
</template>


<script  setup>
import { getEmoji } from '~/utils'
const homeStore = useHomeStore()
const userStore = useUserStore()
const router = useRouter()
const route = useRoute()
const yxId = route.query.yxId
const pushRobot = route.query.pushRobot
const countryEmoji = ref('')
const userDetail = computed(() => userStore.userDetail)
// const options = ref()
if (pushRobot) {
    var autoExit = setTimeout(() => { router.go(-1) }, homeStore.attachEvent.waitTime * 1000)
}

// 接受邀请
const getThrough = async () => {
    if (!pushRobot) {
        const option = {
            channelId: homeStore.acceptData.metaData.channelInfo.channelId,
            fromAccid: homeStore.acceptData.fromAccid,
            requestId: homeStore.acceptData.requestId,
            uid: userStore.mineInfo.userId
        }
        try {
            let data = await homeStore.nim.signaling.joinAndAccept(option)
            console.warn('接受邀请并加入成功，data', data)
            homeStore.channelInfo = data.channelInfo//保存房间数据
            homeStore.memberList = data.memberList//保存房间内用户数据
            router.push({ name: 'call', query: { channelName: homeStore.channelInfo.channelId, remark: 'callIn', type: 'directCall' } })
        } catch (error) {
            console.warn('接受邀请并加入失败，error：', error)
            switch (error.code) {
                case 10407:
                    console.warn('已经在频道内')
                    break
                case 10419:
                    console.warn('频道人数超限')
                    break
                case 10417:
                    console.warn('频道成员uid冲突了')
                    break
                case 10420:
                    console.warn('当前账号在其他端已经登录，并且已经在频道内')
                    break
                case 10404:
                    console.warn('频道不存在')
                    break
            }
        }
    }
    else {
        clearTimeout(autoExit)
        router.push({ name: 'call', query: { pushRobot, remark: 'callIn', type: 'directCall' } })
    }
}

//拒绝邀请
const rejectInvite = async () => {
    if (!pushRobot) {
        try {
            await homeStore.nim.signaling.reject({ channelId: homeStore.acceptData.metaData.channelInfo.channelId, fromAccid: homeStore.acceptData.fromAccid, requestId: homeStore.acceptData.requestId })
            console.warn('拒绝邀请成功')
            router.go(-1)
        } catch (error) {
            console.warn('拒绝邀请失败，error：', error)
            switch (error.code) {
                case 10408:
                    console.warn('邀请不存在或已过期')
                    break
                case 10409:
                    console.warn('邀请已经拒绝')
                    break
                case 10410:
                    console.warn('邀请已经接受')
                    break
                case 10201:
                    console.warn('对方不在线')
                    break
                case 10404:
                    console.warn('频道不存在')
                    break
            }
        }
    }
    else {
        clearTimeout(autoExit)
        router.go(-1)
    }
}

onMounted(() => {
    //获取通话目标信息
    userStore.getUserDetailData("", yxId)
})
// 获取国家emoji
watch(userDetail, (newValue, oldValue) => {
    countryEmoji.value = getEmoji(newValue.countryId)
})
</script>

<style scoped></style>