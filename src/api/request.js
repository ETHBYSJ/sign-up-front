import {get, post} from './axios.js'

export const reqSendCode = (data) => post('/sms/send_code', data)

export const reqCheckCode = (data) => post('/sms/check_code', data)

export const reqGetUserInfo = () => get('/user/info')

export const reqChangeUserInfo = (data) => get('/user/change', data)