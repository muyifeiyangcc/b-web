<template>
    <div class="">
        <van-image width="70" height="70" :src="giftData.giftImg" />
    </div>
</template>

<script  setup>
import { getMoments, like } from '~/api/moments'
const props = defineProps(['id'])
const giftStore = useGiftStore()
const giftData = ref({})
onMounted(() => {
    giftData.value = giftStore.giftList.filter((item) => item.id === props.id)[0]
})
</script>

<style scoped></style>