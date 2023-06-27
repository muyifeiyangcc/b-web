import { defineStore } from 'pinia'
import {getStartMatchRobot} from '~/api/match'
const router =useRouter()
export const useSystemStore = defineStore('useSystemStore',{
state:()=>({
    emitter:null
}),
actions:{
    listenSystem(){
        this.emitter.on('SystemNotificationHandler', (attachType) => {
        // 处理事件的回调函数
        console.log(attachType);
        })
    },
    //机器人打来电话
    async calledByRobot(){
        const result= await getStartMatchRobot({
            gender: 2,
            userType: 3
        })
        router.push({name:'waitconnect',query:{userId:result.userId,yxId:result.yxId}})
    }
}
})
export default useSystemStore