<template>
    <div>
        <div>

            <van-popup v-model:show="show" class="bg-transparent">
                <div class="relative text-center">
                    <img src="../assets/hotgirl_bg.png" class="w349 h392">
                    <div class="absolute top-113 flex justify-between w-full px20">
                        <div class="bg-blue  w96 h133 rounded-10 overflow-hidden" v-for="item, index in recommendAnchorList"
                            :key="index">
                            <img :src="item.icon" class="w-full h-full">
                            <div class="w96 flex justify-between items-center  absolute bottom-7 px7 ">
                                <img src="../assets/message_b.png" class="w26 h26">
                                <img src="../assets/video_b.png" class="w26 h26">
                            </div>
                        </div>
                    </div>
                    <div class="relative bottom-110">
                        <van-space :size="27">
                            <div
                                class="w121 h40 p1 bg-gradient-to-r from-#4D09C1  via-#7F04BA to-#D016C8 rounded-20  overflow-hidden flex justify-center items-center">
                                <van-button class="w-full h-full  text-16 font-semibold c-#4E4E4E b-0 bg-#fff rounded-20"
                                    @click="getRecommendAnchorData">Refresh</van-button>
                            </div>
                            <van-button
                                class="w121 h40 rounded-20 text-16 font-semibold c-#fff bg-gradient-to-r from-#4D09C1  via-#7F04BA to-#D016C8 b-0">Say
                                Hello</van-button>
                        </van-space>
                    </div>
                </div>
            </van-popup>
        </div>
    </div>
</template>


<script  setup>
import { getRecommendAnchor } from '~/api/home'
let recommendAnchorList = ref([])
let show = ref(false)

//获取首页推荐
const getRecommendAnchorData = async () => {
    const result = await getRecommendAnchor()
    recommendAnchorList.value = result
}

const showRecommend = setInterval(() => {
    getRecommendAnchorData()
    show.value = true
    if (show.value) {
        clearInterval(showRecommend)
    }
}, 20 * 1000);

onBeforeUnmount(() => {
    //组件卸载前去掉定时器
    clearInterval(showRecommend)
})
</script>

<style scoped></style>