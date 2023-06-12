import { defineStore } from 'pinia'
import {getFriendsCircle}from '~/api/moments'
export const useMomentsStore = defineStore('useMomentsStore',{
state:()=>({
friendsCircleList:[],//朋友圈数据
momentsList:[]//评论数据
}),
actions:{
    //获取朋友圈内容
    async getFriendsCircleList (){
    const result = await getFriendsCircle({
    "currentPage": 1,
    "endTime": "",
    "keyword": "",
    "onlyImgFlag": 0,
    "pageSize": 10,
    "startTime": ""
})
    this.friendsCircleList = result
    console.log(this.friendsCircleList);
}

}
})
export default useMomentsStore