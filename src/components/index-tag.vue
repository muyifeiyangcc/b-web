<template>
    <div>
        <div class="flex justify-between items-center">
            <van-tabs class="tabs_1 Tabs" background="transparent" title-active-color="rgba(190,18,197,1)"
                title-inactive-color="rgba(255,255,255,1)" line-width="0px" :ellipsis="false"
                v-model:active="futherTabActive" @change="onClickFatherTab">
                <van-tab v-for="(item, index) in homeStore.indexTabsFather.parentTags" :key="index"
                    :title="item.tagName"></van-tab>
            </van-tabs>

            <div mr9>
                <van-space>
                    <button><img src="../assets/Specialrecharge.png" class="w30 h30"></button>
                    <button><img src="../assets/ranking.png" class="w30 h30" @click="router.push('/rank')"></button>
                </van-space>
            </div>
        </div>

        <div class="pt16 pb12 rounded-17 mx15 mt20"
            style="background: linear-gradient(232deg, #D016C8 0%, #7F04BA 47%, #4D09C1 100%);">
            <van-space :size="0">
                <div>
                    <!-- <img src="../assets/rechargeBG.png" class=""> -->
                    <van-space :size="8">
                        <div class="i-my-icons-diamond text-35 ml15" />
                        <div class="py16 pr23 text-#fff font-medium text-14">
                            Turn on notification to Get 100
                        </div>
                    </van-space>
                </div>
                <van-button :round=true class="text-#fff text-16 w68 h32 bg-#fff/[.40] b-0">Open</van-button>
            </van-space>
        </div>
        <van-tabs class="tabs_1 Tabs" color="rgba(190,18,197,1)" background="transparent" v-model:active="childrenTabActive"
            title-active-color="rgba(190,18,197,1)" title-inactive-color="rgba(255,255,255,1)" line-width="0px"
            :ellipsis="false" @change="onClickChildrenTab">
            <van-tab v-for="(item, index) in homeStore.indexTabsChildren" :key="index" :title="item.tagName"></van-tab>
        </van-tabs>
    </div>
</template>


<script lang="ts" setup>
const futherTabActive = ref(0);
const childrenTabActive = ref(0);
const homeStore = useHomeStore()//引入pinia组件
const router = useRouter()
//首页一级tab栏点击事件
const onClickFatherTab = (name: any, title: any) => {
    homeStore.getIndexTabChildrenList(title)//更新二级分类
    homeStore.getIndexListData()//获取首页用户列表
    childrenTabActive.value = 0//切换副标题时应将子标题清零
}
//首页二级tab栏点击事件
const onClickChildrenTab = (name: any, title: any) => {
    homeStore.updateIndexListData(title)//更新首页用户信息
}

onMounted(() => {
    // homeStore.getIndexTabList()
})
</script>

<style scoped></style>