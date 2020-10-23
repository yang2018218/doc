<template>
  <el-dialog
    title="系统通知设置"
    :close-on-click-modal="false"
    :visible.sync="visible"
    width="640px" center>
    <div class="content">
      <section class="content_first">
        <footer class="firstFooter">
          推送类型：
          <el-select v-model="noticeType" clearable placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.dictName"
              :value="item.dataId">
            </el-option>
          </el-select>
        </footer>
        <footer class="secondFooter">
          相关ID：<input type="text" v-model="relevancyId" id="relevancynumber" @change="relevancyChange"/>
        </footer>
      </section>
      <section>
        推送标题：<input type="text" class="lianjiestyle" placeholder="不超过13个字" maxlength="13" v-model="noticeTitle"/>
      </section>
      <section>
        相关链接：<input type="text" class="lianjiestyle" id="relevancyPa" v-model="relevancyPath" @change="pathChange"/>
      </section>

    </div>
    <div class="content_box">

      <div class="TimeIng">
        <label>
          开始时间：
          <el-date-picker
            v-model="startTime"
            type="datetime"
            format="yyyy-MM-dd HH:mm:ss"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择日期时间"
            default-time="12:00:00">
          </el-date-picker>
        </label>
        <label>
          结束时间：
          <el-date-picker
            width="208px"
            v-model="endTime"
            type="datetime"
            format="yyyy-MM-dd HH:mm:ss"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择日期时间"
            default-time="12:00:00">
          </el-date-picker>
        </label>
      </div>
      <div class="imgBox">
        <header>
          <el-upload
            name="fileUpload"
            ref="uploadClear"
            :on-success="handsuccess"
            :action="this.$http.adornUrl('/sys/oss/uploadAll')"
            :data="folderNameTer"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove" center>
            <i class="el-icon-plus"></i>
          </el-upload>
        </header>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  export default {
    data () {
      return {
        relevancyId: '',
        relevancyPath: '',
        folderNameTer: {
          folderName: 'ycylbackGround'
        },
        dialogImageUrl: '',
        dialogVisible: false,
        endTime: '',//   结束时间
        noticeUrl: '',//链接
        noticeContent: '',//内容
        startTime: null,//开始时间
        relatedId: '',//相关ID
        noticeTitle: '',//通知标题
        noticeType: '',//通知模块
        options: [],
        visible: false,
      }
    },
    methods: {
      pathChange () {
        if (this.relevancyPath) {
          document.querySelector('#relevancynumber').disabled = 'false'
        } else {
          document.querySelector('#relevancynumber').disabled = ''
        }
      },
      relevancyChange () {//
        if (this.relevancyId) {
          document.querySelector('#relevancyPa').disabled = 'false'
        } else {
          document.querySelector('#relevancyPa').disabled = ''
        }
      },
      handsuccess (file) {
        this.noticeUrl = file.paths[0]
      },
      handleRemove (file, fileList) {
      },
      handlePictureCardPreview (file) {
        this.dialogImageUrl = file.url
        this.dialogVisible = true
      },
      init () {
        this.visible = true
        this.selectModule()

        if (document.querySelector('#relevancynumber')) {
          document.querySelector('#relevancynumber').disabled = ''
        }
        if (document.querySelector('#relevancyPa')) {
          document.querySelector('#relevancyPa').disabled = ''
        }
      },
      selectModule () {
        this.$http({
          url: this.$http.adornUrl('/ycyl/ycyldictdata/list'),
          method: 'post',
          data: {
            'page': this.pageIndex,
            'pageSize': '30',
            'dictValue': 'tongzhi'
          }
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.options = data.page.list
          } else {
            this.message.error(data.msg)
          }
          this.dataListLoading = false
        })
      },
      // 表单提交
      dataFormSubmit () {
        if (this.relevancyId) {
          this.relatedId = this.relevancyId
        } else {
          this.relatedId = this.relevancyPath
        }
        this.$http({
          url: this.$http.adornUrl('/ycyl/ycylnotice/userSave'),
          method: 'post',
          data: {
            endTime: this.endTime,
            noticeTitle: this.noticeTitle,
            noticeType: this.noticeType,
            relatedId: this.relatedId,
            startTime: this.startTime,
            noticeContent: this.noticeContent,
            noticeUrl: this.noticeUrl
          }
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.$message({
              message: '操作成功',
              type: 'success',
              duration: 1500,
              onClose: () => {
                this.relevancyPath = ''
                this.relevancyId = ''
                this.endTime = ''
                this.relatedId = ''
                this.noticeUrl = ''
                this.noticeContent = ''
                this.startTime = ''
                this.noticeTitle = ''
                this.noticeType = ''
                this.visible = false
                this.$emit('refreshDataList')
                if (this.$refs.uploadClear) {
                  this.$refs.uploadClear.clearFiles()
                }
              }
            })
          } else {
            this.$message.error(msg)
          }
          this.dataListLoading = false
        })
      }
    }
  }
</script>
<style scoped lang="scss">
  .el-date-editor.el-input, .el-date-editor.el-input__inner {
    width: 208px !important;
  }

  .content {
    font-size: 16px;

    .content_first {
      display: flex;

      footer {
        display: inline-block !important;

      }

      .firstFooter {
        /*background-color: #ff0000;*/
        width: 250px;
      }

      .secondFooter {
        /*background-color: #00a0e9;*/
        width: 350px;

        input {
          width: 277px;
          height: 30px;
          border: 1px solid rgba(221, 221, 221, 1);
          border-radius: 6px;
        }
      }


    }

    section {
      margin-top: 15px;

      .lianjiestyle {
        width: 508px;
        height: 30px;
        border: 1px solid rgba(221, 221, 221, 1);
        border-radius: 6px;
      }
    }
  }

  .content_box {
    p {
      width: 100%;
      text-align: center;
      display: inline-block;
      line-height: 54px;
      font-size: 20px;
      font-family: Source Han Sans CN;
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
    }

    section {
      display: inline-block;
      width: 587px;

      .tuiSongInput {
        display: inline-block;
        width: 574px;
        height: 100px;
      }
    }

    .radioBox {
      font-size: 16px;
      margin-top: 15px;
    }

    .TimeIng {
      font-size: 16px;
      padding: 15px 0;
      text-align: center;

    }

    .imgBox {
      width: 590px;

      header {
        margin: 0 auto;
        width: 148px;
        height: 148px;
        overflow: hidden;
      }
    }
  }
</style>
