<template>
    <div>
        <!-- 头部导航栏 -->
        <div ref="myRef">
            <van-nav-bar left-arrow @click-left="router.go(-1)" @click-right="" :border="false">
                <template #right>
                    <div class="c-#fff text-16 px20 py5 bg-gradient-to-r from-#4D09C1  via-#7F04BA to-#D016C8 rounded-23">
                        save</div>
                </template>
                <template #title>
                    <div class="c-#fff text-21 font-semibold">Edit profile</div>
                </template>
                <template #left>
                    <van-icon name="arrow-left" :size="22" color="#fff" />
                </template>
            </van-nav-bar>
        </div>
        <!-- tab栏 -->
        <div class="mx15 mt28">
            <van-space :size="26">
                <div class="c-#FFFFFF/40 text-16 font-semibold">Ablum</div>
                <div class="c-#FFFFFF/40 text-16 font-semibold">Vedio</div>
            </van-space>
        </div>

        <!-- 图片上传 -->
        <div class="mx15 mt20">
            <van-uploader v-model="fileList" multiple preview-size="95">
                <template #default>
                    <div class="w95 h95 bg-#1B0D2C text-center py40">
                        <van-icon name="plus" class="c-#fff/40 font-bold" size="18" />
                    </div>
                </template>
            </van-uploader>
        </div>

        <div>
            <div class="c-#fff text-16 font-semibold ml20 mt32">Basic info</div>
            <img src="../../assets/takephoto.png" class="w97 h97 mt15 mx-auto">
        </div>

        <div class="mx30 mt20 flex justify-between">
            <div class=" bg-lightBlue w80 h80 rounded-50%"></div>
            <div class=" bg-lightBlue w80 h80 rounded-50%"></div>
            <div class=" bg-lightBlue w80 h80 rounded-50%"></div>
        </div>

        <div class="mx20 py20 mt20 b-b-1 b-#EFEFEF/5 flex justify-between items-center" @click="showName = true">
            <div class="c-#fff text-16 font-medium">Name</div>
            <div>
                <van-space>
                    <div class="c-#766D80 text-16">Find contacts</div>
                    <van-icon name="arrow" color="#C1C0C9" />
                </van-space>
            </div>
        </div>
        <div class="mx20 py20 b-b-1 b-#EFEFEF/5 flex justify-between items-center" @click="showGender = true">
            <div class="c-#fff text-16 font-medium">Gender</div>
            <div class="c-#766D80 text-16 mr20">Male</div>
        </div>
        <div class="mx20 py20  b-b-1 b-#EFEFEF/5 flex justify-between items-center" @click="showBirth = true">
            <div class="c-#fff text-16 font-medium">Birthdate</div>
            <div>
                <van-space>
                    <div class="c-#766D80 text-16">18</div>
                    <van-icon name="arrow" color="#C1C0C9" />
                </van-space>
            </div>
        </div>
        <div class="mx20 py20  b-b-1 b-#EFEFEF/5 flex justify-between items-center" @click="showCountry = true">
            <div class="c-#fff text-16 font-medium">Coutry</div>
            <div>
                <van-space>
                    <div class="c-#766D80 text-16">Wukelan</div>
                    <van-icon name="arrow" color="#C1C0C9" />
                </van-space>
            </div>
        </div>

        <div class="mx20 mt20 pb193">
            <div class="c-#fff text-16 font-semibold ">About me</div>
            <!-- 文本输入 -->
            <div class="mt10 mark">
                <van-field v-model="message" type="textarea" maxlength="500" placeholder="Enter what you want to say..." />
            </div>
        </div>

        <!-- 修改昵称弹窗 -->
        <van-popup v-model:show="showName" position="bottom" :style="{ height: '47rem' }" class="bg-#130021">
            <template #default>
                <div class="w46 h6 rounded-5 bg-#E9E9E9/10 mx-auto mt16"></div>
                <div class="px17 "><van-field v-model="value" class="c-#fff mt16 rounded-6" /></div>
                <div
                    class="c-#fff text-16 font-semibold mx40 text-center pt15 pb12 rounded-23 bg-gradient-to-r from-#D016C8  via-#7F04BA to-#4D09C1 mt16">
                    save
                </div>
            </template>
        </van-popup>
        <!-- 选择性别弹窗 -->
        <van-popup v-model:show="showGender" position="bottom" :style="{ height: '58.75rem' }" class="bg-#130021">
            <template #default>
                <div class="w46 h6 rounded-5 bg-#E9E9E9/10 mx-auto mt16"></div>
                <div class="mx18 mt20 flex justify-between">
                    <div class="c-#fff font-bold text-16">Cannel</div>
                    <div class="c-#fff font-bold text-16">Done</div>
                </div>
                <div
                    class="c-#fff text-16 font-semibold mx18 text-center pt15 pb12 rounded-6 bg-gradient-to-r from-#D016C8  via-#7F04BA to-#4D09C1 mt20">
                    Male
                </div>
                <div class="c-#fff text-16 font-semibold mx18 text-center pt15 pb12 rounded-6 bg-#1B0D2C mt16">
                    Female
                </div>
            </template>
        </van-popup>
        <!-- 选择国家弹窗 -->
        <van-popup v-model:show="showCountry" position="bottom" :style="{ height: '93.75rem' }" class="bg-#130021">
            <template #default>
                <div class="w46 h6 rounded-5 bg-#E9E9E9/10 mx-auto mt16"></div>
                <div class="mx18 mt20 flex justify-between">
                    <div class="c-#fff font-bold text-16">Cannel</div>
                    <div class="c-#fff font-bold text-16">Done</div>
                </div>
                <div
                    class="c-#fff text-16 font-semibold mx18 text-center pt15 pb12 rounded-6 bg-gradient-to-r from-#D016C8  via-#7F04BA to-#4D09C1 mt20">
                    Ameria
                </div>
                <div class="c-#fff text-16 font-semibold mx18 text-center pt15 pb12 rounded-6 bg-#1B0D2C mt16">
                    French
                </div>
                <div class="c-#fff text-16 font-semibold mx18 text-center pt15 pb12 rounded-6 bg-#1B0D2C mt16">
                    China
                </div>
                <div class="c-#fff text-16 font-semibold mx18 text-center pt15 pb12 rounded-6 bg-#1B0D2C mt16">
                    Ukane
                </div>
            </template>
        </van-popup>
        <!-- 选择生日弹窗 -->
        <van-popup v-model:show="showBirth" position="bottom" :style="{ height: '78.25rem' }" class="bg-#130021">
            <template #default>
                <div class="w46 h6 rounded-5 bg-#E9E9E9/10 mx-auto mt16"></div>
                <div class="mx18 mt20 flex justify-between">
                    <div class="c-#fff font-bold text-16">Cannel</div>
                    <div class="c-#fff font-bold text-16">Done</div>
                </div>
                <van-date-picker :min-date="minDate" :max-date="maxDate" :show-toolbar="false" visible-option-num="3"
                    option-height="50" class="mt20" />
            </template>
        </van-popup>
    </div>
</template>


<script  setup>
import { getMineInfo } from '~/api/user'
const router = useRouter()
const message = ref('')
const showName = ref(false)//修改昵称弹窗
const showGender = ref(false)//选择性别弹窗
const showCountry = ref(false)//选择国家弹窗
const showBirth = ref(false)//选择生日弹窗
const value = ref('')
const fileList = ref([])
const minDate = new Date(1970, 0, 1)
const maxDate = new Date(2023, 5, 1)

//获取个人信息
const getMineInfoData = async () => {
    const result = await getMineInfo()
    console.log(result);
}

onMounted(() => {
    //获取个人信息
    getMineInfoData()
    // 组件挂载完成设置背景色
    document.querySelector('body').setAttribute('style', 'background-color:#130021')
})

onBeforeUnmount(() => {
    //组件卸载前去掉背景色
    document.querySelector('body').removeAttribute('style')
})
</script>

<style scoped>
.van-nav-bar {
    background-color: #130021;
}

.van-field {
    background-color: #1B0D2C;
}


:deep(.mark .van-field__control) {
    color: #fff !important;
    height: 35rem;
}

:deep(.van-field__control) {
    color: #fff !important;
}


:deep(.van-picker__frame) {
    background: red;
    border-radius: 6px;
    background: linear-gradient(232deg, #D016C8 0%, #7F04BA 47%, #4D09C1 100%);
}

:deep(.van-picker__frame::after) {
    border: 0
}

:deep(.van-picker-column) {
    z-index: 3;
}

/* :deep(.van-picker-column__item--selected) {
    margin: 16px 0 16px 0
} */
</style>