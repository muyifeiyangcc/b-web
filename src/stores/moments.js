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

            if (obj.origin === 'pull') {
                this.friendsCircleList = []
                getFriendsCircle({
                    "currentPage": 1,
                    "pageSize": 3
                }).then((res) => {
                    this.joinComment(res)
                })
            }
            if (obj.origin === 'scroll') {
                getFriendsCircle({
                    "currentPage": obj.currentPage,
                    "pageSize": 3
                }).then((res) => {
                    this.loadingScroll = false
                    if (res.length === 0) {
                        this.finished = true
                    }
                    else {
                        this.joinComment(res)
                    }
                })
            }


            console.log(this.friendsCircleList);
        },
        async joinComment(result) {
            if (result.length > 0) {
                // 获取评论数据，添加在朋友圈数据中
                result.forEach(async (item) => {
                    const data = await getMoments({
                        "currentPage": 1,
                        "keyword": item.id,
                        "pageSize": 20
                    })
                    item.comment = data.reverse()
                });
                this.friendsCircleList = [...this.friendsCircleList, ...result]
            }
        }
    }
})
export default useMomentsStore