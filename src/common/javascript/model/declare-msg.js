import { DataInputConfig } from './data-input-config.js'
import { DataSelectConfig } from './data-select-config.js'
import { v4 as uuidv4 } from 'uuid'

export class DeclareMsg {
  constructor() {
    this.id = uuidv4()
    this.name = new DataInputConfig('姓名', true, '', '请输入姓名', '')
    this.number = new DataInputConfig('身份证号码', true, '', '请输入身份证号码', '')
    this.department = new DataInputConfig('工作单位', true, '', '请输入工作单位', '')
    this.position = new DataInputConfig('职务', true, '', '请输入职务', '')
    this.mobile = new DataInputConfig('手机', true, '', '请输入手机号', '')
    this.identity = new DataSelectConfig('参会身份', true, '', '请选择参会身份', '', ['与会代表', '获奖嘉宾', '发言嘉宾', '圆桌论坛嘉宾'])
    this.arriveId = new DataInputConfig('来沪航班/车次号', false, '', '请输入来沪航班/车次号', '')
    this.arriveTime = new DataInputConfig('到沪时间', false, '', '请选择到沪时间', '')
    this.leaveId = new DataInputConfig('离沪航班/车次号', false, '', '请输入离沪航班/车次号', '')
    this.leaveTime = new DataInputConfig('离沪时间', false, '', '请选择离沪时间', '')
  }
}