<template>
  <div class="decs_main">
    <data-input :inputObj="decObj.name"></data-input>
    <data-input :inputObj="decObj.number"></data-input>
    <data-input :inputObj="decObj.department"></data-input>
    <data-input :inputObj="decObj.position"></data-input>
    <data-input :inputObj="decObj.mobile"></data-input>
    <data-input :inputObj="decObj.identity"></data-input>
  </div>
</template>

<script>
import DataInput from '../DataInput/DataInput.vue'
export default {
  props: {
    decObj: Object,
  },

  components: { DataInput },
}
</script>

<style lang="stylus">
.decs_main
  padding 0 14px
</style>