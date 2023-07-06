<template>
    <div>
        <!-- 顶部导航栏 -->
        <div ref="myRef">
            <van-nav-bar left-arrow @click-left="router.go(-1)" :border="false" fixed="true">
                <template #title>
                    <div class="text-#fff text-21 font-semibold">Friends</div>
                </template>
                <template #left>
                    <van-icon name="arrow-left" :size="22" color="#fff" />
                </template>
            </van-nav-bar>
        </div>
        <!-- 中部tab栏 -->
        <div class="pt86">
            <div class="mx22  bg-#1B0D2C text-center align-middle rounded-23">
                <van-row>
                    <van-col span="8">
                        <div class="c-#fff/40 text-14 font-semibold rounded-23 py11" :class="tabValue === 1 ? 'active' : ''"
                            @click="tabClick(1)">Friends</div>
                    </van-col>
                    <van-col span="8">
                        <div class="c-#fff/40 text-14 font-semibold rounded-23 py11 "
                            :class="tabValue === 2 ? 'active' : ''" @click="tabClick(2)">Followers
                        </div>
                    </van-col>
                    <van-col span="8">
                        <div class="c-#fff/40 text-14 font-semibold rounded-23 py11 "
                            :class="tabValue === 3 ? 'active' : ''" @click="tabClick(3)">Following
                        </div>
                    </van-col>
                </van-row>
            </div>
        </div>
        <!-- 名单列表 -->
        <div>
            <div class="c-#fff mt5 pt20 mx20" v-for=" item, index in friendsList" :key="index">
                <van-row>
                    <van-col span="4">
                        <!-- 头像 -->
                        <div class="">
                            <van-badge dot color="#2BC100">
                                <van-image round width="12rem" height="12rem" :src="item.icon" />
                            </van-badge>
                        </div>
                    </van-col>
                    <van-col span="20">
                        <!-- 内容 -->
                        <div class="flex justify-between items-center b-b-1 pb20 b-#fff/5">
                            <!-- 昵称和性别、年龄、国籍 -->
                            <div>
                                <div class="text-16 font-semibold">{{ item.nickname }}</div>
                                <div>
                                    <van-space>
                                        <div class="i-my-icons-male text-14" v-if="item.gender === 1" />
                                        <div class="i-my-icons-famale text-14" v-else />
                                        <div class="text-14">{{ item.age }}</div>
                                    </van-space>
                                </div>
                            </div>
                            <!-- 关注/取关按钮 -->
                            <div>
                                <button @click="userStore.followOrNo(2, item.userId); getFriendsList()"
                                    v-if="tabValue === 1 || 3"
                                    class="px12 py8 rounded-20 c-#C513C6 font-semibold text-14 bg-gradient-to-r from-#D0B2FF/10 to-#BEB4FF/10">Unfollow</button>
                                <button @click="userStore.followOrNo(1, item.userId); getFriendsList()" v-else
                                    class="px12 py8 rounded-20 c-#C513C6 font-semibold text-14 bg-gradient-to-r from-#D0B2FF/10 to-#BEB4FF/10">Follow</button>
                            </div>
                        </div>
                    </van-col>
                </van-row>
            </div>
        </div>
    </div>
</template>


<script  setup>
import { getFriends, getFollowUser } from '~/api/user'
const router = useRouter()
const userStore = useUserStore()
const tabValue = ref(1)
const friendsList = ref([])
// 点击tab栏触发事件
const tabClick = (value) => {
    tabValue.value = value
    getFriendsList()
}
// 获取好友列表
const getFriendsList = async () => {
    const result = await getFriends({
        "currentPage": 1,
        "pageSize": 99,
        "type": tabValue.value
    })
    friendsList.value = result
    console.log(friendsList.value);
}
const setRemoveHandler = () => {
    // getFriendsList()
}
onMounted(() => {
    // 获取好友列表
    getFriendsList()
    //组件挂载完成设置背景色
    document.querySelector('body').setAttribute('style', 'background-color:#130021')
})
onBeforeUnmount(() => {
    //组件卸载前去掉背景色
    document.querySelector('body').removeAttribute('style')
})
</script>

<style scoped>
.van-tab--active {
    background: red !important;
}

.van-tab {
    background-color: aqua !important;
}

.active {
    background: linear-gradient(232deg, #D016C8 0%, #7F04BA 47%, #4D09C1 100%);
    color: #fff;
}
</style>