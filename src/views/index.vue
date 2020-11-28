<template>
  <div class="index_main">
    <div class="index_container">
      <head-navigation></head-navigation>
      <div class="index_wapper clearfix">
        <div class="index_left_wapper">
          <ul class="index_left_panel">
            <li class="index_left_option" :class="[{inactive: userState==0}, {active: userState==1&&leftStatus==1}]" @click="leftStatus=1">身份验证</li>
            <li class="index_left_option" :class="[{inactive: userState==0||userAuth==0}, {active: userAuth==1&&userState==1&&leftStatus==2}]" @click="toPanel(2)">名单申报</li>
            <li class="index_left_option" :class="[{inactive: userState==0||userAuth==0}, {active: userAuth==1&&userState==1&&leftStatus==3}]" @click="toPanel(3)">资料上传</li>
          </ul>
        </div>

        <div class="index_right_wapper">
          <div class="index_right_login" v-if="userState==1">
            <div class="index_right_login1" v-if="leftStatus==1">
              <h2 class="index_right_title">身份验证</h2>
              <div class="index_right_phone">
                <div class="index_right_num">手机号:</div>
                <div class="index_right_num">{{userInfo.mobile}}</div>
                <div class="index_right_btn" @click="authPhone">验证</div>
              </div>
              <div class="index_right_inputs">
                <data-input class="index_right_input" v-for="inputObj in inputObjList" 
                  :key="inputObj.name"
                  :inputObj="inputObj">
                </data-input>
              </div>
              <div class="index_right_next_box">
                <div class="index_right_next_btn" @click="submitAuth">下一步</div>
              </div>
            </div>

            <div class="index_right_login2" v-else-if="leftStatus==2">
              <h2 class="index_right_title">名单申报</h2>
              <div class="index_right_scroll">
                <vue-scroll :Ops="scrollOps">
                  <declare-inputs class="dec_inputs" v-for="dec in declareList" 
                    :key="dec.name"
                    :decObj="dec">
                  </declare-inputs>
                </vue-scroll>
              </div>
              <div class="index_right_btn_box"></div>
            </div>
          </div>
          <div class="index_right_logout" v-else>未登录，请先登录！</div>
        </div>
      </div>
    </div>

    <modal-phone v-if="showModalPhone">
    </modal-phone>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { DataInputConfig } from '../common/javascript/model/data-input-config.js'
import { DeclareMsg } from '../common/javascript/model/declare-msg.js'
import DataInput from '../components/DataInput/DataInput.vue'
import HeadNavigation from '../components/HeadNavigation/HeadNavigation.vue'
import ModalPhone from '../components/ModalPhone/ModalPhone.vue'
import DeclareInputs from '../components/DeclareInputs/DeclareInputs.vue'

export default {
  data() {
    return {
      leftStatus: 1,
      showPhoneError: false,
      showModalPhone: false,
      inputObjList: [
        new DataInputConfig('姓名', true, '', '', ''),
        new DataInputConfig('单位', true, '', '', ''),
        new DataInputConfig('职务', true, '', '', ''),
        new DataInputConfig('邮箱', false, '', '', ''),
      ],       
      declareList: [
        new DeclareMsg(),
      ],

    }
  },

  computed: {
    ...mapState(['userInfo', 'userAuth', 'userState']),

    //secretMobile() {
    //  if (this.userInfo.mobile.length != 11) return '未绑定'
    //  return this.userInfo.mobile.slice(0, 6) + 'XXXXX'
    //}
  },

  components: { 
    HeadNavigation,
    DataInput,
    ModalPhone,
    DeclareInputs
  },


  methods: {
    toPanel(index) {
      if (this.userAuth == 1) {
        this.leftStatus = index
      }
    },

    authPhone() {
      this.showPhoneError = false
      this.showModalPhone = true
    },

    closeModalPhone() {
      this.showModalPhone = false
    },

    submitAuth() {
      if(this.userInfo == '') {
        this.showPhoneError = true
      }
    }
  }
  
}
</script>

<style lang="stylus">
 @import '../common/stylus/views/index.styl'
</style>