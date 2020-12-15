<template>
  <div class="mine-container">
    <head-navigation></head-navigation>
    <div class="mine-wapper">
      <div class="mine-title">我的报名</div>
      <div class="mine-content-wapper">
        <el-table 
          :data="recordList" 
          style="width: 100%"
          @row-click="editEnroll(id)">
          <el-table-column
            prop="title"
            label="标题">
          </el-table-column>
          <el-table-column
            prop="status"
            label="状态">
          </el-table-column>
          <el-table-column
            prop="time"
            label="提交时间">
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { reqCheckEnrollRecord } from '../api/request'
import { formatDate } from '../utils/util.js'
import HeadNavigation from '../components/HeadNavigation/HeadNavigation.vue'
export default {
  components: { HeadNavigation },
  
  data() {
    return {
      recordList: []
    }
  },

  computed: {
    ...mapState(['userInfo'])
  },

  mounted() {
    reqCheckEnrollRecord(this.userInfo.id).then(res => {
      
      if (res.data.code === 10000) {
        // 有记录
        if (res.data.data.length > 0) {
          this.recordList = []
          // 处理
          const { area } = JSON.parse(this.userInfo.extra)
          
          for (item of res.data.data) {
            var data = {}
            data.title = area + this.userInfo.name + '的报名'
            if (item.status === 'accepted') {
              data.status = '已通过审核'
            } else if (item.status === 'declined') {
              data.status = '未通过审核'
            } else {
              data.status = '审核中'
            }
            data.time = formatDate(item.timestamp)
            this.recordList.push(data)
          }
        } else {
          this.$router.push('/home')
        }
      }
    }).catch(err => {})
  },

  editEnroll(id) {
    this.$router.push('/home')
  },
}
</script>

<style lang="stylus">
.mine-container 
  height 100%      
  min-height: 700px
  min-width: 900px
  background-color: #ebebeb
  .mine-wapper
    width: 900px
    height: 700px
    margin 0 auto;
    .mine-title
      line-height 80px
      font-size 26px
      font-weight bold
      color #064b80
    .mine-content-wapper
      height 400px;
      width 100%
      background white

</style>