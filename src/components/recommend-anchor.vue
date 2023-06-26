<template>
    <div>
        <div>
            <img src="" class="">
        </div>
    </div>
</template>


<script  setup>
const recommendAnchorList = ref([])
import { getRecommendAnchor } from '~/api/home'
//获取首页推荐
const getRecommendAnchorData = async () => {
    const result = await getRecommendAnchor()
    console.log();
    recommendAnchorList = result
}
</script>

<style scoped></style>