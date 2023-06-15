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
        <div class="w390 h390 relative mt30">
            <div class="animate-wave mx-auto">
                <div class="w1"></div>
                <div class="w2"></div>
                <div class="w3"></div>
                <div class="w4"></div>
            </div>
        </div>
        <!-- 匹配中按钮 -->
        <div>
            <van-button class="mx52 rounded-23 w270 h50 b-0  fixed bottom-150 text-center "
                style="background: linear-gradient(232deg, #D016C8 0%, #7F04BA 47%, #4D09C1 100%);">
                <van-space :size="5">
                    <img class="w24 h20" src="../../assets/heart.png">
                    <div class="text-16 c-#fff font-semibold">In Match . . .</div>
                </van-space>
            </van-button>
        </div>
        <!-- 确认清空消息记录 -->
        <van-dialog v-model:show="cancelMatch" class="important:bg-#130021 ">
            <template #default>
                <div class="text-center pt54 pb32 px20">
                    <div class="c-#fff text-20 font-medium">
                        Are you sure to clear all sessions?
                    </div>
                    <div class="mt33 ">
                        <van-space :size="33">
                            <button class="w124 h40 bg-#fff c-#5409C0 rounded-23 text-16 font-semibold"
                                @click="showEmpty = false;">Close</button>
                            <button
                                class="w124 h40 bg-gradient-to-r from-#4D09C1  via-#7F04BA to-#D016C8 c-#fff rounded-23 text-16 font-semibold"
                                @click="showEmpty = false; showBottom = false">Confirm</button>
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
const cancelMatch = ref(false)
onMounted(() => {
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
    background: #C3E4FF;
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