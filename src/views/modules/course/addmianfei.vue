<template>
  <div id="addMianfei">
    <button @click="dianjiGetSig">123</button>
    <div class='content'>
      <p class="title">新增/编辑免费课程</p>
      <div>
       <span>课程名称：<el-input
         placeholder="请输入内容"
         v-model="input"
         class="inputStyle"
         clearable>
</el-input></span>
        <span class="span1">
          老师类型：<el-select v-model="value" clearable placeholder="请选择" @change="teacherClassChange()">
    <el-option
      v-for="item in options"
      :key="item.id"
      :label="item.name"
      :value="item.id">
    </el-option>
  </el-select>
        </span>
        <span class="span2">
          主讲老师：<el-select v-model="optId" clearable placeholder="请选择">
    <el-option
      v-for="item in trueNameList"
      :key="item.userId"
      :label="item.truename"
      :value="item.userId">
    </el-option>
  </el-select>
        </span>
      </div>
      <div class="classType">
        课程类型：
        <el-checkbox-group v-model="animalNameType" size="medium" @change="animalTypeMesage()">
          <el-checkbox-button v-for="item in checkboxGroup2" :label="item.dictName" :key="item.dataId"
                              class="animalTypeStyle">{{item.dictName}}
          </el-checkbox-button>
        </el-checkbox-group>
      </div>
      <div class="courseImgBox">
        <section class="sectionLeft">课程封面：
          <div>
            <el-upload
              :action="this.$http.adornUrl('/sys/oss/uploadAll')"
              :data="folderNameTer"
              name="fileUpload"
              accept=".jpeg, .jpg, .gif, .png"
              :file-list="fileList"
              list-type="picture-card"
              :on-success="handleSuccess"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove">
              <i class="el-icon-plus"></i>
            </el-upload>
          </div>
        </section>
        <section class="sectionRight">视频封面
          <br>
          （非必传）：
          <div>
            <el-upload
              :action="this.$http.adornUrl('/sys/oss/uploadAll')"
              :on-success="handleSuccessVideo"
              :data="folderNameTer"
              list-type="picture-card"
              name="fileUpload"
              accept=".mp4"
              :on-preview="handlePictureCardPreviewVideo"
              :on-remove="handleRemoveVideo">
              <i class="el-icon-plus"></i>
            </el-upload>
          </div>

        </section>
      </div>
      <div class="addBtn">
        <el-button type="success" style="padding: 8px 20px " @click="addChapter()">新增章节</el-button>
      </div>

      <section class="ClassListStyle">

      </section>

      <footer class="footerSty">
        <div>
          <UEditor :config="config" ref="ueditor"></UEditor>
        </div>
      </footer>
      <div class="btnStyle">
        <el-button type="success">保存</el-button>
        <el-button type="info" @click="returnPath()">返回</el-button>
      </div>
    </div>
    <!--    弹窗-->
    <el-dialog
      title="新增章节"
      :visible.sync="centerDialogVisible"
      width="30%"
      center>
      <div class="capterBox">
        <section class="capterTitle">
          章节名称：
          <el-input
            placeholder="单行输入"
            v-model="capterName"
            style="width: 370px"
            clearable>
          </el-input>
        </section>
        <section>
          长传视频：
          <div class="upload">
            <div>
              <input type="file" id="fileUpload" @change="fileChange($event)">
              <label class="status">上传状态: <span>{{statusText}}</span></label>
            </div>
            <div class="upload-type">
              上传方式一, 使用 UploadAuth 上传:
              <button @click="authUpload" :disabled="uploadDisabled">开始上传</button>
              <button @click="pauseUpload" :disabled="pauseDisabled">暂停</button>
              <button :disabled="resumeDisabled" @click="resumeUpload">恢复上传</button>
              <span class="progress">上传进度: <i id="auth-progress">{{authProgress}}</i> %</span>
            </div>
          </div>
        </section>
        <section>
          推荐主题：
          <el-input
            placeholder="单行输入"
            v-model="recommendTitle"
            style="width: 370px"
            clearable>
          </el-input>
        </section>
        <section>
          推荐药品：
          <el-input
            placeholder="输入药品名称"
            v-model="DrugName"
            style="width: 250px"
            clearable v-on:input="getDrugList">
          </el-input>
          <el-button style="padding: 8px 20px" @click="getDrugList">搜索</el-button>
        </section>
        <section class="drugMangeList">
          <ul>
            <li v-for="(item,index ) in this.DrugListType" :key="index">{{item.productName}}：{{item.modelName}}
              <span style="display: inline-block" @click="removeIndex(index)">X</span>
            </li>
          </ul>
        </section>
        <section class="drugBox">
          <ul>
            <li v-for="(item,index) in DrugList" :key="index">
              <section>
                <div class="drugBox_divlift">
                  <img :src="/,/.test(item.mainImages)? item.mainImages.split(',')[0]:item.mainImages" alt="">
                </div>
                <div class="drugBox_divRight">
                  <p style="">{{item.productName}}</p>
                  <span @click="drugBtnEnsure(item)">确定</span>
                </div>
              </section>
            </li>
          </ul>
        </section>
      </div>
      <span slot="footer" class="dialog-footer">
    <el-button @click="centerDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="addClassFun">确 定</el-button>
  </span>
    </el-dialog>
    <!--      二级弹窗-->
    <el-dialog
      z-index="9999"
      title="商品详情"
      :visible.sync="centerDialogVisibleDrug"
      width="400px"
      center>
      <div class="shopingBox">
        <section>
          <div class="shopingBox_divLift"><img :src="/,/.test(ProductModel)? ProductModel.split(',')[0]:ProductModel"
                                               alt=""></div>
          <div style="text-align: start">
            <el-select v-model="modelNameValueId" clearable placeholder="请选择" @change="dianji()">
              <el-option
                v-for="item in particulars"
                :key="item.modelId"
                :label="item.modelName"
                :value="item.modelId">
              </el-option>
            </el-select>
          </div>
        </section>
      </div>
      <span slot="footer" class="dialog-footer">
    <el-button @click="centerDialogVisibleDrug = false" style="padding: 5px 20px">取 消</el-button>
    <el-button type="primary" @click="getProductList()   " style="padding: 5px 20px">确 定</el-button>
  </span>
    </el-dialog>

  </div>
</template>

<script>
  import UEditor from '@/components/ueditor/ueditor.vue'
  import axios from 'axios'
  // import "./../../../../static/aliyun-upload-sdk-1.5.0/aliyun-upload-sdk-1.5.0.min"
  // import "./../../../../static/aliyun-upload-sdk-1.5.0/lib/aliyun-oss-sdk-5.3.1.min"
  // import "./../../../../static/aliyun-upload-sdk-1.5.0/lib/es6-promise.min"
  export default {
    data () {
      return {
        urlMessage: '',//请求地址
        timestamp: '',//阿里时间挫
        signatureNonce: '',//阿里随机数
        signature: '',//阿里签名
        timeout: '',
        partSize: '',
        parallel: '',
        retryCount: '',
        retryDuration: '',
        region: 'cn-shanghai',
        userId: '1518372418781830',
        file: null,
        authProgress: 0,
        uploadDisabled: true,
        resumeDisabled: true,
        pauseDisabled: true,
        uploader: null,
        statusText: '',

        config: {
          autoHeightEnabled: false,
          autoFloatEnabled: true,
          initialContent: '请输入内容', //初始化编辑器的内容,也可以通过textarea/script给值，看官网例子
          autoClearinitialContent: true, //是否自动清除编辑器初始内容，注意：如果focus属性设置为true,这个也为真，那么编辑器一上来就会触发导致初始化的内容看不到了
          initialFrameWidth: null,
          initialFrameHeight: 450,
          BaseUrl: '',
          UEDITOR_HOME_URL: 'static/ueditor/'
        },
        fileList: [],
        folderNameTer: {
          folderName: 'ycylManageClass'
        },
        //二级弹窗
        modelNameValueId: '',//药品详情id
        centerDialogVisibleDrug: false,
        DrugShoping: '',
        particulars: [],
        ProductModel: '',//药品选中的图片
        dangQianProductName: '',
        //弹窗
        DrugListType: [],//选中需要展示的药品
        DrugList: [],//
        DrugName: '',//药品名称
        recommendTitle: '',//推荐
        capterName: '',//章节名称
        centerDialogVisible: false,//弹窗
        dialogImageUrl: '',
        dialogVisible: false,
        animalNameType: [],
        checkboxGroup2: [],//动物种类
        optId: '',//选中的医生或者老师id
        trueNameList: [],
        value: '',
        input: '',
        expertName: [],
        doctorName: [],
        options: [{
          name: '医生',
          id: '1'
        },
          {
            name: '专家',
            id: '2'
          }
        ]
      }
    },
    components: {
      UEditor
    },
    mounted () {
      this.getDoctorName()
      this.getExpertName()
      this.getAnimaltype()
    },
    methods: {
      authUpload () {
        // 然后调用 startUpload 方法, 开始上传
        if (this.uploader !== null) {
          this.uploader.startUpload()
          this.uploadDisabled = true
          this.pauseDisabled = false

        }
      },
      // 暂停上传
      pauseUpload () {
        if (this.uploader !== null) {
          this.uploader.stopUpload()
          this.resumeDisabled = false
          this.pauseDisabled = true
        }
      },
      // 恢复上传
      resumeUpload () {
        if (this.uploader !== null) {
          this.uploader.startUpload()
          this.resumeDisabled = true
          this.pauseDisabled = false
        }
      },
      createUploader (type) {
        let self = this
        let uploader = new AliyunUpload.Vod({
          timeout: self.timeout || 60000,
          partSize: self.partSize || 1048576,
          parallel: self.parallel || 5,
          retryCount: self.retryCount || 3,
          retryDuration: self.retryDuration || 2,
          region: self.region,
          userId: self.userId,
          // 添加文件成功
          addFileSuccess: function (uploadInfo) {
            self.uploadDisabled = false
            self.resumeDisabled = false
            self.statusText = '添加文件成功, 等待上传...'
          },
          // 开始上传
          onUploadstarted: function (uploadInfo) {
            // var SignatureNew = self.Signature
            // 如果是 UploadAuth 上传方式, 需要调用 uploader.setUploadAuthAndAddress 方法
            // 如果是 UploadAuth 上传方式, 需要根据 uploadInfo.videoId是否有值，调用点播的不同接口获取uploadauth和uploadAddress
            // 如果 uploadInfo.videoId 有值，调用刷新视频上传凭证接口，否则调用创建视频上传凭证接口
            // 注意: 这里是测试 demo 所以直接调用了获取 UploadAuth 的测试接口, 用户在使用时需要判断 uploadInfo.videoId 存在与否从而调用 openApi
            // 如果 uploadInfo.videoId 存在, 调用 刷新视频上传凭证接口(https://help.aliyun.com/document_detail/55408.html)
            // 如果 uploadInfo.videoId 不存在,调用 获取视频上传地址和凭证接口(https://help.aliyun.com/document_detail/55407.html)
            if (!uploadInfo.videoId) {
              var data = self.urlMessage
                var a =JSON.parse(data)
              let uploadAuth = a.UploadAuth
              let uploadAddress = a.UploadAddress
              let videoId = a.VideoId
              // uploader.setUploadAuthAndAddress(uploadInfo, uploadAuth, uploadAddress, videoId)
              uploader.setUploadAuthAndAddress(uploadInfo, uploadAuth, uploadAddress, videoId)
              // })
              self.statusText = '文件开始上传...'
              console.log('onUploadStarted:' + uploadInfo.file.name + ', endpoint:' + uploadInfo.endpoint + ', bucket:' + uploadInfo.bucket + ', object:' + uploadInfo.object)
            } else {
              // 如果videoId有值，根据videoId刷新上传凭证
              // https://help.aliyun.com/document_detail/55408.html?spm=a2c4g.11186623.6.630.BoYYcY
              let refreshUrl = 'https://vod.cn-shanghai.aliyuncs.com/voddemo/RefreshUploadVideo?BusinessType=vodai&TerminalType=pc&DeviceModel=iPhone9,2&UUID=59ECA-4193-4695-94DD-7E1247288&AppVersion=1.0.0&Title=haha1&FileName=xxx.mp4&VideoId=' + uploadInfo.videoId
              axios.get(refreshUrl).then(({data}) => {
                let uploadAuth = data.UploadAuth
                let uploadAddress = data.UploadAddress
                let videoId = data.VideoId
                uploader.setUploadAuthAndAddress(uploadInfo, uploadAuth, uploadAddress, videoId)
              })
            }
          },
          // 文件上传成功
          onUploadSucceed: function (uploadInfo) {
            console.log('onUploadSucceed: ' + uploadInfo.file.name + ', endpoint:' + uploadInfo.endpoint + ', bucket:' + uploadInfo.bucket + ', object:' + uploadInfo.object)
            self.statusText = '文件上传成功!'
          },
          // 文件上传失败
          onUploadFailed: function (uploadInfo, code, message) {
            self.statusText = '文件上传失败!'
          },
          // 取消文件上传
          onUploadCanceled: function (uploadInfo, code, message) {
            self.statusText = '文件已暂停上传'
          },
          // 文件上传进度，单位：字节, 可以在这个函数中拿到上传进度并显示在页面上
          onUploadProgress: function (uploadInfo, totalSize, progress) {
            let progressPercent = Math.ceil(progress * 100)
            self.authProgress = progressPercent
            self.statusText = '文件上传中...'
          },
          // 上传凭证超时
          onUploadTokenExpired: function (uploadInfo) {
            // 上传大文件超时, 如果是上传方式一即根据 UploadAuth 上传时
            // 需要根据 uploadInfo.videoId 调用刷新视频上传凭证接口(https://help.aliyun.com/document_detail/55408.html)重新获取 UploadAuth
            // 然后调用 resumeUploadWithAuth 方法, 这里是测试接口, 所以我直接获取了 UploadAuth
            let refreshUrl = 'https://vod.cn-shanghai.aliyuncs.com/voddemo/RefreshUploadVideo?BusinessType=vodai&TerminalType=pc&DeviceModel=iPhone9,2&UUID=59ECA-4193-4695-94DD-7E1247288&AppVersion=1.0.0&Title=haha1&FileName=xxx.mp4&VideoId=' + uploadInfo.videoId
            axios.get(refreshUrl).then(({data}) => {
              let uploadAuth = data.UploadAuth
              uploader.resumeUploadWithAuth(uploadAuth)
            })
            self.statusText = '文件超时...'
          },
          // 全部文件上传结束
          onUploadEnd: function (uploadInfo) {
            console.log('onUploadEnd: uploaded all the files')
            self.statusText = '文件上传完毕'
          }
        })
        return uploader
      },

      fileChange (e) {//上传视频
        this.dianjiGetSig()
        this.file = e.target.files[0]
        if (!this.file) {
          alert('请先选择需要上传的文件!')
          return
        }
        var Title = this.file.name
        var userData = '{"Vod":{}}'
        if (this.uploader) {

          this.uploader.stopUpload()
          this.authProgress = 0
          this.statusText = ''
        }
        this.uploader = this.createUploader()
        this.uploader.addFile(this.file, null, null, null, userData)
        this.uploadDisabled = false
        this.pauseDisabled = true
        this.resumeDisabled = true
      },
      returnPath () {
        this.$router.push({path: 'course-mianfei'})
      },
      removeIndex (index) {
        this.DrugListType.splice(index, 1)

      },
      getProductList () {
        if (this.DrugListType.length < 3) {
          this.centerDialogVisibleDrug = false
          this.dangQianProductName.modelId = this.modelNameValueId
          // this.dangQianProductName.modelName =
          this.particulars.forEach((e) => {
            if (e.modelId == this.modelNameValueId) {
              this.dangQianProductName.modelName = e.modelName
            }
          })
          this.DrugListType.push(this.dangQianProductName)
        } else {
          this.$message.error('温馨提示：课程推荐药品最多只能有3种')
        }

      },
      addClassFun () {
        this.centerDialogVisible = false
        this.DrugName = ''
        this.DrugList = []
      },
      dianjiGetSig () {
        this.$http({
          url: this.$http.adornUrl('/study/getSig'),
          method: 'post',
          data: ({
            title: '标题',
            fileName: 'AA.MP4',
          })
        }).then(({
          data
        }) => {
          if (data && data.code === 0) {
            // const json = '{"result":true, "count":42}';
            // const obj = JSON.parse(json);
            //
            // const json = "'"+data.result + "'"
            // const json = '{"UploadAddress":"eyJFbmRwb2ludCI6Imh0dHBzOi8vb3NzLWNuLXNoYW5naGFpLmFsaXl1bmNzLmNvbSIsIkJ1Y2tldCI6Im91dGluLWQ4NjRmZjAyYjFmNjExZWE4NDJmMDAxNjNlMDBiMTc0IiwiRmlsZU5hbWUiOiJzdi80MTcxMmFiOS0xNzMwYTAyYjk0My80MTcxMmFiOS0xNzMwYTAyYjk0My5tcDQifQ==","VideoId":"bf4aab339fca4994a61a6740ab9a9afd","RequestId":"2440BBEB-3D13-4AEA-B62E-468E15977FD1","UploadAuth":"eyJTZWN1cml0eVRva2VuIjoiQ0FJUzBBUjFxNkZ0NUIyeWZTaklyNWJGSnNMQnVJbGsxYXErZEV6SjBEUm5PdnhodS9QNXFUejJJSHBOZTNocUIrMGZzUGt3bEdsVTZmZ2NsclVxRnNZVkhoT2VNWklnc2NRT29WajVKcGZadjh1ODRZQURpNUNqUVpNZ3VxY2ptcDI4V2Y3d2FmK0FVQlhHQ1RtZDVNTVlvOWJUY1RHbFFDWnVXLy90b0pWN2I5TVJjeENsWkQ1ZGZybC9MUmRqcjhsbzF4R3pVUEcyS1V6U24zYjNCa2hsc1JZZTcyUms4dmFIeGRhQXpSRGNnVmJtcUpjU3ZKK2pDNEM4WXM5Z0c1MTlYdHlwdm9weGJiR1Q4Q05aNXo5QTlxcDlrTTQ5L2l6YzdQNlFIMzViNFJpTkw4L1o3dFFOWHdoaWZmb2JIYTlZcmZIZ21OaGx2dkRTajQzdDF5dFZPZVpjWDBha1E1dTdrdTdaSFArb0x0OGphWXZqUDNQRTNyTHBNWUx1NFQ0OFpYVVNPRHREWWNaRFVIaHJFazRSVWpYZEk2T2Y4VXJXU1FDN1dzcjIxN290ZzdGeXlrM3M4TWFIQWtXTFg3U0IyRHdFQjRjNGFFb2tWVzRSeG5lelc2VUJhUkJwYmxkN0JxNmNWNWxPZEJSWm9LK0t6UXJKVFg5RXoycExtdUQ2ZS9MT3M3b0RWSjM3V1p0S3l1aDRZNDlkNFU4clZFalBRcWl5a1QwcEZncGZUSzFSemJQbU5MS205YmFCMjUvelcrUGREZTBkc1Znb0lGS09waUdXRzNSTE5uK3p0Sjl4YmtlRStzS1V3UHlTcjUxdVNGRWt2OTRCVkZpSWVJWXg5VkkrdS9Mc3RCbkxxT1c2RFN6dDVYUi91UHVncHRnU3RSRThJNjM3MjdQQzUyS0g3VWI5Ty9kcHhKM2xQMFIwV2dteWRuQkR4L1NmdTJrS3ZSaHBrUnZ2WVU5QXVnN1BpRC91SVpKTGk2RFVtQzFlZm81WG1QWEZUUW1uOGw1cEFNbXkvNjB4WHVkdmJBT1M1bWs1SDlVQ0dvQUJIZlhkTXMyOHQvM0J3ZTNiVUFzMENUK283NHhwTk1VOFRCS1o4Um8vQzFWK3VrWFUrUFJUZzd2TTNKZFlseXJLd2xReE5HcHgxaU5EanE3UnZvS3Q1TjJKSnkrcGM1V0F6dGhjS0FmT0drYTZubllLU2xCWGZnblljUlNUZVhlVkxXc3BRZlIraktKVTFYMEUxTEdCR3krK1dYSkpNbnRrRmZyQW04NTYzMW89IiwiQWNjZXNzS2V5SWQiOiJTVFMuTlVwbXh1VVZFYmhVdmp4NDQyNnNNVDZSSyIsIkV4cGlyZVVUQ1RpbWUiOiIyMDIwLTA3LTAxVDExOjUwOjA1WiIsIkFjY2Vzc0tleVNlY3JldCI6IjVkY2FhVWh4M3l6eTJTd0x5eHR4NE1CU1Z4S0ptN1NBWGZrS3c3d0g0ZGozIiwiRXhwaXJhdGlvbiI6IjMzODgiLCJSZWdpb24iOiJjbi1zaGFuZ2hhaSJ9"}';
            // const obj = JSON.parse(json);

            // const obj = JSON.parse(json);
            //  const obj = JSON.parse(json);

            // var b = JSON.prase(obj.UploadAddress)
            // var DiZhistr = JSON.stringify(data.result)
            // var arrayString = data.result.split(',')
            // this.Signature = data.map.signature
            // this.signatureNonce = data.map.signatureNonce
            // this.timestamp = data.map.timestamp
            this.urlMessage = data.result
          } else {
            // this.dataDrug.inputList = []
          }
        })
      },
      drugBtnEnsure (id) {
        this.modelNameValueId = ''
        this.dangQianProductName = id
        this.centerDialogVisibleDrug = true
        this.ProductModel = id.mainImages
        this.$http({
          url: this.$http.adornUrl('/ycyl/ycylproductmodel/infoByProductId'),
          method: 'get',
          params: this.$http.adornParams({
            productId: id.productId
          })
        }).then(({
          data
        }) => {
          if (data && data.code === 0) {
            data.ycylProductModel.map((e) => {
              if (e.theSmall && e.theSmall == '1') {
                data.ycylProductModel.splice(data.ycylProductModel.findIndex(v => v.theSmall == '1'), 1)
              }
            })
            this.particulars = data.ycylProductModel

          } else {
            this.$message.error(data.msg)
          }
        })
      },
      getDrugList () {

        if (this.DrugName) {
          this.$http({
            url: this.$http.adornUrl('/ycyl/ycylproduct/getByName'),
            method: 'post',
            data: ({
              status: 1,
              productName: this.DrugName,
            })
          }).then(({
            data
          }) => {
            if (data && data.code === 0) {
              //得到数据  图片是字符串
              // this.dataDrug.inputList = data.list
              //这里面的图片data.list ：在上面显示
              this.DrugList = data.list

            } else {
              // this.dataDrug.inputList = []
            }
          })
        } else {
          this.DrugList = []
          return this.$message.error('请输入药品名称')
        }
      },
      addChapter () {
        this.centerDialogVisible = true
      },
      handleSuccessVideo (file) {
      },
      handleRemoveVideo (file, fileList) {
      },
      handlePictureCardPreviewVideo (file) {
        this.dialogImageUrl = file.url
        this.dialogVisible = true
      },

      handleSuccess (file) {
      },
      handleRemove (file, fileList) {
      },
      handlePictureCardPreview (file) {
        this.dialogImageUrl = file.url
        this.dialogVisible = true
      },
      animalTypeMesage () {
      },
      getAnimaltype () {
        this.$http({
          url: this.$http.adornUrl('/ycyl/ycyldictdata/list'),
          method: 'post',
          data: ({
            'page': '1',
            'pageSize': '30',
            'dictValue': 'animal_type'
          })
        }).then(({
          data
        }) => {
          if (data && data.code === 0) {

            this.checkboxGroup2 = data.page.list
          } else {
            this.$message.error('暂未获取到动物种类，请联系管理员或稍后重试')
          }
        })
      },
      getDoctorName () {
        this.$http({
          url: this.$http.adornUrl('/ycyl/ycyluserdoctor/getAllDoctor'),
          method: 'post',
          data: ({
            'page': 1,
            'pageSize': '100',
            'doctorStatus': '1',
          })
        }).then(({
          data
        }) => {
          if (data && data.code === 0) {
            this.doctorName = data.doc
          } else {
            this.$message.error('获取医生信息错误，请稍后重试或联系管理员')
          }

        })
      },
      getExpertName () {
        this.$http({
          url: this.$http.adornUrl('/ycyl/ycyluserexpert/getAllExpert'),
          method: 'post',
          data: ({
            'page': 1,
            'pageSize': '100',
            'doctorStatus': '1',
          })
        }).then(({
          data
        }) => {
          if (data && data.code === 0) {

            this.expertName = data.exp
          } else {
            this.$message.error('获取专家信息错误，请稍后重试或联系管理员')
          }
        })
      },
      teacherClassChange () {
        this.optId = ''//将医生的选中框置空
        if (this.value == '1') {
          this.trueNameList = this.doctorName
        } else if (this.value == '2') {
          this.trueNameList = this.expertName
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  div {
    color: #333;
    font-size: 16px;

    .content {
      margin: auto;
      width: 930px;
      border: 1px solid #eee;
      padding-bottom: 20px;

      .title {
        width: 203px;
        height: 23px;
        margin: 0 auto 30px auto;
        font-size: 24px;
        font-weight: bold;
        color: rgba(51, 51, 51, 1);
        line-height: 28px;
        /*margin-bottom: 43px;*/
      }

      span {
        display: inline-block;
        margin-right: 20px;

        .inputStyle {
          display: inline-block;
          width: 400px !important;
          height: 30px;
        }

      }

      .classType {
        margin-top: 16px;
        display: flex;

        .animalTypeStyle {
          border: 1px solid transparent !important;
          border-left: 1px solid #dcdfe6 !important;
          margin-right: 15px;
          color: #ff4d51;
        }
      }

      .courseImgBox {
        margin-top: 16px;
        display: flex;

        section {
          display: flex;

        }

        .sectionLeft {
          div {
            width: 150px;
            height: 150px;
            overflow: hidden;
          }

        }

        .sectionRight {
          margin-left: 180px !important;

          div {
            width: 150px;
            height: 150px;
            /*border: 1px solid #111;*/
            overflow: hidden;
          }
        }

      }

      .addBtn {
        margin-top: 16px;
      }

      .ClassListStyle {
        margin: 20px 0;
      }

      .footerSty {
        margin: 20px 0;
      }

      .btnStyle {
        text-align: right;
        .el-button {
          margin-right: 20px;
          padding: 8px 20px;
        }
      }
    }
  }

  .capterBox {
    section {
      margin-top: 30px;


    }

    .drugBox {

      ul {
        li {
          border: 1px solid #ccc;
          border-radius: 10px;
          margin: 5px 5px;

          padding: 5px 0;
          width: 48%;
          display: inline-block;

          section {
            display: flex;
            margin: 5px 5px;

            div {
              display: inline-block;
            }

            .drugBox_divlift {
              width: 100px;
              height: 80px;
              display: inline-block;

              img {
                width: 100%;
              }
            }

            .drugBox_divRight {
              width: 140px;
              display: inline-block;
              position: relative;

              span {
                position: absolute;
                right: 10px;
                bottom: 5px;
              }

              span:hover {
                color: #3880de;
              }
            }
          }


        }

      }
    }

    .drugMangeList {
      ul {
        li {
          background-color: #45C7DB;
          /*border: 1px solid #cdcdcd;*/
          color: #fff;
          border-radius: 2px;
          display: inline-block;
          width: 240px;
          margin-left: 10px;
          font-size: 14px;
          line-height: 30px;
          text-align: center;
          margin-top: 10px;
          position: relative;
          overflow: hidden;
          height: 30px;

          span {
            position: absolute;
            right: 3px;
            top: -5px;
            color: #ccc;
          }

          span:hover {
            color: #999;
            cursor: pointer;
          }
        }
      }
    }
  }

  .shopingBox {
    border: 1px solid #ccc;
    padding: 10px 5px;
    border-radius: 10px;

    section {
      display: flex;

      div {
        display: inline-block;
      }

      .shopingBox_divLift {
        width: 100px;
        height: 80px;
        margin-right: 20px;

        img {
          width: 100%;
        }

      }
    }


  }
</style>
