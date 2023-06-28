<template>
    <div>
        <van-popup v-model:show="giftStore.showGiftView" :style="{ height: '40%' }" position="bottom"
            overlay-class="bg-transparent" class="bg-#000/40 backdrop-blur-20 p0 ">
            <template #default>
                <div>
                    <div class="flex justify-between px18 py14">
                        <div>
                            <van-space>
                                <img src="../assets/give_gift.png" class="w18 h18">
                                <div class="text-16 c-#fff">Gift</div>
                            </van-space>
                        </div>
                        <div>
                            <van-space>
                                <div class="i-my-icons-diamond text-18" />
                                <div class="text-16 c-#fff">{{ userStore.mineInfo.diamondNum }}</div>
                            </van-space>
                        </div>
                    </div>
                    <div class="px5 text-center bg-#000/10  pt11 pb8 b-t-1 b-#000/50">
                        <van-row>
                            <van-col :span="6" v-for="item, index in giftStore.giftList" :key="index">
                                <div @click="giftId = item.id" class="rounded-5"
                                    :class="giftId === item.id ? 'bg-#fff/15' : ''">
                                    <van-space direction="vertical" align="center">
                                        <img :src="item.giftImg" class="w57 h60">
                                        <div>
                                            <van-space>
                                                <div class="i-my-icons-diamond text-14" />
                                                <div class="text-12 c-#fff">{{ item.giftPrice }}</div>
                                            </van-space>
                                        </div>
                                    </van-space>
                                </div>
                            </van-col>
                        </van-row>
                    </div>
                    <div class="flex flex-row-reverse px15 mt12">
                        <van-button
                            class="c-#fff font-semibold text-14 px28 py8 rounded-15 b-0 bg-gradient-to-r from-#4D09C1  via-#7F04BA to-#D016C8"
                            @click="sendGift">Send</van-button>
                    </div>
                </div>
            </template>
        </van-popup>
    </div>
</template>


<script  setup>
const router = useRouter()
const userStore = useUserStore()
const giftStore = useGiftStore()
const giftId = ref(null)
const sendGift = () => {
    giftStore.postGift(giftId.value, 1, 'VIDEO', userStore.userDetail.yxAccid)
    userStore.getMineInfoData()
}
</script>

<style scoped></style>