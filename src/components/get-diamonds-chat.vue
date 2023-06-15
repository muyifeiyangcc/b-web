<template>
    <div>
        <van-popup v-model:show="homeStore.getDiamondsVisible" position="bottom" :style="{
            height: '50%', background: 'radial-gradient(at 50% -50px,#D016C8 0%, #7F04BA 60%, #4D09C1 100%)'
        }" class="rounded-t-24">
            <template #default>
                <div class=" c-#fff  text-center">
                    <div class="mt32 text-18 font-semibold">Get more diamonds and start chatting</div>
                    <div class="mx-30 px15 py13 flex justify-between items-center bg-#fff/20 rounded-12 mt24">
                        <div>
                            <van-space>
                                <div class="i-my-icons-diamond text-18" />
                                <div class="text-15">Free Coins</div>
                                <div class="text-15 font-bold">+200</div>
                            </van-space>
                        </div>
                        <div class="py6 px22 bg-#fff font-medium rounded-20 text-15 c-#4E09C1">
                            Get
                        </div>
                    </div>

                    <div class="mx-30 px15 py13 flex justify-between items-center bg-#fff/20 rounded-12 mt10">
                        <div>
                            <van-space>
                                <div class="i-my-icons-diamond text-18" />
                                <div class="text-15 font-bold">2450</div>
                            </van-space>
                        </div>
                        <div class="py6 px22 bg-#fff font-medium rounded-20 text-15 c-#4E09C1">
                            $4.99
                        </div>
                    </div>

                    <div class="mx-30 px15 py13 flex justify-between items-center bg-#fff/20 rounded-12 mt10">
                        <div>
                            <van-space>
                                <div class="i-my-icons-diamond text-18" />
                                <div class="text-15 font-bold">4900</div>
                            </van-space>
                        </div>
                        <div class="py6 px22 bg-#fff font-medium rounded-20 text-15 c-#4E09C1">
                            $9.99
                        </div>
                    </div>

                    <div class="mx-30 px15 py13 flex justify-between items-center bg-#fff/20 rounded-12 mt10">
                        <div>
                            <van-space>
                                <div class="i-my-icons-diamond text-18" />
                                <div class="text-15 font-bold">9800</div>
                            </van-space>
                        </div>
                        <div class="py6 px22 bg-#fff font-medium rounded-20 text-15 c-#4E09C1">
                            $19.99
                        </div>
                    </div>
                </div>
            </template>
        </van-popup>
    </div>
</template>


<script lang="ts" setup>
import { useHomeStore } from '~/stores';
const homeStore = useHomeStore()


</script>

<style scoped></style>