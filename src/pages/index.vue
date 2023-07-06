<script setup >
import { setSave } from '~/api/home'
import { getMineInfo } from '~/api/user'
// import { showSuccessToast, showFailToast } from 'vant';
const router = useRouter()
const route = useRoute()
const homeStore = useHomeStore()
const userStore = useUserStore()
const giftStore = useGiftStore()
const momentsStore = useMomentsStore()
const saveOption =
{
  "appId": "77985415",
  "appVersion": "1.0.0",
  "channel": "OFFICIAL",
  "deviceNo": "",
  "deviceType": "",
  "osType": "10.0.0",
  "osVersion": "10.0.0",
  "pushToken": "",
  "useSimCard": 1
}
//需传入token等参数
if (route.query.token && route.query.appId) {
  localStorage.setItem('token', route.query.token)
  localStorage.setItem('appId', route.query.appId)
}

const loading = ref(false);
//下拉刷新
const onRefresh = () => {
  setTimeout(() => {
    homeStore.updateIndexListData('pull')
    loading.value = false;
  }, 500);
};
// 无限滚动
let allowLoad = true
const loadMore = () => {
  if (allowLoad) {
    allowLoad = false
    homeStore.getIndexListOption.currentPage++
    setTimeout(() => {
      homeStore.updateIndexListData('scroll')
      allowLoad = true
    }, 1000);
  }
}
//判断滚动距离触发更新
const scrollDom = ref()
const scrollHandle = () => {
  const scrollHeight = scrollDom.value.scrollHeight//计算滚动高度
  const clientHeight = document.body.clientHeight//计算视口高度
  const scrollTop = scrollDom.value.scrollTop || document.documentElement.scrollTop//计算滚动的距离
  const distance = scrollHeight - scrollTop - clientHeight//计算到滚动到页面底部剩余距离
  //当快滑动到底部的时候
  if (distance < 50) {
    loadMore()
  }
}

//初始化
const init = () => {
  if (!homeStore.isInit) {
    homeStore.router = router
    //保存设备信息
    // setSave(saveOption).then(() => {
    //获取首页tab列表
    homeStore.getIndexFatherTabList()
    //获取首页用户列表
    homeStore.updateIndexListData()
    //获取国家列表
    userStore.getCountryListData()
    // //获取我的信息
    getMineInfo().then((res) => {
      userStore.mineInfo = res
      localStorage.setItem('yxAccid', res.yxAccid)
      localStorage.setItem('imToken', res.imToken)
      //初始化im
      homeStore.imConnect()
    })
    //获取礼物列表
    giftStore.getGiftListData()
    //获取朋友圈列表
    momentsStore.getFriendsCircleList()
    // })
    homeStore.isInit = true
  }
}
onMounted(() => {
  init()
  //组件挂载时，添加scroll监听
  window.addEventListener("scroll", scrollHandle);
  //组件挂载完成设置背景色
  document.querySelector('body').setAttribute('style', 'background:radial-gradient(#2F0250 0,#160126 100%)')
})

onBeforeUnmount(() => {
  //组件卸载前去掉背景色
  document.querySelector('body').removeAttribute('style')
  //组件卸载前解绑事件
  window.removeEventListener("scroll", scrollHandle);
})

</script>
<template>
  <div ref="scrollDom">
    <van-pull-refresh v-model="loading" @refresh="onRefresh" pulling-text="Pull To Refresh" loading-text="loading..."
      loosing-text="Release to refresh" success-text="Refresh successful">
      <div>
        <keep-alive>
          <index-tag />
        </keep-alive>
        <div class="px15 ">
          <index-content />
        </div>
      </div>
    </van-pull-refresh>
    <div class="fixed bottom-100 left-50% ml--135">
      <van-button class=" rounded-23 w270 h50 b-0  text-center bg-gradient-to-r from-#4D09C1  via-#7F04BA to-#D016C8"
        @click="router.push('match')">
        <!-- @click="homeStore.showGetDiamonds" -->
        <van-space direction="vertical" size="0">
          <div>
            <van-space>
              <img class="w24 h20" src="../assets/heart.png">
              <div class="text-16 c-#fff font-semibold">Random Match</div>
            </van-space>
          </div>
          <div>
            <van-space :size="2">
              <div class="text-12 c-#fff font-thin">100</div>
              <div class="i-my-icons-diamond" />
              <div class="text-12 c-#fff font-thin">/Times</div>
            </van-space>
          </div>
        </van-space>

      </van-button>
    </div>
    <get-diamonds-chat />
    <recommend-anchor />
    <recharge />
  </div>
</template>

<route lang="yaml">
meta:
  layout: home
</route>
