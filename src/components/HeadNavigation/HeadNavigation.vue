<template>
  <div class="nav_main">
    <div class="nav_container">
      <div class="nav_wapper">
        <img src="../../assets/csj-logo.png">
        <h2>第三届”长三角基于大数据的区域教育评价变革论坛“投稿征集通道报名通道</h2>
        <div class="login_btn" v-if="userState">登录</div>
        <div class="login_name" v-else></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState(['userInfo', 'userState']),
  },

  mounted() {
    this.login()
  },

  methods: {
    ...mapActions(['login']),
  }
}
</script>

<style lang="stylus">
 @import '../../common/stylus/components/HeadNavigation.styl'
</style>