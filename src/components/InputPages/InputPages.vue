<template>
  <div class="pages_main">
    <div class="pages_lr">
      <img class="active_icon" v-show="currPage!=0" src="../../assets/page_before_active.svg" @click="goPage(currPage-1)">
      <img class="inactive_icon" v-show="currPage==0" src="../../assets/page_before_inactive.svg">
    </div>
    <div class="pages_mid">
      <div class="pages_inputs">
        <declare-inputs 
          class="dec_inputs" 
          v-for="(dec, index) in inputList"
          :key="dec.id"  
          v-show="index==currPage"
          :decObj="dec">
        </declare-inputs>
      </div>
      <div class="pages_mid_bot">
        <div class="pages_btn" :class="{active: inputList.length<10}" @click="addItem">添加新人员</div>
        <div class="pages_number">第{{currPage+1}}/{{inputList.length}}页</div>
        <div class="pages_btn" :class="{active: currPage!=0}" @click="deleteItem">删除该人员</div>
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
import { DeclareMsg } from '@/common/javascript/model/declare-msg.js'

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
    },

    addItem() {
      if (this.inputList.length < 10) {
        this.inputList.push(new DeclareMsg())
        this.currPage = this.inputList.length-1
      }
    },

    deleteItem() {
      // 第一页不能删除
      if (this.currPage != 0) {
        this.inputList.splice(this.currPage, 1)
      }
    }
  }
}
</script>

<style lang="stylus">
  @import '../../common/stylus/components/InputPages.styl'
</style>