<template>
  <div class="data_select_main">
    <div class="data_select_title">
      <span>{{selectObj.name}}</span>
      <span class="data_select_star" v-if="selectObj.star&&selectObj.name.length>0">*</span>
    </div>
    <div class="select_wapper">
      <el-select :placeholder="selectObj.placeholder" v-model="selectObj.content" style="width:100%">
        <el-option
          v-for="item in selectObj.options"
          :key="item"
          :label="item"
          :value="item">
        </el-option>
      </el-select>
    </div>
    <div class="data_select_danger">
      <span class="danger_text">{{selectObj.dangerText}}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    selectObj: Object,
  },

  watch: {
    'selectObj.content': function(val) {
      this.selectObj.dangerText = ''
    }
  }
}
</script>

<style lang="stylus">
.data_select_main
  width 100%
  .data_select_title
    line-height: 15px
    color #666666
    font-size 13px
    padding-left 8px
    //top 10px
    .data_select_star
      color red
  .select_wapper
      width 100%
      height 40px
      position relative
      margin-top 5px
  .data_select_danger
    height 15px
    padding-top 2px
    padding-right 8px
    color red
    font-size 12px
    text-align right
</style>