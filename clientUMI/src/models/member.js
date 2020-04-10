import memberAPI from '../api/member'
import domainAPI from '../api/domain'
import {filterdoMainNum,filterGrade,filterUserByGrade} from '../util/filter'
export default {
    namespace: 'member',
    state: {
        grade: [],
        domain: [],
        member: {},
        oldmember:{},
        loading:true
    },
   
    reducers: {
        updata(state, { payload: member }) {
            return state.map(item => {
                if (state.id === member.id) {
                    return { ...item, ...member }
                } else {
                    return item
                }
            })
        },
        save(state, { payload }) {
            return {
                ...state,
                ...payload
            }
        },
        getMember(state,{payload:id},getdata){
            console.log(state)
            state.oldmember.find(item=>{
                if(item.id === id){
                    getdata(item)
                    return
                }
            })
        },
        filterUser(state,{domainId}) {
            let user = []
            if (domainId === -1) {
                user = state.oldmember
            } else {
                state.oldmember.map(item => {
                    if (item.domain === domainId || item.domain === 4) {
                        user.push(item)
                    }
                })
            }
            return{
                ...state,
                member:filterUserByGrade(user),
                grade:filterGrade(user)
            }
    
        }
    },
    effects: {
        *getMembers({ payload }, { call, put }) {
            let member = yield call(memberAPI.getMemberInfo)
            let domain = yield call(domainAPI.getDoMainInfo)
            domain = filterdoMainNum(domain, member)
            const grade = filterGrade(member)
            const oldmember = member
            member = filterUserByGrade(member)
            yield put({
                type: 'save',
                payload: {
                        grade,
                        domain,
                        member,
                        oldmember,
                        loading:false
                }
            })
        }
    },
    subscriptions: {

    }
}
