<template>
    <div>
        <div class="relative">
            <!-- 导航栏 -->
            <div ref="myRef" class="">
                <van-nav-bar left-arrow @click-left="router.go(-1)" @click-right="showBottom = !showBottom" :border="false"
                    :fixed="true">
                    <template #right>
                        <van-icon name="ellipsis" :size="22" color="#fff" font-bold />
                    </template>
                    <template #left>
                        <van-icon name="arrow-left" :size="22" color="#fff" />
                    </template>
                </van-nav-bar>
            </div>
            <!-- 相册列表 -->
            <div class="">
                <img :src="userStore.userDetail.icon" class="absolute  top-0">
                <!-- 在线状态 -->
                <div class="text-12 text-#fff font-semibold px7 rounded-10 bg-#000/20  absolute top-140 left-10">
                    <van-space :size="2">
                        <div class="w6 h6 rounded-50% bg-#2BC100" v-if="userStore.userDetail.status === 1" />
                        <div class="w6 h6 rounded-50% bg-#FE5A05" v-if="userStore.userDetail.status === 10000" />
                        <div class="w6 h6 rounded-50% bg-#A0A0A9" v-if="userStore.userDetail.status === 2" />
                        <div v-if="userStore.userDetail.status === 1">Online</div>
                        <div v-if="userStore.userDetail.status === 10000">Busy</div>
                        <div v-if="userStore.userDetail.status === 2">Offline</div>
                    </van-space>
                </div>
                <!-- 相册列表 -->
                <div class="absolute top-180 overflow-scroll w-full  px10">
                    <van-space :size="4">
                        <div v-for="item, index in userStore.picList" :key="index">
                            <van-image width="56" height="56" :src="item.mediaUrl" @click="showImg(item.mediaUrl)" />
                        </div>
                    </van-space>
                </div>
            </div>
            <!-- 详细信息 -->
            <div class="bg-#130021  top-250 rounded-t-24 absolute w-full pb130">
                <!-- 个人介绍 -->
                <div class="ml24 mt32">
                    <van-space direction="vertical">
                        <div class="text-22 font-bold c-#fff">{{ userStore.userDetail.nickname }}</div>
                        <div>
                            <van-space :size="10">
                                <div class="i-my-icons-famale text-14 " v-if="userStore.userDetail.gender === 2" />
                                <div class="i-my-icons-male text-14 " v-else />
                                <div class="c-#fff text-14">{{ userStore.userDetail.age }}</div>

                            </van-space>
                        </div>
                        <div class="c-#E2E2E2 text-12">
                            {{ userStore.userDetail.description }}
                        </div>
                    </van-space>
                </div>
                <!-- 视频 -->
                <div class="ml24 mt24">
                    <div class="text-16 font-semibold c-#fff">
                        Videos
                    </div>
                    <div class="mt8 overflow-scroll w-full ">
                        <van-space>
                            <div class="rounded-4 overflow-hidden text-0 w95 h95 overflow-hidden"
                                v-for="item, index in userStore.videoList" :key="index" @click="startVideo(item.mediaUrl)">
                                <video :src="item.mediaUrl"></video>
                                <!-- :poster="item.videoCover" -->
                            </div>
                        </van-space>
                    </div>
                    <van-popup v-model:show="showVideo" overlay-class="bg-#000/40 backdrop-blur-20">
                        <video :src="videoUrl" autoplay="true" controls="controls" class="w100vh object-cover"></video>
                    </van-popup>
                </div>
                <!-- 信息 -->
                <div class="mx24 mt22">
                    <div class="text-16 font-semibold c-#fff">
                        information
                    </div>
                    <div class="bg-#AFA8FF/10  px16 py22 rounded-4 mt10">
                        <div class="flex items-center justify-between">
                            <div class="c-#E2E2E2 text-12 ">Country:</div>
                            <div class="text-14 c-#fff font-semibold">{{ userStore.userDetail.countryId }}</div>
                        </div>

                        <div class="flex items-center justify-between mt22">
                            <div class="c-#E2E2E2 text-12 ">Comments:</div>
                            <div class="">
                                <van-space :size="34">
                                    <div>
                                        <van-space :size="4">
                                            <img src="../../assets/thumbs-up_1f44d.png" class="w16 h20">
                                            <div class="c-#E2E2E2 text-12">{{ userStore.userDetail.thumbs ?
                                                userStore.userDetail.thumbs[0].num : 0 }}
                                            </div>
                                        </van-space>
                                    </div>
                                    <div>
                                        <van-space :size="4">
                                            <img src="../../assets/fx_im_icon_love_both.png" class="w22 h22">
                                            <div class="c-#E2E2E2 text-12">{{ userStore.userDetail.thumbs ?
                                                userStore.userDetail.thumbs[1].num : 0 }}</div>
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
                        <van-row>
                            <van-col :span="6" v-for="item, index in userStore.userDetail.giftList">
                                <div>
                                    <div class="c-#fff text-12">
                                        <van-space direction="vertical" align="center">
                                            <gift :id="item.giftId" />
                                            <div>x{{ item.num }}</div>
                                        </van-space>
                                    </div>
                                </div>
                            </van-col>
                        </van-row>
                    </div>
                </div>
                <!-- 朋友圈 -->
                <div class="mx24 mt24" v-if="momentData.length !== 0">
                    <div class="text-16 font-semibold c-#fff">Moments</div>
                    <div class="mt15 pb150">
                        <div class=" bg-#AFA8FF/10 rounded-8 px20 py24 mb15 " v-for="item, index in momentData"
                            :key="index">
                            <!-- 第一行 -->
                            <div class="flex justify-between items-center">
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
                                <van-icon name="ellipsis" color="#ccc" :size="20" />
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
                                <div v-for="item, index in item.imgUrls" :key="index"
                                    class="rounded-4 overflow-hidden text-0">
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
                                                <van-icon v-if="item.likeFlag === 0" name="like-o" color="#fff"
                                                    :size="20" />
                                                <van-icon v-else name="like" color="#FB3A54" :size="20" />
                                                <div class="c-#fff">{{ item.likeNum }}</div>
                                            </van-space>
                                        </div>
                                        <div>
                                            <van-space>
                                                <van-icon name="comment-o" color="#fff" :size="20" />
                                                <div class="c-#fff">{{ item.commentNum }}</div>
                                            </van-space>
                                        </div>
                                    </van-space>
                                </div>

                            </div>
                        </div>
                    </div>
                    <!-- 图片预览 -->
                    <van-image-preview />
                </div>
            </div>

            <!-- 底部tab栏 -->
            <div class="bg-#000/40 pt16 pb33 w-full fixed bottom-0 backdrop-blur-20">
                <!-- 引导条 -->
                <div class="fixed bottom-98 w-full px8 py8 bg-gradient-to-r from-#4D09C1  via-#7F04BA to-#D016C8 flex justify-between"
                    v-if="showView">
                    <van-space :size="0" align="center">
                        <div><img src="../../assets/gift_heart.png" class="w41 h35"></div>
                        <div class="c-#fff text-14 font-semibold ml5">Show her what you mean</div>
                    </van-space>
                    <van-space :size="0" align="center">
                        <div
                            class="c-#C915C7 text-14 font-semibold bg-gradient-to-r from-#FDE2FF/78  to-#FFFFFF/80 rounded-23 ml12 py7 px10">
                            Send GIft
                        </div>
                        <div @click="showView = false">
                            <img src="../../assets/btn_close.png" class="w16 h16 ml16">
                        </div>
                    </van-space>
                </div>
                <!-- 工具 -->
                <div class="px24 flex justify-between">
                    <van-space :size="18">
                        <!-- 与主播聊天 -->
                        <div class="bg-#fff/10 rounded-23 py12 px18">
                            <img src="../../assets/icons_message.png" class="w20 h20"
                                @click="router.push({ path: 'talk', query: { to: yxAccid, nick: userStore.userDetail.nickname, avatar: userStore.userDetail.icon } })">
                        </div>
                        <!-- 关注/取关 -->
                        <div class="bg-#fff/10 rounded-23 py12 px18" @click="followOrNo">
                            <van-icon name="like" color="#FB3A54" :size="18" v-if="userStore.userDetail.followed" />
                            <van-icon name="like-o" color="#fff" :size="18" v-else />
                        </div>
                    </van-space>
                    <!-- 视频通话 -->
                    <div class="bg-gradient-to-r from-#4D09C1  via-#7F04BA to-#D016C8 py13 px20 rounded-23 text-center"
                        @click="router.push({ path: 'waitcall', query: { userId: userStore.userDetail.userId, yxId: userStore.userDetail.yxAccid } })">
                        <van-space :size="4">
                            <div><img src="../../assets/video_call.png" class="w20"></div>
                            <div class="text-14 font-bold c-#fff">100</div>
                            <div class="i-my-icons-diamond text-14" />
                            <div class="text-14  c-#fff">/Times</div>
                        </van-space>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script  setup>
import { getFriendsCircle } from '~/api/moments'
import { getMomentsTime } from '~/utils/index'
import { showImagePreview } from 'vant';
const userStore = useUserStore()
const route = useRoute()
const userId = route.query.id;
const yxAccid = route.query.yxId;
const momentsStore = useMomentsStore()
const router = useRouter()
const momentData = ref([])//用户朋友圈内容
const showView = ref(true)

//获取用户朋友圈内容
const getMomentData = async (id = "") => {
    const result = await getFriendsCircle({
        "currentPage": 1,
        "keyword": id,
        "onlyImgFlag": 0,
        "pageSize": 10,
    })
    console.log(result);
    momentData.value = result
}
// 图片预览
const showImg = (imgList) => {
    showImagePreview([imgList]);
}
// 关注/取关
const followOrNo = () => {
    const type = userStore.userDetail.followed === true ? 2 : 1
    userStore.followUser(type, userStore.userDetail.userId)
    userStore.userDetail.followed = !userStore.userDetail.followed
}
const showVideo = ref(false)
let videoUrl = ref('')
const startVideo = (url) => {
    videoUrl.value = url
    showVideo.value = true
}
onMounted(() => {
    //获取用户详情数据
    userStore.getUserDetailData(userId, yxAccid)
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

:deep(.van-popup--center) {
    max-width: 125rem
}
</style>