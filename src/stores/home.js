import { defineStore } from 'pinia'
import NIMSDK from 'nim-web-sdk-ng/dist/NIM_BROWSER_SDK'
import { getIndexTab,getIndexList } from '~/api/home'
export const useHomeStore = defineStore('useHomeStore',{
state:()=>({
    nim:{},
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
//被邀请人信息
    params:  {
        type: 1,
        toAccid:'c398a3961d954af7841f95b43ed6d85b',
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
    memberList:[],
    //会话记录
    sessionList:[],
    // 聊天历史记录
    talkList:[],
    // //消息列表
    // talkList:[],
    //当前是否在聊天页面，用于判断收到消息是否立刻标记已读
    inTalkPage:false,
    //获取聊天记录的配置项
    getTalkListOption:{
        scene: 'p2p',//通信方式
        to: 'c398a3961d954af7841f95b43ed6d85b',//通信对象的cid
        limit: 20,//返回条数
    }

}),
//  persist: {
//     paths: ['indexTabs'],
//   },
actions:{
    //连接im
    async imConnect (){
    const router = useRouter()
    // 初始化nim
    const nim = NIMSDK.getInstance({
        appkey: '124f689baed25c488e1330bc42e528af',
        account: '1ef27c9ebb064b66989b523c0d108c37', // 云信账号
        token: '4fc8f80b57f0a9afd83b86490b11fb9b' // 云信密码
        // debugLevel: 'debug',
})
    this.nim=nim
    //监听收到新消息
    nim.on('msg', async (res) => {
    console.log('收到新消息', res);
    if(this.inTalkPage){
        console.warn('当前在talk页面');
        await nim.msg.sendMsgReceipt({
        msg: res
        })
        this.talkList.unshift(res)
    }else{
        this.getSessionList()
    }
    });

    // 监听收到邀请
    nim.signaling.on('signalingInvite', (event) => {
    this.acceptData = event
    console.log('收到邀请', event)
    router.push('/waitconnect')
})
    //监听对方已取消
nim.signaling.on('signalingCancelInvite', function (event) {
    console.log('对方已取消', event)
    router.go(-1)
})
    //对方已加入
nim.signaling.on('signalingJoin', (event) => {
    console.log('对方已加入', event)
    router.push('/call')
})
    //监听对方已拒绝
nim.signaling.on('signalingReject', (event) => {
    console.log('对方已拒绝', event)
    router.go(-1)
})
    

    if (nim.status === 'unconnected') {
    await nim.connect()
}
},
    setInTalkPage(data){
        this.inTalkPage=data
    }   
,
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
},
//获取会话记录
async getSessionList()  {
    this.sessionList = await this.nim.session.getSessions({
    "limit": 10,
    "desc": false
}
)
console.log(this.sessionList);
},
// 获取聊天历史记录
    async getHistoryTalkList() {
    this.talkList = await this.nim.msgLog.getHistoryMsgs(this.getTalkListOption)
    console.log(this.talkList);
}
},
})
export default useHomeStore