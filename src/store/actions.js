import { 
  reqSendCode,
  reqCheckCode,
  reqGetUserInfo,
  reqChangeUserInfo,
} from '../api/request'

export default {
  login({commit}) {
    reqGetUserInfo().then((res) => {
      if (res.data.key === 'SuccessKey') {
        console.log(res.data.data)
        //commit('login', res.data.data)
      }
    }).catch((err) => {
      // 错误处理
    })
  },
}