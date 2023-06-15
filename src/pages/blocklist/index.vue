<template>
    <div>
        <!-- 顶部导航栏 -->
        <div ref="myRef">
            <van-nav-bar left-arrow @click-left="router.go(-1)" :border="false">
                <template #title>
                    <div class="text-#fff text-21 font-semibold">Blocklist</div>
                </template>
                <template #left>
                    <van-icon name="arrow-left" :size="22" color="#fff" />
                </template>
            </van-nav-bar>
        </div>

        <div>
            <div class="c-#fff pt20 mx20" v-for=" item, index in blackList" :key="index">
                <van-row>
                    <van-col span="4">
                        <!-- 头像 -->
                        <div class="">
                            <van-image round width="12rem" height="12rem" :src="item.icon" />
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
                                        <div class="i-my-icons-famale text-14" v-if="item.gender === 1" />
                                        <div class="i-my-icons-male text-14" v-else />
                                        <div class="text-14">{{ item.age }}</div>
                                    </van-space>
                                </div>
                            </div>
                            <!-- 移除黑名单按钮 -->
                            <div @click="removeHandler(item.userId, item.nickname, item.yxAccid)">
                                <img src="../../assets/remove-blacklist.png" class="w36 h36">
                            </div>
                        </div>
                    </van-col>
                </van-row>
            </div>
        </div>

        <!-- 确认移出黑名单 -->
        <van-dialog v-model:show="showEmpty" class="important:bg-#130021 ">
            <template #default>
                <div class="text-center pt54 pb32 px20">
                    <div class="c-#fff text-20 font-medium">
                        Remove {{ nickName }} from the blacklist
                    </div>
                    <div class="mt33 ">
                        <van-space :size="33">
                            <button class="w124 h40 bg-#fff c-#5409C0 rounded-23 text-16 font-semibold"
                                @click="showEmpty = false;">Close</button>
                            <button
                                class="w124 h40 bg-gradient-to-r from-#4D09C1  via-#7F04BA to-#D016C8 c-#fff rounded-23 text-16 font-semibold"
                                @click="removeBlackList">Confirm</button>
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
import { toDisplayString } from 'vue';
import { getBlackList, removeBlack } from '../../api/user'
const blackList = ref([])
const showEmpty = ref(false)
const router = useRouter()
const uid = ref('')//当前选中的id
const nickName = ref('')//当前选中的昵称
const yid = ref('')//当前选中的云信id

//获取黑名单列表
const getBlackListData = async () => {
    blackList.value = await getBlackList({})
    console.log(blackList.value);
}
//点击移除黑名单的回调
const removeHandler = (id, nick, yxAccid) => {
    showEmpty.value = true
    uid.value = id
    yid.value = yxAccid
    nickName.value = nick
}
//确定移出黑名单的回调
const removeBlackList = async () => {
    showEmpty.value = false
    await removeBlack({
        "type": 1,
        "userId": uid.value,
        "yxAccid": yid.value
    })
    getBlackListData()
}
onMounted(() => {
    //获取黑名单
    getBlackListData()
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
    background-color: #130021;
}
</style>