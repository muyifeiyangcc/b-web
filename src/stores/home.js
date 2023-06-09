import { defineStore } from 'pinia'
import NIMSDK from 'nim-web-sdk-ng/dist/NIM_BROWSER_SDK'
import NERTC from "nertc-web-sdk/NERTC"
import { getIndexTab, getIndexList } from '~/api/home'
import { showSuccessToast } from 'vant'
import { getStartMatchRobot } from '~/api/match'
import setting from '~/config'
export const useHomeStore = defineStore('useHomeStore', {
    state: () => ({
        router: {},
        topHeight: 'pt25',//全局调整tabbar高度
        systemOpt: {
            token: '',
            appId: '',
            userId: ''
        },
        isInit: false,//是否已经初始化
        finished: false,
        nim: {},
        client: {},
        fatherTabActive: 0,
        sonTabActive: 0,
        indexTabsFather: {},//一级分类
        indexTabsChildren: [],//二级分类
        indexList: [],//首页用户列表
        loadingScroll: false,
        getDiamondsVisible: false,//控制首页钻石不足弹窗显示
        rechargeVisible: false,//首页限时特惠充值弹窗
        requestGift: false,//直播间索要礼物弹窗
        giftId: '',//索要礼物Id
        talkList: [],//直播间和主播聊天列表
        attachEvent: {},//系统消息事件对象
        getIndexListOption: {
            "currentPage": 0,
            "onlineStatus": 2,
            "pageSize": 8,
            "tagId": 13
        },
        //被邀请人信息
        params: {
            type: 2,
            //手机
            // toAccid:'c398a3961d954af7841f95b43ed6d85b',
            //电脑
            toAccid: 'ee970d9f2f744a3082fc2ed49dd4b345',
            requestId: '1008611',
        },
        otherParams: {
            channelId: 'YOUR_CHANNELID',
            // 邀请者的账号 ID
            fromAccid: 'THE_INVITOR',
            requestId: 'TARGET_REQURESTID'
        },
        //邀请数据
        inviteData: {},
        //被邀请数据
        acceptData: {},
        //房间数据
        channelInfo: {},
        //房间内用户数据
        memberList: [],
        //会话记录
        sessionList: [],
        //未读消息总数
        unReadMsgCount: 0,
        // 聊天历史记录
        talkList: [],
        // 会话页面用户信息列表
        talkUserDataList: [],
        //当前是否在聊天页面，用于判断收到消息是否立刻标记已读
        inTalkPage: false,
        //获取聊天记录的配置项
        getTalkListOption: {
            scene: 'p2p',//通信方式
            to: 'c398a3961d954af7841f95b43ed6d85b',//通信对象的cid
            limit: 20,//返回条数
        }

    }),
    //  persist: {
    //     paths: ['indexTabs'],
    //   },
    actions: {
        //连接im
        async imConnect() {
            console.log(this.router);
            // const router = useRouter()
            const userStore = useUserStore()
            // 初始化nim
            const nim = new NIMSDK({
                appkey: setting.appkey,
                // account: localStorage.getItem('yxAccid') || '2a267c8bf750454fa2b402d9dd138301', // 云信账号
                // token: localStorage.getItem('imToken') || '8221cfa0ec745ba5a6be6d5941b58185', // 云信密码
                account: localStorage.getItem('yxAccid'), // 云信账号
                token: localStorage.getItem('imToken'), // 云信密码
                // debugLevel: 'debug'
            })
            const client = NERTC.createClient({ appkey: setting.appkey, debug: true })
            this.nim = nim
            this.client = client

            //监听收到新消息
            nim.on('msg', async (res) => {
                console.log('收到新消息', res);
                //收到新消息，判断是否在聊天页面
                if (this.inTalkPage) {
                    console.warn('当前在talk页面');
                    //在聊天页面直接清理未读信息
                    this.resetUnread(res.sessionId)
                    this.talkList.unshift(res)
                } else {
                    //不在聊天页面则刷新会话列表
                    this.getSessionList()
                }
            })
            // 监听收到邀请
            nim.signaling.on('signalingInvite', (event) => {
                console.log(this.router);
                this.acceptData = event
                console.log('收到邀请', event)
                this.router.push({ name: 'waitconnect', query: { yxId: event.fromAccid } })
            })
            //监听对方已取消
            nim.signaling.on('signalingCancelInvite', (event) => {
                console.log(this.router);
                console.log('对方已取消', event)
                this.router.go(-1)
            })
            //对方已加入
            nim.signaling.on('signalingJoin', (event) => {
                console.log('对方已加入', event)
                const userStore = useUserStore()
                this.router.push({ name: 'call', query: { channelName: JSON.parse(event.metaData.ext).channelName, remark: 'callOut', type: 'directCall', free: userStore.userDetail.videoPrice > 0 ? 0 : 1 } })
            })
            //监听对方已拒绝
            nim.signaling.on('signalingReject', (event) => {
                console.log('对方已拒绝', event)
                this.router.go(-1)
            })
            //系统消息
            nim.on('sysMsg', async (event) => {
                this.attachEvent = event.attach
                if (event.attach.attachType) {
                    const attachType = event.attach.attachType
                    if (attachType === 5) {
                        console.log('索要礼物');
                        this.requestGift = true
                        this.giftId = event.attach.giftId
                    }
                    if (attachType === -1) {
                        console.log('主播发来消息');
                        this.talkList.unshift({ user: 'her', content: this.attachEvent.content })
                    }
                    if (attachType === 29) {
                        console.log('机器人邀请通话', this.router.currentRoute);
                        const routerName = this.router.currentRoute.name
                        if (routerName !== 'call' && routerName !== 'waitconnect' && routerName !== 'waitcall' && routerName !== 'match') {
                            const result = await getStartMatchRobot({
                                gender: 2,
                                hitRecordId: this.attachEvent.hitRecordId,
                            })
                            console.log(result);
                            this.router.push({ name: 'waitconnect', query: { userId: result.userId, yxId: result.yxAccid, pushRobot: true, free: result.free } })
                        }
                    }
                    if (attachType === 6) {
                        showSuccessToast(`recharge successful!`)
                        userStore.getMineInfoData()

                    }
                }
                console.log("收到系统消息", event)
            })
            if (nim.status === 'unconnected') {
                nim.connect().then(() => this.getSessionList())//为了一进入能够显示未读角标
            }
        },
        //发送系统消息
        async sendImMsg(yxId, attach) {
            const msgId = await this.nim.systemMessage.sendCustomSysMsg({
                type: 'customP2p',
                to: yxId,
                attach: JSON.stringify(attach),
                pushInfo: {
                    needPush: true,
                    needPushBadge: true,
                    needPushNick: false
                },
                setting: {
                    isRoutable: true
                }
            });
            console.log(msgId);
        },
        //控制机器人索要礼物
        robotRequestGift() {
            this.requestGift = true
            this.giftId = 2
        },
        //标记进入talk页面
        setInTalkPage(data) {
            this.inTalkPage = data
        },
        // async invite(userId, yxId) {
        //     const userStore = useUserStore()
        //     if (userStore.mineInfo.diamondNum >= userStore.userDetail.videoPrice) {
        //         this.params.toAccid = yxId
        //         try {
        //             // const data = await homeStore.nim.signaling.callEx(homeStore.params)
        //             const data = await homeStore.nim.signaling.callEx({
        //                 type: 2,
        //                 toAccid: yxId,
        //                 requestId: '1008611',
        //                 uid: userStore.mineInfo.userId,
        //                 attachExt: JSON.stringify(option)
        //             })
        //             const channelInfo = data.channelInfo
        //             this.inviteData = data
        //             this.channelInfo = channelInfo
        //             // homeStore.channelInfo.name = cname
        //             console.warn('创建频道成功，data：', data, 'channelId 为', channelInfo.channelId, 'name 为', channelInfo.name)
        //         } catch (error) {
        //             console.warn('创建频道失败，error：', error)
        //             if (error.code == 10405) {
        //                 console.warn('频道已存在，请勿重复创建')
        //             }
        //         }
        //     }
        //     else {
        //         router.push('/')
        //         this.getDiamondsVisible = true
        //     }
        // },

        //首页钻石不足弹窗
        showGetDiamonds() {
            this.getDiamondsVisible = !this.getDiamondsVisible
        },
        //获取一级分类
        async getIndexFatherTabList() {
            this.indexTabsFather = await getIndexTab()
            this.indexTabsChildren = this.indexTabsFather.parentTags[0].childrenTags
        },
        // 根据一级分类查询二级分类
        getIndexTabChildrenList(title) {
            this.indexTabsFather.parentTags.map((item) => {
                if (item.tagName === title) {
                    this.getIndexListOption.tagId = item.childrenTags[0].id
                    this.indexTabsChildren = item.childrenTags
                }
            })
        },
        // 更新首页列表
        async updateIndexListData(origin, title) {
            const userStore = useUserStore()
            //判断是点击标签更新
            if (origin === 'tag') {
                console.log('触发点击更新');
                //获取到对应的标签ID
                this.indexTabsChildren.map((item) => {
                    if (item.tagName === title) {
                        this.getIndexListOption.tagId = item.id
                    }
                })
                this.getIndexListOption.currentPage = 1
                this.finished = false
                //判断是否是首充的逻辑
                if (userStore.mineInfo.isFirstCharge) {
                    this.getIndexListOption.onlineStatus = 1
                    getIndexList(this.getIndexListOption).then((res) => {
                        if (res.length > 6)
                            this.indexList = res
                        else {
                            this.indexList = res
                            this.getIndexListOption.onlineStatus = 2
                            getIndexList(this.getIndexListOption).then((res) => {
                                this.indexList = [...this.indexList, ...res]
                            })
                        }
                    })
                }
                else
                    getIndexList(this.getIndexListOption).then((res) => this.indexList = res)
            }
            //判断是下拉刷新
            else if (origin === 'pull') {
                console.log('触发下拉刷新');
                this.getIndexListOption.currentPage = 1
                this.finished = false
                this.indexList = []
                //判断是否是首充的逻辑
                if (userStore.mineInfo.isFirstCharge) {
                    this.getIndexListOption.onlineStatus = 1
                    getIndexList(this.getIndexListOption).then((res) => {
                        if (res.length > 6)
                            this.indexList = res
                        else {
                            this.indexList = res
                            this.getIndexListOption.onlineStatus = 2
                            getIndexList(this.getIndexListOption).then((res) => {
                                this.indexList = [...this.indexList, ...res]
                            })
                        }
                    })
                }
                else
                    getIndexList(this.getIndexListOption).then((res) => this.indexList = res)
            }
            //判断是滚动更新
            else {
                console.log('触发滚动更新');
                if (userStore.mineInfo.isFirstCharge) {
                    this.getIndexListOption.onlineStatus = 1
                    getIndexList(this.getIndexListOption).then((res) => {
                        if (res.length > 6)
                            this.indexList = [...this.indexList, ...res]
                        else {
                            this.indexList = [...this.indexList, ...res]
                            this.getIndexListOption.onlineStatus = 2
                            getIndexList(this.getIndexListOption).then((res) => {
                                if (res.length > 0) {
                                    this.indexList = [...this.indexList, ...res]
                                    this.loadingScroll = false
                                }
                                else {
                                    this.loadingScroll = false
                                    this.finished = true
                                }
                            })
                        }
                    })
                }
                else {
                    //获取首页用户列表
                    getIndexList(this.getIndexListOption).then((res) => {
                        if (res.length > 0) {
                            this.indexList = [...this.indexList, ...res]
                            this.loadingScroll = false
                        }
                        else {
                            this.loadingScroll = false
                            this.finished = true
                        }
                    })
                }

            }
        },
        //获取会话记录
        async getSessionList() {
            const result = await this.nim.session.getSessions({
                "limit": 50,
                "desc": false
            })
            this.unReadMsgCount = 0
            result.forEach(item => {
                this.unReadMsgCount += item.unread
            });
            const idList = result.map((item) => item.to)
            this.talkUserDataList = await this.nim.user.getUsersNameCardFromServer({ accounts: idList })
            this.sessionList = result
            console.log(result);
        },
        // 获取聊天历史记录
        async getHistoryTalkList(to = 'c398a3961d954af7841f95b43ed6d85b', limit = 50) {
            this.talkList = []
            this.talkList = await this.nim.msgLog.getHistoryMsgs({
                scene: 'p2p',//通信方式
                to: to,//通信对象的cid
                limit: limit,//返回条数
            })
            //清空未读消息
            await this.nim.session.resetSessionUnreadCount({
                id: this.talkList[0].sessionId,
            })
            console.log(this.talkList);
        },
        //清空某一条未读消息
        async resetUnread(sessionId) {
            await this.nim.session.resetSessionUnreadCount({
                id: sessionId,
            })
        },
        // 清空全部未读消息
        resetAllUnread() {
            this.nim.session.resetAllSessionsUnreadCount()
        },
        //清空会话列表
        async deleteAllSessions() {
            await this.nim.session.deleteAllSessionsFromLocal()
        },
    },
})
export default useHomeStore