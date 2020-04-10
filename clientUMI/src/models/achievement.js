import achievementAPI from '../api/achievement'
import { filterTagNum } from '../util/filter'

export default {
    namespace: 'achievement',
    state: {
        pageList: [],
        list: [],
        oldList: [],
        tags: [],
        hasMore: true,
        loading: false,
    },
    reducers: {
        save(state, { payload }) {
            return {
                ...state,
                ...payload
            }
        },
        filterAchievementByTag(state, { payload: { tag } }) {
            let hasMore = false
            let list = []
            let pageList = []
            if (-1 === tag) {
                list = state.oldList
                pageList = list.slice(0, 6)
                if (list.length > 6) {
                    hasMore = true
                }
                return {
                    ...state,
                    list,
                    pageList,
                    hasMore
                }
            }
            state.oldList.map(item => {
                if (item['tag']['id'] === tag) {
                    list.push(item)
                }
            })
            if (list.length > 6) {
                hasMore = true
            }
            return {
                ...state,
                list,
                pageList: list.slice(0, 6),
                hasMore
            }
        }
    },
    effects: {
        *getAchievementAndTag({ payload: params }, { call, put }) {
            let list = []
            let tags = []
            if (!params) {
                list = yield call(achievementAPI.getList)
            } else {
                list = yield call(achievementAPI.getListByUserId, params)
            }
            tags = yield call(achievementAPI.getTag)
            if (list.length === 0 || tags.length === 0) {
                return;
            }
            tags = filterTagNum(tags, list)
            list = list.map(item => {
                return {
                    ...item,
                    tag: item.AchievementType,
                    link: item.achievementlink,
                    avatar: item.UserInfo.avatar,
                    username: item.User.name,
                }
            })
            yield put({
                type: 'save',
                payload: {
                    list,
                    pageList: list.slice(0, 6),
                    tags,
                    oldList: list,
                    loading: false
                }
            })
        }
    },
    subscriptions: {
    }
}