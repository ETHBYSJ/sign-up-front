export default {
  login(state, {id, mobile, name, department, postion, email}) {
    state.userInfo.id = id
    state.userInfo.mobile = mobile
    state.userInfo.name = name
    state.userState = 1
    console.log(state)
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