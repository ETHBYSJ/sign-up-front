<template>
  <div class="data_picker_main">
    <div class="data_picker_title">
      <span>{{pickerObj.name}}</span>
      <span class="data_picker_star" v-if="pickerObj.star&&pickerObj.name.length>0">*</span>
    </div>
    <div class="picker_wapper">
      <el-date-picker 
        :placeholder="pickerObj.placeholder" 
        type="datetime"
        v-model="pickerObj.content" 
        style="width:100%">
      </el-date-picker>
    </div>
    <div class="data_picker_danger">
      <span class="danger_text">{{pickerObj.dangerText}}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    pickerObj: Object,
  },

  watch: {
    'pickerObj.content': function(val) {
      this.pickerObj.dangerText = ''
    }
  }
}
</script>

<style lang="stylus">
.data_picker_main
  width 100%
  .data_picker_title
    line-height: 15px
    color #666666
    font-size 13px
    padding-left 8px
    //top 10px
    .data_picker_star
      color red
  .picker_wapper
      width 100%
      height 40px
      position relative
      margin-top 5px
  .data_picker_danger
    height 15px
    padding-top 2px
    padding-right 8px
    color red
    font-size 12px
    text-align right
</style>