<template>
  <div class="px15 ">
    <!-- 页首 -->
    <div ref="myRef" class="flex justify-between pb25" :class="homeStore.topHeight">
      <div class="c-white text-21 font-bold">Moments</div>
      <!-- <img src="../../assets/publish.png" class=" w35 h35"> -->
    </div>

    <!-- 朋友圈内容 -->
    <div class="overflow-scroll pb120 " :style="{ height: scrollHeight + 'px' }" ref="scrollDom">
      <van-pull-refresh v-model="loading" @refresh="onRefresh" pulling-text="Pull To Refresh" loading-text="loading..."
        loosing-text="Release to refresh" success-text="Refresh successful" z-2>
        <van-list v-model:loading="momentsStore.loadingScroll" :finished="momentsStore.finished"
          finished-text="There's no more" loading-text="loading..." @load="loadMore">
          <div class=" bg-#AFA8FF/10 rounded-8 px20 py24 mb15 " v-for="item, index in data" :key="index">
            <!-- 第一行 -->
            <div class="flex justify-between">
              <div>
                <van-space>
                  <div class="bg-gradient-to-b from-#CC15C7 to-#5109C1 rounded-40 p1">
                    <img :src="item.icon" class="w40 h40 rounded-40" />
                  </div>
                  <div>
                    <van-space direction="vertical" :size="0">
                      <div>
                        <van-space :size="4">
                          <div class="text-16 font-bold text-#fff">
                            {{ item.nickname }}
                          </div>
                          <div class="i-my-icons-famale text-14" />
                        </van-space>
                      </div>
                      <div class="text-#ccc text-12">{{ getMomentsTime(item.createTime) }}</div>
                    </van-space>
                  </div>
                </van-space>
              </div>
              <div>
                <van-space :size="16">
                  <button
                    @click="router.push({ path: 'talk', query: { to: item.yxAccid, nick: item.nickname, avatar: item.icon } })"><img
                      src="../../assets/chat.png" class="w32 h32"></button>
                  <button
                    @click="router.push({ path: 'waitcall', query: { userId: item.userId, yxId: item.yxAccid } })"><img
                      src="../../assets/video.png" class="w32 h32"></button>
                </van-space>
              </div>
            </div>
            <!-- 第二行 -->
            <div class="text-14 c-#fff mt10">
              {{ item.textContent }}
            </div>
            <!-- 第三行 -->
            <div class="mt9">
              <van-space>
                <img src="../../assets/tans.png" class="w14 h14">
                <div class="text-12 c-#8F6FB8">View translations</div>
              </van-space>
            </div>
            <!-- 第四行(图片) -->
            <div class="mt13">
              <van-row :gutter="20">
                <van-col v-for="item, index in item.imgUrls" :key="index" :span="8">
                  <div class="rounded-4 overflow-hidden text-0 h88">
                    <van-image :src="item" :key="index" v-if="index < 3" fit="cover" @click="showImg(item)" />
                  </div>
                </van-col>
              </van-row>
            </div>
            <!-- 第五行 -->
            <div class="flex justify-between pt16">
              <div class="">
                <van-space :size="52">
                  <div>
                    <van-space>
                      <van-icon v-if="item.likeFlag === 0" name="like-o" color="#fff" :size="20"
                        @click="likeCircle(item.id, 1, index)" />
                      <van-icon v-else name="like" color="#FB3A54" :size="20" @click="likeCircle(item.id, 0, index)" />
                      <div class="c-#fff text-12">{{ item.likeNum }}</div>
                    </van-space>
                  </div>
                  <div>
                    <van-space>
                      <!-- <img src="../../assets/list_btn_comment.png" class="w20 h20"> -->
                      <van-icon name="comment-o" color="#fff" :size="20" @click="clickComment(item.id)" />
                      <div class="c-#fff text-12">{{ item.commentNum }}</div>
                    </van-space>
                  </div>
                </van-space>
              </div>
              <van-icon name="ellipsis" color="#ccc" :size="20" @click="showBottom = !showBottom" />
            </div>
            <!-- 评论区 -->
            <div class="mt25">
              <div v-for="data, count in item.comment" :key="count" class="mb5">
                <van-space :size="2">
                  <div class="c-#3956E2 text-14 font-semibold"> {{ data.nickname }} :</div>
                  <div class="c-#fff text-14"> {{ data.commentContent }} </div>
                </van-space>
              </div>
            </div>

          </div>
        </van-list>
      </van-pull-refresh>
    </div>
    <!-- 朋友圈举报 -->
    <van-popup v-model:show="showBottom" position="bottom" class="bg-#130021 h25%">
      <template #default>
        <div class="w46 h6 rounded-5 bg-#E9E9E9/10 mx-auto mt16"></div>
        <div @click="router.push('report')"
          class="c-#fff text-16 font-bold mx15 text-center pt15 pb12 rounded-6 bg-gradient-to-r from-#4D09C1  via-#7F04BA to-#D016C8 mt16">
          Report
        </div>
        <div class="c-#fff text-16 font-bold mx15 text-center pt15 pb12 rounded-6 bg-#440699/10 mt16"
          @click="showBottom = false">
          Cancel
        </div>
      </template>
    </van-popup>
    <!-- 图片预览 -->
    <van-image-preview />
    <!-- 发布评论 -->
    <van-popup v-model:show="showComment" position="bottom" :style="{ height: auto }" overlay-class="bg-transparent ">
      <template #default>
        <div class="py20 bg-#130021">
          <van-space :size="10">
            <div class="w295">
              <van-cell-group inset>
                <van-field v-model="content" placeholder="Type a message..." ref="field">
                  <template #button>
                    <img src="../../assets/emojbtn.png" class="w24 h24">
                  </template>
                </van-field>
              </van-cell-group>
            </div>
            <div class="text-center">
              <button class="w36 h36" @click="postComment"><img src="../../assets/send.png"></button>
            </div>
          </van-space>
        </div>
      </template>
    </van-popup>
  </div>
</template>


<script  setup>
import { showImagePreview } from 'vant';
import { getFriendsCircle, like } from "~/api/moments";
import { useMomentsStore } from '~/stores/moments'
import { getMomentsTime } from '~/utils'
import dayjs from 'dayjs'
const homeStore = useHomeStore()
const myRef = ref();//tab栏实例
const field = ref()//输入框实例
const scrollHeight = ref(0)//滚动区域高度
const showBottom = ref(false)//举报弹窗显示
const loading = ref(false);//下拉刷新加载状态
const showComment = ref(false)//评论输入框显示
const cirlceFlag = ref(0)//标记点击了哪条朋友圈
const momentsStore = useMomentsStore()
const userStore = useUserStore()
const data = computed(() => momentsStore.friendsCircleList)
const router = useRouter()

//下拉刷新
const onRefresh = () => {
  momentsStore.friendsCircleList = []
  setTimeout(() => {
    //获取朋友圈列表
    momentsStore.getFriendsCircleList({ origin: 'pull' })
    loading.value = false;
  }, 1000);
};
// 无限滚动
let allowLoad = true
let currentPage = 1
const loadMore = () => {
  if (allowLoad) {
    allowLoad = false
    currentPage++
    setTimeout(() => {
      momentsStore.getFriendsCircleList({ currentPage, origin: 'scroll' })
      allowLoad = true
    }, 1000);
  }
}

//判断滚动距离触发更新
// const scrollDom = ref()
// const scrollHandle = () => {
//   const scrollHeight = scrollDom.value.scrollHeight//计算滚动高度
//   const clientHeight = document.body.clientHeight//计算视口高度
//   const scrollTop = scrollDom.value.scrollTop //计算滚动的距离
//   const distance = scrollHeight - scrollTop - clientHeight//计算到滚动到页面底部剩余距离
//   //当快滑动到底部的时候
//   if (distance < 30) {
//     loadMore()
//   }
// }

// 图片预览
const showImg = (imgList) => {
  showImagePreview([imgList]);
}

//点赞/取消点赞
const likeCircle = async (id, type, index) => {
  await like({
    "id": id, // id:朋友圈id 
    "optionType": type//type: 1点赞 0取消点赞
  })
  momentsStore.friendsCircleList[index].likeFlag = type//先修改本地数据
  if (type === 1)
    momentsStore.friendsCircleList[index].likeNum++//
  else
    momentsStore.friendsCircleList[index].likeNum--
}

//点击评论按钮
const clickComment = (id) => {
  cirlceFlag.value = id //标记点击了哪条朋友圈
  showComment.value = true //展示输入框
  nextTick(() => field.value.focus())//输入框出现时获取焦点
}

import { comment } from '~/api/moments'
const content = ref('')
//发布评论
const postComment = async () => {
  await comment({
    "commentContent": content.value,
    "friendsCircleId": cirlceFlag.value,
    "parentCommentId": ""
  })
  showComment.value = false
  momentsStore.friendsCircleList.forEach((item) => {
    if (item.id === cirlceFlag.value) {
      item.comment.push({
        "nickname": "Dao",
        "commentContent": content.value
      })
    }
  })
  content.value = ''
}

onMounted(() => {

  //动态计算滚动区高度
  scrollHeight.value = document.documentElement.clientHeight - myRef.value.offsetHeight
  //组件挂载完成设置背景色
  document.querySelector('body').setAttribute('style', 'background-color:#130021')
  //组件挂载时，添加scroll监听
  // scrollDom.value.addEventListener("scroll", scrollHandle);
})
onBeforeUnmount(() => {

  //组件卸载前去掉背景色
  document.querySelector('body').removeAttribute('style')
  //组件卸载前解绑事件
  // window.removeEventListener("scroll", scrollHandle);
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