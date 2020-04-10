import articleAPI from '../api/article'

export default {
    namespace: 'article',
    state: {
        hasMore: true,
        loading: true,
        defaultTag: -1,
        allData: [],
        filter: [],
        pageData: [],
        hotArticle: [],
        banner: [],
        tags: [],
        item: {}
    },
    reducers: {
        save(state, { payload }) {
            return {
                ...state,
                ...payload
            }
        },
        filterArticleByTag(state, { payload: { tag } }) {
            if (tag === -1) {
                return {
                    ...state,
                    filter: state.allData,
                    pageData: state.allData.slice(0, 6),
                    defaultTag: tag
                }
            }
            let filter = []
            state.allData.map(item => {
                if (item.technologyid === tag) {
                    filter.push(item)
                }
            })
            return {
                ...state,
                filter,
                pageData: filter.slice(0, 6),
                defaultTag: tag
            }
        }
    },
    effects: {
        *InitArticleAndTag(payload, { call, put }) {
            let list = []
            let tags = []
            list = yield call(articleAPI.getArticle)
            tags = yield call(articleAPI.getTag)
            list = list.map(item => {
                return {
                    ...item,
                    avatar: item.UserInfo.avatar,
                    username: item.UserInfo.User.name,
                    technologyname: item.Technology.name
                }
            })
            yield put({
                type: 'save',
                payload: {
                    allData: list,
                    filter: list,
                    pageData: list.slice(0, 6),
                    tags,
                    banner: list.slice(10, 15),
                    loading: false,
                    hotArticle: list.slice(10, 15)
                }
            })
        },
        *getArticleInfoById({ payload: { id } }, { call, put }) {
            let item = {}
            item = yield call(articleAPI.getArticleInfoById, id)
            item = {
                ...item,
                avatar: item.UserInfo.avatar,
                username: item.UserInfo.User.name,
                technologyname: item.Technology.name,
                menuname:item.Menu.name
            }
            yield put({
                type: 'save',
                payload: {
                    item
                }
            })
        }
    }
}