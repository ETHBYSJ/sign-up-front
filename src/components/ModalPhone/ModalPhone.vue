<template>
  <div class="modal_phone_main">
    <div class="modal_phone_container">
      <div class="modal_phone_box">
        <div class="modal_phone_top">
          <div class="modal_phone_title">绑定手机号</div>
          <div class="modal_phone_close" @click="$parent.closeModalPhone()">
            <span>关闭</span>
            <img src="../../assets/close.svg">
          </div>
        </div>
        <div class="modal_phone_bot">
          <div class="modal_phone_bot_top">
            <data-input :inputObj="phoneObj"></data-input>
          </div>
          <div class="modal_phone_bot_mid">
            <data-input class="code_input" :inputObj="codeObj"></data-input>
            <div class="code_btn" :class="{active: codeActive&&timeActive}" @click="getCode">{{codeText}}</div>
          </div>
          <div class="modal_phone_bot_bot">
            <div class="send_btn" @click="bindPhone">绑定手机号</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DataInput from '../DataInput/DataInput.vue'
import { DataInputConfig } from '../../common/javascript/model/data-input-config'
import { isMobile } from '../../utils/util.js'

export default {
  data() {
    return {
      timing: null, // 定时器
      codeActive: false, // 记录手机号合法情况
      timeActive: true,  // 记录定时器情况
      sendActive: true,
      codeText: '获取验证码',
      phoneObj: new DataInputConfig('手机号', true, '', '请输入手机号', ''),
      codeObj: new DataInputConfig('', true, '', '验证码', ''),
    }
  },
  
  components: { 
    DataInput 
  },

  watch: {
    'phoneObj.content': function (val) {
      this.codeActive = isMobile(val)
    }
  },

  methods: {
    /**
     * 获取验证码
     */
    getCode() {
      // 判断当前状态
      if(this.codeActice === false || this.timeActive === false)
        return
      
      // 判断xxx 假设通过
      // this.sendActive = true
      this.countSecond()
    },

    /**
     * 读秒
     */
    countSecond() {
      let number = 60
      this.codeText = number + "s"
      this.sendActive = false
      this.timing = setInterval(() => {
        number--;
        this.codeText = number + "s";
        if (number === 0) {
          clearInterval(this.timing);
          this.timing = null;
          this.codeText = "获取验证码";
          this.sendActive = true
        }
      }, 1000);
    },

    /**
     * 绑定手机号
     */
    bindPhone() {

    }
  },
}
</script>

<style lang="stylus">
 @import '../../common/stylus/components/ModalPhone.styl';
</style>