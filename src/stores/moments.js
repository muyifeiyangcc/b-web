import { defineStore } from 'pinia'
import {getFriendsCircle,getMoments}from '~/api/moments'
export const useMomentsStore = defineStore('useMomentsStore',{
state:()=>({
friendsCircleList:[],//朋友圈数据
}),
actions:{ 
    //获取朋友圈内容
    async getFriendsCircleList (id=""){
    
    const result = await getFriendsCircle({
    "currentPage": 1,
    "endTime": "",
    "keyword": id,
    "onlyImgFlag": 0,
    "pageSize": 10,
    "startTime": ""
})
// 获取评论数据，添加在朋友圈数据中
    result.forEach(async(item) => {
        item.comment= await getMoments({
        "currentPage": 1,
        "keyword": item.id,
        "pageSize": 100
    })
    });
    this.friendsCircleList = result
    console.log(id,"jojsaopdpo");
}
}
})
export default useMomentsStore