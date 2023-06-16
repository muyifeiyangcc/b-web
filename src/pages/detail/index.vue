<template>
    <div>
        <!-- 导航栏 -->
        <div ref="myRef" class="">
            <van-nav-bar left-arrow @click-left="router.go(-1)" @click-right="showBottom = !showBottom" :border="false">
                <template #right>
                    <van-icon name="ellipsis" :size="22" color="#fff" font-bold />
                </template>
                <template #left>
                    <van-icon name="arrow-left" :size="22" color="#fff" />
                </template>
            </van-nav-bar>
        </div>
        <!-- 相册列表 -->
        <div class="h309 overflow-hidden absolute top-0">
            <img :src="userDetail.icon" class="">
            <!-- 在线状态 -->
            <div class="text-12 text-#fff font-semibold px7 rounded-10 bg-#000/20  absolute top-140 left-10">
                <van-space :size="2">
                    <div class="w6 h6 rounded-50% bg-#2BC100" v-if="userDetail.status === 1" />
                    <div class="w6 h6 rounded-50% bg-#FE5A05" v-if="userDetail.status === 10000" />
                    <div class="w6 h6 rounded-50% bg-#A0A0A9" v-if="userDetail.status === 2" />
                    <div v-if="userDetail.status === 1">Online</div>
                    <div v-if="userDetail.status === 10000">Busy</div>
                    <div v-if="userDetail.status === 2">Offline</div>
                </van-space>
            </div>
            <!-- 相册列表 -->
            <div class="absolute top-180 left-10">
                <div>
                    <van-image width="56" height="56" src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" />
                </div>
            </div>
        </div>
        <!-- 详细信息 -->
        <div class="bg-#130021 h800 w-390 absolute z-2 top-250 rounded-t-24">
            <!-- 个人介绍 -->
            <div class="ml24 mt32">
                <van-space direction="vertical">
                    <div class="text-22 font-bold c-#fff">Stella Malone</div>
                    <div>
                        <van-space :size="10">
                            <div class="i-my-icons-famale text-14 " />
                            <div class="c-#fff text-14">24</div>

                        </van-space>
                    </div>
                    <div class="c-#E2E2E2 text-12">Hello, everyone. I'm from the United States. I hope to makefriends
                        with
                        you...
                    </div>
                </van-space>
            </div>
            <!-- 视频 -->
            <div class="ml24 mt24">
                <div class="text-16 font-semibold c-#fff">
                    Videos
                </div>
                <div class="mt8">
                    <div class="rounded-4 overflow-hidden text-0 w95">
                        <van-image width="95" height="95" src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" />
                    </div>
                </div>
            </div>
            <!-- 信息 -->
            <div class="mx24 mt22">
                <div class="text-16 font-semibold c-#fff">
                    information
                </div>
                <div class="bg-#AFA8FF/10  px16 py22 rounded-4 mt10">
                    <div class="flex items-center justify-between">
                        <div class="c-#E2E2E2 text-12 ">Country:</div>
                        <div class="text-14 c-#fff font-semibold">Ukrane</div>
                    </div>

                    <div class="flex items-center justify-between mt22">
                        <div class="c-#E2E2E2 text-12 ">Comments:</div>
                        <div class="">
                            <van-space :size="34">
                                <div>
                                    <van-space :size="4">
                                        <img src="../../assets/thumbs-up_1f44d.png" class="w16 h20">
                                        <div class="c-#E2E2E2 text-12">121</div>
                                    </van-space>
                                </div>
                                <div>
                                    <van-space :size="4">
                                        <img src="../../assets/fx_im_icon_love_both.png" class="w22 h22">
                                        <div class="c-#E2E2E2 text-12">121</div>
                                    </van-space>
                                </div>
                            </van-space>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 标签 -->
            <div class="flex justify-between mx24 mt16">
                <div
                    class="px20 py7 rounded-20 bg-gradient-to-r from-#D016C8  via-#7F04BA to-#4D09C1 text-14 c-#fff font-semibold">
                    Sweet
                </div>
                <div
                    class="px25 py7 rounded-20 bg-gradient-to-r from-#D016C8  via-#7F04BA to-#4D09C1 text-14 c-#fff font-semibold">
                    Cute
                </div>
                <div
                    class="px28 py7 rounded-20 bg-gradient-to-r from-#D016C8  via-#7F04BA to-#4D09C1 text-14 c-#fff font-semibold">
                    Long legs
                </div>
            </div>
            <!-- 礼物墙 -->
            <div class="mx24 mt22">
                <div class="text-16 font-semibold c-#fff">Gift received</div>
                <div class="bg-#AFA8FF/10  px10 py15 rounded-4 mt10">
                    <van-space wrap>
                        <div v-for="item, index in userDetail.giftList">
                            <div class="c-#fff text-12">
                                <van-space direction="vertical" align="center">
                                    <gift :id="item.giftId" />
                                    <div>x{{ item.num }}</div>
                                </van-space>
                            </div>
                        </div>
                    </van-space>
                </div>
            </div>
            <!-- 朋友圈 -->
            <div class="mx24 mt24" v-if="momentData !== undefined">
                <div class="text-16 font-semibold c-#fff">Moments</div>
                <div class=" bg-#AFA8FF/10 rounded-8 px20 py24 mb15 " v-for="item, index in momentData" :key="index">
                    <!-- 第一行 -->
                    <div class="flex justify-between">
                        <div>
                            <van-space>
                                <div class="bg-gradient-to-b from-#CC15C7 to-#5109C1 rounded-40 p1">
                                    <img :src="item.icon" class="w40 h40 rounded-40" />
                                </div>
                                <div>
                                    <van-space direction="vertical" :size="0">
                                        <div>
                                            <van-space :size="4">
                                                <div class="text-16 font-bold text-#fff">
                                                    {{ item.nickname }}
                                                </div>
                                                <div class="i-my-icons-famale text-14" />
                                            </van-space>
                                        </div>
                                        <div class="text-#ccc text-12">{{ getMomentsTime(item.createTime) }}</div>
                                    </van-space>
                                </div>
                            </van-space>
                        </div>
                        <div>
                            <van-space :size="16">
                                <button><img src="../../assets/chat.png" class="w32 h32"></button>
                                <button><img src="../../assets/video.png" class="w32 h32"></button>
                            </van-space>
                        </div>
                    </div>
                    <!-- 第二行 -->
                    <div class="text-14 c-#fff mt10">
                        {{ item.textContent }}
                    </div>
                    <!-- 第三行 -->
                    <div class="mt9">
                        <van-space>
                            <img src="../../assets/tans.png" class="w14 h14">
                            <div class="text-12 c-#8F6FB8">View translations</div>
                        </van-space>
                    </div>
                    <!-- 第四行 -->
                    <div class="flex justify-between mt13">
                        <div v-for="item, index in item.imgUrls" :key="index" class="rounded-4 overflow-hidden text-0">
                            <van-image width="88" height="88" :src="item" :key="index" v-if="index < 3" fit="cover"
                                @click="showImg(item)" />
                        </div>
                    </div>
                    <!-- 第五行 -->
                    <div class="flex justify-between pt16">
                        <div class="">
                            <van-space :size="52">
                                <div>
                                    <van-space>
                                        <van-icon v-if="item.likeFlag === 0" name="like-o" color="#fff" :size="20"
                                            @click="likeCircle(item.id, 1, index)" />
                                        <van-icon v-else name="like" color="#FB3A54" :size="20"
                                            @click="likeCircle(item.id, 0, index)" />
                                        <div class="c-#fff">{{ item.likeNum }}</div>
                                    </van-space>
                                </div>
                                <div>
                                    <van-space>
                                        <!-- <img src="../../assets/list_btn_comment.png" class="w20 h20"> -->
                                        <van-icon name="comment-o" color="#fff" :size="20" @click="clickComment(item.id)" />
                                        <div class="c-#fff">{{ item.commentNum }}</div>
                                    </van-space>
                                </div>
                            </van-space>
                        </div>
                        <van-icon name="ellipsis" color="#ccc" :size="20" @click="showBottom = !showBottom" />
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>


<script  setup>
import { getUserDetail } from '~/api/home'
const userStore = useUserStore()
const momentsStore = useMomentsStore()
const route = useRoute()
const router = useRouter()
const userId = route.query.userId;
const yxAccid = route.query.yxId;
const userDetail = ref({})//用户数据
const momentData = ref({})//用户朋友圈内容
//获取用户详情
const getUserDetailData = async () => {
    userDetail.value = await getUserDetail({
        userId, yxAccid
    })
    console.log(userDetail.value);
}
//获取用户朋友圈内容
const getMomentData = async (id) => {
    momentData.value = await momentsStore.getFriendsCircleList(id)
}
onMounted(() => {
    //获取用户详情数据
    getUserDetailData()

    userStore.getMineInfoData()
    //获取用户朋友圈内容
    getMomentData(userId)
    //组件挂载完成设置背景色
    document.querySelector('body').setAttribute('style', 'background-color:#130021')
})
onBeforeUnmount(() => {
    //组件卸载前去掉背景色
    document.querySelector('body').removeAttribute('style')
})
</script>

<style scoped>
.van-nav-bar {
    background-color: transparent;
}
</style>