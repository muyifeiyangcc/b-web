<template>
  <div>
    <div class="max-w-400 mx-auto">
      <RouterView />
      <van-tabbar route :border="false">
        <van-tabbar-item icon="home-o" to="/">
          <template #icon="props">
            <img v-if="props.active" src="../assets/tab_home_hover.png" class=" w30 important:h30" />
            <img v-else src="../assets/tab_home.png" class=" w30 important:h30" />
          </template>
        </van-tabbar-item>
        <van-tabbar-item icon="search" to="/moments">
          <template #icon="props">
            <img v-if="props.active" src="../assets/tab_friend_hover.png" class=" w30 important:h30" />
            <img v-else src="../assets/tab_friend.png" class=" w30 important:h30" />
          </template>
        </van-tabbar-item>
        <van-tabbar-item icon="friends-o" to="/message">
          <template #icon="props">
            <img v-if="props.active" src="../assets/tab_Chat_hover.png" class=" w30 important:h30" />
            <img v-else src="../assets/tab_Chat.png" class=" w30 important:h30" />
          </template>
        </van-tabbar-item>
        <van-tabbar-item icon="setting-o" to="/personal">
          <template #icon="props">
            <img v-if="props.active" src="../assets/tab_Profile_hover.png" class=" w30 important:h30" />
            <img v-else src="../assets/tab_Profile.png" class=" w30 important:h30" />
          </template>
        </van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>
<script setup lang="ts">

</script>
