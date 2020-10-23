<template>
  <div class="ycyc_refund">
    <div class="ycyc_refund_header">
      <div class="first">
        <span>手机号：</span>
        <input v-model="searchData.mobile" class="search" type="text" placeholder="手机号"/>
      </div>
      <div class="first">
        <span>用户昵称：</span>
        <input v-model="searchData.nickname" class="search" type="text" placeholder="昵称"/>
      </div>
      <div class="first">
        <span>付款时间：</span>
        <el-date-picker
          v-model="searchData.startPayTime"
          value-format='yyyy-MM-dd HH:mm:ss'
          type="datetime"
          placeholder="选择日期时间">
        </el-date-picker>
        <span class="line">
                <i></i>
            </span>
        <el-date-picker
          v-model="searchData.endPayTime"
          value-format='yyyy-MM-dd HH:mm:ss'
          type="datetime"
          placeholder="选择日期时间">
        </el-date-picker>
      </div>
      <div class="first">
        <span>价格：</span>
        <input v-model="searchData.startPrice" style="width:149px;" type="text" placeholder="10000"/>
        <span class="line">
                <i></i>
            </span>
        <input type="text" v-model="searchData.endPrice" placeholder="10000" style="margin-right:18px;width:149px;"/>
      </div>
      <div class="first">
        <span>退款时间：</span>

        <el-date-picker
          v-model="searchData.startUpdateTime"
          value-format='yyyy-MM-dd HH:mm:ss'
          type="datetime"
          placeholder="选择日期时间">
        </el-date-picker>
        <span class="line">
                <i></i>
            </span>
        <el-date-picker
          v-model="searchData.endUpdateTime"
          value-format='yyyy-MM-dd HH:mm:ss'
          type="datetime"
          placeholder="选择日期时间">
        </el-date-picker>
      </div>
      <div class="first">
        <span style="padding-left:30px;">退款金额：</span>
        <input v-model="searchData.startAmountMoney" style="width:149px;" type="text" placeholder="10000"/>
        <span class="line">
                <i></i>
            </span>
        <input type="text" v-model="searchData.endAmountMoney" placeholder="10000"
               style="margin-right:18px;width:149px;"/>
      </div>
      <div class="first">
        <span>快递公司：</span>
        <select class="first_select" v-model="value">
          <option v-for="item in options" :key="item.dataId" :value="item.dataId">{{item.dictName}}</option>
        </select>
      </div>
      <el-button @click="searchGoods" type="primary" class="mian_out">搜 索</el-button>
    </div>
    <el-table :data="tableData" style="width: 100%" border stripe v-loading="load_boolean">
      <el-table-column align="center" prop="orderNum" label="服务订单ID"></el-table-column>
      <el-table-column align="center" prop="mobile" label="用户手机号"></el-table-column>
      <el-table-column align="center" prop="nickname" label="用户昵称"></el-table-column>
      <el-table-column align="center" prop="agentAddress" label="用户地区"></el-table-column>
      <el-table-column width="135" align="center" prop="payTime" label="付款时间"></el-table-column>
      <el-table-column align="center" prop="price" label="订单价值">
        <div slot-scope="scope">
          <span>{{scope.row.price + scope.row.voucherMoney}}</span>
        </div>
      </el-table-column>
      <el-table-column align="center" prop="freight" label="快递费用">
      </el-table-column>
      <el-table-column align="center" prop="voucherMoney" label="代金券金额">
      </el-table-column>
      <el-table-column align="center" prop="sumPrice" label="实付金额">
      </el-table-column>
      <el-table-column align="center" label="退款类型">
        <template slot-scope="scope">
          <span>{{fn(scope.row.refundType)}} </span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="refundPrice" label="退款金额"></el-table-column>
      <el-table-column width="135" align="center" prop="refundApplyTime" label="退款申请时间"></el-table-column>
      <el-table-column align="center" prop="refundTrackingCompany" label="快递公司"></el-table-column>
      <el-table-column align="center" prop="refundTrackingNum" label="退货快递单号"></el-table-column>
      <el-table-column align="center" label="退款状态">
        <template slot-scope="scope">
          <el-button type="text" size="small">{{fb(scope.row.status)}}</el-button>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="q">
          <el-button @click="review(q.row.orderId)" type="text" size="small">退款核查</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 详情页面 -->
    <el-dialog title="退款详情" :visible.sync="dialogVisiblec" width="38%" :center="true" custom-class="dislogmian_c ">
      <ul class="ycyc_refund_detail clearfix">
        <li><span>订单ID：</span>{{orderDetail.orderNum}}<span></span></li>
        <li><span>退款类型：</span><span style="color:#FDAEAE">{{fn(orderDetail.refundType)}}</span></li>
        <li><span>订单属性：</span><span>{{fc(orderDetail.orderProperty)}}</span></li>
        <li><span>退款金额：</span><span>{{orderDetail.refundPrice}}</span></li>
        <li><span>用户电话：</span><span>{{orderDetail.mobile}}</span></li>
        <li><span>退款时间：</span><span>{{orderDetail.refundApplyTime}}</span></li>
        <li><span>用户昵称：</span><span>{{orderDetail.nickname}}</span></li>
        <li><span>快递公司：</span><span>{{orderDetail.refundTrackingCompany}}</span></li>
        <li><span>用户地区：</span><span>{{orderDetail.goodsAddress}}</span></li>
        <li><span>退款单号：</span><span>{{orderDetail.refundTrackingNum}}</span></li>
        <li><span>付款时间：</span><span>{{orderDetail.payTime}}</span></li>
        <li><span>退款状态：</span><span style="color:#B1E4EE">{{fb(orderDetail.status)}}</span></li>
        <li><span>实付金额：</span><span>{{orderDetail.sumPrice}}元</span></li>
        <li><span>订单价值：</span><span>{{orderDetail.price+orderDetail.voucherMoney}}元</span></li>
        <li><span>快递费用：</span><span>{{orderDetail.freight}}元</span></li>
        <li><span>代金券金额：</span><span>{{orderDetail.voucherMoney}}元</span></li>
      </ul>
      <template v-if="orderDetail.remark">
        <p style="text-align:center;font-size:18px;padding:8px;">退款内容详情</p>
        <p>{{orderDetail.remark}}</p>
      </template>
      <p style="text-align:center;font-size:18px;padding:15px 8px;">订单药品</p>
      <ul class="refund_num clearfix">
        <li v-for="(item,index) in orderDetail.list" :key="index" class="clearfix">
          <div class="img">
            <img :src="/,/.test(item.url)? item.url.split(',')[0]:item.url" alt="">
          </div>
          <div class="righ">
            <span style="font-weight:500;">{{item.productName}} </span>
            <span>{{item.modelName}}</span>
            <span>数量*{{item.count}}</span>
          </div>
        </li>

      </ul>
      <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="sucessd">核对成功</el-button>
        <el-button @click="reject()">驳回</el-button>
      </span>
    </el-dialog>
    <paganation :pages="pages" @pagechange="sureb"/>
  </div>

</template>

<script>
  import paganation from '@/components/paganation'

  export default {
    data () {
      return {
        output: '',
        outputArr: [{
          id: '',
          name: '全部'
        }, {
          id: 0,
          name: '发起退款'
        }, {
          id: 1,
          name: '已退款'
        }],
        options: [],
        load_boolean: true,
        value: '', //选中的快递公司
        tableData: [],
        statuss: [7], //进行到该仓库审核了
        page: 1,
        pageSize: 10,
        pages: {},
        dialogVisiblec: false,
        orderDetail: {}, //后台返回订单详情
        searchData: {},
      }
    },
    components: {
      paganation
    },

    methods: {
      reject () {//驳回
        this.$http({
          url: this.$http.adornUrl('/ycyl/ycylorder/financialRejected'),
          method: 'post',
          params: {
            status: 4,
            orderId: this.orderDetail.orderId
          }
        }).then(({
          data
        }) => {
          if (data && data.code == 0) {
            this.$message.success('驳回成功')
            this.dialogVisiblec = false
            this.getList()
          } else {
            this.$message.error(data.msg)
          }
        })
        this.dialogVisiblec = false
      },
      searchGoods () {
        this.searchData.page = this.page
        this.searchData.pageSize = this.pageSize
        this.load_boolean = true
        this.searchData.trackingCompany = this.value
        this.searchData.statuss = this.statuss
        this.$http({
          url: this.$http.adornUrl('/ycyl/ycylorder/getPageList'),
          method: 'post',
          data: this.searchData
        }).then(({
          data
        }) => {
          if (data && data.code == 0) {
            this.load_boolean = false
            for (let k in this.searchData) {
              this.searchData[k] = ''
            }
            this.tableData = data.page.list
            this.pages = data.page
          } else {
            this.$message.error(data.msg)
          }
        })
      },

      sucessd () {
        this.$http({
          url: this.$http.adornUrl('/ycyl/ycylorder/update'),
          method: 'get',
          params: {
            status: 8,
            orderId: this.orderDetail.orderId
          }
        }).then(({
          data
        }) => {
          if (data && data.code == 0) {
            this.$message.success('核对成功')
            this.dialogVisiblec = false
            this.getList()
          } else {
            this.$message.error(data.msg)
          }
        })

      },
      review (orderId) { //退款核查
        this.dialogVisiblec = true
        this.$http({
          url: this.$http.adornUrl('/ycyl/ycylorder/getRefundOrder'),
          method: 'post',
          data: {
            orderId: orderId
          }
        }).then(({
          data
        }) => {
          if (data && data.code == 0) {
            this.orderDetail = data.orderDetails
          } else {
            this.$message.error(data.msg)
          }
        })

      },
      sureb (data) {
        this.load_boolean = true
        data.statuss = this.statuss
        this.$http({
          url: this.$http.adornUrl('/ycyl/ycylorder/getPageList'),
          method: 'post',
          data
        }).then(({
          data
        }) => {
          if (data && data.code == 0) {
            this.load_boolean = false
            this.tableData = data.page.list
            this.pages = data.page
          } else {
            this.$message.error(data.msg)
          }
        })
      },
      getList () {
        this.$http({
          url: this.$http.adornUrl('/ycyl/ycylorder/getPageList'),
          method: 'post',
          data: {
            statuss: this.statuss,
            page: this.page,
            pageSize: this.pageSize
          }
        }).then(({
          data
        }) => {
          if (data && data.code === 0) {
            this.load_boolean = false
            this.pages = data.page
            this.tableData = data.page.list
          }
        })

      },
      fn (w) {
        switch (w) {
          case 1:
            return '全额退款'
            break
          case 2:
            return '部分退款'
            break

        }

      },
      fc (w) {
        switch (w) {
          case 1:
            return '自购单'
            break
          case 2:
            return '购物单'
            break
          case 3:
            return '进货单'
            break
          case 4:
            return '视频单'
            break

        }

      },
      fb (w) {
        switch (w) {
          case 0:
            return '待付款'
            break
          case 1:
            return '已付款'
            break
          case 2:
            return '待收货'
            break
          case 3:
            return '已完成'
            break
          case 4:
            return '客服审核'
            break
          case 5:
            return '财务审核'
            break
          case 6:
            return '退款完成'
            break
          case 7:
            return '仓储审核'
            break
          case 8:
            return '财务退款'
            break
          case 9:
            return '急速退款'
            break

        }

      },
    },
    created () {
      this.getList()
      //获取物流公司
      this.$http({
        url: this.$http.adornUrl('/ycyl/ycyldictdata/list'),
        method: 'post',
        data: {
          'dictValue': 'delivery',

          'pageSize': '30'
        }
      }).then(({
        data
      }) => {
        if (data && data.code === 0) {

          this.options = data.page.list
          this.options.unshift({
            dictName: '全部'
          })
          this.value = this.options[0].dataId

        } else {
          this.$message.error(data.msg)
        }
      })

    },
  }
</script>
<style lang="scss">
  .ycyc_refund {
    .el-date-editor.el-input,
    .el-date-editor.el-input__inner {
      width: 200px;
    }

    .el-input__inner {
      border-color: rgba(221, 221, 221, 1);
    }

    .dislogmian_c {
      border-radius: 10px;

      .el-button--primary {
        /*background: #45c8dc;*/
      }

      .el-button--medium {
        padding: 8px 30px;
      }

      .el-dialog__body {
        border-top: 0;
        margin: 0 48px;
        padding: 10px 0;
      }
    }

    .ycyc_refund_detail {
      li {
        float: left;
        width: 50%;
      }
    }

    .refund_num {
      li {
        float: left;
        width: 48%;
        padding-bottom: 12px;

        .img {
          float: left;
          width: 96px;
          height: 109px;
          overflow: hidden;

          img {
            width: 100%;
            height: 100%;
          }
        }

        .righ {
          padding-left: 8px;
          line-height: 16px;
          display: flex;
          height: 75px;
          flex-direction: column;
          justify-content: space-between;
          width: 100px;
        }
      }
    }

    .dialog-footer {
      display: flex;
      justify-content: space-around;
    }
  }
</style>
<style lang="scss" scoped>
  // 头部样式
  .ycyc_refund_header {
    padding-bottom: 15px;
    select,
    input,
    button {
      outline: none;
    }

    i {
      font-style: normal;
      width: 30px;
      height: 2px;
      background: rgba(153, 153, 153, 1);
    }

    .line {
      position: relative;
      display: inline-block;
      width: 30px;

      i {
        position: absolute;
        top: -7px;
        left: 0;
      }
    }

    select {
      border: 1px solid rgba(221, 221, 221, 1);
      border-radius: 6px;
      color: #666;
    }

    .first {
      display: inline-block;

      span {
        color: #333;
      }

      .search {
        width: 206px;
        height: 30px;
        border: 1px solid rgba(221, 221, 221, 1);
        border-radius: 6px;
        padding-left: 10px;
        margin-right: 18px;
      }

      .first_select {
        width: 108px;
        height: 30px;
        margin-right: 18px;
      }

      .second_select {
        width: 65px;
        height: 30px;
        margin-right: 18px;
      }

      .three_select {
        width: 94px;
        height: 30px;
      }

      input {
        width: 66px;
        height: 30px;
        border: 1px solid rgba(221, 221, 221, 1);
        border-radius: 6px;
        padding-left: 5px;
      }
    }
  }

  .ycyc_refund_header {
    line-height: 46px;

    .mian_out {
      background: rgba(69, 200, 220, 1);
      padding: 6px 20px;
    }
  }
</style>
