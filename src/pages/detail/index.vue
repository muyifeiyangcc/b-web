<template>
    <div>

    </div>
</template>


<script  setup>
import { getUserDetail } from '~/api/home'
const userStore = useUserStore()
const route = useRoute()
const userId = route.query.userId;
const yxAccid = route.query.yxId;
const userDetail = ref({})
//获取用户详情
const getUserDetailData = async () => {
    userDetail.value = await getUserDetail({
        userId, yxAccid
    })
    console.log(userDetail.value);
}
onMounted(() => {
    //获取用户详情数据
    getUserDetailData()
    userStore.getMineInfoData()
    //组件挂载完成设置背景色
    document.querySelector('body').setAttribute('style', 'background-color:#130021')
})
onBeforeUnmount(() => {
    //组件卸载前去掉背景色
    document.querySelector('body').removeAttribute('style')
})
</script>

<style scoped></style>