import { get, post } from './axios.js'
import { convertRes2Blob } from '../utils/util.js'

export const reqSendCode = (data) => post('/iadmin/sms/send_code', data)

export const reqCheckCode = (data) => post('/iadmin/sms/check_code', data)

export const reqGetUserInfo = () => get('/iadmin/user/info')

export const reqChangeUserInfo = (data) => post('/iadmin/user/change', data)

export const reqDownloadSampleFile = () => {
  get('/api/v1/file/download').then(res => {
    convertRes2Blob(res)
  })
}

export const reqSetCookie = () => get('/api/v1/cookie')

export const reqUploadFile = (id, data) => post('/api/v1/file/upload?id='+id, data, {type: 'file', 'Content-Type': 'application/x-www-form-urlencoded'})

export const reqGetUserFile = (id) => get('/api/v1/file/name?id='+id)

export const reqGetUserList = (id) => get('/api/v1/user/participants?id='+id)

export const reqUpdateUserList = (data) => post('/api/v1/user/signUp', data)

export const reqCheckEnrollRecord = (id) => get('/api/v1/user/check?id='+id)