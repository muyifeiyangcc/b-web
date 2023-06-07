<template>
  <div mx15>
    <div ref="myRef">
      <!-- 聊天页tab栏 -->
      <div>
        <van-tabs v-model:active="active" background="transparent" title-active-color="#fff"
          title-inactive-color="rgba(255,255,255,0.6)" line-width="0px" class="mb20">
          <van-tab title="Message" title-style="font-size:21px"></van-tab>
          <van-tab title="Call record" title-style="font-size:21px"></van-tab>
        </van-tabs>
      </div>
      <!-- 聊天页弹窗 -->
      <div v-if="isShow" class="py12 rounded-8   relative"
        style="background: linear-gradient(232deg, #4D09C1 0%, #7F04BA 47%, #D016C8 100%);" text-center>
        <van-space :size="0" direction="vertical">
          <div class=" c-#fff font-semibold text-16">
            Don't miss her news
          </div>
          <div class="c-#fff font-light text-12">
            Turn on notification
          </div>
          <van-button :round=true class="c-#fff text-14 font-semibold w161 h33  bg-#fff/[.40] b-0">Open
            notification
          </van-button>
          <div class="b-0 bg-#fff/[.40] w16 h16 rounded-50% absolute right-8 top-8" @click="isShow = false">
            <van-icon name="cross" color="#fff" size="1rem" />
          </div>
        </van-space>
      </div>
    </div>
    <!-- 聊天列表 -->
    <van-pull-refresh v-model="loading" @refresh="onRefresh" success-text="刷新成功">
      <div class="pb50 overflow-scroll" :style="{ height: scrollHeight + 'px' }">
        <div class="c-#fff pt20 " v-for="item, index in sessionList" :key="index" @click="router.push('/talk')">
          <van-row>
            <van-col span="4">
              <!-- 头像 -->
              <div class="">
                <van-image round width="12rem" height="12rem"
                  src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" />
              </div>
            </van-col>
            <van-col span="20">
              <!-- 内容 -->
              <div class="flex justify-between b-b-1 pb20 b-#1F0D2C">
                <div>
                  <div class="text-16 font-semibold">{{ item.lastMsg.fromNick || 'UnKnown' }}</div>
                  <div class="text-12 font-light mt7 w150 van-ellipsis" style="color:rgba(255,255,255,0.6)">
                    {{ item.lastMsg.body }}
                  </div>
                </div>
                <div>
                  <van-space :size="15" direction="vertical" :align="'start'">
                    <div class="" style="color:rgba(255,255,255,0.6)">14:32</div>
                    <div>
                      <!-- <van-badge :content="9" max="99" /> -->
                      <div class="bg-#ED4A47 rounded-50% w18 h18 text-center" v-if="item.unreadMsgs.length > 0">
                        {{ item.unreadMsgs.length >= 99 ? 99 : item.unreadMsgs.length }}
                      </div>
                    </div>
                  </van-space>
                </div>
              </div>
            </van-col>
          </van-row>
        </div>
      </div>
    </van-pull-refresh>
  </div>
</template>


<script  setup>
const router = useRouter()// 实例化router
const sessionList = computed(() => homeStore.sessionList)// 获取会话列表
const isShow = ref(true)// 弹窗是否显示
const active = ref(0)// tab栏选中标识
const myRef = ref();//tab栏dom实例，用于获取高度
const scrollHeight = ref(0)//滚动部分高度
const loading = ref(false);//下拉刷新加载状态
const homeStore = useHomeStore()//pinia组件
//下拉刷新
const onRefresh = () => {
  setTimeout(() => {
    homeStore.getSessionList()
    loading.value = false;
  }, 1000);
};
onMounted(() => {
  //获取会话列表
  homeStore.getSessionList()
  //动态计算滚动区高度
  scrollHeight.value = window.innerHeight - myRef.value.offsetHeight
  //组件挂载完成设置背景色
  document.querySelector('body').setAttribute('style', 'background-color:#130021')
})
onBeforeUnmount(() => {
  //组件卸载前去掉背景色
  document.querySelector('body').removeAttribute('style')
})

</script>

<style scoped></style>
<route lang="yaml">
meta:
  layout: home
</route>