<template>
  <div class="">
    <div class="c-white text-50">个人中心</div>
  </div>
</template>


<script lang="ts" setup>
onMounted(() => {
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