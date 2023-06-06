import { defineStore } from 'pinia'
import { getIndexTab,getIndexList } from '~/api/home'

export const useHomeStore = defineStore('useHomeStore',{
state:()=>({
    indexTabsFather:{},//一级分类
    indexTabsChildren:[],//二级分类
    indexList:[],//首页用户列表
    getDiamondsVisible:false,//控制钻石不足弹窗显示
    getIndexListOption: 
    {
    "currentPage": 1,
    "endTime": "",
    "keyword": "",
    "onlineStatus": 0,
    "pageSize": 10,
    "startTime": "",
    "tagId": 13
},
    params:  {
        type: 1,
        toAccid: '452de602d2594517a6c987f2f3d8b1c4',
        requestId: '10086',
    },
    otherParams:{
        channelId: 'YOUR_CHANNELID',
        // 邀请者的账号 ID
        fromAccid: 'THE_INVITOR',
        requestId: 'TARGET_REQURESTID'
    },
    //邀请数据
    inviteData:{},
    //被邀请数据
    acceptData:{},
    //房间数据
    channelInfo:{},
    //房间内用户数据
    memberList:[]

}),
//  persist: {
//     paths: ['indexTabs'],
//   },
actions:{
    //首页钻石不足弹窗
    showGetDiamonds(){
        this.getDiamondsVisible=!this.getDiamondsVisible
    },
    //获取一级分类
    async getIndexFatherTabList(){
        this.indexTabsFather= await getIndexTab()
        this.indexTabsChildren=this.indexTabsFather.parentTags[0].childrenTags
    },
    // 根据一级分类查询二级分类
    getIndexTabChildrenList(title){
        this.indexTabsFather.parentTags.map((item)=>{
            if(item.tagName===title)
            {
                this.getIndexListOption.tagId=item.childrenTags[0].id
                this.indexTabsChildren =item.childrenTags
            }
        })
    },
    //获取首页用户列表
    async getIndexListData() {
    // this.getIndexListOption.tagId=this.indexTabsChildren[0].id
    this.indexList= await getIndexList(this.getIndexListOption)
},
// 更新首页列表
    async updateIndexListData  (title) {
    this.indexTabsChildren.map((item)=>{
            if(item.tagName===title)
            {
                this.getIndexListOption.tagId=item.id
            }
        })
    this.getIndexListData()
}
},
})
export default useHomeStore