<template>
  <div class="data_input_main">
    <div class="data_input_title">
      <span>{{inputObj.name}}</span>
      <span class="data_input_star" v-if="inputObj.star&&inputObj.name.length>0">*</span>
    </div>
    <input :placeholder="inputObj.placeholder"  v-model="inputObj.content">
    <div class="data_input_danger">
      <span class="danger_text">{{inputObj.dangerText}}</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  },

  props: {
    inputObj: Object, //name, star, content
  }
}
</script>

<style lang="stylus">
  @import '../../common/stylus/components/DataInput.styl'
</style>