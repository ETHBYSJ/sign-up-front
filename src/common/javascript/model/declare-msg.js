import { DataInputConfig } from './data-input-config.js'

export class DeclareMsg {
  constructor() {
    this.name = new DataInputConfig('姓名', true, '', '', '')
    this.number = new DataInputConfig('身份证号码', true, '', '', '')
    this.company = new DataInputConfig('工作单位', true, '', '', '')
    this.job = new DataInputConfig('姓名', false, '', '', '')
    this.phone = new DataInputConfig('手机', false, '', '', '')
    this.identity = new DataInputConfig('参会身份', true, '', '', '')
  }
}