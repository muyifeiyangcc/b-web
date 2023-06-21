<template>
    <div class="pt80">
        <!-- 顶部导航栏 -->
        <div ref="myRef">
            <van-nav-bar left-arrow @click-left="router.go(-1)" :border="false" fixed="true">
                <template #title>
                    <div class="text-#fff text-21 font-semibold">Feedback</div>
                </template>
                <template #left>
                    <van-icon name="arrow-left" :size="22" color="#fff" />
                </template>
            </van-nav-bar>
        </div>
        <!-- 单选框 -->
        <div class="mx20 ">
            <van-row :gutter="15">
                <van-col :span="12">
                    <div class="text-14 c-#fff font-semibold bg-#1B0D2C text-center py17 rounded-2"
                        @click="setValue('Application problem')"
                        :class="radioValue === 'Application problem' ? 'active' : ''">
                        Application problem
                    </div>
                </van-col>
                <van-col :span="12">
                    <div class="text-14 c-#fff font-semibold bg-#1B0D2C text-center py17 rounded-2"
                        @click="setValue('Account problem')" :class="radioValue === 'Account problem' ? 'active' : ''">
                        Account problem </div>
                </van-col>
            </van-row>
            <van-row :gutter="15" class="mt15">
                <van-col :span="12">
                    <div class="text-14 c-#fff font-semibold bg-#1B0D2C text-center py17 rounded-2"
                        @click="setValue('Suggest')" :class="radioValue === 'Suggest' ? 'active' : ''">Suggest</div>
                </van-col>
                <van-col :span="12">
                    <div class="text-14 c-#fff font-semibold bg-#1B0D2C text-center py17 rounded-2"
                        @click="setValue('Other')" :class="radioValue === 'Other' ? 'active' : ''">Other</div>
                </van-col>
            </van-row>
        </div>
        <!-- 文本输入 -->
        <div class="mt30 mx20">
            <van-field v-model="message" type="textarea" maxlength="500" placeholder="Enter what you want to say..."
                show-word-limit />
        </div>
        <!-- 邮箱输入 -->
        <div class="mt16 mx20">
            <div class="text-16 c-#fff font-medium mb12">Email</div>
            <van-field v-model="email" placeholder="Enter what you want to say..." class="important:py18" />
        </div>
        <!-- 图片上传 -->
        <div class="mt16 mx20">
            <div class="text-16 c-#fff font-medium mb12">Add Picture</div>
            <van-uploader v-model="fileList" multiple />
        </div>
        <!-- 提交按钮 -->
        <div class="text-center  mt40">
            <van-button
                class="c-#fff text-16 mx-auto w200 py10 b-0 bg-gradient-to-r from-#4D09C1  via-#7F04BA to-#D016C8  rounded-23">
                Submit
            </van-button>
        </div>

    </div>
</template>


<script  setup>
const router = useRouter()
const checked = ref('')
const message = ref('')
const email = ref('')
const fileList = ref([])
const radioValue = ref('Application problem')
const afterRead = (file) => {
    // 此时可以自行将文件上传至服务器
    console.log(file);
};
const setValue = (value) => {
    radioValue.value = value
    console.log(fileList.value);
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



.van-field {
    background-color: #1B0D2C;
}

:deep(.van-field__control--min-height) {
    min-height: 175px;
}
</style>