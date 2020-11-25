<template>
  <div class="data_input_main">
    <div class="data_input_title">
      <span>{{inputObj.name}}</span>
      <span class="data_input_star" v-if="inputObj.star">*</span>
    </div>
    <input v-model="inputObj.content">
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