export default {
  login(state, {userInfo}) {
    state.userInfo = userInfo
    state.userState = 1
  },

  logout(state) {
    state.userInfo = {}
    state.userState = 0
  }
}