<template>
    <div>
        <div class="relative  max-w-450  relative  overflow-hidden" ref="remoteVideoContent"
            :style="{ height: viewHeight + 'px' }">

            <video ref="videoPlay" class="w-full h-full object-cover" autoplay playsinline webkit-playsinline
                src="https://jdvodlzmcwbkr.vod.126.net/jdvodlzmcwbkr/65-1344695788849105-1647831230565-0.mp4"
                v-if="fromMatch || pushRobot"></video>
            <!-- <video ref="videoPlay" class="w-full h-full object-cover" :src="robotVideoList" autoplay muted playsinline
                webkit-playsinline v-if="fromMatch || pushRobot"></video> -->

            <!-- 本地视频窗口 -->
            <img :src="userStore.userDetail.icon" class="absolute w-full h-full z--1 blur-10">
            <div ref="localVideoContent"
                class="absolute right-14 top-50 w115 h151 b-1 z-2 bg-#000 overflow-hidden rounded-11"></div>
            <!-- 左上角主播信息 -->
            <div class="absolute left-16 top-50 z-99">
                <van-space direction="vertical">
                    <div class="bg-#000/25 pl3 pr7 rounded-23 inline-block">
                        <van-space>
                            <van-image round width="8.5rem" height="8.5rem" :src="userStore.userDetail.icon" />
                            <div>
                                <van-space direction="vertical" :size="2">
                                    <div class="text-14 c-#fff font-semibold">{{ userStore.userDetail.nickname }}</div>
                                    <div class="c-#E2E2E2 text-12 ">{{ userStore.userDetail.age }}</div>
                                </van-space>
                            </div>
                            <div class="px7 py7 text-0 rounded-50% text-center bg-gradient-to-r from-#4D09C1  via-#7F04BA to-#D016C8"
                                @click="userStore.followOrNo()">
                                <van-icon name="success" color="#fff" class="font-bold text-12"
                                    v-if="userStore.userDetail.followed" />
                                <van-icon name="plus" color="#fff" class="font-bold text-12" v-else />
                            </div>
                        </van-space>
                    </div>
                    <div class="bg-#000/25 rounded-23 inline-block px16 pt8 pb3">
                        <van-space :size="5">
                            <img src="../../assets/weizhi.png" class="w12 h17">
                            <div class="c-#E2E2E2 text-12">{{ userStore.userDetail.countryId }}</div>
                        </van-space>
                    </div>
                </van-space>
            </div>
            <!-- 右侧特惠充值 -->
            <div class="absolute right-6 top-220 z-99" v-if="showDialog" @click="recharge">
                <img src="../../assets//recharge.png" class="w105 h105"><!--背景图 -->
                <img src="../../assets/close.png" class="w16 h16 absolute top-0 right-12"
                    @click="showDialog = false"><!--关闭按钮 -->
                <div class="absolute left-50% ml--30 top-65">
                    <van-space direction="vertical" align="center" :size="2">
                        <div class="text-12 c-#fff font-medium">
                            x{{ rechargeList[1]?.diamondNum }}
                        </div>
                        <div
                            class="text-14 c-#fff font-semibold bg-gradient-to-r from-#4D09C1  via-#7F04BA to-#D016C8 w61 py6 text-center rounded-14">
                            ${{ rechargeList[1]?.price }}
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
            <div class="absolute bottom-100 left-15 w270 h300 z-99">
                <div class="h250 overflow-scroll flex flex-col-reverse ">
                    <div class=" text-14 " v-for="item, index in homeStore.talkList" :key="index"
                        :class="item.user === 'her' ? 'c-#eda60d' : 'c-#fff'">
                        {{ item.user }} : {{ item.content }}
                    </div>
                </div>
                <!-- <div class="c-#fff text-12 absolute bottom-0">⚠️&nbsp&nbspViolence, pornography, danger and other contents
                    are prohibited
                </div> -->
            </div>
            <!-- 聊天输入框 -->
            <div class="pl16 pt6 pb3 b-t-1 b-#EBEBEB/10 bg-transparent absolute bottom-38 w-full z-99" ref="chat">
                <van-row>
                    <van-col :span="20">
                        <div class="">
                            <van-field v-model="msg" placeholder="Type a message..." ref="field" class="rounded-5">
                                <template #button>
                                    <img src="../../assets/emojbtn.png" class="w24 h24">
                                </template>
                            </van-field>
                        </div>
                    </van-col>
                    <van-col :span="4">
                        <div class="text-center ">
                            <button class="w36 h36" @click="sendMsg()"><img src="../../assets/send.png"></button>
                        </div>
                    </van-col>
                </van-row>
            </div>
            <!-- 送礼 -->
            <give-present :show="presentShow" />
            <!-- 索要礼物弹窗 -->
            <van-popup v-model:show="homeStore.requestGift" round overlay-class="bg-#000/40 backdrop-blur-20"
                :close-on-click-overlay="false">
                <div class="w343 h290 bg-#130021 text-center pt90 relative rounded-16">
                    <img :src="findGift(homeStore.giftId).giftImg"
                        class="w133 h133 absolute top--50 left-50% ml--61 z-2004">
                    <div class="">
                        <van-space direction="vertical" :size="20">
                            <div>
                                <van-space>
                                    <div class="i-my-icons-diamond text-21" />
                                    <div class="c-#fff text-18 font-bold">{{
                                        findGift(homeStore.giftId).giftPrice
                                    }}</div>
                                    <!-- <div class="c-#fff text-18 font-bold">{{ userStore.mineInfo.diamondNum }}</div> -->
                                </van-space>
                            </div>
                            <div class="c-#E3E3E3 text-16 font-medium">
                                She ask me for this gift
                            </div>
                        </van-space>
                    </div>
                    <div class="mt48">
                        <van-space :size="33">
                            <div class="text-16 c-#5409C0 w124 py10 bg-#fff rounded-23 text-center font-semibold"
                                @click="refuseGive" v-if="!(free === 1 && pushRobot)">
                                Refuse
                            </div>
                            <div class="text-16 c-#fff w124 py10 bg-gradient-to-rt from-#4D09C1  via-#7F04BA to-#D016C8 rounded-23 text-center font-semibold"
                                @click="agreeGive">
                                Agree
                            </div>
                        </van-space>
                    </div>
                </div>
            </van-popup>
            <!-- 余额不足，限时充值弹窗 -->
            <van-popup v-model:show="showGetCoin" position="bottom" :close-on-click-overlay="false"
                class="h50% rounded-t-24 bg-gradient-to-rt from-#4D09C1  via-#7F04BA to-#D016C8">
                <div class="text-center">
                    <div class="mx-auto w177 h177 mt18 relative">
                        <div class="absolute left-53 top-70">
                            <van-count-down ref="countDown" :time="10000" format="mm:ss"
                                class="important:text-24 important:c-#fff important:font-bold " @finish="timeFinish"
                                :auto-start="false" />
                        </div>
                        <img src="../../assets/bg_circle.png" class="">
                    </div>
                    <div class="text-16 font-semibold c-#fff mx73">curreri all balance is insufficient please recharge</div>
                    <div class="flex justify-between items-center mx30 mt30 py13 px15 bg-#fff/20 rounded-14">
                        <div>
                            <van-space>
                                <div class="i-my-icons-diamond text-18" />
                                <div class="text-15 font-bold c-#fff">9800</div>
                            </van-space>
                        </div>
                        <div class="c-#4E09C1 text-15 font-medium px12 py6 rounded-20 bg-#fff">
                            $19.99
                        </div>
                    </div>
                </div>
            </van-popup>
        </div>
        <van-toast />
    </div>
</template>

<script  setup>
import NERTC from "nertc-web-sdk/NERTC"
import { rejectAskGift } from '~/api/gift'
import { getRobotVideo } from '~/api/match'
import { heartbeat } from '~/api/wallet'
import { showFailToast } from 'vant';
import { getRechargeList } from '~/api/wallet'
const appkey = '124f689baed25c488e1330bc42e528af'; // 请输入自己的appkey
const secondCount = ref(0)//进入直播页面开始计时
const homeStore = useHomeStore()
const giftStore = useGiftStore()
const userStore = useUserStore()
const localVideoContent = ref()//本地视频流播放窗口
const remoteVideoContent = ref()//远端视频流播放窗口
const viewHeight = window.innerHeight
const showDialog = ref(true)
const presentShow = ref(false)
// const requestGift = ref(false)
const showGetCoin = ref(false)
// const time = ref(10000);
const uid = userStore.mineInfo.userId//后期通过api获取
const router = useRouter()
const route = useRoute()
const allCamera = ref([])//全部的摄像头
const nowCamera = ref({})//当前正在使用的摄像头
const localStream = ref(null)
const msg = ref('')
const robotVideoList = ref('')
const countDown = ref()//倒计时组件实例
const fromMatch = route.query.fromMatch//是否来自匹配的标记
const pushRobot = route.query.pushRobot//是否来自推送的机器人
const free = route.query.free//是否来自推送的机器人
const remark = route.query.remark//拨打类型
const type = route.query.type//通话类型
const channelId = Date.now()
// const channelName = mark === 'calling' ? homeStore.channelInfo.channelId : route.query.channelName
let channelName = route.query.channelName//通话频道名称，用于加入通话房间
var heartBeatTimeout
var freeTimeout
const chat = ref()

// callTime: 通话时长(如果是免费的, 这个时间一到就挂电话)
if (userStore.userDetail.free === 1) {
    freeTimeout = setTimeout(() => { router.go(-1) }, homeStore.attachEvent.callTime * 1000)
}

//获取主播视频列表
async function getRobotVideoList() {
    const result = await getRobotVideo({ userId: userStore.userDetail.userId })
    console.log(result);
    robotVideoList.value = result[0].videoUrl
}
if (fromMatch || pushRobot) {
    channelName = Date.now()
    getRobotVideoList()
}
// 监听远端用户发布视频流的事件
homeStore.client.on('stream-added', event => {
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
    homeStore.client.subscribe(remoteStream).then(() => {
        console.warn(`subscribe 成功 ${remoteStream.streamID}`)
    });
});

//播放订阅的对端的音视频流
homeStore.client.on('stream-subscribed', event => {
    // 远端流订阅成功
    const remoteStream = event.stream;
    console.warn('订阅别人的流成功的通知: ', remoteStream.streamID, 'mediaType: ', event.mediaType)
    // 播放远端流
    remoteStream.play(remoteVideoContent.value).then(() => {
        console.warn('播放对端的流成功')
        // 设置远端视频画布
        remoteStream.setRemoteRenderMode({
            // width: remoteVideoContent.value.clientWidth,
            height: remoteVideoContent.value.clientHeight,
            width: 700,
            // height: 1000,
            cut: true
        });
    });
});

homeStore.client.on('connection-state-change', (evt) => {
    console.log(`connection-state-change ${evt.prevState} => ${evt.curState}。是否重连：${evt.reconnect}`)
})

//远端用户加入房间通知回调，建议在收到此回调后再进行设置远端视图等的操作
homeStore.client.on('peer-online', evt => {
    console.log(`${evt.uid} 加入房间`)
})

//远端用户退出房间通知回调
homeStore.client.on('peer-leave', evt => {
    console.log(`${evt.uid} 退出房间`)
    finishCall()
})

homeStore.client.on("stream-removed", (evt) => {
    // 远端流停止，则关闭渲染
    evt.stream.stop(evt.mediaType);
});

//加入通话房间
const joinCall = async () => {
    await homeStore.client.join({
        channelName,
        uid,
        token: null
    }).then((obj) => {
        initLocalStream()
        console.info('加入房间成功...')
    })
}
//开始通话
const initLocalStream = async function () {
    // 进房成功后开始推流
    try {
        const microphones = await NERTC.getMicrophones();//获取可用的麦克风设备
        const cameras = await NERTC.getCameras();//获取可用的视频输入设备
        console.log(cameras);
        cameras.forEach(item => {
            allCamera.value.push(item.deviceId)
        });
        nowCamera.value = allCamera.value[0]
        localStream.value = NERTC.createStream({ uid, audio: true, video: true, cameraId: nowCamera.value, client: homeStore.client });
        //设置视频推流属性
        localStream.value.setVideoProfile({
            resolution: NERTC.VIDEO_QUALITY_1080p,//分辨率
            frameRate: NERTC.VIDEO_FRAME_RATE.CHAT_VIDEO_FRAME_RATE_30,//帧率
        })
        //初始化本地流
        localStream.value.init().then(() => {
            console.warn('音视频初始化完成，播放本地视频')
            // 播放本地流
            localStream.value.play(localVideoContent.value);
            // 设置本地视频画布
            localStream.value.setLocalRenderMode({
                width: 150,
                height: localVideoContent.value.clientHeight,
                cut: true,
            });
            homeStore.client.publish(localStream.value).then(() => {
                console.warn('本地 publish 成功')
                videoPlay.value.play()
                console.log('播放视频执行了');
            });
        })
    } catch (error) {
        console.error(error);
    }
}
//结束通话
const finishCall = function () {
    homeStore.client.leave().then(() => router.push('/'))
}

//切换摄像头
let i = 0
const changeCamera = async () => {
    if (i < allCamera.value.length - 1) {
        i = i + 1
    }
    else { i = 0 }
    nowCamera.value = allCamera.value[i]
    await localStream.value.switchDevice('video', nowCamera.value)
}

//确认赠送主播索要礼物
const agreeGive = () => {
    homeStore.requestGift = false
    giftStore.postGift(homeStore.giftId, 1, 'VIDEO', userStore.userDetail.yxAccid)
    userStore.getMineInfoData()
}
//拒绝赠送主播索要礼物
const refuseGive = async () => {
    const result = await rejectAskGift({ anchorYxAccid: userStore.userDetail.yxAccid, giftId: homeStore.giftId })
    homeStore.sendImMsg(userStore.userDetail.yxAccid, { attachType: 16 })
    homeStore.requestGift = false
}
//余额不足触发限时充值弹窗
const showGetCoinDialog = () => {
    showGetCoin.value = true
    nextTick(() => countDown.value.start())
}
//倒计时结束
const timeFinish = () => {
    showGetCoin.value = false
    // countDown.value.reset()
    finishCall()
}
//用户心跳    remark拨打类型=>callIn：呼入，callOut：打出  type通话类型=>match：匹配，directCall：直接发起通话
const userHeartBeat = async () => {
    const option = {
        channelId,
        free: Number(free),
        receiverYxAccid: userStore.userDetail.yxAccid,
        remark,
        type
    }
    heartbeat(option).then((res) => {
        if (res.nextBalanceIsSufficient === 1) {
            heartBeatTimeout = setTimeout(() => userHeartBeat(option), res.nextRequestInterval * 1000)
            userStore.getMineInfoData()
        }
        else {
            showFailToast(`Insufficient Balance`)
            showGetCoinDialog()
        }
    })
    console.log('心跳执行了')
}
//发送消息
const sendMsg = (user = 'my', content = msg.value) => {
    homeStore.sendImMsg(userStore.userDetail.yxAccid, { attachType: -1, content: msg.value })
    homeStore.talkList.unshift({ user, content })
    console.log(homeStore.talkList);
    msg.value = ''
}
// 根据礼物id查找礼物
const findGift = (id) => {
    const result = giftStore.giftList.filter((item) => {
        if (item.id === id) {
            return item
        }
    })

    console.log(result);
    return result[0]
}
//开始通话计时
var interval = setInterval(() => {
    secondCount.value++
}, 1000)
watch(secondCount, () => {
    // 是机器人
    if (pushRobot) {
        console.log('push', pushRobot);
        //免费机器人
        if (free === 1) {
            if (secondCount.value === 1) {
                sendMsg('her', 'Hi,What\'s your name?')
            }
            if (secondCount.value === 20) {
                sendMsg('her', 'Give me a gift, I will show you more!')
            }
            if (secondCount.value === 25) {
                sendMsg('her', 'Give me a gift, I will show you more!')
            }
            if (secondCount.value === 30) {
                homeStore.robotRequestGift()
            }
        }
        //付费机器人
        else {
            if (secondCount.value === 1) {
                sendMsg('her', 'Hi,What\'s your name?')
            }
            if (secondCount.value % 50 === 0) {
                homeStore.robotRequestGift()
            }
        }
    }
})
const rechargeList = ref([])
// 获取充值列表
const getRechargeListData = () => {
    getRechargeList().then((res) => {
        rechargeList.value = res
        console.log(rechargeList.value)
    })
}
//充值
const recharge = () => {
    const batchNo = rechargeList.value[1].batchNo
    window.flutter_inappwebview.callHandler('recharge', batchNo);
}

const videoPlay = ref()
onMounted(() => {
    // window.addEventListener('resize', scrollHandle)
    userHeartBeat()
    joinCall()
    getRechargeListData()
})

onBeforeUnmount(() => {
    clearInterval(interval)
    // clearInterval(sentUserState)
    clearTimeout(heartBeatTimeout)
    clearTimeout(freeTimeout)
    homeStore.talkList = []
})

</script>

<style scoped>
:deep(.van-popup) {
    overflow: visible;
}
</style>