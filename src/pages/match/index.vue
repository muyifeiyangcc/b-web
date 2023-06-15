<template>
    <div>
        <!-- 头部导航栏 -->
        <div ref="myRef">
            <van-nav-bar left-arrow @click-left="router.go(-1)" @click-right="" :border="false">
                <template #right>
                    <div>
                        <van-space :size="5">
                            <div class="i-my-icons-diamond" />
                            <div class="c-#fff text-14 font-medium">100</div>
                        </van-space>
                    </div>
                </template>
                <template #title>
                    <div class="c-#fff text-21 font-semibold">Edit profile</div>
                </template>
                <template #left>
                    <van-icon name="arrow-left" :size="22" color="#fff" />
                </template>
            </van-nav-bar>
        </div>
        <!-- 动画 -->
        <div class="w390 h390 relative mt30" v-if="matching">
            <div class="animate-wave mx-auto">
                <div class="w1"></div>
                <div class="w2"></div>
                <div class="w3"></div>
                <div class="w4"></div>
            </div>
        </div>
        <!-- 匹配到的用户展示 -->
        <div class="text-center mt90" v-else>
            <van-space direction="vertical" :size="0">
                <div class="w152 h152 bg-gradient-to-r from-#4D09C1  via-#7F04BA to-#D016C8 rounded-50% p2">
                    <img :src="target.icon" class="w148 h148  rounded-50%">
                    <!-- <div class="w148 h148 bg-amber rounded-50%"></div> -->
                </div>
                <div class="text-22 c-#fff font-bold mt14">
                    {{ target.nickname }}
                </div>
                <div class="mt15">
                    <van-space>
                        <div class="i-my-icons-famale text-14" v-if="target.gender === 2" />
                        <div class="i-my-icons-male text-14" v-else />
                        <div class="text-14 c-#fff">{{ target.age }}</div>
                    </van-space>
                </div>
            </van-space>
        </div>
        <!-- 匹配中按钮 -->
        <div v-if="matching">
            <van-button v-if="matching"
                class="mx52 rounded-23 w270 h50 b-0  fixed bottom-150 text-center bg-gradient-to-r from-#4D09C1  via-#7F04BA to-#D016C8 "
                @click="cancelMatch = true">
                <van-space :size="5">
                    <img class="w24 h20" src="../../assets/heart.png">
                    <div class="text-16 c-#fff font-semibold">In Match . . .</div>
                </van-space>
            </van-button>
        </div>
        <!-- 确认匹配用户按钮 -->
        <div class="mt94 text-center" v-else>
            <div>
                <van-button class=" rounded-23 w295 h46 b-0 bg-gradient-to-r from-#4D09C1  via-#7F04BA to-#D016C8"
                    @click="invite">
                    <van-space :size="5">
                        <img class="w24 h20" src="../../assets/heart.png">
                        <div class="text-16 c-#fff font-semibold">Just her</div>
                    </van-space>
                </van-button>
            </div>
            <div>
                <van-button class=" rounded-23 w295 h46 b-0  mt20  bg-gradient-to-r from-#4D09C1  via-#7F04BA to-#D016C8"
                    @click="startMatch">
                    <van-space :size="5">
                        <div class="text-16 c-#fff font-semibold">Next</div>
                    </van-space>
                </van-button>
            </div>
        </div>
        <!-- 确认清空消息记录 -->
        <van-dialog v-model:show="cancelMatch" class="important:bg-#130021">
            <template #default>
                <div class="text-center pt54 pb32 px20">
                    <div class="c-#fff text-22 font-bold">
                        Are you sue you want to stop matching?
                    </div>
                    <div class="mt33 ">
                        <van-space :size="20" direction="vertical">
                            <button
                                class="w295 py12 bg-gradient-to-r from-#4D09C1  via-#7F04BA to-#D016C8 c-#fff rounded-23 text-16 font-semibold"
                                @click="cancelMatch = false; showBottom = false">Keep matching</button>
                            <button class="w295 py12 bg-#fff c-#5409C0 rounded-23 text-16 font-semibold"
                                @click="router.push('/')">Quit</button>
                        </van-space>
                    </div>
                </div>
            </template>
            <template #footer>
            </template>
        </van-dialog>

    </div>
</template>


<script  setup>
import { getStartMatch } from '~/api/match'
const router = useRouter()
const cancelMatch = ref(false)
const target = ref({})//匹配到的用户信息
const matching = ref(true)//
const homeStore = useHomeStore()
// 开始匹配
const startMatch = async () => {
    matching.value = true
    const result = await getStartMatch({
        "gender": 2,
        "userType": 3
    })
    target.value = result
    setTimeout(() => {
        matching.value = false
    }, 5000)
}
//邀请通话
const invite = async () => {
    try {
        const data = await homeStore.nim.signaling.callEx(homeStore.params)
        const channelInfo = data.channelInfo
        homeStore.inviteData = data
        homeStore.channelInfo = channelInfo
        console.warn('创建频道成功，data：', data, 'channelId 为', channelInfo.channelId, 'name 为', channelInfo.name)
        router.push('/waitcall')
    } catch (error) {
        console.warn('创建频道失败，error：', error)
        if (error.code == 10405) {
            console.warn('频道已存在，请勿重复创建')
        }
    }
}
onMounted(() => {
    startMatch()
    //组件挂载完成设置背景色
    document.querySelector('body').setAttribute('style', 'background-color:#130021')
})
onBeforeUnmount(() => {
    //组件卸载前去掉背景色
    document.querySelector('body').removeAttribute('style')
})
</script>

<style scoped>
@keyframes opac {
    from {
        opacity: 1;
        width: 0;
        height: 0;
        top: 50%;
        left: 50%;
    }

    to {
        opacity: 0;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
    }
}

.animate-wave * {
    background: #52315E;
    position: absolute;
    border-radius: 50%;
    animation: opac 4s infinite;
}

.animate-wave .w2 {
    animation-delay: 1s;
}

.animate-wave .w3 {
    animation-delay: 2s;
}

.animate-wave .w4 {
    animation-delay: 3s;
}

.van-nav-bar {
    background-color: #130021;
}
</style>