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
            <div class="send_btn" :class="{active: bindActive}" @click="bindPhone">绑定手机号</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import DataInput from '../DataInput/DataInput.vue'
import { DataInputConfig } from '../../common/javascript/model/data-input-config'
import { isMobile } from '../../utils/util.js'
import { reqSendCode, reqCheckCode } from '../../api/request.js'

export default {
  data() {
    return {
      timing: null, // 定时器
      codeActive: false, // 记录手机号合法情况
      timeActive: true,  // 记录定时器情况
      bindActive: false,
      codeText: '获取验证码',
      phoneObj: new DataInputConfig('手机号', true, '', '请输入手机号', ''),
      codeObj: new DataInputConfig('', true, '', '验证码', ''),
      sendID: '',
    }
  },
  
  components: { 
    DataInput 
  },

  computed: {
    ...mapState(['userInfo'])
  },

  watch: {
    'phoneObj.content': function (val) {
      this.codeActive = isMobile(val)
    }
  },

  methods: {
    ...mapActions(['bindMobile']),
    /**
     * 获取验证码
     */
    getCode() {
      // 判断当前状态
      if(this.codeActice === false || this.timeActive === false)
        return
      
      // 清空错误信息
      this.phoneObj.dangerText = ''
      this.codeObj.dangerText = ''

      // 发送请求--异步
      reqSendCode({mobile: this.phoneObj.content}).then((res) => {
        this.sendID = res.data.data.id
        this.countSecond()
        this.bindActive = true
      }).catch((err) => {
        this.phoneObj.dangerText = '该号码发送数量过多，请稍后再试'
      })
    },

    /**
     * 读秒
     */
    countSecond() {
      let number = 60
      this.codeText = number + "s"
      this.timeActive = false
      this.timing = setInterval(() => {
        number--;
        this.codeText = number + "s";
        if (number === 0) {
          clearInterval(this.timing);
          this.timing = null;
          this.codeText = "获取验证码";
          this.timeActive = true
        }
      }, 1000);
    },

    /**
     * 绑定手机号
     */
    bindPhone() {
      if (this.bindActive === false) return

      var data = {
        id: this.sendID,
        mobile: this.phoneObj.content,
        code: this.codeObj.content,
      }
      //var that = this
      reqCheckCode(data).then((res) => {
        if (res.data.data != "") {
          this.bindMobile(res.data.data.mobile)
          this.$parent.closeModalPhone()
        }
        else {
          this.codeObj.dangerText = res.data.message
        }
      }).catch((err) => {
        this.codeObj.dangerText = err.response.data.message
      })
    }
  },
}
</script>

<style lang="stylus">
 @import '../../common/stylus/components/ModalPhone.styl';
</style>