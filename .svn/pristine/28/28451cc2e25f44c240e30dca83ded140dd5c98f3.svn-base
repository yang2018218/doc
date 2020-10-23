<template>
  <div class="popContent">
    <el-dialog :visible.sync="visible"
               :title="!dataForm.id ? '新增发放' : '查看详情'"
               center width="1056px"
               class="core">
      <div class="content">
        <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()"
                 label-width="110px">
          <div style="display: flex">
            <el-form-item label="发放主题" prop="theme">
              <el-input v-model="dataForm.theme" placeholder="发放主题" :disabled="isdisabled"></el-input>
            </el-form-item>
            <el-form-item label="是否永久领取" prop="region">
              <el-select v-model="dataForm.isPerpetual" placeholder="选择方式" @change="selectChange()"
                         :disabled="isdisabled">
                <el-option label="是" value="1"></el-option>
                <el-option label="否" value="0"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="活动时间" required v-if="activity">
              <el-col :span="11">
                <el-form-item prop="date1">
                  <el-date-picker type="datetimerange" placeholder="选择日期" v-model="date1"
                                  :disabled="isdisabled"
                                  value-format="yyyy-MM-dd HH:mm:ss"
                                  style="width: 380px;"></el-date-picker>
                </el-form-item>
              </el-col>
            </el-form-item>
          </div>
          <div id="lingquan" class="box" style="margin:10px 0;">
            <label style="display: flex">
              可领取用户：
              <el-checkbox-group v-model="obj">
                <el-checkbox-button :label="item.name" name="type" v-for="item in getObject" :key="item.label"
                                    style=""></el-checkbox-button>
              </el-checkbox-group>
            </label>
          </div>
          <div class="box">
            <label>选择优惠券：
              <el-select v-model="dataForm.quan" placeholder="选择优惠券" @change="ticketClick(dataForm.quan)">
                <el-option :label="item.voucherName" :value="item.voucherId" v-for="(item,index) in ticketList"
                           :key="index"
                           @click="dianji(index)"></el-option>
              </el-select>
            </label>
          </div>
          <div>
            <ul>
              <li v-for="(item,index) in selectTicket" :key="index">
                <p class="title"><span>代金券{{index+1}}</span> <span
                  style="margin-left: 20px">ID：{{item.voucherId}}</span></p>
                <p><span class="quanSpan1">名称：{{item.voucherName}}</span>
                  <span class="quanSpan2">会员金额：{{item.memberMinimum}}~{{item.memberMaximum}}</span><span
                    class="quanSpan3">非会员金额：{{item.commonMinimum}}~{{item.commonMaximum}}</span>
                  <span class="quanSpan4">使用张数：{{item.useSheets||'0'}}</span>
                  <el-button type="text" size="small" @click="details(item)"
                             class="TicketOperation">查看详情
                  </el-button>
                  <el-button type="text" size="small" @click="removeTicket(index)"
                             class="TicketOperation">删除
                  </el-button>
                  <el-popconfirm
                    @onConfirm="stopMessage(item.detailId,item.status,index)"
                    v-if="isAuth('ycyl:voucherissueddetail:shutDown')"
                    title="您确定要中止该代金券吗？"
                  >
                    <el-button slot="reference" type="text" v-if="item.status==0||item.status==1">{{
                      item.status!==1?'已中止':'已中止'}}
                    </el-button>
                  </el-popconfirm>
                </p>
              </li>
            </ul>
          </div>
        </el-form>
      </div>
      <!--    代金券-->
      <el-dialog
        width="550px"
        title="代金券详情"
        :visible.sync="ticketVisible"
        append-to-body center style="font-size: 24px">
        <ticket-details :itemList="itemList"></ticket-details>
        <div slot="footer" class="dialog-footer">
          <el-button @click="ticketVisible = false" class="btnClassSty">返回</el-button>
        </div>
      </el-dialog>
      <!--    代金券时间-->
      <el-dialog
        width="654px"
        title=""
        :visible.sync="innerVisible"
        append-to-body>
        <div>
          <el-row>
            <el-col :span="8">
              <div class="grid-content ">{{nowSelectTicket.voucherName}}</div>
            </el-col>
            <el-col :span="16">
              <div class="grid-content">{{nowSelectTicket.voucherId}}</div>
            </el-col>
          </el-row>
        </div>
        <div class="popup_time">
          <div>
            <el-select v-model="nowSelectTicket.useType" placeholder="有效期设置" @change="popup_timeChangge">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-date-picker
              value-format="yyyy-MM-dd HH:mm:ss"
              v-if="startStopTime"
              v-model="TimeList"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期" class="popup_timePicker">
            </el-date-picker>
            <el-input v-model="nowSelectTicket.useDays" placeholder="请输入天数" v-if="numberDay"
                      class="popup_timePicker"></el-input>
          </div>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="innerVisible = false" class="btnClassSty">取 消</el-button>
          <el-button type="primary" @click="addPopupTime" class="btnClassSty">确 定</el-button>
        </div>
      </el-dialog>
      <div slot="footer" class="dialog-footer">
        <el-button @click="visible = false" class="btnClassSty">取 消</el-button>
        <el-button type="primary" @click="dataFormSubmit" class="btnClassSty" v-if="!dataForm.id">保存</el-button>
        <el-button type="primary" @click="dataFormSubmit" v-if="isAuth('ycyl:voucherissued:editor')&&dataForm.id"
                   class="btnClassSty">保存修改
        </el-button>
      </div>
    </el-dialog>
  </div>

</template>
<script>
  import log from '../../views/modules/sys/log'
  import ticketDetails from './ticketDetails'

  export default {
    data () {
      return {
        isdisabled: false,
        activity: true,
        itemList: '',//详情数据
        ticketVisible: false,//详情
        numberDay: false,//输入天数布尔值
        startStopTime: true,//起止天数布尔值
        TimeList: [],//起止时间
        options: [{
          value: '1',
          label: '按起止日期'
        }, {
          value: '2',
          label: '按领取起天数'
        }],
        nowSelectTicket: {'status': 1},//弹出修改时间
        innerVisible: false,//内层打开
        selectTicket: [],//选中优惠券数组
        ticketList: [],//优惠券名字
        getObject: [],//领取对象数组
        visible: false,
        dataForm: {
          quan: [],
          theme: '',//主题
          isPerpetual: '',//是否永久可领
        },
        obj: [],//选中领取对象
        date1: [],//时间
        dataRule: {
          theme: [
            {required: true, message: '发放主题不可以为空', trigger: 'blur'}
          ],
          next: [
            {required: true, message: '方式不可以为空', trigger: 'blur'}
          ],
        }
      }
    },
    components: {
      ticketDetails
    },
    methods: {
      stopMessage (id, status, index) {
        console.log(status, 'status')
        if (!status) {
          return this.$message.error('中止只可以中止活动开启的代金券')
        }
        //  中止
        if (status == 1) {
          this.$http({
            url: this.$http.adornUrl('/voucherissueddetail/shutDown '),
            method: 'post',
            data: {
              detailId: id,
              status: '0'
            }
          }).then(({data}) => {
            if (data && data.code === 0) {
              this.$message({message: '中止成功', duration: 2000, type: 'success'})
              this.$set(this.selectTicket[index], 'status', '0')
            } else {
              this.$message({message: `错误提示：${data.msg}`})
            }
          })
        } else {
          this.$message({message: '温馨提示：已经终止过了', type: 'info', duration: 2000})
        }
      },
      selectChange () {
        //  是否永久可领
        if (this.dataForm.isPerpetual == 1) {
          this.activity = false
        } else {
          this.activity = true
        }
      },
      removeTicket (index) {
        if (this.dataForm.status !== 1) {
          if (this.selectTicket.length > 1) {
            this.selectTicket.splice(index, 1)
          } else {
            this.$message({message: '温馨提示：请至少保存一个', duration: 2000, type: 'info'})
          }
        } else {
          this.$message({message: '温馨提示：开启状态下的无法代金券无法删除', type: 'info', duration: 2000})
        }
      },
      details (item) {//详情
        this.ticketVisible = true
        this.itemList = item
      },
      addPopupTime () {//添加时间
        console.log(this.nowSelectTicket.useType, '123')
        if (this.nowSelectTicket.useType == 1) {
          if (this.TimeList && this.TimeList.length > 0) {
            this.nowSelectTicket.beginTime = this.TimeList[0]
            this.nowSelectTicket.endTime = this.TimeList[1]
            this.selectTicket.push(this.nowSelectTicket)
            this.TimeList = []
            this.innerVisible = false
          } else {
            this.$message.error('请输入时间')
            return
          }
        } else if (this.nowSelectTicket.useType == 2) {
          if (this.nowSelectTicket.useDays) {
            this.selectTicket.push(this.nowSelectTicket)
            this.innerVisible = false
          }else {
            this.$message.error('请输入时间')
            return
          }
        }
        // if (this.TimeList && this.TimeList.length > 0 || this.nowSelectTicket.useDays) {
        //   if (this.TimeList) {
        //     this.nowSelectTicket.beginTime = this.TimeList[0]
        //     this.nowSelectTicket.endTime = this.TimeList[1]
        //   }
        //   this.selectTicket.push(this.nowSelectTicket)
        //   this.TimeList = []
        //   this.innerVisible = false
        // } else {
        //   this.$message.error('请输入时间')
        // }
        this.nowSelectTicket = {}
        this.nowSelectTicket.status = '1'
        this.nowSelectTicket.useType = '1'
        this.popup_timeChangge()
        this.dataForm.quan = ''
      },
      popup_timeChangge () {//判断选择时间
        if (this.nowSelectTicket.useType == 1) {
          this.numberDay = false
          this.startStopTime = true
          this.nowSelectTicket.useDays = ''
        } else {
          this.numberDay = true
          this.startStopTime = false
          this.TimeList = []
        }
      },
      handleClose () {
      },
      ticketClick (id) {//添加优惠券
        var l = this.selectTicket.find(j => id == j.voucherId)
        if (!l) {
          var a = this.ticketList.find((e) => id == e.voucherId)
          this.nowSelectTicket = a
          this.innerVisible = true
        } else {
          this.$message({message: '您已经添加过该优惠券，请仔细检查', type: 'warning', duration: 2000})
        }
        this.nowSelectTicket.useType = '1'

      },
      init (id) {
        this.isdisabled = false
        this.dataForm = {}
        this.selectTicket = []
        this.date1 = []
        this.obj = []
        this.visible = true
        this.dataForm.id = id || 0
        this.$http({//请求发送群体
          url: this.$http.adornUrl('/voucherdict/lists'),
          method: 'post',
          data: {group_name: 'klqyh'}
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.getObject = data.list
          } else {
            this.$message.error(`请求错误：${data.msg}`)
          }
        })
        if (id) {
          this.isdisabled = true
          this.$http({//请求该条数据
            url: this.$http.adornUrl(`/voucherissued/info/${id}`),
            method: 'post',
          }).then(({data}) => {
            if (data && data.code === 0) {
              data.voucherIssued.allowUser.split(',').forEach(e => {
                this.getObject.forEach(t => {
                  if (t.dictId == e) {
                    this.obj.push(t.name)
                  } else {
                  }
                })
              })
              this.selectTicket = data.voucherIssuedDetail
              this.dataForm = data.voucherIssued
              this.dataForm.id = id
              this.dataForm.isPerpetual = data.voucherIssued.isPerpetual.toString()
              this.date1.push(data.voucherIssued.beginTime)
              this.date1.push(data.voucherIssued.endTime)

              if (data.voucherIssued.isPerpetual == 1) {
                this.activity = false
              } else {
                this.activity = true
              }
            } else {
              this.$message.error(`请求错误：${data.msg}`)
            }
          })
        } else {
        }
        this.$http({//请求代金券
          url: this.$http.adornUrl('/voucherinfo/list'),
          method: 'post',
          data: {
            'page': '1',
            'pageSize': '10000',
          }
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.ticketList = data.page.list

          } else {
            this.$message.error(`请求错误：${data.msg}`)
          }
        })
      },
      // 表单提交
      dataFormSubmit () {
        var timeVisity = true
        if (this.activity) {
          if (this.date1 && this.date1.length > 1) {
          } else {
            timeVisity = false
          }
        } else {
          timeVisity = true
        }
        if (timeVisity && this.selectTicket.length > 0 && this.dataForm.theme && this.dataForm.isPerpetual && this.obj.length > 0) {
          var array = []
          this.obj.forEach(e => {
            this.getObject.forEach(t => {
              if (t.name == e) {
                array.push(t.dictId)
              }
            })
          })
          this.dataForm.beginTime = this.date1[0]
          this.dataForm.endTime = this.date1[1]
          this.dataForm.allowUser = array.toString()
          var aaa = this.selectTicket
          aaa.forEach(e => {
            delete e.voucherName
            delete e.memberMinAvailMoney
            delete (e.commonMinAvailMoney)
            delete (e.memberMinimum)
            delete (e.memberMaximum)
            delete (e.commonMinimum)
            delete (e.commonMaximum)
            delete (e.createUserId)
          })
          this.dataForm.voucherIssuedDetails = aaa
          delete this.dataForm.mainId
          this.$http({
            url: this.$http.adornUrl(`/voucherissued/${this.dataForm.id ? 'editor' : 'save '}`),
            method: 'post',
            data: this.dataForm
          }).then(({data}) => {
            if (data && data.code === 0) {
              this.$message({
                message: '恭喜你，保存添加成功', duration: 2000, type: 'success', onClose: () => {
                  this.visible = false
                  this.$emit('refreshDataList')
                }
              })
            } else {
              this.$message.error(`请求错误：${data.msg}`)
            }
          })
        } else {
          this.$message.error('请检查是否有为填入的信息')
        }

      }
    }
  }
</script>
<style lang="scss" scoped>
  .content {
    font-size: 14px;
    color: #333;

    .el-form-item__label {
      font-size: 14px !important;
    }

    ul {
      padding: 0 25px;

      li {
        margin-top: 20px;

        .title {
          color: #333;
        }

        span {
          display: inline-block;
        }

        .quanSpan1 {
          width: 250px;
        }

        .quanSpan2 {
          width: 150px;
        }

        .quanSpan3 {
          width: 150px;
        }

        .quanSpan4 {
          width: 150px;
        }

        .TicketOperation {
          font-size: 14px;
          width: 65px;
        }
      }
    }
  }

  .el-row {
    margin-bottom: 20px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  .el-col {
    border-radius: 4px;
  }

  .bg-purple-dark {
    background: #99a9bf;
  }

  .bg-purple {
    background: #d3dce6;
  }

  .bg-purple-light {
    background: #e5e9f2;
  }

  .grid-content {
    border-radius: 4px;
    min-height: 36px;
    font-size: 16px;
    text-align: center;
  }

  .popup_time {
    margin-top: 15px;

    div {
      height: 36px;
      line-height: 36px;

      .popup_timePicker {
        margin-left: 20px;
      }
    }
  }

  label {
    margin-bottom: 10px;
    align-items: center;
  }

  .box {
    padding: 0 25px;
  }
</style>
