<template>
  <div class="pages_main">
    <div class="pages_lr">
      <img class="active_icon" v-show="currPage!=0" src="../../assets/page_before_active.svg" @click="goPage(currPage-1)">
      <img class="inactive_icon" v-show="currPage==0" src="../../assets/page_before_inactive.svg">
    </div>
    <div class="pages_mid">
      <div class="pages_inputs">
        <transition-group name="slide-fade">
          <declare-inputs 
            class="dec_inputs" 
            v-for="(dec, index) in inputList"
            :key="dec.name.name"  
            v-show="index==currPage"
            :decObj="dec">
          </declare-inputs>
        </transition-group>
      </div>
      <div class="pages_number">
        第{{currPage+1}}/{{inputList.length}}页
      </div>
    </div>
    <div class="pages_lr">
      <img class="active_icon" v-show="currPage<inputList.length-1" src="../../assets/page_after_active.svg" @click="goPage(currPage+1)">
      <img class="inactive_icon" v-show="currPage==inputList.length-1" src="../../assets/page_after_inactive.svg">
    </div>
  </div>
</template>

<script>
import DeclareInputs from '../DeclareInputs/DeclareInputs.vue'
export default {
  data() {
    return {
      currPage: 0,
    }
  },

  props: {
    inputList: Array
  },

  components: { 
    DeclareInputs
  },
  
  methods: {
    goPage(num) {
      if (num >= 0 && num < this.inputList.length) {
        this.currPage = num
      }
    }
  }
}
</script>

<style lang="stylus">
  @import '../../common/stylus/components/InputPages.styl'
</style>