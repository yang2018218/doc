<template>
  <div class="capterBox">
    <section class="capterTitle">
      章节名称：
      <el-input
        placeholder="单行输入"
        v-model="dataOrigin.chapterName"
        style="width: 370px"
        clearable>
      </el-input>
    </section>
    <section class="uploadStyle" v-if="videoUUpload">
      <p> 上传传视频：</p>
      <div class="upload" v-if="videoUUpload">
        <div style="margin: 10px 0">
          <input type="file" id="fileUpload" @change="fileChange($event)" style="display: inline-block;">
        </div>
        <label class="status">上传状态： <span>{{statusText}}</span></label>
        <div class="upload-type" style="margin: 10px 0">
          <button @click="authUpload" :disabled="uploadDisabled">开始上传</button>
          <span class="progress" style="margin-left: 20px">上传进度：<i id="auth-progress" style="font-size: 18px;">{{authProgress}}</i> %</span>
        </div>
      </div>
    </section>

    <section v-if="videoPlayBox" class="videoPlayBoxstyle">
      <div class="prism-player">
        <el-button type="danger" v-if="videoPlayBox" class="removeVideoBtn" style="padding:6px 10px;z-index: 9999 "
                   @click="removeVideoFun()">移除
        </el-button>
        <video :src="videourl" controls="controls"></video>
      </div>
    </section>
    <section>
      视频排序：
      <el-input
        placeholder="请输入内容"
        v-model="dataOrigin.orderBy"
        clearable>
      </el-input>
      <span style="font-size: 14px">（备注：数字越大越靠前）</span>
    </section>
    <section>
      推荐主题：
      <el-input
        placeholder="单行输入"
        v-model="dataOrigin.theme"
        style="width: 370px"
        clearable>
      </el-input>
    </section>
    <section>
      <label>弹出时间1：
        <el-input
          onKeyUp="value=value.replace(/\D/g,'')"
          placeholder="请输入第一次秒数"
          v-model="drugPopupList[0]"
          clearable>
        </el-input>
      </label>
      <label>弹出时间2：
        <el-input
          onKeyUp="value=value.replace(/\D/g,'')"
          placeholder="请输入第二次秒数"
          v-model="drugPopupList[1]"
          clearable>
        </el-input>
      </label>
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
        <li v-for="(item,index ) in wordTable">{{item.productName}}：{{item.modelName}}
          <span style="display: inline-block" @click="removeIndex(index)">X</span>
        </li>
      </ul>
    </section>
    <section class="drugBox">
      <ul>
        <li v-for="(item,index) in DrugList">
          <section>
            <div class="drugBox_divlift">
              <img :src="/,/.test(item.mainImages)? item.mainImages.split(',')[0]:item.mainImages" alt="">
            </div>
            <div class="drugBox_divRight">
              <p style="">{{item.productName}}</p>
              <span @click="drugBtnEnsure(item)" class="drugConfirm">确定</span>
            </div>
          </section>
        </li>
      </ul>
    </section>
    <footer style="text-align: right" class="footerStyle" v-if="add">
      <el-button type="info" class="footerBtnSty" @click="returnAddBtn()">返回</el-button>
      <el-button type="primary" class="footerBtnSty" @click="addStudycurriculumchapter(studyIdMessageID)">确定</el-button>
    </footer>
    <footer style="text-align: right" class="footerStyle" v-if="BianJi">
      <el-button type="info" class="footerBtnSty" @click="returnBtn()">返回</el-button>
      <el-button type="primary" class="footerBtnSty" @click="addStudycurriculumchapterBianJi(studyIdMessageID)">确定
      </el-button>
    </footer>
    <el-dialog
      title="商品详情"
      :modal-append-to-body='falseMessage'
      :visible.sync="centerDialogVisibleDrug"
      width="400px"
      :modal="modalMessage"
      center>
      <div class="shopingBox" id="addDrugTan">
        <section>
          <div class="shopingBox_divLift"><img :src="/,/.test(ProductModel)? ProductModel.split(',')[0]:ProductModel"
                                               alt=""></div>
          <div style="text-align: start">
            <el-select v-model="modelNameValueId" clearable placeholder="请选择">
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
    <el-button type="primary" @click="getProductList()" style="padding: 5px 20px">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    data () {
      return {
        drugPopupList: [],
        videourl: '',
        videoUrlPlay: '',//视频播放网址
        chapterIdNum: '',//章节id
        modalMessage: false,//弹窗阴影
        falseMessage: false,//
        videoPlayBox: false,
        videoUUpload: true,
        add: true,
        BianJi: false,
        //3级弹窗
        modelNameValueId: '',//药品详情id
        centerDialogVisibleDrug: false,
        DrugShoping: '',
        particulars: [],
        ProductModel: '',//药品选中的图片
        dangQianProductName: {},
        videoPlay: true,
        fileName: '',
        dataOrigin: {
          theme: '',//推荐主题
          chapterName: '',//章节名
          fileId: '',//阿里返回的id（必传）
          mediaUrl: '',//视频播放地址
          coverUrl: '',//视频封面地址
          duration: '',//章节时长 保存秒为单位
          status: 1,//状态  0：禁用   1：正常
          theOpen: 1,//是否公开0否1是
          orderBy: '1',//排序
          wordTable: []
        },
        wordTable: [],
        //阿里云开始
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
        //阿里云结束
        DrugListType: [],//选中需要展示的药品
        DrugList: [],//
        DrugName: '',//药品名称
        recommendTitle: '',//推荐
        capterName: '',//章节名称
      }
    },
    props: {
      studyIdMessageID: String,
      required: true,
    },
    mounted () {
      this.dataOrigin = {
        theme: '',//推荐主题
        chapterName: '',//章节名
        fileId: '',//阿里返回的id（必传）
        mediaUrl: '',//视频播放地址
        coverUrl: '',//视频封面地址
        duration: '',//章节时长 保存秒为单位
        status: 1,//状态  0：禁用   1：正常
        theOpen: 1,//是否公开0否1是
        orderBy: '1',//排序
        wordTable: []
      }
    },
    methods: {
      removeVideoFun () {
        var id = this.dataOrigin.fileId
        this.$http({
          url: this.$http.adornUrl('/study/deleteVideo'),
          method: 'post',
          data: ({
            videoId: id
          })
        }).then(({
          data
        }) => {
          if (data && data.code === 0) {
            this.$message.error('视频移除成功，请再次添加视频')
            this.$http({
              url: this.$http.adornUrl('/study/studycurriculumchapter/updateById'),
              method: 'post',
              data: ({
                fileId: ' ',
                chapterId: this.chapterIdNum
              })
            }).then(({
              data
            }) => {
              if (data && data.code === 0) {

              } else {
                this.$message.error(data.msg)
              }
            })
            document.querySelector('.prism-player').style.display = 'none'
            setTimeout(e => {
              this.videoPlayBox = false
            }, 50)
            setTimeout(e => {
              this.videoUUpload = true
            }, 100)
          } else {
            this.$message.error(data.msg)
          }
        })
      },
      videoPlayFunction (url) {
        this.videourl = url
      },
      getVideoUrl (id) {//获取视频url进行播放
        this.dataOrigin.fileId = id
        if (id !=' ') {
          this.$http({
            url: this.$http.adornUrl('/study/getVideoUrl'),
            method: 'post',
            data: ({
              videoId: id
            })
          }).then(({
            data
          }) => {
            if (data && data.code === 0) {
              this.videoUrlPlay = JSON.parse(data.result).PlayInfoList.PlayInfo[0].PlayURL
              this.videoPlayFunction(this.videoUrlPlay)//调用视频播放
            } else {
              this.$message.error(data.msg)
            }
          })
        } else {
          this.videoPlayBox = false
          this.videoUUpload = true
        }

      },
      videoUploadEnd () {
        this.videoUUpload = false
        this.videoPlayBox = true
      },
      initBianJi (id) {
        this.drugPopupList = []
        this.authProgress = 0
        this.DrugName = ''
        this.dataOrigin = {
          theme: '',//推荐主题
          chapterName: '',//章节名
          fileId: '',//阿里返回的id（必传）
          mediaUrl: '',//视频播放地址
          coverUrl: '',//视频封面地址
          duration: '',//章节时长 保存秒为单位
          status: 1,//状态  0：禁用   1：正常
          theOpen: '',//是否公开0否1是
          orderBy: '1',//排序
          wordTable: []
        }
        this.wordTable = []
        this.videoUUpload = true
        this.videoPlayBox = false
        this.BianJi = false
        this.add = true
        if (id) {
          this.chapterIdNum = id
          this.BianJi = true
          this.add = false
          this.videoPlayBox = true
          this.videoUUpload = false
          this.$http({
            url: this.$http.adornUrl('/study/studycurriculumchapter/infoById'),
            method: 'get',
            params: {chapterId: id}
          }).then(({
            data
          }) => {
            if (data && data.code === 0) {
              this.dataOrigin = data.chapter
              this.dataOrigin.wordTable = data.product
              this.wordTable = data.product
              this.getVideoUrl(data.chapter.fileId)
              if (this.dataOrigin.drugPopupTime) {
                this.drugPopupList = this.dataOrigin.drugPopupTime.split(',')
              } else {
                this.drugPopupList = []
              }
            } else {
              this.$message.error(data.msg)
            }
          })
        }
      },
      returnAddBtn () {
        this.$emit('returnAddGuanbi', this.dataOrigin.studyId)
      },
      returnBtn () {
        // this.bianJiId = ''
        this.$emit('returnGuanbi', this.dataOrigin.studyId)
      },
      videoBeforeUpload (file) {
        const self = this
        const isSize = new Promise(function (resolve, reject) {
          let _URL = window.URL || window.webkitURL
          let url = URL.createObjectURL(file)
          let videoElement = document.createElement('video')
          // // 当指定的音频/视频的元数据已加载时，会发生 loadedmetadata 事件。 元数据包括：时长、尺寸（仅视频）以及文本轨道。
          videoElement.addEventListener('loadedmetadata', function (_event) {
            let width = videoElement.videoWidth
            let height = videoElement.videoHeight
            self.dataOrigin.duration = videoElement.duration * 1000
          })
          videoElement.src = _URL.createObjectURL(file)
        }).then(() => {
          return file
        }, () => {
          return Promise.reject()
        })
        return isSize
      },
      addStudycurriculumchapterBianJi (id) {//编辑

        this.dataOrigin.chapterId = this.chapterIdNum
        this.dataOrigin.studyId = id
        if (this.dataOrigin.wordTable.length > 0) {
          this.dataOrigin.wordTable.map(e => {
            e.chapterId = this.chapterIdNum
          })
        }
        if (this.drugPopupList.length > 1 && this.dataOrigin.theme && this.dataOrigin.chapterName && this.dataOrigin.fileId && this.dataOrigin.duration && this.dataOrigin.orderBy) {
          this.dataOrigin.drugPopupTime = this.drugPopupList.toString(',')
          this.$http({
            url: this.$http.adornUrl('/study/studycurriculumchapter/update'),
            method: 'post',
            data: this.dataOrigin
          }).then(({
            data
          }) => {
            if (data && data.code === 0) {
              this.videoPlayBox = false
              this.videoUUpload = true
              this.$emit('guanbi', this.dataOrigin.studyId)
              this.urlMessage = data.result
            } else {
            }
          })
        } else {
          this.$message.error('请仔细检查是否有为填入的信息')
        }
      },
      addStudycurriculumchapter (id) {//添加按钮

        this.dataOrigin.studyId = id
        this.dataOrigin.wordTable = this.wordTable
        if (this.drugPopupList.length > 1 && this.dataOrigin.theme && this.dataOrigin.chapterName && this.dataOrigin.fileId && this.dataOrigin.duration && this.dataOrigin.orderBy) {
          this.dataOrigin.drugPopupTime = this.drugPopupList.toString(',')
          this.$http({
            url: this.$http.adornUrl('/study/studycurriculumchapter/save'),
            method: 'post',
            data: this.dataOrigin
          }).then(({
            data
          }) => {
            if (data && data.code === 0) {
              document.querySelector('.prism-player').style.display = 'none'
              setTimeout(e => {
                this.videoPlayBox = false
              }, 50)
              setTimeout(e => {
                this.videoUUpload = true
              }, 100)
              this.$emit('guanbiAdd', this.dataOrigin.studyId)
              this.urlMessage = data.result
            } else {
            }
          })
        } else {
          this.$message.error('请仔细检查是否有为填入的信息')
        }
      },
      authUpload () {
        // 然后调用 startUpload 方法, 开始上传
        if (this.uploader !== null) {
          this.uploader.startUpload()
          this.uploadDisabled = true
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
            self.statusText = '添加文件成功,请上传...'
            self.fileName = uploadInfo.file.name
            self.dianjiGetSig()

          },
          // 开始上传
          onUploadstarted: function (uploadInfo) {
            if (!uploadInfo.videoId) {
              var data = self.urlMessage
              var a = JSON.parse(data)
              let uploadAuth = a.UploadAuth
              let uploadAddress = a.UploadAddress
              let videoId = a.VideoId
              uploader.setUploadAuthAndAddress(uploadInfo, uploadAuth, uploadAddress, videoId)
              // })
              self.statusText = '文件开始上传...'
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
            this.videoPlay = true
            console.log('onUploadSucceed: ' + uploadInfo.file.name + ', endpoint:' + uploadInfo.endpoint + ', bucket:' + uploadInfo.bucket + ', object:' + uploadInfo.object)
            self.statusText = '文件上传成功!'
            self.dataOrigin.fileId = uploadInfo.videoId
            self.videoUploadEnd()
            self.getVideoUrl(uploadInfo.videoId)
          },
          // 文件上传失败
          onUploadFailed: function (uploadInfo, code, message) {
            console.log('onUploadFailed: file:' + uploadInfo.file.name + ',code:' + code + ', message:' + message)
            self.statusText = '文件上传失败!'
            this.$message.error('文件上传失败！')
          },
          // 文件上传进度，单位：字节, 可以在这个函数中拿到上传进度并显示在页面上
          onUploadProgress: function (uploadInfo, totalSize, progress) {
            console.log('onUploadProgress:file:' + uploadInfo.file.name + ', fileSize:' + totalSize + ', percent:' + Math.ceil(progress * 100) + '%')
            let progressPercent = Math.ceil(progress * 100)
            self.authProgress = progressPercent
            self.statusText = '文件上传中...'
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
        if (this.dataOrigin.chapterName) {

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
          this.videoBeforeUpload(this.file)
          this.uploadDisabled = false
          this.pauseDisabled = true
          this.resumeDisabled = true
        } else {
          this.$message.error('请先输入章节名')
        }

      },
      returnPath () {
        this.$router.push({path: 'course-mianfei'})
      },
      removeIndex (index) {
        this.wordTable.splice(index, 1)
      },
      getProductList () {
        if (this.modelNameValueId) {
          if (this.wordTable.length < 3) {
            this.centerDialogVisibleDrug = false
            this.dangQianProductName.modelId = this.modelNameValueId
            this.particulars.forEach((e) => {
              if (e.modelId == this.modelNameValueId) {
                this.dangQianProductName.modelName = e.modelName
              }
            })
            this.wordTable.push(this.dangQianProductName)

          } else {
            this.$message.error('温馨提示：课程推荐药品最多只能有3种', {duration: '100'})
          }
        } else {
          this.$message.error('温馨提示：请您选择规格')
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
            title: this.dataOrigin.chapterName,
            fileName: this.fileName,
            coverUrl: ''
          })
        }).then(({
          data
        }) => {
          if (data && data.code === 0) {
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
              this.DrugList = data.list

            } else {
              this.$message.error(`错误提示：${data.msg}`)
            }
          })
        } else {
          this.DrugList = []
          return this.$message.error('请输入药品名称')
        }
      },
    }
  }
</script>
<style scoped lang="scss">
  .capterBox {
    font-size: 16px;

    section {
      margin-top: 24px;
    }

    .uploadStyle {

    }

    .videoPlayBoxstyle {
      margin: 25px auto;
      text-align: center;
      width: 300px;
      height: 150px;

      .prism-player {
        position: relative;
        height: 100%;

        video {
          height: 150px;
        }

        .removeVideoBtn {
          position: absolute;
          top: 0;
          left: 40%;
          display: none;
        }
      }

      .prism-player:hover {
        .removeVideoBtn {
          display: inline-block;
        }
      }

      .removeVideoBtn {
        margin: 0 auto;
        display: block;
      }

      .prism-player:hover {
        .removeVideoBtn {
          display: block;
        }
      }
    }

    .footerStyle {
      margin-top: 23px;

      .footerBtnSty {
        padding: 8px 20px;
      }
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
                /*right: 10px;*/
                bottom: 5px;
              }

              span:hover {
                color: #3880de;
                cursor: pointer;
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

  section {
    /*display: flex;*/

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

</style>
