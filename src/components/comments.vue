<template>
    <div class="mt25">
        <div v-for=" item, index in momentData" :key="index" class="mb5">
            <van-space :size="2">
                <div class="c-#3956E2 text-14 font-semibold">{{ item.nickname }}:</div>
                <div class="c-#fff text-14">{{ item.commentContent }}</div>
            </van-space>
        </div>
    </div>
</template>


<script  setup>
import { getMoments, like } from '~/api/moments'
import { useMomentsStore } from '~/stores/moments'
const props = defineProps(['id', 'count'])
const momentData = ref({})
const momentsStore = useMomentsStore()
const momentsList = computed(() => momentsStore.momentsList)
// 获取评论列表
// const getMomentsList = async (id) => {
//     const result = await getMoments({
//         "currentPage": 1,
//         "keyword": id,
//         "pageSize": 10,
//         "startTime": ""
//     })
//     momentsStore.momentsList.push({
//         id,
//         result
//     })
// }

// onMounted(() => {
//     getMomentsList(props.id)
// })




// watch(momentsList, () => {
//     momentData.value = momentsStore.momentsList.map((item) => {
//         if (item.id === props.id) {
//             return item.result
//         }
//     })
// })
</script>

<style scoped></style>