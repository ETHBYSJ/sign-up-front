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


}