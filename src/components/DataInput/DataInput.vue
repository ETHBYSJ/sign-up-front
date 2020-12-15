<template>
  <div class="data_input_main">
    <div class="data_input_title">
      <span>{{inputObj.name}}</span>
      <span class="data_input_star" v-if="inputObj.star&&inputObj.name.length>0">*</span>
    </div>
    <div class="input_wapper">
      <!--span class="test">{{inputObj.name}} &nbsp;</span-->
      <el-input :placeholder="inputObj.placeholder" v-model="inputObj.content"></el-input>
    </div>
    <div class="data_input_danger">
      <span class="danger_text">{{inputObj.dangerText}}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    inputObj: Object, //name, star, content
  },

  watch: {
    'inputObj.content': function(val) {
      this.inputObj.dangerText = ''
    }
  }
}
</script>

<style lang="stylus">
.data_input_main
  width 100%
  .data_input_title
    line-height: 15px
    color #666666
    font-size 13px
    padding-left 8px
    //top 10px
    .data_input_star
      color red
  .input_wapper
      width 100%
      height 40px
      position relative
      margin-top 5px
  .data_input_danger
    height 15px
    padding-top 2px
    padding-right 8px
    color red
    font-size 12px
    text-align right
</style>