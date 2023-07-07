import { defineStore } from 'pinia'
import { getFriendsCircle, getMoments } from '~/api/moments'
export const useMomentsStore = defineStore('useMomentsStore', {
    state: () => ({
        friendsCircleList: [],//朋友圈数据
        loadingScroll: false,
        finished: false
    }),
    actions: {
        //获取朋友圈内容
        async getFriendsCircleList(obj = { currentPage: 1, id: "", origin: '' }) {
            let result = ''
            if (obj.origin === 'pull') {
                this.friendsCircleList = []
                result = await getFriendsCircle({
                    "currentPage": 1,
                    "pageSize": 4
                })
            }
            if (obj.origin === 'scroll') {
                getFriendsCircle({
                    "currentPage": obj.currentPage,
                    "pageSize": 4
                }).then((res) => {
                    result = res
                    this.loadingScroll = false
                    if (res.length === 0) {
                        this.finished = true
                    }
                })
            }
            // 获取评论数据，添加在朋友圈数据中
            result.forEach(async (item) => {
                const result = await getMoments({
                    "currentPage": 1,
                    "keyword": item.id,
                    "pageSize": 20
                })
                item.comment = result.reverse()
            });
            this.friendsCircleList = [...this.friendsCircleList, ...result]
            console.log(this.friendsCircleList);
        }
    }
})
export default useMomentsStore