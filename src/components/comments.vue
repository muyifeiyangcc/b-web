<template>
    <div class="mt25">
        <div v-for=" item, index in momentsStore.momentsList[props.count]" :key="index" class="mb5">
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
const momentsStore = useMomentsStore()
// 获取评论列表
const getMomentsList = async (id) => {
    const result = await getMoments({
        "currentPage": 1,
        "keyword": id,
        "pageSize": 10,
        "startTime": ""
    })
    momentsStore.momentsList.push(result)
    console.log(momentsStore.momentsList);
}

onMounted(() => {
    getMomentsList(props.id)
})


</script>

<style scoped></style>