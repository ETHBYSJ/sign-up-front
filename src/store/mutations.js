export default {
  save_userInfo(state, {userInfo}) {
    state.userInfo = userInfo
    state.userState = 1
  },

  clear_userInfo(state) {
    state.userInfo = {}
    state.userState = 0
  },

  change_authInfo(state, name, department, position, email) {
    state.userInfo.name = name
    state.userInfo.position = position
    state.userInfo.department = department
    state.userInfo.email = email
  },

  bindMobile(state, mobile) {
    state.userInfo.mobile = mobile
  },

  displayMobile(state) {
    if (state.userInfo.mobile.length === 11) {
      const { mobile } = state.userInfo
      state.secretMobile = mobile.slice(0, 3) + '****' + mobile.slice(7, 11)
    }
    else {
      state.secretMobile = '未绑定'
    }
  },

  checkAuth(state) {
    if (state.userInfo.name && state.userInfo.name != '' 
        && state.userInfo.department && state.userInfo.department != '' 
        && state.userInfo.position && state.userInfo.position != '') {
      state.userAuth = 1
    }
    else {
      state.userAuth = 0
    }
  }
}