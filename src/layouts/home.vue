<template>
  <div>
    <div class="max-w-400 mx-auto">
      <RouterView />
      <van-tabbar route>
        <van-tabbar-item icon="home-o" to="/">首页</van-tabbar-item>
        <van-tabbar-item icon="search" to="/moments">朋友圈</van-tabbar-item>
        <van-tabbar-item icon="friends-o" to="/message">消息</van-tabbar-item>
        <van-tabbar-item icon="setting-o" to="/personal">个人中心</van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>
<script setup lang="ts">

</script>