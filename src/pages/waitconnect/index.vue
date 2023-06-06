<template>
    <div>
        <div>收到通话邀请</div>
        <van-button @click="getThrough">接通</van-button>
        <van-button @click="rejectInvite">拒绝</van-button>
    </div>
</template>


<script  setup>
import { nim } from '~/main'
const homeStore = useHomeStore()
const router = useRouter()
// 接受邀请
const getThrough = async () => {
    try {
        let data = await nim.signaling.joinAndAccept({ channelId: homeStore.acceptData.metaData.channelInfo.channelId, fromAccid: homeStore.acceptData.fromAccid, requestId: homeStore.acceptData.requestId })
        console.warn('接受邀请并加入成功，data', data)
        homeStore.channelInfo = data.channelInfo//保存房间数据
        homeStore.memberList = data.memberList//保存房间内用户数据
        router.push('/call')
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
//拒绝邀请
const rejectInvite = async () => {
    try {
        await nim.signaling.reject({ channelId: homeStore.acceptData.metaData.channelInfo.channelId, fromAccid: homeStore.acceptData.fromAccid, requestId: homeStore.acceptData.requestId })
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

nim.signaling.on('signalingCancelInvite', function (event) {
    console.log('对方已取消', event)
    router.go(-1)
})
</script>

<style scoped></style>