<template>
  <div mx15>
    <div ref="myRef">
      <!-- 聊天页tab栏 -->
      <div class="flex justify-between items-center mb20">
        <van-tabs v-model:active="active" background="transparent" title-active-color="#fff"
          title-inactive-color="rgba(255,255,255,0.6)" line-width="0px" :ellipsis="false">
          <van-tab title="Message" title-style="font-size:21px"></van-tab>
          <van-tab title="Call record" title-style="font-size:21px"></van-tab>
        </van-tabs>
        <button @click="showBottom = !showBottom"><img src="../../assets/broom.png" class="w23 h23"></button>
      </div>
      <!-- 聊天页弹窗 -->
      <div v-if="isShow" class="py12 rounded-8  relative"
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
          <div class="b-0 bg-#fff/[.40] px4 py4 text-0 rounded-50% absolute right-8 top-8" @click="isShow = false">
            <van-icon name="cross" color="#fff" class="text-14" />
          </div>
        </van-space>
      </div>
    </div>
    <!-- 聊天列表 -->
    <div class="pb100 overflow-scroll" :style="{ height: scrollHeight + 'px' }">
      <van-pull-refresh v-model="loading" @refresh="onRefresh" success-text="刷新成功">
        <div class="c-#fff pt20 " v-for="item, index in sessionList " :key="index"
          @click="router.push({ path: '/talk', query: { to: item.to, nick: talkUserDataList[index].nick, avatar: talkUserDataList[index].avatar } })">
          <van-row>
            <van-col span="4">
              <!-- 头像 -->
              <div class="">
                <van-image round width="12rem" height="12rem"
                  :src="talkUserDataList[index].avatar || 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg'" />
              </div>
            </van-col>
            <van-col span="20">
              <!-- 内容 -->
              <div class="flex justify-between b-b-1 pb20 b-#1F0D2C">
                <!-- 昵称和上条消息 -->
                <div>
                  <div class="text-16 font-semibold">{{ talkUserDataList[index].nick || 'UnKnown' }}</div>
                  <div class="text-12 font-light mt7 w150 van-ellipsis c-#fff/60">
                    {{ item.lastMsg.body }}
                  </div>
                </div>
                <!-- 时间和角标 -->
                <div>
                  <van-space :size="15" direction="vertical" :align="'start'">
                    <div class="c-#fff/60 text-12">{{ formatTime(item.updateTime) }}</div>
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
      </van-pull-refresh>
    </div>

    <!-- 标记已读弹窗 -->
    <van-popup v-model:show="showBottom" position="bottom" :style="{ height: '37%' }" class="bg-#130021">
      <template #default>
        <div class="w46 h6 rounded-5 bg-#E9E9E9/10 mx-auto mt16"></div>
        <div
          class="c-#fff text-16 font-bold mx15 text-center pt15 pb12 rounded-6 bg-gradient-to-r from-#D016C8  via-#7F04BA to-#4D09C1 mt49"
          @click="allRead">
          Mark all read
        </div>
        <div
          class="c-#fff text-16 font-bold mx15 text-center pt15 pb12 rounded-6 bg-gradient-to-r from-#4D09C1  via-#7F04BA to-#D016C8 mt10"
          @click="showEmpty = true">
          Empty all
        </div>
        <div class="c-#fff text-16 font-bold mx15 text-center pt15 pb12 rounded-6 bg-#440699/10 mt21"
          @click="showBottom = false">
          Cancel
        </div>
      </template>
    </van-popup>
    <!-- 确认清空消息记录 -->
    <van-dialog v-model:show="showEmpty" class="important:bg-#130021 ">
      <template #default>
        <div class="text-center pt54 pb32 px20">
          <div class="c-#fff text-20 font-medium">
            Are you sure to clear all sessions?
          </div>
          <div class="mt33 ">
            <van-space :size="33">
              <button class="w124 h40 bg-#fff c-#5409C0 rounded-23 text-16 font-semibold"
                @click="showEmpty = false;">Close</button>
              <button
                class="w124 h40 bg-gradient-to-r from-#4D09C1  via-#7F04BA to-#D016C8 c-#fff rounded-23 text-16 font-semibold"
                @click="sureEmpty">Confirm</button>
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
import { showDialog } from 'vant';
import { formatTime } from '~/utils'
const router = useRouter()// 实例化router
const sessionList = computed(() => homeStore.sessionList)// 获取会话列表
const talkUserDataList = computed(() => homeStore.talkUserDataList)
const isShow = ref(true)// 弹窗是否显示
const showBottom = ref(false)//标记已读弹窗
const showEmpty = ref(false);//确认清空消息列表弹窗
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
//确认清空会话列表
const sureEmpty = () => {
  homeStore.deleteAllSessions()
  homeStore.sessionList = []
  showEmpty.value = false
  showBottom.value = false
}
// 全部已读
const allRead = () => {
  homeStore.resetAllUnread()
  showBottom.value = false
}

onMounted(() => {
  //获取会话列表
  homeStore.getSessionList()
  //动态计算滚动区高度
  scrollHeight.value = window.screen.height - myRef.value.offsetHeight
  //组件挂载完成设置背景色
  document.querySelector('body').setAttribute('style', 'background-color:#130021')
})
onBeforeUnmount(() => {
  //组件卸载前去掉背景色
  document.querySelector('body').removeAttribute('style')
})

</script>

<style scoped>
:deep(.van-pull-refresh) {
  overflow: visible;
}
</style>
<route lang="yaml">
meta:
  layout: home
</route>