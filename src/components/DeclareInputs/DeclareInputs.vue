<template>
  <div class="decs_container clearfix">
    <data-input class="decs_unit" :inputObj="decObj.name"></data-input>
    <data-input class="decs_unit" :inputObj="decObj.number"></data-input>
    <data-input class="decs_unit" :inputObj="decObj.department"></data-input>
    <data-input class="decs_unit" :inputObj="decObj.position"></data-input>
    <data-input class="decs_unit" :inputObj="decObj.mobile"></data-input>
    <data-select class="decs_unit" :selectObj="decObj.identity"></data-select>
    <div class="decs_msg">以下信息如果暂时不能确定可先跳过，但请务必在12月23日16:00前填写完毕</div>
    <data-input class="decs_unit" :inputObj="decObj.arriveId"></data-input>
    <data-picker class="decs_unit" :pickerObj="decObj.arriveTime"></data-picker>
    <data-input class="decs_unit" :inputObj="decObj.leaveId"></data-input>
    <data-picker class="decs_unit" :pickerObj="decObj.leaveTime"></data-picker>
  </div>
</template>

<script>
import DataInput from '../DataInput/DataInput.vue'
import DataSelect from '../DataInput/DataSelect.vue'
import DataPicker from '../DataInput/DataPicker.vue'
export default {
  props: {
    decObj: Object,
  },

  components: { 
    DataInput,
    DataSelect,
    DataPicker
  },
}
</script>

<style lang="stylus">
.decs_container
  padding 0 14px
  .decs_unit
    width 50%
    padding 0 8px
    float left
  .decs_msg
    border-bottom 1px solid #e8e8e8
    font-size 13px
    color #c1c1c1
    height 20px
    float left
    margin 0 8px
    margin 8px 0
    width calc(100% - 16px)
    text-align center
</style>