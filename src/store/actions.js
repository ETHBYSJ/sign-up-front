import { 
  reqSendCode,
  reqCheckCode,
  reqGetUserInfo,
  reqChangeUserInfo,
} from '../api/request'

export default {
  async login({commit}) {
    reqGetUserInfo().then((res) => {
      if (res.data.key === 'SuccessKey') {
        //console.log(res.data.data)
        const user = res.data.data
        commit('login', {user})
        commit('displayMobile')
        commit('checkAuth')
        return Promise.resolve()
      }
    }).catch((err) => {
      // 错误处理
      return Promise.reject()
    })
  },

  bindMobile({commit}, mobile) {
    commit('bindMobile', mobile)
    commit('displayMobile')
    commit('checkAuth')
  },

  async changeUserInfo({commit}, name, department, position, email) {
    const data = { 
      name: name, 
      department: department,
      position: position,
      email: email
    }
    reqChangeUserInfo(data).then((res) => {
      commit('changeUserInfo', name, department, position, email)
      commit('checkAuth')
      return Promise.resolve()
    }).catch((err) => {
      return Promise.reject()
    })
  }
}