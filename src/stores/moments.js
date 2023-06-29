import { defineStore } from 'pinia'
import { getFriendsCircle, getMoments } from '~/api/moments'
export const useMomentsStore = defineStore('useMomentsStore', {
    state: () => ({
        friendsCircleList: [],//朋友圈数据
    }),
    actions: {
        //获取朋友圈内容
        async getFriendsCircleList(id = "") {
            const result = await getFriendsCircle({
                "currentPage": 1,
                "keyword": id,
                "pageSize": 10
            })
            // 获取评论数据，添加在朋友圈数据中
            result.forEach(async (item) => {
                const result = await getMoments({
                    "currentPage": 1,
                    "keyword": item.id,
                    "pageSize": 20
                })
                item.comment = result.reverse()
            });
            this.friendsCircleList = result
            console.log(id, this.friendsCircleList);

        }
    }
})
export default useMomentsStore