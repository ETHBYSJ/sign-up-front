<template>
  <div class="decs_main">
    <data-input :inputObj="decObj.name"></data-input>
    <data-input :inputObj="decObj.number"></data-input>
    <data-input :inputObj="decObj.company"></data-input>
    <data-input :inputObj="decObj.job"></data-input>
    <data-input :inputObj="decObj.phone"></data-input>
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

</style>