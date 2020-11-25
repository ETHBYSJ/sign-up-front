<template>
  <div class="index_main">
    <head-navigation></head-navigation>

    <div class="index_container">
      <div class="index_wapper">
        <div class="index_left_wapper">
          <ul class="index_left_panel">
            <li class="index_left_option" :class="[{inactive: userState==0}, {active: userState==1&&leftStatus==1}]" @click="leftStatus=1">身份验证</li>
            <li class="index_left_option" :class="[{inactive: userState==0||userAuth==0}, {active: userAuth==1&&userState==1&&leftStatus==2}]" @click="leftStatus=2">名单申报</li>
            <li class="index_left_option" :class="[{inactive: userState==0||userAuth==0}, {active: userAuth==1&&userState==1&&leftStatus==3}]" @click="leftStatus=3">资料上传</li>
          </ul>
        </div>

        <div class="index_right_wapper">
          <div class="index_right_login" v-if="userState==1">
            <div class="index_right_login1" v-if="leftStatus==1">
              <h3 class="index_right_title">身份验证</h3>
              <div class="index_right_phone">
                <div class="index_right_num">手机号:</div>
                <div class="index_right_btn" @click="authPhone">验证</div>
              </div>
              <div class="index_right_input">
                <data-input v-for="inputObj in inputObjList" 
                  :key="inputObj.name"
                  :inputObj="inputObj">
                </data-input>
              </div>
              <div class="index_right_next_box">
                <div class="index_right_next_btn" @click="submitAuth">下一步</div>
              </div>
            </div>
          </div>
          <div class="index_right_logout" v-else>未登录，请先登录！</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import DataInput from '../components/DataInput/DataInput.vue'
import HeadNavigation from '../components/HeadNavigation/HeadNavigation.vue'

export default {
  data() {
    return {
      leftStatus: 1,
      showPhoneError: false,
      inputObjList: [
        {
          name: '姓名',
          star: true,
          content: '',
        },
        {
          name: '单位',
          star: true,
          content: '',
        },
        {
          name: '职务',
          star: true,
          content: '',
        },
        {
          name: '邮箱',
          star: false,
          content: '',
        }
      ]
    }
  },

  computed: {
    ...mapState(['userInfo', 'userAuth', 'userState'])
  },

  components: { 
    HeadNavigation,
    DataInput 
  },

  methods: {
    authPhone() {
      this.showPhoneError = false
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