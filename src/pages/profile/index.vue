<template>
    <div class="pt60">
        <!-- 头部导航栏 -->
        <div ref="myRef">
            <van-nav-bar left-arrow @click-left="router.go(-1)" @click-right="" :border="false" fixed="true">
                <template #right>
                    <div class="c-#fff text-16 px20 py5 bg-gradient-to-r from-#4D09C1  via-#7F04BA to-#D016C8 rounded-23"
                        @click="setMineInfoData">
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
        <!-- 背景图片上传 -->
        <div class="mx15 mt20">
            <van-uploader v-model="fileList" multiple preview-size="95">
                <template #default>
                    <div class="w95 h95 bg-#1B0D2C text-center py40">
                        <van-icon name="plus" class="c-#fff/40 font-bold" size="18" />
                    </div>
                </template>
            </van-uploader>
        </div>
        <!-- 上传头像 -->
        <div>
            <div class="c-#fff text-16 font-semibold ml20 mt32 ">Basic info</div>
            <div class="w97 h97 rounded-50% overflow-hidden mt15 mx-auto  relative text-center ">
                <van-uploader v-model="avatar" multiple:max-count=1 preview-size="97" :after-read="afterRead">
                    <template #default>
                        <van-image round width="24rem" height="24rem" :src="setUserInfoOpt.icon" />
                    </template>
                </van-uploader>
                <!-- 删除图片按钮 -->
                <div class="bg-#fff/40 h20 w-full absolute bottom-0  z-3" @click="avatar = []">
                    <van-icon name="cross" class="text-16 c-#fff" />
                </div>
            </div>
        </div>
        <!-- choose avatar -->
        <div class="mx30 mt20 flex justify-between">
            <img src="../../assets/avatar_1.jpg" class="w80 h80 rounded-50%"
                @click="setUserInfoOpt.icon = 'https://app-bucket-test.oss-cn-guangzhou.aliyuncs.com/1688191947471.jpg'">
            <img src="../../assets/avatar_2.jpg" class="w80 h80 rounded-50%"
                @click="setUserInfoOpt.icon = 'https://app-bucket-test.oss-cn-guangzhou.aliyuncs.com/1688193197578.jpg'">
            <img src="../../assets/avatar_3.jpg" class="w80 h80 rounded-50%"
                @click="setUserInfoOpt.icon = 'https://app-bucket-test.oss-cn-guangzhou.aliyuncs.com/1688193254177.jpg'">
        </div>
        <!-- name -->
        <div class="mx20 py20 mt20 b-b-1 b-#EFEFEF/5 flex justify-between items-center" @click="showName = true">
            <div class="c-#fff text-16 font-medium">Name</div>
            <div>
                <van-space>
                    <div class="c-#766D80 text-16">{{ setUserInfoOpt.nickname }}</div>
                    <van-icon name="arrow" color="#C1C0C9" />
                </van-space>
            </div>
        </div>
        <!-- gender -->
        <div class="mx20 py20 b-b-1 b-#EFEFEF/5 flex justify-between items-center" @click="showGender = true">
            <div class="c-#fff text-16 font-medium">Gender</div>
            <div class="c-#766D80 text-16 mr20">{{ setUserInfoOpt.gender === 1 ? 'Male' : 'Female' }}</div>
        </div>
        <!-- birth -->
        <div class="mx20 py20  b-b-1 b-#EFEFEF/5 flex justify-between items-center" @click="showBirth = true">
            <div class="c-#fff text-16 font-medium">Birthdate</div>
            <div>
                <van-space>
                    <div class="c-#766D80 text-16">{{ mineInfo.age }}</div>
                    <van-icon name="arrow" color="#C1C0C9" />
                </van-space>
            </div>
        </div>
        <!-- country -->
        <div class="mx20 py20  b-b-1 b-#EFEFEF/5 flex justify-between items-center" @click="showCountry = true">
            <div class="c-#fff text-16 font-medium">Coutry</div>
            <div>
                <van-space>
                    <div class="c-#766D80 text-16">{{ country }}</div>
                    <van-icon name="arrow" color="#C1C0C9" />
                </van-space>
            </div>
        </div>
        <!-- about me -->
        <div class="mx20 mt20 pb193">
            <div class="c-#fff text-16 font-semibold ">About me</div>
            <!-- 文本输入 -->
            <div class="mt10 mark">
                <van-field v-model="setUserInfoOpt.signature" type="textarea" maxlength="500"
                    placeholder="Enter what you want to say..." />
            </div>
        </div>

        <!-- 修改昵称弹窗 -->
        <van-popup v-model:show="showName" position="bottom" :style="{ height: '47rem' }" class="bg-#130021">
            <template #default>
                <div class="w46 h6 rounded-5 bg-#E9E9E9/10 mx-auto mt16"></div>
                <div class="px17 "><van-field v-model="setUserInfoOpt.nickname" class="c-#fff mt16 rounded-6" /></div>
                <div class="c-#fff text-16 font-semibold mx40 text-center pt15 pb12 rounded-23 bg-gradient-to-r from-#D016C8  via-#7F04BA to-#4D09C1 mt16"
                    @click="showName = false">
                    save
                </div>
            </template>
        </van-popup>
        <!-- 选择性别弹窗 -->
        <van-popup v-model:show="showGender" position="bottom" :style="{ height: '58.75rem' }" class="bg-#130021">
            <template #default>
                <div class="w46 h6 rounded-5 bg-#E9E9E9/10 mx-auto mt16"></div>
                <div class="mx18 mt20 flex justify-between">
                    <div class="c-#fff font-bold text-16" @click="showGender = false; gender = setUserInfoOpt.gender">Cannel
                    </div>
                    <div class="c-#fff font-bold text-16" @click="showGender = false; setUserInfoOpt.gender = gender">Done
                    </div>
                </div>
                <div class="c-#fff text-16 font-semibold mx18 text-center pt15 pb12 rounded-6 bg-#1B0D2C mt20"
                    :class="gender === 1 ? 'active' : ''" @click="gender = 1">
                    Male
                </div>
                <div class="c-#fff text-16 font-semibold mx18 text-center pt15 pb12 rounded-6 bg-#1B0D2C mt16"
                    :class="gender === 2 ? 'active' : ''" @click="gender = 2">
                    Female
                </div>
            </template>
        </van-popup>
        <!-- 选择国家弹窗 -->
        <van-popup v-model:show="showCountry" position="bottom" :style="{ height: '93.75rem' }" class="bg-#130021">
            <template #default>
                <div class="w46 h6 rounded-5 bg-#E9E9E9/10 mx-auto mt16"></div>
                <div class="mx18 mt20 flex justify-between">
                    <div class="c-#fff font-bold text-16" @click="showCountry = false; country = mineInfo.countryId">Cannel
                    </div>
                    <div class="c-#fff font-bold text-16" @click="showCountry = false; setUserInfoOpt.countryId = country">
                        Done
                    </div>
                </div>
                <div class="mt20 c-#fff text-16 font-semibold mx18 text-center pt15 pb12 rounded-6 bg-#1B0D2C"
                    :class="country === 'America' ? 'active' : ''" @click="country = 'America'">
                    America
                </div>
                <div class="c-#fff text-16 font-semibold mx18 text-center pt15 pb12 rounded-6 bg-#1B0D2C mt16 "
                    :class="country === 'French' ? 'active' : ''" @click="country = 'French'">
                    French
                </div>
                <div class="c-#fff text-16 font-semibold mx18 text-center pt15 pb12 rounded-6 bg-#1B0D2C mt16"
                    :class="country === 'China' ? 'active' : ''" @click="country = 'China'">
                    China
                </div>
                <div class="c-#fff text-16 font-semibold mx18 text-center pt15 pb12 rounded-6 bg-#1B0D2C mt16"
                    :class="country === 'Ukraine' ? 'active' : ''" @click="country = 'Ukraine'">
                    Ukraine
                </div>
            </template>
        </van-popup>
        <!-- 选择生日弹窗 -->
        <van-popup v-model:show="showBirth" position="bottom" :style="{ height: '78.25rem' }" class="bg-#130021">
            <template #default>
                <div class="w46 h6 rounded-5 bg-#E9E9E9/10 mx-auto mt16"></div>
                <div class="mx18 mt20 flex justify-between">
                    <div class="c-#fff font-bold text-16"
                        @click="currentDate = setUserInfoOpt.birthday.split('-'); showBirth = false">
                        Cannel</div>
                    <div class="c-#fff font-bold text-16" @click="setUserInfoOpt.birthday = myBirthday; showBirth = false">
                        Done
                    </div>
                </div>
                <van-date-picker :min-date="minDate" :max-date="maxDate" :show-toolbar="false" visible-option-num="3"
                    option-height="65" class="mt20" v-model="currentDate" />
            </template>
        </van-popup>
        <van-toast></van-toast>
    </div>
</template>


<script  setup>
import { getMineInfo, setUserInfo } from '~/api/user'
import { getOssKey } from '~/api/home'
import { showSuccessToast } from 'vant';
import OSS from "ali-oss";
import setting from '~/config'
const router = useRouter()
const homeStore = useHomeStore()
const showName = ref(false)//修改昵称弹窗
const showGender = ref(false)//选择性别弹窗
const showCountry = ref(false)//选择国家弹窗
const showBirth = ref(false)//选择生日弹窗
const gender = ref(0)//临时性别数值
const country = ref('')//临时国家数值
const avatar = ref([])//头像上传列表
const currentDate = ref([]);//目标日期
const message = ref('')
const value = ref('')
const fileList = ref([])//背景图上传列表
const myBirthday = computed(() => currentDate.value[0] + '-' + currentDate.value[1] + '-' + currentDate.value[2])
const minDate = new Date(1970, 0, 1)//日期选项最小日期
const maxDate = new Date(2023, 5, 1)//日期选择最大日期
// const imgObj = ref({})//图片对象
const setUserInfoOpt = ref({
    birthday: "",//生日
    countryId: "",//国家
    gender: 0,//性别
    icon: "",//头像
    nickname: "",//昵称
    pics: [],//相册
    picsDel: [],//要删除的相册
    signature: "",//签名
    videos: [],//视频集
    videosDel: []//要删除的视频集
})

const userStore = useUserStore()
const mineInfo = computed(() => userStore.mineInfo)
// 绑定必要数据
const getData = () => {
    setUserInfoOpt.value.birthday = mineInfo.value.birthday
    currentDate.value = mineInfo.value.birthday.split('-')
    setUserInfoOpt.value.countryId = mineInfo.value.countryId
    country.value = mineInfo.value.countryId
    setUserInfoOpt.value.signature = mineInfo.value.signature
    setUserInfoOpt.value.gender = mineInfo.value.gender
    gender.value = mineInfo.value.gender
    setUserInfoOpt.value.icon = mineInfo.value.icon
    setUserInfoOpt.value.nickname = mineInfo.value.nickname
    setUserInfoOpt.value.pics = mineInfo.value.picList
    setUserInfoOpt.value.videos = mineInfo.value.picList
}
//修改个人信息
const setMineInfoData = () => {
    setUserInfo(setUserInfoOpt.value).then(res => showSuccessToast({
        message: 'Save Successful!'
    })
    )
}


const ossInfo = ref({})
const afterRead = (file) => {
    console.log(file);
    // 此时可以自行将文件上传至服务器
    uploadImage(file)
};

// 上传图片
const uploadImage = async (data) => {
    ossInfo.value = await getOssKey()//获取临时凭证
    // 实例化OSS
    const client = new OSS({
        region: setting.region,
        accessKeyId: ossInfo.value.AccessKeyId,
        accessKeySecret: ossInfo.value.AccessKeySecret,
        stsToken: ossInfo.value.SecurityToken,
        bucket: setting.bucket,
        refreshSTSToken: async () => {
            // 向您搭建的STS服务获取临时访问凭证。
            const result = await getOssKey()
            return {
                accessKeyId: result.AccessKeyId, // 自己账户的accessKeyId或临时秘钥
                accessKeySecret: result.AccessKeySecret, // 自己账户的accessKeySecret或临时秘钥
                stsToken: result.SecurityToken, //  从STS服务获取的安全令牌（SecurityToken）。
            }
        },
        // 刷新临时访问凭证的时间间隔，单位为毫秒。
        refreshSTSTokenInterval: 3600 * 1000
    });

    let name = data.file.name;
    let index = name.lastIndexOf(".");
    let ext = name.substr(index + 1);
    console.log(client);
    console.log(Date.now() + "." + ext);
    const result = await client.put(
        Date.now() + "." + ext,
        data.file
    );
    //返回的图片路径
    console.log(result);
    setUserInfoOpt.value.icon = result.url
}

onMounted(() => {
    //获取个人信息
    userStore.getMineInfoData()
    getData()
    // 组件挂载完成设置背景色
    document.querySelector('body').setAttribute('style', 'background-color:#130021')
})

onBeforeUnmount(() => {
    //组件卸载前去掉背景色
    document.querySelector('body').removeAttribute('style')
})  
</script>

<style scoped>
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

.active {
    background: linear-gradient(232deg, #D016C8 0%, #7F04BA 47%, #4D09C1 100%);
}
</style>