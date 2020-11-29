export default {
  login(state, {user}) {
    state.userInfo = user
    state.userState = 1
  },

  logout(state) {
    state.userInfo = {
      id: '',
      mobile: '',
      name: '',
      email: '',
      department: '',
      position: ''
    }
    state.userState = 0
  },

  bindMobile(state, mobile) {
    state.userInfo.mobile = mobile
  },

  changeUserInfo(state, name, department, position, email) {
    state.userInfo.name = name
    state.userInfo.position = position
    state.userInfo.department = department
    state.userInfo.email = email
  },

  displayMobile(state) {
    if (state.userInfo.mobile.length === 11) {
      state.secretMobile = state.userInfo.mobile.slice(0, 6) + 'XXXXX'
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