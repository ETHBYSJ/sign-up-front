<template>
  <div class="not_logged_container">
    <head-navigation></head-navigation>
    <div class="not_logged_wapper clearfix">
      <div class="not_logged_left_wapper">
        <ul class="not_logged_left_panel">
          <li class="not_logged_left_option">身份验证</li>
          <li class="not_logged_left_option">名单申报</li>
          <li class="not_logged_left_option">资料上传</li>
        </ul>
      </div>

      <div class="not_logged_right_wapper">未登录，请先登录！</div>
    </div>
  </div>
</template>

<script>
import HeadNavigation from '../components/HeadNavigation/HeadNavigation.vue'
export default {
  components: { HeadNavigation },
}
</script>

<style lang="stylus" scoped>
.not_logged_container 
  height 100%      
  min-height: 700px
  min-width: 900px
  background-color: #ebebeb
  position: relative;
  .not_logged_wapper
    height: 100% 
    width: 900px
    margin: 0 auto
    padding-top 14px
    .not_logged_left_wapper
      position fixed
      width 90px
      .not_logged_left_panel
        .not_logged_left_option
          text-align: center
          line-height 40px
          border-top 1px solid #dddddd
          font-size 18px
          font-weight: bold
          color #064b80
          cursor not-allowed
  .not_logged_right_wapper
    float right
    width: 790px
    color #999999
    text-align: center
    font-size 20px
</style>