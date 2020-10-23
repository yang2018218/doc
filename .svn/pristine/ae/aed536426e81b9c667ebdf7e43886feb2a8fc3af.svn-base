<template>
  <!--  添加课程-->
  <div id="addMianfei">
    <div class="content">
      <h2 class="title">新增/编辑免费课程</h2>
      <el-form :inline="true">
        <el-form-item label="课程名称：" style="width:440px">
          <el-input
            style="width:332px"
            placeholder="请输入名字"
            v-model="course.courseName"
            class="inputStyle"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="老师类型：">
          <el-select
            v-model="course.userType"
            clearable
            placeholder="请选择"
            @change="teacherClassChange()"
          >
            <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="主讲老师：">
          <el-select v-model="course.userId" clearable placeholder="请选择">
            <el-option
              v-for="(item,index) in trueNameList"
              :key="index"
              :label="item.truename"
              :value="item.userId"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <el-form :inline="true">
        <el-form-item label="课程类型：">
          <el-checkbox-group v-model="course.fitKind" size="mini" @change="animalTypeMesage()">
            <el-checkbox-button
              v-for="item in checkboxGroup2"
              :label="item.dictId"
              :key="item.dataId"
              class="animalTypeStyle"
            >{{item.name}}
            </el-checkbox-button>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <div class="courseImgBox">
        <section class="sectionLeft">
          课程封面：
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
              :on-remove="handleRemove"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
          </div>
        </section>
        <section class="sectionRight">
          宣传视频（小于20MB）
          <br/>（非必传）
          <div>
            <div class="video" v-if="course.videoUrl">
              <video :src="course.videoUrl" height="85%" width="100%" controls></video>
              <div style="text-align:center;cursor:pointer;" @click="course.videoUrl=''">重新上传</div>
            </div>
            <el-upload
              v-else
              :action="this.$http.adornUrl('/sys/oss/uploadAll')"
              :on-success="handleSuccessVideo"
              :data="folderNameTer"
              list-type="picture-card"
              name="fileUpload"
              accept=".mp4"
              :before-upload="beforeFile"
              :on-preview="handlePictureCardPreviewVideo"
              :on-remove="handleRemoveVideo"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
          </div>
        </section>
      </div>
      <section class="ClassListStyle"></section>

      <footer class="footerSty">
        <div>
          <UEditor :config="config" ref="ueditor"></UEditor>
        </div>
      </footer>
      <div class="btnStyle">
        <el-button type="success" @click="preserveMessage">保存</el-button>
        <el-button type="info" @click="returnPath()">返回</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import UEditor from '@/components/ueditor/ueditor.vue'

  export default {
    created () {
      this.getDoctorName()
      this.getExpertName()
      this.getAnimaltype()
    },
    watch: {
      $route: {
        handler (route) {
          if (!this.$route.query.id && this.course.userType) {
            this.course = {
              userType: '', //医生或者专家的身份
              courseName: '', //课程名称
              fitKind: [], //动物种类
              coverImgUrl: '', //视频封面
              videoUrl: '', //视频地址
              memberTheFree: '', //会员是否免费
              price: '', //课程价格
              userId: '' //选中的医生或者老师id
            }
            this.fileList = []
            var ue = UE.getEditor('editor')
            ue.ready(function () {
              ue.setContent('请输入内容', false)
            })
          }
        },
        deep: true
      }
    },
    data () {
      return {
        course: {
          userType: '', //医生或者专家的身份
          courseName: '', //课程名称
          fitKind: [], //动物种类
          coverImgUrl: '', //视频封面
          videoUrl: '', //视频地址
          // coverImgUrl: "", //课程封面
          memberTheFree: '', //会员是否免费
          price: '', //课程价格
          userId: '' //选中的医生或者老师id
        },
        urlMessage: '', //请求地址
        html:
          '<html lang="en">' +
          '<head>' +
          '    <meta charset="UTF-8">' +
          '    <meta name="viewport"' +
          '          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">' +
          '    <meta http-equiv="X-UA-Compatible" content="ie=edge">' +
          '    <title>Document</title>' +
          '</head>' +
          '<body>',
        htmlBottom: '</body>' + '</html>',

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
        DrugListType: [], //选中需要展示的药品
        DrugList: [], //
        DrugName: '', //药品名称
        recommendTitle: '', //推荐
        capterName: '', //章节名称
        centerDialogVisible: false, //弹窗
        dialogImageUrl: '',
        dialogVisible: false,
        animalNameType: [],
        checkboxGroup2: [], //动物种类
        trueNameList: [],
        value: '',
        input: '',
        expertName: [],
        doctorName: [],
        options: [
          {
            name: '医生',
            id: '5'
          },
          {
            name: '专家',
            id: '6'
          }
        ]
      }
    },
    components: {
      UEditor
    },
    activated () {
      this.getDatas()
    },
    methods: {
      getDatas () {
        setTimeout(() => {
          if (this.$route.query.id) {
            this.$http({
              url: this.$http.adornUrl('/study/studycurriculum/infoById'),
              method: 'get',
              params: this.$http.adornParams({
                studyId: this.$route.query.id
              })
            }).then(({data}) => {
              if (data && data.code === 0) {
                data.studyCurriculum.memberTheFree = data.studyCurriculum.memberTheFree
                data.studyCurriculum.userType = data.studyCurriculum.userType.toString()
                data.studyCurriculum.fitKind = data.studyCurriculum.fitKind.split(',')
                this.course = data.studyCurriculum
                if (data.studyCurriculum.content) {
                  var conretWile = data.studyCurriculum.content
                    .split('<body>')[1]
                    .split('</body>')[0]
                  setTimeout(i => {
                    var ue = UE.getEditor('editor')
                    ue.ready(function () {
                      ue.setContent(conretWile, false)
                    })
                  }, 50)
                }
                // this.$refs.ueditor.getUEContent()=data.studyCurriculum.content;
                this.fileList.push({url: data.studyCurriculum.coverImgUrl})
                if (this.course.userType == '5') {
                  this.trueNameList = this.doctorName
                } else if (this.course.userType == '6') {
                  this.trueNameList = this.expertName
                }
              } else {
                this.$message.error(data.msg)
              }
            })
          }
        }, 200)
      },
      preserveMessage () {
        //保存
        this.content = this.$refs.ueditor.getUEContent()
        var truename
        this.trueNameList.forEach(e => {
          if (e.userId == this.course.userId) {
            truename = e.truename
          }
        })
        if (
          this.course.courseName &&
          this.course.userType &&
          this.course.userId &&
          this.course.fitKind.length>0 &&
          this.course.coverImgUrl &&
          this.content
        ) {
          this.$http({
            url: this.$http.adornUrl(
              `/study/studycurriculum/${!this.$route.query.id ? 'saveStudy' : 'update'}`
            ),
            method: 'post',
            data: {
              studyId: this.$route.query.id,
              courseName: this.course.courseName,
              userId: this.course.userId,
              truename: truename,
              userType: this.course.userType,
              memberTheFree: this.course.memberTheFree,
              price: this.course.price,
              fitKind: this.course.fitKind.join(','),
              coverImgUrl: this.course.coverImgUrl,
              videoUrl: this.course.videoUrl,
              content: this.html + this.content + this.htmlBottom,
              theFree: '1'
            }
          }).then(({data}) => {
            if (data && data.code === 0) {
              (this.course = {
                userType: '', //医生或者专家的身份
                courseName: '', //课程名称
                fitKind: [], //动物种类
                coverImgUrl: '', //视频封面
                videoUrl: '', //视频地址
                memberTheFree: '', //会员是否免费
                price: '', //课程价格
                userId: '' //选中的医生或者老师id
              }),
                (this.fileList = []),
                this.$message.success('添加新课程成功')
              this.$router.push({path: 'course-mianfei'})
            } else {
              this.$message.error('请联系管理员或稍后重试')
            }
          })
        } else {
          this.$message.error('请确认是否有未传入的参数')
        }
      },
      returnPath () {
        this.$message.info('返回成功')
        this.$router.push({path: 'course-mianfei'})
      },
      removeIndex (index) {
        this.DrugListType.splice(index, 1)
      },
      getProductList () {
        if (this.DrugListType.length < 3) {
          this.centerDialogVisibleDrug = false
          this.dangQianProductName.modelId = this.modelNameValueId
          this.particulars.forEach(e => {
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
        }).then(({data}) => {
          if (data && data.code === 0) {
            data.ycylProductModel.map(e => {
              if (e.theSmall && e.theSmall == '1') {
                data.ycylProductModel.splice(
                  data.ycylProductModel.findIndex(v => v.theSmall == '1'),
                  1
                )
              }
            })
            this.particulars = data.ycylProductModel
          } else {
            this.$message.error(data.msg)
          }
        })
      },
      addChapter () {
        this.centerDialogVisible = true
      },
      handleSuccessVideo (file) {
        this.course.videoUrl = file.paths[0]
      },
      handleRemoveVideo (file, fileList) {
      },
      handlePictureCardPreviewVideo (file) {
        this.dialogImageUrl = file.url
        this.dialogVisible = true
      },
      beforeFile (file) {
        const self = this
        const isSize = new Promise(function (resolve, reject) {
          let _URL = window.URL || window.webkitURL
          let url = URL.createObjectURL(file)
          let videoElement = document.createElement('video')
          // // 当指定的音频/视频的元数据已加载时，会发生 loadedmetadata 事件。 元数据包括：时长、尺寸（仅视频）以及文本轨道。
          videoElement.addEventListener('loadedmetadata', function (_event) {
            let width = videoElement.videoWidth
            let height = videoElement.videoHeight
            console.log(Math.ceil(file.size / 1024 / 1024))
            var valid = true
            if (Math.ceil(file.size / 1024 / 1024) < 20) {
              valid = true
            } else {
              valid = false
              self.$message.error('错误提示：请上传小于20Mb的视频')
              self.handleRemoveVideo(file)

              return
            }
            valid ? resolve() : reject()
          })
          videoElement.src = _URL.createObjectURL(file)
        }).then(() => {
          return file
        }, () => {
          return Promise.reject()
        })
        return isSize
      },
      handleSuccess (file) {
        this.course.coverImgUrl = file.paths[0]
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
          url: this.$http.adornUrl('/study/studyanimaldict/list'),
          method: 'post',
          data: {
            page: '1',
            pageSize: '30',
            dictValue: 'animal_type'
          }
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.checkboxGroup2 = data.list
          } else {
            this.$message.error('暂未获取到动物种类，请联系管理员或稍后重试')
          }
        })
      },
      getDoctorName () {
        this.$http({
          url: this.$http.adornUrl('/ycyl/ycyluserdoctor/getAllDoctor'),
          method: 'post',
          data: {
            page: 1,
            pageSize: '100',
            doctorStatus: '1'
          }
        }).then(({data}) => {
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
          data: {
            page: 1,
            pageSize: '100',
            doctorStatus: '1'
          }
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.expertName = data.exp
          } else {
            this.$message.error('获取专家信息错误，请稍后重试或联系管理员')
          }
        })
      },
      teacherClassChange () {
        this.course.userId = '' //将医生的选中框置空
        if (this.course.userType == '5') {
          this.trueNameList = this.doctorName
        } else if (this.course.userType == '6') {
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
      width: 940px;
      //   border: 1px solid #eee;
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
        height: 554px;
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
          background-color: #45c7db;
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





