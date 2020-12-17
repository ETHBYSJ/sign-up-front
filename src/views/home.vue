<template>
  <div class="index_main">
    <div class="index_container">
      <head-navigation @getEnrollList="initInfo"></head-navigation>
      <div class="index_wapper clearfix">
        <div class="index_left_wapper">
          <ul class="index_left_panel">
            <li class="index_left_option" :class="[{inactive: userState==0}, {active: userState==1&&leftStatus==1}]" @click="toFirst">身份验证</li>
            <li class="index_left_option" :class="[{inactive: userState==0||userAuth==0}, {active: userAuth==1&&userState==1&&leftStatus==2}]" @click="toSecond">名单申报</li>
            <!--li class="index_left_option" :class="[{inactive: userState==0||userAuth==0}, {active: userAuth==1&&userState==1&&leftStatus==3}]" @click="toThird">资料上传</li-->
          </ul>
        </div>

        <div class="index_right_wapper">
          <div class="index_right_login" v-if="userState==1">
            <div class="index_right_login1" v-if="leftStatus==1">
              <h2 class="index_right_title">身份验证</h2>
              <div class="index_right_phone">
                <div class="index_right_num">手机号:</div>
                <div class="index_right_num">{{secretMobile}}</div>
                <div class="index_right_btn" @click="authPhone">验证</div>
              </div>
              <div class="index_right_inputs">
                <data-input 
                  class="index_right_input" 
                  v-for="inputObj in inputObjList" 
                  :key="inputObj.name"
                  :inputObj="inputObj">
                </data-input>

                <data-select :selectObj="areaObj"></data-select>
              </div>

              <div class="index_right_next_box">
                <div class="index_right_next_btn" 
                  :class="{active: userInfo.mobile.length === 11}" 
                  @click="submitAuth">
                  下一步
                </div>
              </div>
            </div>

            <div class="index_right_login2" v-else-if="leftStatus==2">
              <h2 class="index_right_title">名单申报</h2>
              <div class="index_right_content">
                <input-pages ref="enroll_pages" :inputList="declareList"></input-pages>
              </div>

              <div class="index_right_btn_box">
                <div class="index_right_btn" @click="updateEnrollList">提交</div>
              </div>
            </div>

            <!--div class="index_right_login3" v-else-if="leftStatus==3">
              <h2 class="index_right_title">文件上传</h2>
              <div class="sample_file_wapper">
                <a class="sample_file_title">示例文件:</a>
                <a class="sample_file_name" @click="downloadSampleFile">{{sampleFileName}}</a>
                <div class="sample_file_intro">
                  <p>请下载审批参会材料范本，按实际情况填写后并上传</p>
                </div>
              </div>
              <div class="upload_file_wapper">
                <a class="upload_file_title">资料文件:</a>
                <div class="upload_file_right">
                  <a class="upload_file_btn" @click="choiceFile">{{uploadStatus}}</a>
                  <div class="upload_file_name">{{uploadName}}</div>
                  <input ref="filElem" type="file" class="file" id="file" @change="getFile($event)">
                  <div class="upload_file_intro">
                    请选择文件上传当地主管部门审批参会材料！
                  </div>
                </div>
              </div>
              <div class="index_right_btn_box">
                <div class="index_right_btn" :class="{active: uploadActive}" @click="updateEnrollList">提交资料</div>
              </div>
            </div-->
          </div>
          <div class="index_right_logout" v-else>未登录，请先登录！</div>
        </div>
      </div>
    </div>

    <modal-phone v-if="showModalPhone">
    </modal-phone>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { DataInputConfig } from '../common/javascript/model/data-input-config.js'
import { DataSelectConfig } from '../common/javascript/model/data-select-config.js'
import { DeclareMsg } from '../common/javascript/model/declare-msg.js'
import DataInput from '../components/DataInput/DataInput.vue'
import DataSelect from '../components/DataInput/DataSelect.vue'
import HeadNavigation from '../components/HeadNavigation/HeadNavigation.vue'
import ModalPhone from '../components/ModalPhone/ModalPhone.vue'
import DeclareInputs from '../components/DeclareInputs/DeclareInputs.vue'
import InputPages from '../components/InputPages/InputPages.vue'
import { 
  reqGetUserInfo, 
  reqChangeUserInfo, 
  reqDownloadSampleFile, 
  reqGetUserFile, 
  reqUploadFile, 
  reqGetUserList, 
  reqUpdateUserList, 
  reqSetCookie 
} from '../api/request'

export default {
  data() {
    return {
      leftStatus: 1,
      showModalPhone: false,
      inputObjList: [
        new DataInputConfig('姓名', true, '', '请输入姓名', ''),
        new DataInputConfig('单位', true, '', '请输入单位', ''),
        new DataInputConfig('职务', true, '', '请输入职务', ''),
        new DataInputConfig('邮箱', false, '', '请输入邮箱', ''),
      ], 
      declareList: [
        new DeclareMsg(),
      ],
      areaObj: new DataSelectConfig('地区', true, '', '请输入地区', '', [
        '上海市闵行区',
        '江苏省南京市',
        '江苏省苏州市',
        '浙江省宁波市',
        '浙江省杭州市',
        '浙江省温州市',
        '浙江省台州市',
        '安徽省合肥市',
        '安徽省安庆市',
      ]),
      sampleFileName: '审批参会材料范本.doc',
      uploadUrl: '',
      uploadStatus: '选择上传',
      uploadFileObj: {}, 
      uploadName: '未上传文件',
      uploadActive: true,
    }
  },

  computed: {
    ...mapState(['userInfo', 'userAuth', 'userState', 'secretMobile']),
  },

  watch: {
    'userInfo.id': function(val) {
      this.uploadUrl = 'api/v1/file/upload?id=' + val
    },

    'userInfo.name': function(val) {
      this.inputObjList[0].content = val
    },

    'userInfo.department': function(val) {
      this.inputObjList[1].content = val
    },

    'userInfo.position': function(val) {
      this.inputObjList[2].content = val
    },

    'userInfo.email': function(val) {
      this.inputObjList[3].content = val
    },

    'userInfo.extra': function(val) {
      try {
        const { area } = JSON.parse(val)
        if (area) {
          this.areaObj.content = area
        }
      } catch (err) {
        // pass  
      }
    },
  },

  components: { 
    HeadNavigation,
    DataInput,
    DataSelect,
    ModalPhone,
    DeclareInputs,
    InputPages
  },

  methods: {
    ...mapActions(['login', 'changeUserInfo']),

    initInfo() {
        // load 基本信息
      this.loadUserInfo()

      // 获取报名信息
      reqGetUserList(this.userInfo.id).then(res => {
        // 报名过
        if (res.data.data.length > 0) {
          this.loadEnrollList(res.data.data)
        }
        this.toFirst()
        this.toSecond() // 如果没权限不会跳转
      }).catch(err => {})
    },

    loadUserInfo(data) {
      this.uploadUrl = 'api/v1/file/upload?id=' + this.userInfo.id
      this.inputObjList[0].content = this.userInfo.name
      this.inputObjList[1].content = this.userInfo.department
      this.inputObjList[2].content = this.userInfo.position
      this.inputObjList[3].content = this.userInfo.email
      try {
        this.areaObj.content = JSON.parse(this.userInfo.extra).area
      } catch (err) {
        this.areaObj.content = ''
      }
    },

    toFirst() {
      this.leftStatus = 1
    },

    toSecond() {
      if (this.userAuth == 1) {
        this.leftStatus = 2
      }
    },

    toThird() {
      if (this.userAuth == 1) {
        // 获取上传文件名称
        this.leftStatus = 3
        reqGetUserFile(this.userInfo.id).then(res => {
          if (res.data.data.length > 0) {
            this.uploadStatus = '重新上传'
            this.uploadName = res.data.data
          }
        })
      }
    },

    nextToThird() {
      if(this.$refs.enroll_pages.checkCurrPage()) {
        this.toThird()
      }
    },

    authPhone() {
      this.showModalPhone = true
    },

    closeModalPhone() {
      this.showModalPhone = false
    },

    submitAuth() {
      if (this.checkAuth() !== true) return
      // 地区
      const area = JSON.stringify({
        area: this.areaObj.content
      })
      // 组装data
      const data = {
        name: this.inputObjList[0].content, 
        department: this.inputObjList[1].content, 
        position: this.inputObjList[2].content, 
        email: this.inputObjList[3].content,
        extra: area,
      };
      reqChangeUserInfo(data).then(res => {
        // 写进store
        this.changeUserInfo(data)
        this.toSecond()
      }).catch(err => {})
    },

    checkAuth() {
      if(this.userInfo.mobile == '') return false
      var flag = true
      if (!this.inputObjList[0].content && this.inputObjList[0].content == '') {
        flag = false
        this.inputObjList[0].dangerText = '请输入姓名'
      }
      if (!this.inputObjList[1].content && this.inputObjList[1].content == '') {
        flag = false
        this.inputObjList[1].dangerText = '请输入单位'
      }
      if (!this.inputObjList[2].content && this.inputObjList[2].content == '') {
        flag = false
        this.inputObjList[2].dangerText = '请输入职务'
      }
      if (!this.areaObj.content && this.areaObj.content == '') {
        flag = false
        this.areaObj.dangerText = '请选择地区'
      }
      return flag
    },

    loadEnrollList(enrollList) {
      this.declareList = []
      for (var p of enrollList) {
        let msg = new DeclareMsg()
        msg.name.content = p.name
        msg.number.content = p.idCard
        msg.department.content = p.company
        msg.position.content = p.duty
        msg.mobile.content = p.phone
        msg.identity.content = p.identity
        msg.arriveId.content = p.arriveId
        msg.arriveTime.content = p.arriveTime
        msg.leaveId.content = p.leaveId
        msg.leaveTime.content = p.leaveTime
        this.declareList.push(msg)
      }
    },

    updateEnrollList() {
      // 检查
      if(!this.$refs.enroll_pages.checkCurrPage()) return

      const data = {
        id: this.userInfo.id,
        list: []
      }
      for (var p of this.declareList) {
        let msg = {
          name: p.name.content,
          idCard: p.number.content,
          company: p.department.content,
          duty: p.position.content,
          phone: p.mobile.content,
          identity: p.identity.content,
          arriveId: p.arriveId.content,
          arriveTime: p.arriveTime.content,
          leaveId: p.leaveId.content,
          leaveTime: p.leaveTime.content,
        }
        data.list.push(msg)
      }
      reqUpdateUserList(data).then(res => {
        if (res.data.code === 10000) {
          this.$router.push('/mine')
        }
      })
    },

    choiceFile() {
      this.$refs.filElem.dispatchEvent(new MouseEvent('click'))
    },

    downloadSampleFile() {
      reqDownloadSampleFile()
    },

    getFile(event) {
      // load文件
      if (event.target.files.length != 0) {
        this.uploadFileObj = event.target.files[0]
        this.uploadName = this.uploadFileObj.name
        this.uploadFile()
      }
    },

    uploadFile() {
      if (this.uploadActive === true && this.uploadFileObj != {}) {
        let formData = new FormData()
        formData.append('file', this.uploadFileObj)
        reqUploadFile(this.userInfo.id, formData).then(res => {
          if (res.data.code === 10000) {
            this.$alert('上传成功！', '文件上传', {
              confirmButtonText: '确定',
            });
          }
        }).catch({})
      }  
    }
  }
  
}
</script>

<style lang="stylus">
 @import '../common/stylus/views/index.styl'
</style>