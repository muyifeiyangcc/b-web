<template>
    <div>
        <div ref="myRef">
            <van-nav-bar left-arrow @click-left="router.go(-1)" @click-right="showBottom = !showBottom" :border="false"
                :fixed="true">
                <template #right>
                    <van-icon name="ellipsis" :size="22" color="#fff" />
                </template>
                <template #title>
                    <div class="text-#fff text-21 font-semibold">{{ route.query.nick || 'unKnown' }}</div>
                </template>
                <template #left>
                    <van-icon name="arrow-left" :size="22" color="#fff" />
                </template>
            </van-nav-bar>
        </div>
        <!-- 聊天区 -->
        <div class="flex flex-col flex-col-reverse mx15 pt45 pb30 overflow-scroll " :style="{ height: scrollHeight + 'px' }"
            ref="talk">
            <div v-for=" item, index in talkList" class=" c-#fff text-16 font-medium mt44 " :key="index">
                <!-- 时间，待开发 -->
                <!-- <div>time</div> -->
                <!-- 左侧气泡---对方 -->
                <div class="" v-if="item.flow === 'in'">
                    <van-space :size="11">
                        <van-image round width="12rem" height="12rem"
                            :src="route.query.avatar || 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg'" />
                        <div class="bg-#1B0D2C py10 px22 rounded-r-12 rounded-lt-12 max-w250 break-words">{{ item.body }}
                        </div>
                    </van-space>
                </div>
                <!-- 右侧气泡---我 -->
                <div class="flex flex-row-reverse " v-if="item.flow === 'out'">
                    <van-space>
                        <div
                            class="bg-#1B0D2C py10 px22 bg-gradient-to-r from-#4D09C1  via-#7F04BA to-#D016C8 rounded-l-12 rounded-rt-12 max-w250 break-words">
                            {{ item.body }}

                        </div>
                        <van-image round width="12rem" height="12rem" :src="userStore.mineInfo.icon" />
                    </van-space>
                </div>
            </div>
        </div>
        <!-- 输入区 -->
        <div ref="reference" class="mx15 py20 bg-#130021">
            <van-row>
                <van-col :span="21">
                    <div>
                        <van-cell-group inset>
                            <van-field v-model="sendTextMsgOption.body" placeholder="Type a message..."
                                @keydown.enter="sendTextMessage">
                                <template #button>
                                    <img src="../../assets/emojbtn.png" class="w24 h24">
                                </template>
                            </van-field>
                        </van-cell-group>
                    </div>
                </van-col>
                <van-col :span="3">
                    <div class="text-center">
                        <button @click="sendTextMessage">
                            <img src="../../assets/send.png" class="w36 h36">
                        </button>
                    </div>
                </van-col>
            </van-row>
            <div class="pt18">
                <van-space :size="38">
                    <button class="w32 h32"><img src="../../assets/voice.png"></button>
                    <button class="w32 h32"><img src="../../assets/album.png"></button>
                    <button class="w32 h32"><img src="../../assets/video.png" @click="callHer"></button>
                </van-space>
            </div>
        </div>
        <!-- 拉黑弹窗 -->
        <van-popup v-model:show="showBottom" position="bottom" :style="{ height: '37%' }" class="bg-#130021">
            <template #default>
                <div class="w46 h6 rounded-5 bg-#E9E9E9/10 mx-auto mt16"></div>
                <div @click="router.push('report')"
                    class="c-#fff text-16 font-bold mx15 text-center pt15 pb12 rounded-6 bg-gradient-to-r from-#D016C8  via-#7F04BA to-#4D09C1 mt49">
                    Report
                </div>
                <div @click="setBlockUser()"
                    class="c-#fff text-16 font-bold mx15 text-center pt15 pb12 rounded-6 bg-gradient-to-r from-#4D09C1  via-#7F04BA to-#D016C8 mt10">
                    Block
                </div>
                <div class="c-#fff text-16 font-bold mx15 text-center pt15 pb12 rounded-6 bg-#440699/10 mt21"
                    @click="showBottom = false">
                    Cancel
                </div>
            </template>
        </van-popup>
        <img src="../../assets/gift.png" class="fixed bottom-200 right-15 w57 h56"
            @click="giftStore.showGiftView = !giftStore.showGiftView">
        <give-present />
        <van-toast />
        <get-diamonds-chat />
    </div>
</template>


<script  setup>
import { blockUser } from '~/api/user'
import { showSuccessToast } from 'vant';
const myRef = ref();
const reference = ref()
const showBottom = ref(false)
const scrollHeight = ref(0)
const homeStore = useHomeStore()
const userStore = useUserStore()
const giftStore = useGiftStore()
const router = useRouter()
const route = useRoute()
const talkList = computed(() => homeStore.talkList)
const to = route.query.to

//发送文本消息配置项
const sendTextMsgOption = ref({
    scene: "p2p",
    to,
    body: '',
    onSendBefore: function (msg) {
        console.log('发送了一条消息', msg);
    }
})
const talk = ref()
//呼叫主播
const callHer = () => {
    if (userStore.mineInfo.diamondNum >= userStore.userDetail.videoPrice) {
        router.push({ path: 'waitcall', query: { userId: userStore.userDetail.userId, yxId: userStore.userDetail.yxAccid } })
    } else {
        homeStore.getDiamondsVisible = true
    }
}
//发送文本消息
const sendTextMessage = async () => {
    const msg = await homeStore.nim.msg.sendTextMsg(sendTextMsgOption.value)
    sendTextMsgOption.value.body = ''
    homeStore.talkList.unshift(msg)
    talk.value.scrollTop = 0
}

// 拉黑
const setBlockUser = async () => {
    await blockUser({
        type: 1,
        userId: userStore.userDetail.userId,
        yxAccid: to
    }).then(() => {
        showBottom.value = false
        showSuccessToast('success')
        router.push('message')
    })
}
const scrollHandle = () => {
    scrollHeight.value = window.innerHeight - myRef.value.offsetHeight - reference.value.offsetHeight
}
onMounted(() => {
    window.addEventListener('resize', scrollHandle)

    //标记进入聊天页面
    homeStore.setInTalkPage(true)
    //获取聊天历史记录
    homeStore.getHistoryTalkList(route.query.to)
    //获取聊天对象信息
    userStore.getUserDetailData('', to)
    //动态计算滚动区高度
    scrollHeight.value = window.innerHeight - myRef.value.offsetHeight - reference.value.offsetHeight
    // 组件挂载完成设置背景色
    document.querySelector('body').setAttribute('style', 'background-color:#130021')
})
onBeforeUnmount(() => {
    window.removeEventListener('resize', scrollHandle)
    homeStore.setInTalkPage(false)
    //组件卸载前去掉背景色
    document.querySelector('body').removeAttribute('style')
})
// watch(talkList, () => {
//     console.log(talkList.value);
// })
</script>


<style scoped>
.van-cell-group--inset {
    margin: 0
}
</style>