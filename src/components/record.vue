<template>
    <div>
        <div class="overflow-scroll h-full" :style="{ height: scrollHeight + 'px' }">
            <van-pull-refresh v-model="loading" @refresh="onRefresh" pulling-text="Pull To Refresh"
                loading-text="loading..." loosing-text="Release to refresh" success-text="Refresh successful">
                <div class="flex justify-between items-center py20 b-#1F0D2C b-b-1" v-for="item, index in recordList">
                    <div>
                        <van-space :size="12">
                            <van-image round width="12rem" height="12rem" :src="item.icon" />
                            <div>
                                <van-space direction="vertical">
                                    <div>
                                        <van-space :size="6">
                                            <div class="text-16 font-semibold c-#fff">{{ item.nickname }}</div>
                                            <!-- <div class="c-#E3DBE8/60 text-12">{{ item.duration }}</div> -->
                                            <div class="c-#E3DBE8/60 text-12">{{ formatCount(item.duration) }}</div>

                                        </van-space>
                                    </div>
                                    <div class="text-12 c-#E3DBE8/60">
                                        {{ dayjs(item.createTime).format('YYYY-MM-DD HH:mm') }}
                                    </div>
                                </van-space>
                            </div>
                        </van-space>
                    </div>
                    <div>
                        <van-space :size="16">
                            <img src="../assets/chat.png" class="w32 h32"
                                @click="router.push({ name: 'talk', query: { to: item.yxAccid, nick: item.nickname, avatar: item.icon } })">
                            <img src="../assets/video.png" class="w32 h32"
                                @click="router.push({ name: 'waitcall', query: { userId: item.userId, yxId: item.yxAccid, free: item.videoPrice > 0 ? 0 : 1 } })">
                        </van-space>
                    </div>
                </div>
            </van-pull-refresh>
        </div>
    </div>
</template>


<script  setup>
import dayjs from 'dayjs'
import { getRecord } from '~/api/call'
import { formatCount } from '~/utils'
const recordList = ref([])
const router = useRouter()
const loading = ref(false);//下拉刷新加载状态
const scrollHeight = ref(0)//滚动部分高度
const props = defineProps(['height'])
// //获取通话记录
const getRecordList = async () => {
    recordList.value = await getRecord({
        "currentPage": 0,
        "onlineStatus": 1,
        "pageSize": 99,
        "type": 2
    })
}
//下拉刷新
const onRefresh = () => {
    setTimeout(() => {
        getRecordList()
        loading.value = false;
    }, 1000);
};
onMounted(() => {
    getRecordList()
    //动态计算滚动区高度
    scrollHeight.value = document.documentElement.clientHeight - props.height
})
</script>

<style scoped></style>~/api/call/call