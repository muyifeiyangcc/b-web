<template>
    <div>
        <van-popup v-model:show="homeStore.rechargeVisible" position="bottom" :style="{
            height: '60%', background: 'radial-gradient(at 50% -50px,#D016C8 0%, #7F04BA 60%, #4D09C1 100%)'
        }" class="rounded-t-24">
            <template #default>
                <div class="text-center">
                    <div class="c-#fff text-18 font-bold mt32">
                        Limited Time Special Offer
                    </div>
                    <div class="text-36 c-#fff font-black mt10">
                        00 : 00 : 00
                    </div>
                    <div class="mt13">
                        <van-space :size="23">
                            <div class="px31 py18 b-#B25BFF b-1 bg-#fff/20 rounded-5">
                                <van-space direction="vertical" align="center">
                                    <div class="i-my-icons-diamond text-39" />
                                    <div class="text-14 c-#fff font-semibold">4900</div>
                                </van-space>
                            </div>
                            <van-icon name="plus" class="font-bold text-40 c-#fff/45" />
                            <div class="px31 py18 b-#B25BFF b-1 bg-#fff/20 rounded-5">
                                <van-space direction="vertical" align="center">
                                    <div class="i-my-icons-diamond text-39" />
                                    <div class="text-14 c-#fff font-semibold">490</div>
                                </van-space>
                            </div>
                        </van-space>
                    </div>
                    <div class="w218 rounded-28 bg-#fff/20 flex justify-between items-center mx-auto py13 pl35 pr21 mt26">
                        <div><del class="text-15 c-#fff font-bold">$19.99</del></div>
                        <div class="bg-#fff/90 rounded-20 text-15 c-#4E09C1 font-bold px13 py6">$9.99</div>
                    </div>
                    <div class="mt33">
                        <van-button
                            class="c-#fff text-16 font-semibold px110 py25 bg-gradient-to-r from-#4D09C1  via-#7F04BA to-#D016C8 rounded-23">
                            Get Coins
                        </van-button>
                    </div>
                </div>
            </template>
        </van-popup>
    </div>
</template>


<script lang="ts" setup>
const homeStore = useHomeStore()


</script>

<style scoped></style>