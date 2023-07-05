<template>
  <div class="">

    <div class="mt30 mx25" :class="homeStore.topHeight">
      <div class="flex justify-between items-center" @click="router.push('/profile')">
        <div>
          <van-space :size="16">
            <van-image round width="14.75rem" height="14.75rem" :src="mineInfo.icon" />
            <div class="c-#fff">
              <van-space direction="vertical">
                <div class="text-22 font-bold">{{ mineInfo.nickname }}</div>
                <div class="text-14">ID:{{ mineInfo.userId }}</div>
              </van-space>
            </div>
          </van-space>
        </div>
        <van-icon name="arrow" color="#fff" :size="18" />
      </div>

      <div class="flex justify-between mt16" @click="router.push('/friends')">
        <div class="">
          <van-space direction="vertical" align="center">
            <div class="text-18 font-bold c-#fff">{{ mineInfo.friendNum }}</div>
            <div class="text-12 c-#fff/60 font-light">Friends</div>
          </van-space>
        </div>
        <div class="">
          <van-space direction="vertical" align="center">
            <div class="text-18 font-bold c-#fff">{{ mineInfo.upsNum }}</div>
            <div class="text-12 c-#fff/60 font-light">Follow</div>
          </van-space>
        </div>
        <div class="">
          <van-space direction="vertical" align="center">
            <div class="text-18 font-bold c-#fff">{{ mineInfo.fansNum }}</div>
            <div class="text-12 c-#fff/60 font-light">Fans</div>
          </van-space>
        </div>
      </div>
    </div>

    <div class="bg-#130021 h-800 rounded-t-24 mt60">
      <!-- 彩色悬浮窗 -->
      <div class="py5 px15 mx15 rounded-17 flex justify-between items-center relative bottom-40"
        style="background: linear-gradient(232deg, #D016C8 0%, #7F04BA 47%, #4D09C1 100%);">
        <div>
          <van-space :size="8">
            <div class="i-my-icons-diamond text-35" />
            <div class="py16 pr23 text-#fff font-medium text-14">
              <div>Balance:</div>
              <div>{{ mineInfo.diamondNum }}</div>
            </div>
          </van-space>
        </div>
        <van-button :round=true class="text-#fff text-16 w68 h32 bg-#fff/[.40] b-0"
          @click="router.push('getcoin')">Open</van-button>
      </div>
      <!-- 三个开关 -->
      <div class="mx20 px20 py27 bg-#AFA8FF/10 rounded-8">
        <div class="c-#fff flex justify-between items-center">
          <div class="text-14 font-medium">Do not disturb - Call</div>
          <van-switch v-model="checked0" />
        </div>

        <div class="c-#fff flex justify-between items-center my30">
          <div class="text-14 font-medium">Do not disturb - Message</div>
          <van-switch v-model="checked1" />
        </div>

        <div class="c-#fff flex justify-between items-center">
          <div class="text-14 font-medium">Do not disturb - Message</div>
          <van-switch v-model="checked2" />
        </div>
      </div>

      <div class="mx20 mt20 px20 py13 bg-#AFA8FF/10 rounded-8 flex justify-between items-center"
        @click="router.push('/blocklist')">
        <div>
          <van-space align="center">
            <img src="../../assets/block-list.png" class="w30 h30">
            <div class="c-#fff text-14 font-semibold">Block List</div>
          </van-space>
        </div>
        <div>
          <van-icon name="arrow" color="#C2C4CA" :size="12" />
        </div>
      </div>
      <div class="mx20 mt10 px20 py13 bg-#AFA8FF/10 rounded-8 flex justify-between items-center"
        @click="router.push('/feedback')">
        <div>
          <van-space align="center">
            <img src="../../assets/feedback.png" class="w30 h30">
            <div class="c-#fff text-14 font-semibold">Feedback</div>
          </van-space>
        </div>
        <div>
          <van-icon name="arrow" color="#C2C4CA" :size="12" />
        </div>
      </div>
      <div class="mx20 mt10 px20 py13 bg-#AFA8FF/10 rounded-8 flex justify-between items-center">
        <div>
          <van-space align="center">
            <img src="../../assets/user-agreement.png" class="w30 h30">
            <div class="c-#fff text-14 font-semibold">User Agreement</div>
          </van-space>
        </div>
        <div>
          <van-icon name="arrow" color="#C2C4CA" :size="12" />
        </div>
      </div>
      <div class="mx20 mt10 px20 py13 bg-#AFA8FF/10 rounded-8 flex justify-between items-center">
        <div>
          <van-space align="center">
            <img src="../../assets/privacy-agreement.png" class="w30 h30">
            <div class="c-#fff text-14 font-semibold">Privacy Agreement</div>
          </van-space>
        </div>
        <div>
          <van-icon name="arrow" color="#C2C4CA" :size="12" />
        </div>
      </div>

      <div class="mt40 mx-auto w280 py15 bg-#AFA8FF/10 rounded-28 c-#fff text-14 font-semibold text-center"
        @click="logOut">Log out</div>

      <div class="c-#fff/40 font-medium text-12 mt16 text-center">Version 1.0.0</div>
    </div>
  </div>
</template>
<script setup>
const checked0 = ref(true);
const checked1 = ref(true);
const checked2 = ref(false);
const router = useRouter()
const userStore = useUserStore()
const mineInfo = computed(() => userStore.mineInfo)
const homeStore = useHomeStore()
onMounted(() => {
  userStore.getMineInfoData()
  //组件挂载完成设置背景色
  document.querySelector('body').setAttribute('style', 'background:radial-gradient(#450555 0%,#060108 100%)')
})
onBeforeUnmount(() => {
  //组件卸载前去掉背景色
  document.querySelector('body').removeAttribute('style')
})
//退出登录
const logOut = () => {
  window.flutter_inappwebview.callHandler('close', 'xxxx');
}
</script>

<style scoped></style>
<route lang="yaml">
meta:
  layout: home
</route>