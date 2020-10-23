<template>
  <div class="testStudyCompon">
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
    <div class="playBox" v-if="videoPlayBox">
      <!--      <div class="prism-player" id="player-con" >-->
      <!--        <el-button type="danger"  class="removeVideoBtn" style="padding:8px 15px;z-index: 9999 "-->
      <!--                   @click="removeVideoFun()">移除-->
      <!--        </el-button>-->
      <!--      </div>-->
      <div class="prism-player">
        <video :src="testvideoUrl" controls="controls" class="prism-player">
        </video>
        <el-button type="danger" class="removeVideoBtn" style="padding:8px 15px;z-index: 9999 "
                   @click="removeVideoFun()">移除
        </el-button>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        removeId:"",
        testvideoUrl: '',
        studyVideoId: '',//试学视频id
        fileName: '',
        testStudyUrl: '',//试学视频
        statusText: '',
        videoPlayBox: false,
        videoUUpload: true,
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
      }
    },
    props: ['messageTitleName', 'testVideoId'],
    methods: {
      init (id) {
        if (id) {
          this.videoPlayBox = true
          this.videoUUpload = false
          this.getVideoUrl(id)
          this.studyVideoId = id
        }
      },
      removeVideoFun () {
        var id = this.studyVideoId
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
            this.$emit('studyVideoId', '')
            this.authProgress = 0
            this.$message.error('视频移除成功，请再次添加视频')
            this.videoPlayBox = false
            // document.querySelector('.prism-player').style.display = 'none'
            // setTimeout(e => {
            //
            // }, 50)
            // setTimeout(e => {
            //   this.videoUUpload = true
            //   console.log(document.querySelector('.uploadStyle'), '是否隐藏')
            // }, 100)
            //   document.querySelector('upload').style.display = 'block'
            this.videoUUpload = true
          } else {
            this.$message.error(data.msg)
          }
        })
      },
      videoPlayFunction (url) {
        this.testvideoUrl = url
      },
      getVideoUrl (id) {//获取视频url进行播放
        this.testStudyUrl = id
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
      },
      videoUploadEnd () {
        this.videoPlayBox = true
        this.videoUUpload = false
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
            self.dianjiGetSig(self.fileName)
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
              console.log('onUploadStarted:' + uploadInfo.file.name + ', endpoint:' + uploadInfo.endpoint + ', bucket:' + uploadInfo.bucket + ', object:' + uploadInfo.object)
            } else {
              this.$message.error('系统错误，请重新上传（由于videoid存在）')
            }
          },
          // 文件上传成功
          onUploadSucceed: function (uploadInfo) {
            this.videoPlayBox = true
            console.log('onUploadSucceed: ' + uploadInfo.file.name + ', endpoint:' + uploadInfo.endpoint + ', bucket:' + uploadInfo.bucket + ', object:' + uploadInfo.object)
            self.statusText = '文件上传成功!'

            self.videoUploadEnd()
            setTimeout(() => {
              self.getVideoUrl(uploadInfo.videoId)
            }, 300)
            self.$emit('studyVideoId', uploadInfo.videoId)
            self.studyVideoId = uploadInfo.videoId
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
        if (this.messageTitleName) {
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
          // this.videoBeforeUpload(this.file)
        } else {
          this.$message.error('请先输入章节名')
        }
      },
      dianjiGetSig (fileName) {
        this.$http({
          url: this.$http.adornUrl('/study/getSig'),
          method: 'post',
          data: ({
            title: this.messageTitleName,
            fileName: fileName,
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
    }
  }
</script>

<style scoped lang="scss">
  .testStudyCompon {
    display: flex;
    height: 150px;

    .playBox {
      margin: 0px auto;
      text-align: center;
      border: 1px solid #999;
      height: 150px;

      video {
        height: 150px;
        margin: 0 auto;
      }

      .prism-player {
        position: relative;
        text-align: center;
        height: 150px;

        .removeVideoBtn {
          margin: 0 auto;
          display: none;
          position: absolute;
          top: 0;
          left: 35%;
        }
      }

      .prism-player:hover {
        .removeVideoBtn {
          display: inline-block;
        }
      }
    }
  }
</style>
