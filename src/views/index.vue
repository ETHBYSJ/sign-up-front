<template>
  <div class="index_main">
    <div class="index_container">
      <head-navigation></head-navigation>
      <div class="index_wapper clearfix">
        <div class="index_left_wapper">
          <ul class="index_left_panel">
            <li class="index_left_option" :class="[{inactive: userState==0}, {active: userState==1&&leftStatus==1}]" @click="toFirst">身份验证</li>
            <li class="index_left_option" :class="[{inactive: userState==0||userAuth==0}, {active: userAuth==1&&userState==1&&leftStatus==2}]" @click="toSecond">名单申报</li>
            <li class="index_left_option" :class="[{inactive: userState==0||userAuth==0}, {active: userAuth==1&&userState==1&&leftStatus==3}]" @click="toThird">资料上传</li>
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
                <data-input class="index_right_input" v-for="inputObj in inputObjList" 
                  :key="inputObj.name"
                  :inputObj="inputObj">
                </data-input>
              </div>
              <div class="index_right_next_box">
                <div class="index_right_next_btn" :class="{active: userInfo.mobile.length === 11}" @click="submitAuth">下一步</div>
              </div>
            </div>

            <div class="index_right_login2" v-else-if="leftStatus==2">
              <h2 class="index_right_title">名单申报</h2>
              <div class="index_right_content">
                <input-pages :inputList="declareList"></input-pages>
              </div>

              <div class="index_right_btn_box">
                <div class="index_right_btn" @click="updateEnrollList">下一步</div>
              </div>
            </div>

            <div class="index_right_login3" v-else-if="leftStatus==3">
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
                  <!--el-upload class="file_uploader"
                    :action="uploadUrl"
                    :limit="1">
                    <a class="upload_file_btn">{{uploadStatus}}</a>
                  </el-upload-->
                  <a class="upload_file_btn" @click="choiceFile">{{uploadStatus}}</a>
                  <div class="upload_file_name" :class="{uploading: uploadActive}">{{uploadName}}</div>
                  <input ref="filElem" type="file" class="file" id="file" @change="getFile($event)">
                  <div class="upload_file_intro">
                    请选择文件上传当地主管部门审批参会材料！
                  </div>
                </div>
              </div>
              <div class="index_right_btn_box">
                <div class="index_right_btn" :class="{active: uploadActive}" @click="uploadFile">提交资料</div>
              </div>
            </div>
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
import { DeclareMsg } from '../common/javascript/model/declare-msg.js'
import DataInput from '../components/DataInput/DataInput.vue'
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
        new DataInputConfig('姓名', true, '', '', ''),
        new DataInputConfig('单位', true, '', '', ''),
        new DataInputConfig('职务', true, '', '', ''),
        new DataInputConfig('邮箱', false, '', '', ''),
      ],       
      declareList: [
        new DeclareMsg(),
      ],
      sampleFileName: '审批参会材料范本.doc',
      uploadUrl: '',
      uploadStatus: '选择上传',
      uploadFileObj: {}, 
      uploadName: '未上传文件',
      uploadActive: true
    }
  },

  mounted() {
    reqSetCookie().then(res => {
      this.toFirst()
    }).catch({})
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

    'userAuth': function(val) {
      if (val === 1) {
        this.toSecond()
      } else {
        this.toFirst()
      }
    }
  },

  components: { 
    HeadNavigation,
    DataInput,
    ModalPhone,
    DeclareInputs,
    InputPages
  },


  methods: {
    ...mapActions(['login', 'changeUserInfo']),

    toFirst() {
      // 获取登录信息
      this.leftStatus = 1
      reqGetUserInfo().then(res => {
        this.login(res.data.data)
      }).catch(err => {})   
    },

    toSecond() {
      if (this.userAuth == 1) {
        // 获取报名表
        this.leftStatus = 2
        reqGetUserList(this.userInfo.id).then(res => {
          if (res.data.data.length > 0) {
            this.loadEnrollList(res.data.data)
          }
        })
      }
    },

    toThird() {
      if (this.userAuth == 1) {
        // 获取上传文件
        this.leftStatus = 3
        this.uploadActive = true
        reqGetUserFile(this.userInfo.id).then(res => {
          if (res.data.data.length > 0) {
            this.uploadStatus = '重新上传'
            this.uploadName = res.data.data
            this.uploadActive = false
          }
        })
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

      const data = {
        name: this.inputObjList[0].content, 
        department: this.inputObjList[1].content, 
        postion: this.inputObjList[2].content, 
        email: this.inputObjList[3].content
      };
      reqChangeUserInfo(data).then(res => {
        this.toSecond()
      }).catch(err => {})
    },

    checkAuth() {
      if(this.userInfo.mobile == '') return false
      var flag = true
      if (this.inputObjList[0].content == '') {
        flag = false
        this.inputObjList[0].dangerText = '请输入姓名'
      }
      if (this.inputObjList[1].content == '') {
        flag = false
        this.inputObjList[1].dangerText = '请输入单位'
      }
      if (this.inputObjList[2].content == '') {
        flag = false
        this.inputObjList[2].dangerText = '请输入职务'
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
        this.declareList.push(msg)
      }
    },

    updateEnrollList() {
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
        }
        data.list.push(msg)
      }
      reqUpdateUserList(data).then(res => {
        if (res.data.code === 10000) {
          this.toThird()
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
        this.uploadActive = true
      }
    },

    uploadFile() {
      if (this.uploadActive === true && this.uploadFileObj != {}) {
        let formData = new FormData()
        formData.append('file', this.uploadFileObj)
        reqUploadFile(this.userInfo.id, formData).then(res => {
          if (res.data.code === 10000) {
            this.toThird()
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