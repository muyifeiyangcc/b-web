<template>
    <div class="pb15 fixed z-3 top-0 bg-#23023C w-full">
        <div class="flex justify-between items-center">
            <van-tabs class="tabs_1 Tabs" background="transparent" title-active-color="#BE12C5" line-width="0px"
                :ellipsis="false" v-model:active="futherTabActive" @change="onClickFatherTab">
                <van-tab v-for="(item, index) in homeStore.indexTabsFather.parentTags" :key="index" :title="item.tagName"
                    class="important:c-#fff"></van-tab>
            </van-tabs>

            <div class="mr9">
                <van-space>
                    <button><img src="../assets/Specialrecharge.png" class="w30 h30"></button>
                    <button><img src="../assets/ranking.png" class="w30 h30" @click="router.push('/rank')"></button>
                </van-space>
            </div>
        </div>

        <!-- <div
            class="pt16 pb12 px15 rounded-17 mx15 mt20 flex justify-between items-center bg-gradient-to-r from-#4D09C1  via-#7F04BA to-#D016C8">
            <div>
                <van-space :size="8">
                    <div class="i-my-icons-diamond text-35 " />
                    <div class="py16 pr23 text-#fff font-medium text-14">
                        Turn on notification to Get 100
                    </div>
                </van-space>
            </div>
            <van-button :round=true class="text-#fff text-16 w68 h32 bg-#fff/[.40] b-0">Open</van-button>
        </div> -->

        <!-- <van-tabs class="tabs_1 Tabs" color="rgba(190,18,197,1)" background="transparent" v-model:active="childrenTabActive"
            title-active-color="rgba(190,18,197,1)" title-inactive-color="rgba(255,255,255,1)" line-width="0px"
            :ellipsis="false" @change="onClickChildrenTab">
            <van-tab v-for="(item, index) in homeStore.indexTabsChildren" :key="index" :title="item.tagName"></van-tab>
        </van-tabs> -->
        <div class="flex justify-around px15 ">
            <div class="c-#fff/70 text-14  rounded-23 px16 py7 " v-for="(item, index) in homeStore.indexTabsChildren"
                :key="index" @click="tabClick(index)" :class="tabValue === index ? 'active' : ''">
                {{ item.tagName }}
            </div>
        </div>
    </div>
</template>


<script  setup>
const futherTabActive = ref(0);
// const childrenTabActive = ref(0);
const homeStore = useHomeStore()//引入pinia组件
const tabValue = ref(0)
const router = useRouter()
//首页一级tab栏点击事件
const onClickFatherTab = (name, title) => {
    //切换副标题时应将子标题清零
    tabValue.value = 0
    homeStore.getIndexTabChildrenList(title)//更新二级分类
    homeStore.updateIndexListData(1, title, true)//更新首页用户信息
}
//首页二级tab栏点击事件
// const onClickChildrenTab = (name, title) => {
//     homeStore.updateIndexListData(title)//更新首页用户信息
// }
// 点击二级tab栏触发事件
const tabClick = (value) => {
    tabValue.value = value
    homeStore.updateIndexListData(1, homeStore.indexTabsChildren[value].tagName, true)//更新首页用户信息
}

onMounted(() => {

})

</script>

<style scoped>
:deep(.van-tab--grow) {
    color: raga(255, 255, 255, 0.4);
    font-size: 4rem;
}

.active {
    background: linear-gradient(232deg, #D016C8 0%, #7F04BA 47%, #4D09C1 100%);
    color: #fff;
}
</style>