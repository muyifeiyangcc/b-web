<template>
    <div>
        <!-- 顶部导航栏 -->
        <div ref="myRef">
            <van-nav-bar left-arrow @click-left="router.go(-1)" :border="false">
                <template #title>
                    <div class="text-#fff text-21 font-semibold">Report</div>
                </template>
                <template #left>
                    <van-icon name="arrow-left" :size="22" color="#fff" />
                </template>
            </van-nav-bar>
        </div>
        <!-- 单选框 -->
        <div class="mx24 mt43">
            <van-row :gutter="23">
                <van-col :span="12">
                    <div class="text-14 c-#fff font-medium bg-#251649 text-center py17 rounded-4"
                        @click="setValue('Political sensitivity')"
                        :class="radioValue === 'Political sensitivity' ? 'active' : ''">
                        Political sensitivity
                    </div>
                </van-col>
                <van-col :span="12">
                    <div class="text-14 c-#fff font-medium bg-#251649 text-center py17 rounded-4"
                        @click="setValue('Violent pornography')"
                        :class="radioValue === 'Violent pornography' ? 'active' : ''">
                        Violent pornography </div>
                </van-col>
            </van-row>
            <van-row :gutter="23" class="mt15">
                <van-col :span="12">
                    <div class="text-14 c-#fff font-medium bg-#251649 text-center py17 rounded-4"
                        @click="setValue('Advertising harassment')"
                        :class="radioValue === 'Advertising harassment' ? 'active' : ''">Advertising harassment</div>
                </van-col>
                <van-col :span="12">
                    <div class="text-14 c-#fff font-medium bg-#251649 text-center py17 rounded-4" @click="setValue('Other')"
                        :class="radioValue === 'Other' ? 'active' : ''">Other</div>
                </van-col>
            </van-row>
        </div>
        <!-- 文本输入 -->
        <div class="mt37 mx24 b-1 border-dashed b-#251649 ">
            <van-field v-model="message" type="textarea" maxlength="200"
                placeholder="Describe more clear reporting information" show-word-limit />
        </div>
        <!-- 提交按钮 -->
        <div class="text-center  mt230">
            <van-button
                class="c-#fff text-16 font-semibold mx-auto px96 py14 b-0 bg-gradient-to-r from-#4D09C1  via-#7F04BA to-#D016C8  rounded-23">
                Submit
            </van-button>
        </div>
    </div>
</template>


<script  setup>
const radioValue = ref('Political sensitivity')
const router = useRouter()
const message = ref('')
const setValue = (value) => {
    radioValue.value = value
}
onMounted(() => {
    //组件挂载完成设置背景色
    document.querySelector('body').setAttribute('style', 'background-color:#130021')
})
onBeforeUnmount(() => {
    //组件卸载前去掉背景色
    document.querySelector('body').removeAttribute('style')
})
</script>

<style scoped>
.active {
    background: linear-gradient(232deg, #D016C8 0%, #7F04BA 47%, #4D09C1 100%);
}

:deep(.van-field) {
    background-color: transparent;
}

:deep(.van-field__control--min-height) {
    min-height: 175px;
}
</style>