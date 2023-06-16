<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useHomeStore } from '~/stores';
import { setSave } from '~/api/home'
const router = useRouter()
const homeStore = useHomeStore()
const userStore = useUserStore()
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

const loading = ref(false);
//下拉刷新
const onRefresh = () => {
  setTimeout(() => {
    homeStore.getIndexListData()
    loading.value = false;
  }, 1000);
};
const myRef = ref();
const scrollHeight = ref(0)



onMounted(() => {
  //初始化im
  homeStore.imConnect()
  //保存设备信息
  setSave(saveOption)
  //获取首页tab列表
  homeStore.getIndexFatherTabList()
  //获取首页用户列表
  homeStore.getIndexListData()
  //获取国家列表
  userStore.getCountryListData()
  //获取礼物列表
  userStore.getGiftListData()
  //动态计算滚动区高度
  scrollHeight.value = window.innerHeight - myRef.value.offsetHeight
  //组件挂载完成设置背景色
  document.querySelector('body').setAttribute('style', 'background:radial-gradient(#2F0250 0,#160126 100%)')
})
onBeforeUnmount(() => {
  //组件卸载前去掉背景色
  document.querySelector('body').removeAttribute('style')

})

</script>

<template>
  <div>
    <div ref="myRef">
      <index-tag />
    </div>
    <div class="  overflow-scroll  " :style="{ height: scrollHeight + 'px' }">
      <van-pull-refresh v-model="loading" @refresh="onRefresh" success-text="刷新成功">
        <index-content />
      </van-pull-refresh>
    </div>
    <div>
      <van-button class="mx52 rounded-23 w270 h50 b-0  fixed bottom-100 text-center "
        style="background: linear-gradient(232deg, #D016C8 0%, #7F04BA 47%, #4D09C1 100%);" @click="router.push('match')">
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
  </div>
</template>

<route lang="yaml">
meta:
  layout: home
</route>
