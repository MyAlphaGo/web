import resourceAPI from '../api/resource'
import {filterTagNum} from '../util/filter'

export default {
    namespace: 'resource',
    state: {
        pageList:[],
        list: [],
        oldList: [],
        tags: [],
        hasMore: true,
        loading: true,
    },
    reducers: {
        save(state, { payload }) {
            return {
                ...state,
                ...payload
            }
        },
        filterResourceByTag(state, { payload: { tag } }) {
            if (-1 === tag) {
                return {
                    ...state,
                    list: state.oldList,
                    hasMore: true,
                }
            }
            let list = []
            let hasMore = false
            state.oldList.map(item => {
                if (item['tag']['id'] === tag) {
                    list.push(item)
                }
            })
            if(list.length>6){
                hasMore = true
            }
            return {
                ...state,
                list,
                hasMore,
                pageList:list.slice(0,6)
            }
        }
    },
    effects: {
        *getResourceAndTag({ payload: params }, { call, put }) {
            let list = []
            let tags = []
            if (!params) {
                list = yield call(resourceAPI.getList)
            } else {
                list = yield call(resourceAPI.getListByUserId, params)
            }
            tags = yield call(resourceAPI.getTag)
            if(list.length === 0||tags.length === 0){
                return;
            }
            tags = filterTagNum(tags,list)
            list = list.map(item => {
                return {
                    ...item,
                    tag: item.ResourceType,
                    link: item.link,
                    avatar:item.UserInfo.avatar,
                    username:item.User.name
                }
            })
            yield put({
                type: 'save',
                payload: {
                    pageList:list.slice(0,6),
                    list,
                    tags,
                    oldList: list,
                    loading:false
                }
            })
        }
    },
    subscriptions: {}
}