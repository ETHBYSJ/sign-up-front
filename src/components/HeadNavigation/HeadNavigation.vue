<template>
  <div class="nav_main">
    <div class="nav_container">
      <div class="nav_wapper">
        <img class="logo_img" src="../../assets/csj-logo.png">
        <h2>第三届“长三角基于大数据的区域教育评价变革论坛”报名通道</h2> 
      </div>
      <div class="login_btn" v-if="userState==0" @click="handleLogin">登录</div>
      <div class="login_name" v-else>
        <img class="user_img" src="../../assets/icon-profile.png">{{userInfo.name}}
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { reqGetUserInfo, reqSetCookie } from '../../api/request'

export default {
  computed: {
    ...mapState(['userInfo', 'userState']),
  },

  methods: {
    ...mapActions(['login']),  

    handleLogin() {
      reqSetCookie().then(res => {
        reqGetUserInfo().then(response => {
          this.login(response.data.data)
          this.$router.push('/mine')
        }).catch(err => {})
      }).catch(err => {})
    }
  }
}
</script>

<style lang="stylus">
 @import '../../common/stylus/components/HeadNavigation.styl'
</style>