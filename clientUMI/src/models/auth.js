import loginAPI from '../api/login'
import md5 from 'md5'
export default {
    namespace: 'auth',
    state: {
        time: '',
        username: '201710803017',
        password: '134534532c'
    },
    reducers: {
        save(state, { payload }) {
            return {
                ...state,
                ...payload
            }
        }
    },
    effects: {
        *getTime(payload, { call, put }) {
            const time = yield call(loginAPI.getTime);
            yield put({
                type: 'save',
                payload: {
                    time
                }
            })
        },
        *login({ payload }, { call, select }) {
            const time = yield select(state => state.auth.time)
            const params = {
                userId: payload.userId,
                password: md5(md5(payload.password) + time)
            }
            try {
                const loginData = yield call(loginAPI.login, params)
                if (loginData) {
                    localStorage.setItem('token', loginData.token)
                }
            } catch (error) {
                console.log(error)
            }

        }
    },
}