export default {
  login({commit}, userInfo) {
    return new Promise(resolve => {
      commit('save_userInfo', {userInfo})
      commit('displayMobile')
      commit('checkAuth')
      resolve()
    })
    
  },

  bindMobile({commit}, mobile) {
    commit('bindMobile', mobile)
    commit('displayMobile')
    commit('checkAuth')
  },

  changeUserInfo({commit}, data) {
    commit('CHANGE_AUTHINFO', data)
    commit('checkAuth')
  }
}