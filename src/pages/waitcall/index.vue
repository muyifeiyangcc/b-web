<template>
    <div>
        <div>呼叫中</div>
        <van-button @click="ringOff">挂断</van-button>
    </div>
</template>


<script  setup>
import { nim } from '~/composables/main'
const homeStore = useHomeStore()
const router = useRouter()
// let channelId = computed(() => homeStore.inviteData.channelInfo.channelId)
const ringOff = async () => {
    try {
        let data = await nim.signaling.cancelInvite({ channelId: homeStore.inviteData.channelInfo.channelId, toAccid: homeStore.params.toAccid, requestId: homeStore.params.requestId })
        console.warn('取消邀请成功，data：', data)
        router.go(-1)
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
nim.signaling.on('signalingJoin', (event) => {
    console.log('对方已加入', event)
    router.push('/call')
})
nim.signaling.on('signalingReject', (event) => {
    console.log('对方已拒绝', event)
    router.go(-1)
})

</script>

<style scoped></style>