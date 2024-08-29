import { login, logout, getInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'
import sha256 from 'sha256'
import { Encrypt } from "@/utils/encryp.js";
import SpeechQueue from "@/utils/SpeechQueue";

const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    authCode: "",
    roles: [],
    permissions: [],
    userInfo: {},
    userId: null,
    socket: '',
    voiceSocket: "",
    speechQueue: null
  },

  mutations: {
    SET_SpeechQueue(state) {
      console.log('开启语音播放')
      state.speechQueue = new SpeechQueue();
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_SOCKET: (state, socket) => {
      state.socket = socket
    },
    SET_VOICESOCKET: (state, voiceSocket) => {
      state.voiceSocket = voiceSocket
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_AUTHCODE: (state, authCode) => {
      state.authCode = authCode
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_USERINFO: (state, userInfo) => {
      state.userInfo = userInfo
    },
    SET_PERMISSIONS: (state, permissions) => {
      state.permissions = permissions
    },
    SET_USEID: (state, userId) => {
      state.userId = userId
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim()
      const password = userInfo.password
      const code = userInfo.code
      const uuid = userInfo.uuid
      const validCode = false
      const shaPwd = Encrypt(password)
      return new Promise((resolve, reject) => {
        login(username, shaPwd, code, uuid, validCode).then(res => {
          setToken(res.token)
          commit('SET_TOKEN', res.token)
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo().then(res => {
          const user = res.user
          localStorage.setItem('userInfo', JSON.stringify(user))
          commit('SET_USERINFO', user)
          let avatar = ""
          if (user.avatar) {
            avatar = window.globalEnv.VUE_APP_BASE_API + '/' + user.avatar;
          }

          if (res.roles && res.roles.length > 0) { // 验证返回的roles是否是一个非空数组
            commit('SET_ROLES', res.roles)
            commit('SET_PERMISSIONS', res.permissions)
          } else {
            commit('SET_ROLES', ['ROLE_DEFAULT'])
          }
          commit('SET_AUTHCODE', user.authCode || '')
          commit('SET_NAME', user.userName)
          commit('SET_USEID', user.userId)
          commit('SET_AVATAR', avatar)
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 退出系统
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then((re) => {
          commit('SET_TOKEN', '')
          if (state.socket) {
            state.socket.close()
            commit('SET_SOCKET', null)
            commit('SET_VOICESOCKET', null)
          }
          commit('SET_ROLES', [])
          commit('SET_PERMISSIONS', [])
          removeToken()
          resolve(re)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
