<template>
  <div>
    <div class="max-w-500 mx-auto">
      <RouterView />
      <van-tabbar route :border="false" class="pt10 pb20">
        <van-tabbar-item to="/">
          <template #icon="props">
            <img v-if="props.active" src="../assets/tab_home_hover.png" class=" w40 important:h40 " />
            <img v-else src="../assets/tab_home.png" class=" w40 important:h40 " />
          </template>
        </van-tabbar-item>
        <van-tabbar-item to="/moments">
          <template #icon="props">
            <img v-if="props.active" src="../assets/tab_friend_hover.png" class=" w40 important:h40" />
            <img v-else src="../assets/tab_friend.png" class=" w40 important:h40" />
          </template>
        </van-tabbar-item>
        <van-tabbar-item to="/message">
          <template #icon="props">
            <van-badge :content="homeStore.unReadMsgCount" :show-zero="false">
              <img v-if="props.active" src="../assets/tab_Chat_hover.png" class=" w40 important:h40" />
              <img v-else src="../assets/tab_Chat.png" class=" w40 important:h40" />
            </van-badge>
          </template>
        </van-tabbar-item>
        <van-tabbar-item to="/personal">
          <template #icon="props">
            <img v-if="props.active" src="../assets/tab_Profile_hover.png" class=" w40 important:h40 my5" />
            <img v-else src="../assets/tab_Profile.png" class=" w40 important:h40 my5" />
          </template>
        </van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>
<script setup lang="ts">
const homeStore = useHomeStore()
</script>
