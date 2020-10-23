<template>
  <el-dialog
    title="推送通知设置"
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
          相关ID：<input type="text" v-model="relevancyId" id="pathList" @change="correlation()"/>
        </footer>
      </section>

      <section>
        推送标题：<input type="text" class="lianjiestyle" placeholder="不超过13个字" maxlength="13" v-model="noticeTitle"/>
      </section>
      <section>
        相关链接：<input type="text" class="lianjiestyle" id="lianjie" v-model="relevancyPath" @change="pathMessage"/>
      </section>
    </div>
    <div class="content_box">
      <p>推送内容</p>
      <section>
        <el-input
          type="textarea"
          :autosize="{ minRows: 4, maxRows: 4}"
          placeholder="不超过57个字"
          v-model="noticeContent" maxlength="57">
        </el-input>
      </section>
      <div class="radioBox">
        立即推送：
        <el-radio-group v-model="radio" @change="bTnTime">
          <el-radio :label="3">是</el-radio>
          <el-radio :label="6">否</el-radio>
        </el-radio-group>
      </div>
      <div class="TimeIng" v-if="showTime">
        <el-date-picker
          v-model="startTime"
          type="datetime"
          format="yyyy-MM-dd HH:mm:ss"
          value-format="yyyy-MM-dd HH:mm:ss"
          placeholder="选择日期时间"
          default-time="12:00:00">
        </el-date-picker>
        <el-button style="padding: 8px 20px;background-color: #0BB2D4;color: #fff" v-if="DTime" @click="TimePass">定时推送
        </el-button>
        <el-button style="padding: 8px 20px;background-color: #d9d9d9;color: #666" v-if="NTime">已定时</el-button>
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
        relevancyPath: '',
        relevancyId: '',
        showTime: false,
        noticeContent: '',//内容
        startTime: null,//开始时间
        relatedId: '',//相关ID
        noticeTitle: '',//通知标题
        noticeType: '',//通知模块
        DTime: true,//已定时
        NTime: false,//开始定时
        btnTime: false,
        radio: '1',
        options: [],
        visible: false,
        dataForm: {
          id: 0,
          paramKey: '',
          paramValue: '',
          status: '',
          remark: '',
        },
      }
    },
    methods: {
      pathMessage () {
        if (this.relevancyPath) {
          document.querySelector('#pathList').disabled = 'false'
        } else {
          document.querySelector('#pathList').disabled = ''
        }
      },
      correlation () {//相关id
        if (this.relevancyId) {
          document.querySelector('#lianjie').disabled = 'false'
        } else {
          document.querySelector('#lianjie').disabled = ''
        }
      },
      TimePass () {
        this.DTime = false
        this.NTime = true
      },
      bTnTime () {
        if (this.radio == 6) {
          this.showTime = true
        } else {
          this.showTime = false
          this.DTime = true
          this.NTime =false
        }
      },
      init () {
        this.visible = true
        this.selectModule()
        if (document.querySelector('#pathList')) {
          document.querySelector('#pathList').disabled = ''
        }
        if (document.querySelector('#lianjie')) {
          document.querySelector('#lianjie').disabled = ''
        }

      },
      selectModule () {
        this.$http({
          url: this.$http.adornUrl('/ycyl/ycyldictdata/list'),
          method: 'post',
          data: {
            'page': this.pageIndex,
            'pageSize': '30',
            'key': this.dataForm.key,
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
          url: this.$http.adornUrl('/ycyl/ycylnotice/userSavePush'),
          method: 'post',
          data: {

            noticeTitle: this.noticeTitle,
            noticeType: this.noticeType,
            relatedId: this.relatedId,
            startTime: this.startTime,
            noticeContent: this.noticeContent,
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
                this.relatedId = ''
                this.noticeContent = ''
                this.startTime = ''
                this.noticeTitle = ''
                this.noticeType = ''
                this.visible = false
                this.$emit('refreshDataList')
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
          width: 254px;
          height: 30px;
          border: 1px solid rgba(221, 221, 221, 1);
          border-radius: 6px;
        }
      }


    }

    section {
      margin-top: 15px;

      .lianjiestyle {
        width: 485px;
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
      padding: 15px 0;
      text-align: center;
      background: rgba(241, 241, 241, 1);

    }
  }
</style>
