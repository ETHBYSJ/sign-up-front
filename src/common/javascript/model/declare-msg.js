import { DataInputConfig } from './data-input-config.js'

export class DeclareMsg {
  constructor() {
    this.name = new DataInputConfig('姓名', true, '', '', '')
    this.number = new DataInputConfig('身份证号码', true, '', '', '')
    this.department = new DataInputConfig('工作单位', true, '', '', '')
    this.position = new DataInputConfig('职务', false, '', '', '')
    this.mobile = new DataInputConfig('手机', false, '', '', '')
    this.identity = new DataInputConfig('参会身份', false, '', '', '')
  }
}