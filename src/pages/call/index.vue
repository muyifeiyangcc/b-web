<template>
    <div>
        <div class="relative b-1 max-w-450 " ref="remoteVideoContent" :style="{ height: viewHeight + 'px' }">
            <!-- 本地视频窗口 -->
            <div ref="localVideoContent" class="absolute right-14 top-50 w115 h151 b-1 z-2"></div>
            <!-- 左上角主播信息 -->
            <div class="absolute left-16 top-50 z-99">
                <van-space direction="vertical">
                    <div class="bg-#000/25 pl3 pr7 rounded-23 inline-block">
                        <van-space>
                            <van-image round width="8.5rem" height="8.5rem"
                                src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" />
                            <div>
                                <van-space direction="vertical" :size="2">
                                    <div class="text-14 c-#fff font-semibold">Stella Malone</div>
                                    <div class="c-#E2E2E2 text-12 ">25</div>
                                </van-space>
                            </div>
                            <div
                                class="px7 py7 text-0 rounded-50% text-center bg-gradient-to-r from-#4D09C1  via-#7F04BA to-#D016C8">
                                <van-icon name="plus" color="#fff" class="font-bold text-12" />
                            </div>
                        </van-space>
                    </div>
                    <div class="bg-#000/25 rounded-23 inline-block px16 pt8 pb3">
                        <van-space :size="5">
                            <img src="../../assets/weizhi.png" class="w12 h17">
                            <div class="c-#E2E2E2 text-12">Vietnam</div>
                        </van-space>
                    </div>
                </van-space>
            </div>
            <!-- 右侧限时充值 -->
            <div class="absolute right-6 top-220 z-99" v-if="showDialog">
                <img src="../../assets//recharge.png" class="w105 h105"><!--背景图 -->
                <img src="../../assets/close.png" class="w16 h16 absolute top-0 right-12"
                    @click="showDialog = false"><!--关闭按钮 -->
                <div class="absolute left-50% ml--30 top-65">
                    <van-space direction="vertical" align="center" :size="2">
                        <div class="text-12 c-#fff font-medium">x2450</div>
                        <div
                            class="text-14 c-#fff font-semibold bg-gradient-to-r from-#4D09C1  via-#7F04BA to-#D016C8 w61 py6 text-center rounded-14">
                            $4.99
                        </div>
                    </van-space>
                </div>
            </div>
            <!-- 右下角切换摄像头等 -->
            <div class="absolute right-14 bottom-100 z-99">
                <van-space direction="vertical" :size="12">
                    <div><img src="../../assets/ic_gift.png" class="w42 h42"
                            @click="giftStore.showGiftView = !giftStore.showGiftView">
                    </div>
                    <div><img src="../../assets/ic_iens.png" class="w42 h42" @click="changeCamera"></div>
                    <div><img src="../../assets/ic_record.png" class="w42 h42" @click="finishCall"></div>
                </van-space>
            </div>
            <!-- 聊天区域 -->
            <div class="absolute bottom-100 left-15 w270 h200 z-99">
                <div class="h150 overflow-scroll">
                    <div class="c-#E2E2E2 text-14 " v-for=" in 80">
                        you : what do you do
                    </div>
                </div>
                <div class="c-#fff text-12 absolute bottom-0">⚠️&nbsp&nbspViolence, pornography, danger and other contents
                    are prohibited
                </div>
            </div>
            <!-- 聊天输入框 -->
            <div class="pl16 pt6 pb3 b-t-1 b-#EBEBEB/10 bg-transparent absolute bottom-38 w-full z-99">
                <van-row>
                    <van-col :span="20">
                        <div class="">
                            <van-field v-model="content" placeholder="Type a message..." ref="field" class="rounded-5">
                                <template #button>
                                    <img src="../../assets/emojbtn.png" class="w24 h24">
                                </template>
                            </van-field>
                        </div>
                    </van-col>
                    <van-col :span="4">
                        <div class="text-center ">
                            <button class="w36 h36"><img src="../../assets/send.png" alt=""></button>
                        </div>
                    </van-col>
                </van-row>
            </div>
            <!-- 送礼弹框 -->
            <give-present :show="presentShow" />
        </div>
    </div>
</template>

<script  setup>
import NERTC from "nertc-web-sdk/NERTC"
const uid = '112'//后期通过api获取
const appkey = '124f689baed25c488e1330bc42e528af'; // 请输入自己的appkey
const homeStore = useHomeStore()
const giftStore = useGiftStore()
const client = NERTC.createClient({ appkey, debug: true })
const localVideoContent = ref()//本地视频流播放窗口
const remoteVideoContent = ref()//远端视频流播放窗口
const viewHeight = window.innerHeight
const showDialog = ref(true)
const presentShow = ref(false)
const router = useRouter()
const allCamera = ref([])//全部的摄像头
const nowCamera = ref({})//当前正在使用的摄像头
const localStream = ref(null)
// 监听远端用户发布视频流的事件
client.on('stream-added', event => {
    const remoteStream = event.stream;
    console.warn('收到别人的发布消息: ', remoteStream.streamID, 'mediaType: ', event.mediaType)
    //订阅远端流
    remoteStream.setSubscribeConfig({
        audio: true,//订阅麦克风音频
        audioSlave: true,//订阅音频辅流
        video: true,//订阅视频
        screenShare: true,//订阅屏幕共享
        highOrLow: NERTC.STREAM_TYPE.HIGH,//订阅大流
    })
    client.subscribe(remoteStream).then(() => {
        console.warn(`subscribe 成功 ${remoteStream.streamID}`)
    });
});
//播放订阅的对端的音视频流
client.on('stream-subscribed', event => {
    // 远端流订阅成功
    const remoteStream = event.stream;
    console.warn('订阅别人的流成功的通知: ', remoteStream.streamID, 'mediaType: ', event.mediaType)
    // 播放远端流
    remoteStream.play(remoteVideoContent.value).then(() => {
        console.warn('播放对端的流成功')
        // 设置远端视频画布
        remoteStream.setRemoteRenderMode({
            // width: remoteVideoContent.value.clientWidth,
            // height: remoteVideoContent.value.clientHeight,
            width: 500,
            height: remoteVideoContent.value.clientHeight,
            cut: true
        });
    });
});

//开始通话
const call = async function () {
    // 进房成功后开始推流
    try {
        await client.join({
            channelName: homeStore.channelInfo.name, uid
        }).then((obj) => {
            console.info('加入房间成功...')
        })

        const cameras = await NERTC.getCameras();    //获取可用的视频输入设备
        const microphones = await NERTC.getMicrophones();     //获取可用的麦克风设备
        console.log(cameras);
        allCamera.value = cameras
        nowCamera.value = cameras[0]
        // const localStream = NERTC.createStream({ uid, audio: true, video: true });
        localStream.value = NERTC.createStream({ uid, audio: true, video: true, cameraId: nowCamera.value.deviceId });
        //设置视频推流属性
        localStream.value.setVideoProfile({
            resolution: NERTC.VIDEO_QUALITY_1080p,//分辨率
            frameRate: NERTC.VIDEO_FRAME_RATE.CHAT_VIDEO_FRAME_RATE_30,//帧率
        })
        //初始化本地流
        await localStream.value.init();
        // 播放本地流
        localStream.value.play(localVideoContent.value);
        // 设置本地视频画布
        localStream.value.setLocalRenderMode({
            width: localVideoContent.value.clientWidth,
            height: localVideoContent.value.clientHeight,
            cut: false,
        });
        await client.publish(localStream.value);
    } catch (error) {
        console.error(error);
    }
}

//结束通话
const finishCall = async function () {
    await client.leave().then(() => router.push('/'))
}
//切换摄像头
let i = 0
const changeCamera = async () => {
    if (i < allCamera.value.length - 1) {
        i = i + 1
    }
    else { i = 0 }
    nowCamera.value = allCamera.value[i]
    console.log(i, allCamera.value.length, allCamera.value[i].deviceId);
    await localStream.value.switchDevice('video', nowCamera.value.deviceId)
}
onMounted(() => {
    call()
})
</script>

<style scoped></style>