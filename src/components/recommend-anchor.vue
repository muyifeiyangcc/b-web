<template>
    <div>
        <div>

            <van-popup v-model:show="show" class="bg-transparent">
                <div class="relative text-center">
                    <img src="../assets/hotgirl_bg.png" class="w349 h392">
                    <div class="absolute top-113 w-full px20">
                        <van-row :gutter="10">
                            <van-col v-for="item, index in recommendAnchorList" :key="index" :span="8">
                                <div class=" w-full h133 rounded-10 relative overflow-hidden flex flex-col-reverse">
                                    <img :src="item.icon" class="w-full h-full absolute ">
                                    <div class="flex justify-between items-center px7 relative z-2 bottom-10">
                                        <img src="../assets/message_b.png" class="w26 h26"
                                            @click="router.push({ name: 'talk', query: { to: item.yxAccid, nick: item.nickname, avatar: item.icon } })">
                                        <img src="../assets/video_b.png" class="w26 h26"
                                            @click="router.push({ name: 'waitcall', query: { userId: item.userId, yxId: item.yxAccid, free: item.videoPrice > 0 ? 0 : 1 } })">
                                    </div>
                                </div>
                            </van-col>
                        </van-row>
                    </div>
                    <div class="relative bottom-110">
                        <van-space :size="27">
                            <div
                                class="w121 h40 p1 bg-gradient-to-r from-#4D09C1  via-#7F04BA to-#D016C8 rounded-20  overflow-hidden flex justify-center items-center">
                                <van-button class="w-full h-full  text-16 font-semibold c-#4E4E4E b-0 bg-#fff rounded-20"
                                    @click="getRecommendAnchorData">Refresh</van-button>
                            </div>
                            <van-button
                                class="w121 h40 rounded-20 text-16 font-semibold c-#fff bg-gradient-to-r from-#4D09C1  via-#7F04BA to-#D016C8 b-0"
                                @click="sayHello">
                                Say Hello
                            </van-button>
                        </van-space>
                    </div>
                </div>
            </van-popup>
        </div>
    </div>
</template>

<script  setup>
import { getRecommendAnchor } from '~/api/home'
const router = useRouter()
const homeStore = useHomeStore()
let recommendAnchorList = ref([])
let show = ref(false)

//获取首页推荐
const getRecommendAnchorData = () => {
    getRecommendAnchor().then((res) => {
        recommendAnchorList.value = res.slice(0, 3)
        show.value = true
    })
}

const showRecommend = setInterval(() => {
    if (show.value) {
        return
    }
    getRecommendAnchorData()
}, 20 * 1000);


//发送文本消息
const sendTextMessage = async (to) => {
    const msg = await homeStore.nim.msg.sendTextMsg({
        scene: "p2p",
        to,
        body: 'Hi,Can we start a video chat',
        onSendBefore: function (msg) {
            console.log('发送了一条消息', msg);
        }
    })
}

const sayHello = () => {
    recommendAnchorList.value.forEach(item => {
        sendTextMessage(item.yxAccid)
    });
    show.value = false
}
onMounted(() => {
}),
    onBeforeUnmount(() => {
        //组件卸载前去掉定时器
        clearInterval(showRecommend)
    })
</script>

<style scoped></style>