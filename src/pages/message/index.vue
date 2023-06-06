<template>
  <div mt53 mx15>
    <!-- 聊天页tab栏 -->
    <van-tabs v-model:active="active" background="transparent" title-active-color="#fff"
      title-inactive-color="rgba(255,255,255,0.6)" line-width="0px">
      <van-tab title="Message" title-style="font-size:21px"></van-tab>
      <van-tab title="Call record" title-style="font-size:21px"></van-tab>
    </van-tabs>
    <!-- 聊天页弹窗 -->
    <div class="pt16 pb12 rounded-8  mt20 relative"
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
        <div class="b-0 bg-#fff/[.40] w16 h16 rounded-50% absolute right-8 top-8">
          <van-icon name="cross" color="#fff" size="1rem" />
        </div>
      </van-space>
    </div>

  </div>
</template>


<script  setup>
onMounted(() => {
  document.querySelector('body').setAttribute('style', 'background-color:#130021')
})
onBeforeUnmount(() => {
  document.querySelector('body').removeAttribute('style')

})
</script>

<style scoped></style>
<route lang="yaml">
meta:
  layout: home
</route>