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
        <div class="pages_add_btn" :class="{active: inputList.length<10}" @click="addItem">添加新人员</div>
        <div class="pages_number">第{{currPage+1}}/{{inputList.length}}页</div>
        <div class="pages_del_btn" :class="{active: currPage!=0}" @click="deleteItem">删除该人员</div>
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
    // 检查该页面是否符合格式
    checkCurrPage() {
      const page = this.inputList[this.currPage]

      var flag = true
      if (page.name.content == '') {
        flag = false
        page.name.dangerText = '请输入姓名'
      }
      if (page.number.content == '') {
        flag = false
        page.number.dangerText = '请输入身份证号码'
      }
      if (page.department.content == '') {
        flag = false
        page.department.dangerText = '请输入工作单位'
      }
      if (page.position.content == '') {
        flag = false
        page.position.dangerText = '请输入职务'
      }
      if (page.mobile.content == '') {
        flag = false
        page.mobile.dangerText = '请输入手机号'
      }
      if (page.identity.content == '') {
        flag = false
        page.identity.dangerText = '请选择参会身份'
      }
      /*if (page.arriveId.content == '') {
        flag = false
        page.arriveId.dangerText = '请输入来沪航班/车次号'
      }
      if (page.arriveTime.content == '') {
        flag = false
        page.arriveTime.dangerText = '请选择到沪时间'
      }
      if (page.leaveId.content == '') {
        flag = false
        page.leaveId.dangerText = '请输入离沪航班/车次号'
      }
      if (page.leaveTime.content == '') {
        flag = false
        page.leaveTime.dangerText = '请选择离沪时间'
      }*/
      return flag
    },

    goPage(num) {
      if (num >= 0 && num < this.inputList.length && this.checkCurrPage()) {
        this.currPage = num
      }
    },

    addItem() {
      if (this.inputList.length < 10 && this.checkCurrPage()) {
        this.inputList.push(new DeclareMsg())
        this.currPage = this.inputList.length-1
      }
    },

    deleteItem() {
      // 第一页不能删除
      if (this.currPage != 0) {
        this.inputList.splice(this.currPage, 1)
        this.currPage -= 1
      }
    }
  }
}
</script>

<style lang="stylus">
.pages_main
  height 465px
  display: flex
  align-items: center;   // 垂直居中，针对的是mycontainer类下面的子元素，不包含“孙子”元素
  justify-content: center; // 水平居中，针对的是mycontainer类下面的子元素，不包含“孙子”元素
  .pages_lr
    width 30px
    img 
      width 30px
      &.active_icon
        cursor pointer
        &:hover
          opacity 0.6
      &.inactive_icon
        cursor not-allowed
  .pages_mid
    flex 1
    padding 0 14px
    .pages_mid_bot
      padding 0 22px
      display: flex
      line-height: 30px
      font-size 14px
      .pages_add_btn
        height 30px
        width 75px
        color #c1c1c1
        cursor not-allowed
        &.active
          cursor pointer
          color #000
          &:hover
            color blue
      .pages_del_btn
        height 30px
        width 75px
        color #c1c1c1
        cursor not-allowed
        text-align right
        &.active
          cursor pointer
          color #000
          &:hover
            color blue
      .pages_number
        flex 1
        text-align: center
      
</style>