import { get, post } from './axios.js'
import { convertRes2Blob } from '../utils/util.js'

export const reqSendCode = (data) => post('/iadmin/sms/send_code', data)

export const reqCheckCode = (data) => post('/iadmin/sms/check_code', data)

export const reqGetUserInfo = () => get('/iadmin/user/info')

export const reqChangeUserInfo = (data) => get('/iadmin/user/change', data)

export const reqDownloadSampleFile = () => {
  get('/api/v1/file/download').then(res => {
    convertRes2Blob(res)
  })
}

export const reqGetUserFile = (id) => get('/api/v1/file/name?id='+id)
