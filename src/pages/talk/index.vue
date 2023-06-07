<template>
    <div>
        <div ref="myRef">
            <van-nav-bar left-arrow @click-left="router.go(-1)" :border="false">
                <template #right>
                    <van-icon name="ellipsis" :size="22" color="#fff" />
                </template>
                <template #title>
                    <div class="text-#fff text-21 font-semibold">Johnny</div>
                </template>
                <template #left>
                    <van-icon name="arrow-left" :size="22" color="#fff" />
                </template>
            </van-nav-bar>
        </div>
        <!-- 聊天区 -->
        <div class="flex flex-col flex-col-reverse mx15 pb20 overflow-scroll" :style="{ height: scrollHeight + 'px' }">
            <div v-for=" item, index in talkList " class=" c-#fff text-16 font-medium mt44 " :key="index">
                <!-- 时间，待开发 -->
                <!-- <div>time</div> -->
                <!-- 左侧气泡 -->
                <div class="" v-if="item.flow === 'in'">
                    <van-space :size="11">
                        <van-image round width="12rem" height="12rem"
                            src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" />
                        <div class="bg-#1B0D2C py13 px22 rounded-r-12 rounded-lt-12">{{ item.body }}</div>
                    </van-space>
                </div>
                <!-- 右侧气泡 -->
                <div class="flex flex-row-reverse " v-if="item.flow === 'out'">
                    <van-space>
                        <div
                            class="bg-#1B0D2C py13 px22 bg-gradient-to-r from-#4D09C1  via-#7F04BA to-#D016C8 rounded-l-12 rounded-rt-12">
                            {{ item.body }}
                        </div>
                        <van-image round width="12rem" height="12rem"
                            src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" />
                    </van-space>
                </div>
            </div>
        </div>
        <!-- 输入区 -->
        <div ref="reference" class="mx15 ">
            <van-space :size="10">
                <div class="w295">
                    <van-cell-group inset>
                        <van-field v-model="sendTextMsgOption.body" rows="1" autosize label="" center type="textarea"
                            placeholder="Type a message..." @keydown.enter="sendTextMessage">
                            <template #button>
                                <img src="../../assets/emojbtn.png" class="w24 h24">
                            </template>
                        </van-field>
                    </van-cell-group>
                </div>
                <div class="text-center">
                    <button class="w36 h36" @click="sendTextMessage"><img src="../../assets/send.png" alt=""></button>
                </div>
            </van-space>
            <div class="pt18 pb31">
                <van-space :size="32">
                    <button class="w32 h32"><img src="../../assets/voice.png" alt=""></button>
                    <button class="w32 h32"><img src="../../assets/album.png" alt=""></button>
                    <button class="w32 h32"><img src="../../assets/video.png" alt=""></button>
                </van-space>
            </div>
        </div>
    </div>
</template>


<script  setup>
const myRef = ref();
const reference = ref()
const scrollHeight = ref(0)
const homeStore = useHomeStore()
const router = useRouter()
// const message = ref('hi')
const talkList = computed(() => homeStore.talkList)
// const nim = computed(() => )




//发送文本消息配置项
const sendTextMsgOption = ref({
    scene: "p2p",
    to: "c398a3961d954af7841f95b43ed6d85b",
    body: '',
    onSendBefore: function (msg) {
        console.log('Get msg before send', msg)
    }
})
//发送文本消息
const sendTextMessage = async () => {
    const msg = await homeStore.nim.msg.sendTextMsg(sendTextMsgOption.value)
    sendTextMsgOption.value.body = ''
    console.log('发送了一条消息', msg);
    homeStore.talkList.unshift(msg)
}

onMounted(() => {
    //标记进入聊天页面
    homeStore.setInTalkPage(true)
    //清理未读消息
    homeStore.resetUnread()
    //获取聊天历史记录
    homeStore.getHistoryTalkList()
    //动态计算滚动区高度
    scrollHeight.value = window.innerHeight - myRef.value.offsetHeight - reference.value.offsetHeight
    // 组件挂载完成设置背景色
    document.querySelector('body').setAttribute('style', 'background-color:#130021')
})
onBeforeUnmount(() => {
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

.van-nav-bar {
    background-color: #130021;
}
</style>