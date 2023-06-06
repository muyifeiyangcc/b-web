<template>
    <div>
        <van-popup v-model:show="homeStore.getDiamondsVisible" position="bottom" :style="{ height: '50%' }" />
    </div>
</template>


<script lang="ts" setup>
import { useHomeStore } from '~/stores';
const homeStore = useHomeStore()


</script>

<style scoped></style>