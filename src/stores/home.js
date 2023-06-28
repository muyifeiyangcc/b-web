import { defineStore } from 'pinia'
import NIMSDK from 'nim-web-sdk-ng/dist/NIM_BROWSER_SDK'
import NERTC from "nertc-web-sdk/NERTC"
import { getIndexTab,getIndexList } from '~/api/home'

export const useHomeStore = defineStore('useHomeStore',{
state:()=>({
    nim:{},
    client:{},
    indexTabsFather:{},//一级分类
    indexTabsChildren:[],//二级分类
    indexList:[],//首页用户列表
    getDiamondsVisible:false,//控制钻石不足弹窗显示
    getIndexListOption: 
    {
    "currentPage": 1,
    "onlineStatus": 0,
    "pageSize": 10,
    "tagId": 13
},
//被邀请人信息
    params:  {
        type: 2,
        //手机
        // toAccid:'c398a3961d954af7841f95b43ed6d85b',
        //电脑
        toAccid:'ee970d9f2f744a3082fc2ed49dd4b345',
        requestId: '1008611',
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
    // 会话页面用户信息列表
    talkUserDataList:[],
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
    const nim =new NIMSDK({
        appkey: '124f689baed25c488e1330bc42e528af',
        account: '1ef27c9ebb064b66989b523c0d108c37', // 云信账号
        token: '4fc8f80b57f0a9afd83b86490b11fb9b' ,// 云信密码
        // account: 'ece7d561b4594eedb8def4802f053b85', // 云信账号
        // token: 'c93db63790961481fe3d98a5849641fe' // 云信密码
        // debugLevel: 'debug',
})
    const client = NERTC.createClient({appkey: '124f689baed25c488e1330bc42e528af', debug: true })
    this.nim=nim
    this.client=client
    //监听收到新消息
    nim.on('msg', async (res) => {
    console.log('收到新消息', res);
    //收到新消息，判断是否在聊天页面
    if(this.inTalkPage){
        console.warn('当前在talk页面');
        //在聊天页面直接清理未读信息
        this.resetUnread(res.sessionId)
        this.talkList.unshift(res)
    }else{
        //不在聊天页面则刷新会话列表
        this.getSessionList()
    }
    });

    nim.on('sysMsg', event=>console.log("收到系统消息",event))

    // 监听收到邀请
    nim.signaling.on('signalingInvite', (event) => {
    this.acceptData = event
    console.log('收到邀请', event)
    router.push({name:'waitconnect',query:{yxId:event.fromAccid}})
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
    //标记进入talk页面
    setInTalkPage(data){
        this.inTalkPage=data
    },
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
    
    // 更新首页列表
    async updateIndexListData  (title,tagFlag=false){
    if(tagFlag){
            this.indexTabsChildren.map((item)=>{
            if(item.tagName===title)
            {
                this.getIndexListOption.tagId=item.id
            }
        })
        this.getIndexListOption.currentPage=1
        this.indexList= await getIndexList(this.getIndexListOption)
    }
    else{
        //获取首页用户列表
        const result= await getIndexList(this.getIndexListOption)
        this.indexList=[...this.indexList,...result]
    }
},

    //获取会话记录
async getSessionList(){
    const result = await this.nim.session.getSessions({
    "limit": 10,
    "desc": false
})
    const idList=result.map((item)=>item.to)
    this.talkUserDataList = await this.nim.user.getUsersNameCardFromServer({accounts:idList})
    this.sessionList=result
    console.log(result);
},
    // 获取聊天历史记录
    async getHistoryTalkList(to='c398a3961d954af7841f95b43ed6d85b',limit=20) {
    this.talkList=[]
    this.talkList = await this.nim.msgLog.getHistoryMsgs({
        scene: 'p2p',//通信方式
        to: to,//通信对象的cid
        limit:limit,//返回条数
    })
    //清空未读消息
    await this.nim.session.resetSessionUnreadCount({
        id: this.talkList[0].sessionId,
    })
    console.log(this.talkList);
},
//清空某一条未读消息
async resetUnread (sessionId) {
    await this.nim.session.resetSessionUnreadCount({
        id: sessionId,
    })
},
// 清空全部未读消息
async resetAllUnread () {
    await this.nim.session.resetAllSessionsUnreadCount()
},
//清除会话列表
async deleteAllSessions () {
    await this.nim.session.deleteAllSessionsFromLocal()
},
},
})
export default useHomeStore