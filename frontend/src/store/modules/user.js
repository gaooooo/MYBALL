import AuthingSSO from '@authing/sso'
import { login, logout, getInfo, getUserByOpenid } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const authing = new AuthingSSO({
  appId: '5e44f4bf31466018397e69b5',
  appType: 'oidc', // 默认 oidc
  appDomain: 'sls-admin.authing.cn'
})

const getDefaultState = () => {
  return {
    authing,
    token: getToken(),
    userId: '',
    name: '',
    avatar: ''
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_OPENID: (state, openid) => {
    state.openid = openid
  },
  SET_USER_ID: (state, userId) => {
    state.userId = userId
  },
  SET_USER_REAL_NAME: (state, real_name) => {
    state.userRealName = real_name
  },
  SET_USER_AVATAR: (state, avatar) => {
    state.userAvatar = avatar
  },
  SET_USER_MOBILE: (state, mobile_phone) => {
    state.userMobilePhone = mobile_phone
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        const token = response.data
        commit('SET_TOKEN', token)
        setToken(token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(async response => {
        const { data } = response

        if (!data) {
          reject('Verification failed, please Login again.')
        }

        const { name, avatar, openid } = data
        const userData = await getUserByOpenid({ openid })
        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        commit('SET_OPENID', openid)
        commit('SET_USER_ID', userData.data.id)
        commit('SET_USER_REAL_NAME', userData.data.real_name)
        commit('SET_USER_AVATAR', userData.data.avatar)
        commit('SET_USER_MOBILE', userData.data.mobile_phone)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(async() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        await state.authing.logout()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  },

  authingLogin({ commit }, token) {
    commit('SET_TOKEN', token)
    setToken(token)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

