<template>
  <div class="px15">
    <!-- 页首 -->
    <div ref="myRef" class="flex justify-between py25">
      <div class="c-white text-21 font-bold">Moments</div>
      <img src="../../assets/publish.png" class=" w35 h35">
    </div>

    <!-- 朋友圈内容 -->
    <div class="overflow-scroll pb60" :style="{ height: scrollHeight + 'px' }">
      <div class=" bg-#AFA8FF/[.10] rounded-8 px20 pt24 mb15" v-for="item, index in 5" :key="index">
        <!-- 第一行 -->
        <div class="flex justify-between">
          <div>
            <van-space>
              <div class="bg-gradient-to-b from-#CC15C7 to-#5109C1 rounded-40 p1">
                <img src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" class="w40 h40 rounded-40" />
              </div>
              <div>
                <van-space direction="vertical" :size="0">
                  <div>
                    <van-space :size="4">
                      <div class="text-16 font-bold text-#fff">
                        Stella Malone
                      </div>
                      <div class="i-my-icons-famale text-14" />
                    </van-space>
                  </div>
                  <div class="text-#ccc text-12">5min ago</div>
                </van-space>
              </div>
            </van-space>
          </div>
          <div>
            <van-space :size="16">
              <button><img src="../../assets/chat.png" class="w32 h32"></button>
              <button><img src="../../assets/video.png" class="w32 h32"></button>
            </van-space>
          </div>
        </div>
        <!-- 第二行 -->
        <div class="text-14 c-#fff mt10">
          If you also like sports,we can be friends If you also like sports,we can be friends
        </div>
        <!-- 第三行 -->
        <div class="mt9">
          <van-space>
            <img src="../../assets/tans.png" class="w14 h14">
            <div class="text-12 c-#8F6FB8">View translations</div>
          </van-space>
        </div>
        <!-- 第四行 -->
        <div class="flex justify-between mt13">
          <div class="w88 h88 bg-indigo rounded-4" v-for="item, index in 3" :key="index"></div>
        </div>
        <!-- 第五行 -->
        <div class="flex justify-between mt16 pb16">
          <div class="">
            <van-space :size="52">
              <div>
                <van-space>
                  <van-icon name="like-o" color="#fff" :size="20" />
                  <div class="c-#fff">666</div>
                </van-space>
              </div>
              <div>
                <van-space>
                  <!-- <img src="../../assets/list_btn_comment.png" class="w20 h20"> -->
                  <van-icon name="comment-o" color="#fff" :size="20" />
                  <div class="c-#fff">857</div>
                </van-space>
              </div>
            </van-space>
          </div>
          <van-icon name="ellipsis" color="#ccc" :size="20" @click="showBottom = !showBottom" />
        </div>
      </div>
    </div>

    <van-popup v-model:show="showBottom" position="bottom" :style="{ height: '25%' }" class="bg-#130021">
      <template #default>
        <div class="w46 h6 rounded-5 bg-#E9E9E9/10 mx-auto mt16"></div>
        <div
          class="c-#fff text-16 font-bold mx15 text-center pt15 pb12 rounded-6 bg-gradient-to-r from-#4D09C1  via-#7F04BA to-#D016C8 mt16">
          Report
        </div>
        <div class="c-#fff text-16 font-bold mx15 text-center pt15 pb12 rounded-6 bg-#440699/10 mt16">
          Cancel
        </div>
      </template>
    </van-popup>
  </div>
</template>


<script  setup>
const myRef = ref();
const good = ref(0)
const scrollHeight = ref(0)
const showBottom = ref(false)
const clockGood = () => {
  console.log(good.value);
  if (good.value >= 1) {
    good.value = 0
  }
  console.log(good.value);
}
onMounted(() => {
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