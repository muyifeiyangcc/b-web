<template>
    <div>
        <h1>
            NERTC Video Call
        </h1>
        <div class="text-center">
            <button type="button" id="startCall" @click="call" class="b-1 h30">开始通话</button>
            <button type="button" id="finishCall" @click="finishCall" class="b-1 h30 ml20">结束通话</button>
        </div>

        <div class="relative b-1 max-w-400 h600" id="remoteVideoContent">
            <div id="localVideoContent" class="absolute right-14 top-50 w115 h151 b-1 z-2"></div>
        </div>
    </div>
</template>

<script  setup>
import NERTC from "nertc-web-sdk/NERTC"
let appkey = '124f689baed25c488e1330bc42e528af'; // 请输入自己的appkey
let localStream;
const homeStore = useHomeStore()
const uid = '112'
const client = NERTC.createClient({ appkey, debug: true })

// 监听远端用户发布视频流的事件
client.on('stream-added', event => {
    const remoteStream = event.stream;
    console.warn('收到别人的发布消息: ', remoteStream.streamID, 'mediaType: ', event.mediaType)
    //订阅远端流
    client.subscribe(remoteStream).then(() => {
        console.warn(`subscribe 成功 ${remoteStream.streamID}`)
    });
});
//播放订阅的对端的音视频流
client.on('stream-subscribed', event => {
    // 远端流订阅成功
    const remoteStream = event.stream;
    console.warn('订阅别人的流成功的通知: ', remoteStream.streamID, 'mediaType: ', event.mediaType)
    // 设置远端视频画布
    remoteStream.setRemoteRenderMode({
        width: 300,
        height: 380,
        cut: true
    });
    // 播放远端流
    remoteStream.play('remoteVideoContent');

});
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
        localStream = NERTC.createStream({ uid, audio: true, video: true, cameraId: '6551c3af8458d50493f7f878c893099bfdb99c2cf4fba703e0e51dc455340663' });
        localStream.setVideoProfile({
            resolution: 2,//分辨率
            frameRate: NERTC.VIDEO_FRAME_RATE.CHAT_VIDEO_FRAME_RATE_30,//帧率
        })
        console.log(cameras);
        await localStream.init();
        // 设置本地视频画布
        localStream.setLocalRenderMode({
            width: 150,
            height: 150,
            cut: true
        });
        // 播放本地流
        localStream.play("localVideoContent");
        await client.publish(localStream);
    } catch (error) {
        console.error(error);
    }
}

const finishCall = async function () {
    await client.leave();
}

onMounted(() => {
    call()
})
</script>

<style scoped></style>