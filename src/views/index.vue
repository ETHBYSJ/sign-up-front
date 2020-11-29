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
                <div class="index_right_num">{{secretMobile}}</div>
                <div class="index_right_btn" @click="authPhone">验证</div>
              </div>
              <div class="index_right_inputs">
                <data-input class="index_right_input" v-for="inputObj in inputObjList" 
                  :key="inputObj.name"
                  :inputObj="inputObj">
                </data-input>
              </div>
              <div class="index_right_next_box">
                <div class="index_right_next_btn" :class="{active: userInfo.mobile.length === 11}" @click="submitAuth">下一步</div>
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
import { mapState, mapActions } from 'vuex'
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

  mounted() {
    this.login().then(() =>{
      this.inputObjList[0].content = this.userInfo.name
      this.inputObjList[1].content = this.userInfo.department
      this.inputObjList[2].content = this.userInfo.position
      this.inputObjList[3].content = this.userInfo.email
      if (this.userAuth == 1) {
        this.leftStatus = 2
      }
    }).catch(() => {

    })
    
  },

  computed: {
    ...mapState(['userInfo', 'userAuth', 'userState', 'secretMobile']),
  },

  watch: {

  },

  components: { 
    HeadNavigation,
    DataInput,
    ModalPhone,
    DeclareInputs
  },


  methods: {
    ...mapActions(['login', 'changeUserInfo']),

    toPanel(index) {
      if (this.userAuth == 1) {
        this.leftStatus = index
      }
    },

    authPhone() {
      this.showModalPhone = true
    },

    closeModalPhone() {
      this.showModalPhone = false
    },

    submitAuth() {
      if(this.userInfo.mobile == '') return
      var flag = true
      if (this.inputObjList[0].content == '') {
        flag = false
        this.inputObjList[0].dangerText = '请输入姓名'
      }
      if (this.inputObjList[1].content == '') {
        flag = false
        this.inputObjList[1].dangerText = '请输入单位'
      }
      if (this.inputObjList[2].content == '') {
        flag = false
        this.inputObjList[2].dangerText = '请输入职务'
      }
      if (flag === false) return

      this.changeUserInfo(
        this.inputObjList[0].content, 
        this.inputObjList[1].content, 
        this.inputObjList[2].content, 
        this.inputObjList[3].content
      ).then(() => { // 成功
        this.leftStatus = 2
      }).catch(() => { // 失败

      })
    }
  }
  
}
</script>

<style lang="stylus">
 @import '../common/stylus/views/index.styl'
</style>