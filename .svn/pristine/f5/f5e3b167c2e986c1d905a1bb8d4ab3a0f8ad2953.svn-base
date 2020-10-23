<template>
  <div class="main">
    <div class="mainTitle">
      <label>时间选择：
        <el-date-picker
          style="width: 240px"
          v-model="dataTime"
          value-format="yyyy-MM-dd HH:mm:ss"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </label>
      <label>
        <el-button type="success" style="padding: 8px 20px" @click="searchBtn()">搜索</el-button>
      </label>
    </div>
    <div v-show="table">
      <download-excel
        style="mso-number-format:'\@';"
        class="export-excel-wrapper"
        :data="jsonlist"
        :fields="json_fields"
        :name="text">
        <el-button type="primary" size="mini" @click="visibleExcel = false" id="downFileBtn">确定
        </el-button>
      </download-excel>
    </div>
    <div class="contentBox">
      <table cellspacing="0">
        <tr>
          <th>导出类别</th>
          <th>代理商订单提成业绩</th>
          <th>客服订单提成业绩</th>
          <th>医生订单提成业绩</th>
          <th>专家订单提成业绩</th>
          <th>医生课程收入业绩</th>
          <th>专家课程收入业绩</th>
          <th>医助订单提成业绩</th>
          <th>代理商进货单记录</th>
          <th>地推出库记录</th>
          <th>入库记录</th>
        </tr>
        <tr>
          <td><span>操作</span></td>
          <td><span @click="agentCommission()">导出专家表格</span></td>
          <td><span @click="serviceResults()">导出客服表格</span></td>
          <td><span @click="doctorOrder()">导出医生表格</span></td>
          <td><span @click="expertOrder()">导出专家表格</span></td>
          <td><span @click="doctorTable(5)">导出医生表格</span></td>
          <td><span @click="doctorTable(6)">导出专家表格</span></td>
          <td><span @click="yizhuTable()">导出医助表格</span></td>
          <td><span @click="agencyTable()">导出代理进货表格</span></td>
          <td><span @click="dituiTable()">导出表格</span></td>
          <td><span @click="inWarehouseTable()">导出表格</span></td>
        </tr>
        <tr style="margin-top: 15px">
          <th>导出类别</th>
          <th>订单表</th>
          <th>审核医生业绩表</th>
          <th>退款表</th>
        </tr>
        <tr style="margin-top: 15px">
          <td><span>操作</span></td>
          <td><span @click="orderTable()">导出表格</span></td>
          <td><span @click="auditDoctor()">导出表格</span></td>
          <td><span @click="Tuikuan()">导出表格</span></td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        text: '',
        table: false,
        dataTime: [],
        search: {},
        dataSearch: {},
        jsonlist: [],
        json_fields: {},
        json_meta: [
          [
            {
              ' key ': ' charset ',
              ' value ': ' utf- 8 '
            }
          ]
        ],
      }
    },
    methods: {
      Tuikuan () {
        if (this.dataTime.length > 1) {
          const loading = this.$loading({
            lock: true,
            text: '下载中...',
            spinner: 'el-icon-loading',
            background: 'rgba(255, 255, 255, 0.7)'
          })
          this.dataSearch.startPayTime = this.dataTime[0]
          this.dataSearch.endPayTime = this.dataTime[1].slice(0, 11) + '23:59:59'
          this.text = `退款${this.dataTime[0].substring(-1, 10)}至${this.dataTime[1].substring(-1, 10)}表`
          this.$http({
            url: this.$http.adornUrl(`/orderMon/getReturnOrderRepByMon`),
            method: 'post',
            data: this.dataSearch
          }).then(({
            data
          }) => {
            if (data && data.code === 0) {
              if (data.list.length > 0) {
                this.jsonlist = data.list
                this.json_fields = {
                  '订单号': 'orderNum',    //
                  '用户昵称': 'nickname',    //
                  '收货人姓名': 'linkman',    //
                  '收货人电话': 'consigneeMobile',    //
                  '收货人地址': 'consigneeAddress',    //
                  '订单属性': 'orderProperty',    //
                  '订单状态': 'status',    //
                  '付款时间': 'payTime',    //
                  '退款打款时间': 'playTime',    //
                  '订单价值': 'sumPrice',    //
                  '使用代金券额度': 'voucherMoney',    //
                  '运费': 'freight',    //
                  '实付金额': 'price',    //
                  '退款类型': 'refundType',    //
                  '支付方式': 'payType',    //
                  '配送方式': 'deduct',    //
                  '发货快递': 'trackingCompany',    //
                  '发货单号': 'trackingNum',    //
                  '订单药品': 'productName',    //
                  '规格型号': 'returnModelName',    //
                  '数量': 'count',    //
                  '价格': 'productPrice',    //
                  '退货药品': 'returnProductName',    //
                  '退款规格': 'returnModelName',    //
                  '退款数量': 'returnCount',    //
                  '药品价格': 'productPrice',    //
                }
                setTimeout(() => {
                  document.getElementById('downFileBtn').click()
                  loading.close()
                }, 0)
              } else {
                this.$message(`温馨提示：暂无退款表`)
                loading.close()
              }
            } else {
              this.$message.error(data.msg)
            }
          })
        } else {
          this.$message.error('温馨提示：请选择时间进行导出')
        }
      },
      auditDoctor () {
        if (this.dataTime.length > 1) {
          const loading = this.$loading({
            lock: true,
            text: '下载中...',
            spinner: 'el-icon-loading',
            background: 'rgba(255, 255, 255, 0.7)'
          })
          this.dataSearch.startPayTime = this.dataTime[0]
          this.dataSearch.endPayTime = this.dataTime[1].slice(0, 11) + '23:59:59'
          this.text = `审核医生${this.dataTime[0].substring(-1, 10)}至${this.dataTime[1].substring(-1, 10)}表`
          this.$http({
            url: this.$http.adornUrl(`/orderMon/getOrderForAuDocResultsByMon`),
            method: 'post',
            data: this.dataSearch
          }).then(({
            data
          }) => {
            if (data && data.code === 0) {
              if (data.list.length > 0) {
                this.jsonlist = data.list
                this.json_fields = {
                  '订单号': 'orderNum',    //
                  '审核医生': '',    //
                  '医生姓名': 'docName',    //
                  '订单属性': 'orderProperty',    //
                  '订单状态': 'status',    //
                  '付款时间': 'payTime',    //
                  '订单价值': 'price',    //
                  '订单药品': 'productName',    //
                  '规格型号': 'modelName',    //
                  '数量': 'count',    //
                  '价格': 'modelPrice',    //
                  '审核提成设置': 'proportion',    //
                  '审核提成': 'deduct',    //
                }
                setTimeout(() => {
                  document.getElementById('downFileBtn').click()
                  loading.close()
                }, 0)
              } else {
                this.$message(`温馨提示：暂无审核医生表`)
                loading.close()
              }
            } else {
              this.$message.error(data.msg)
            }
          })
        } else {
          this.$message.error('温馨提示：请选择时间进行导出')
        }
      },
      orderTable () {//普通订单
        if (this.dataTime.length > 1) {
          const loading = this.$loading({
            lock: true,
            text: '下载中...',
            spinner: 'el-icon-loading',
            background: 'rgba(255, 255, 255, 0.7)'
          })
          this.dataSearch.startPayTime = this.dataTime[0]
          this.dataSearch.endPayTime = this.dataTime[1].slice(0, 11) + '23:59:59'
          this.text = `订单${this.dataTime[0].substring(-1, 10)}至${this.dataTime[1].substring(-1, 10)}表`
          this.$http({
            url: this.$http.adornUrl(`/orderMon/getOrderRepByMon`),
            method: 'post',
            data: this.dataSearch
          }).then(({
            data
          }) => {
            if (data && data.code === 0) {
              if (data.list.length > 0) {
                this.jsonlist = data.list
                this.json_fields = {
                  '订单号': 'orderNum',    //
                  '用户昵称': 'nickname',    //
                  '收货人姓名': 'linkman',    //
                  '收货人电话': 'consigneeMobile',    //
                  '收货人地址': 'consigneeAddress',    //
                  '订单属性': 'orderProperty',    //
                  '订单状态': 'status',    //
                  '付款时间': 'payTime',    //
                  // '退款打款时间': '暂无',    //
                  '实付金额': 'price',    //
                  '代金券金额': 'voucherMoney',    //
                  '运费': 'freight',    //
                  '总金额': 'sumPrice',    //
                  '支付方式': 'payType',    //
                  '配送方式': 'outboundWay',    //
                  '发货快递': 'trackingCompany',    //
                  '发货单号': 'trackingNum',    //
                  '订单药品': 'productName',    //
                  '规格型号': 'modelName',    //
                  '数量': 'count',    //
                  '价格': 'productPrice',    //
                }
                setTimeout(() => {
                  document.getElementById('downFileBtn').click()
                  loading.close()
                }, 0)
              } else {
                this.$message(`温馨提示：暂无该时间段订单表`)
                loading.close()
              }
            } else {
              this.$message.error(data.msg)
            }
          })
        } else {
          this.$message.error('温馨提示：请选择时间进行导出')
        }
      },
      inWarehouseTable () {
        if (this.dataTime.length > 1) {
          const loading = this.$loading({
            lock: true,
            text: '下载中...',
            spinner: 'el-icon-loading',
            background: 'rgba(255, 255, 255, 0.7)'
          })
          this.dataSearch.startPayTime = this.dataTime[0]
          this.dataSearch.endPayTime = this.dataTime[1].slice(0, 11) + '23:59:59'
          this.text = `入库记录${this.dataTime[0].substring(-1, 10)}至${this.dataTime[1].substring(-1, 10)}表`
          this.$http({
            url: this.$http.adornUrl(`/ycyl/ycylputgrndetail/getGrnDetailReq`),
            method: 'post',
            data: this.dataSearch
          }).then(({
            data
          }) => {
            if (data && data.code === 0) {
              if (data.list.length > 0) {
                this.jsonlist = data.list
                this.json_fields = {
                  '商品名称': 'productName',    //
                  '商品ID': 'id',    //
                  '规格名称': 'modelName',    //
                  '采购单价': 'unitPrice',    //
                  '采购数量': 'count',    //
                  '采购金额': 'unitPrice',    //
                  '入库时间': 'createTime',    //
                  '库位': 'place',    //
                  '进货厂家': 'manufacturer',    //
                }
                setTimeout(() => {
                  document.getElementById('downFileBtn').click()
                  loading.close()
                }, 0)
              } else {
                this.$message(`温馨提示：暂无该时间入库记录表`)
                loading.close()
              }
            } else {
              this.$message.error(data.msg)
            }
          })
        } else {
          this.$message.error('温馨提示：请选择时间进行导出')
        }
      },
      dituiTable () {
        //地推出库
        if (this.dataTime.length > 1) {
          const loading = this.$loading({
            lock: true,
            text: '下载中...',
            spinner: 'el-icon-loading',
            background: 'rgba(255, 255, 255, 0.7)'
          })
          this.dataSearch.startPayTime = this.dataTime[0]
          this.dataSearch.endPayTime = this.dataTime[1].slice(0, 11) + '23:59:59'
          this.text = `地推出库记录${this.dataTime[0].substring(-1, 10)}至${this.dataTime[1].substring(-1, 10)}表`
          this.$http({
            url: this.$http.adornUrl(`/orderMon/getToOrderRep`),
            method: 'post',
            data: this.dataSearch
          }).then(({
            data
          }) => {
            if (data && data.code === 0) {
              if (data.list.length > 0) {
                this.jsonlist = data.list
                this.json_fields = {
                  '申请部门': 'applicantDepartment',    //
                  '申请人': 'applicantName',
                  '属性': 'orderType',
                  '发货快递': 'courierCompany',
                  '快递单号': 'courierNo',
                  '收货地址': 'address',
                  '药品价值': 'price',
                  '运费': 'freight',
                  '订单药品': 'productName',
                  '规格型号': 'modelName',
                  '数量': 'count',
                  '价格': 'modelPrice',

                }
                setTimeout(() => {
                  document.getElementById('downFileBtn').click()
                  loading.close()
                }, 0)
              } else {
                this.$message(`温馨提示：暂无该时间段地推出库记录表`)
                loading.close()
              }
            } else {
              this.$message.error(data.msg)
            }
          })
        } else {
          this.$message.error('温馨提示：请选择时间进行导出')
        }
      },
      agencyTable () {
        //代理进货
        if (this.dataTime.length > 1) {
          const loading = this.$loading({
            lock: true,
            text: '下载中...',
            spinner: 'el-icon-loading',
            background: 'rgba(255, 255, 255, 0.7)'
          })
          this.dataSearch.startPayTime = this.dataTime[0]
          this.dataSearch.endPayTime = this.dataTime[1].slice(0, 11) + '23:59:59'
          this.text = `代理进货记录${this.dataTime[0].substring(-1, 10)}至${this.dataTime[1].substring(-1, 10)}表`
          this.$http({
            url: this.$http.adornUrl(`/orderMon/getAgentOrderByMon`),
            method: 'post',
            data: this.dataSearch
          }).then(({
            data
          }) => {
            if (data && data.code === 0) {
              if (data.list.length > 0) {
                this.jsonlist = data.list
                this.json_fields = {
                  '订单号': 'orderNum',    //单号
                  '进货状态': 'status', //
                  '代理姓名': 'agentName', //
                  '代理区域': 'agentAddress', //
                  '进货价值': 'price', //
                  '信用值': 'userFaith', //
                  '发货快递': 'trackingCompany', //
                  '快递单号': 'trackingNum', //
                  '付款时间': 'payTime', //
                  '收货地址': 'goodsAddress', //
                  '订单药品': 'productName', //
                  '规格型号': 'modelName', //
                  '数量': 'count', //
                  '价格': 'productPrice', //
                }
                setTimeout(() => {
                  document.getElementById('downFileBtn').click()
                  loading.close()
                }, 0)
              } else {
                this.$message(`温馨提示：暂无该时间段代理进货记录表`)
                loading.close()
              }
            } else {
              this.$message.error(data.msg)
            }
          })
        } else {
          this.$message.error('温馨提示：请选择时间进行导出')
        }
      },
      yizhuTable () {
        //医助表格
        if (this.dataTime.length > 1) {
          const loading = this.$loading({
            lock: true,
            text: '下载中...',
            spinner: 'el-icon-loading',
            background: 'rgba(255, 255, 255, 0.7)'
          })
          this.dataSearch.startPayTime = this.dataTime[0]
          this.dataSearch.endPayTime = this.dataTime[1].slice(0, 11) + '23:59:59'
          this.text = `医助订单提成${this.dataTime[0].substring(-1, 10)}至${this.dataTime[1].substring(-1, 10)}表`
          this.$http({
            url: this.$http.adornUrl(`/orderMon/getOrderForAssResultsByMon`),
            method: 'post',
            data: this.dataSearch
          }).then(({
            data
          }) => {
            if (data && data.code === 0) {
              if (data.list.length > 0) {
                this.jsonlist = data.list
                this.json_fields = {
                  '订单号': 'orderNum',    //单号
                  '医助姓名': 'docName', //
                  '用户昵称': 'nickname', //
                  '收货人姓名': 'linkman', //
                  '收货人电话': 'shMobile', //
                  '收货人地址': 'consigneeAddress', //
                  '订单状态': 'status', //
                  '付款时间': 'payTime', //
                  '订单价值': 'price', //
                  '订单药品': 'productName', //
                  '规格型号': 'modelName', //
                  '数量': 'count', //
                  '价格': 'modelPrice', //
                  '提成设置': 'proportion', //
                  '提成': 'deduct', //
                }
                setTimeout(() => {
                  document.getElementById('downFileBtn').click()
                  loading.close()
                }, 0)
              } else {
                this.$message(`温馨提示：暂无该时间段医助订单提成表`)
                loading.close()
              }
            } else {
              this.$message.error(data.msg)
            }
          })
        } else {
          this.$message.error('温馨提示：请选择时间进行导出')
        }
      },
      expertOrder () {
        //专家订单提成
        if (this.dataTime.length > 1) {
          const loading = this.$loading({
            lock: true,
            text: '下载中...',
            spinner: 'el-icon-loading',
            background: 'rgba(255, 255, 255, 0.7)'
          })
          this.dataSearch.startPayTime = this.dataTime[0]
          this.dataSearch.endPayTime = this.dataTime[1].slice(0, 11) + '23:59:59'
          this.text = `专家订单提成${this.dataTime[0].substring(-1, 10)}至${this.dataTime[1].substring(-1, 10)}表`
          this.$http({
            url: this.$http.adornUrl(`/orderMon/getOrderForExpResultsByMon`),
            method: 'post',
            data: this.dataSearch
          }).then(({
            data
          }) => {
            if (data && data.code === 0) {
              if (data.list.length > 0) {
                this.jsonlist = data.list
                this.json_fields = {
                  '订单号': 'orderNum',    //单号
                  '专家姓名': 'docName', //
                  '用户昵称': 'nickname', //
                  '收货人姓名': 'linkman', //
                  '收货人电话': 'shMobile', //
                  '收货人地址': 'consigneeAddress', //
                  '订单属性': 'orderProperty', //
                  '订单状态': 'status', //
                  '付款时间': 'payTime', //
                  '订单价值': 'price', //
                  '订单药品': 'productName', //
                  '规格型号': 'modelName', //
                  '数量': 'count', //
                  '价格': 'modelPrice', //
                  '提成设置': 'proportion', //
                  '提成': 'deduct', //

                }
                setTimeout(() => {
                  document.getElementById('downFileBtn').click()
                  loading.close()
                }, 0)
              } else {
                this.$message(`温馨提示：暂无该时间段专家订单提成表`)
                loading.close()
              }

            } else {
              this.$message.error(data.msg)
            }
          })
        } else {
          this.$message.error('温馨提示：请选择时间进行导出')
        }
      },
      doctorOrder () {
        //医生订单提成
        if (this.dataTime.length > 1) {
          const loading = this.$loading({
            lock: true,
            text: '下载中...',
            spinner: 'el-icon-loading',
            background: 'rgba(255, 255, 255, 0.7)'
          })
          this.dataSearch.startPayTime = this.dataTime[0]
          this.dataSearch.endPayTime = this.dataTime[1].slice(0, 11) + '23:59:59'
          this.text = `医生订单提成${this.dataTime[0].substring(-1, 10)}至${this.dataTime[1].substring(-1, 10)}表`
          this.$http({
            url: this.$http.adornUrl(`/orderMon/getOrderForDocResultsByMon`),
            method: 'post',
            data: this.dataSearch
          }).then(({
            data
          }) => {
            if (data && data.code === 0) {
              if (data.list.length > 0) {
                data.list.forEach((e) => {
                  if (e.doctorRank == '1') {
                    e.doctorRank = '一级'
                  } else if (e.doctorRank == '2') {
                    e.doctorRank = '二级'
                  } else {
                    e.doctorRank = '暂无'
                  }
                })
                this.jsonlist = data.list
                this.json_fields = {
                  '订单号': 'orderNum',    //单号
                  '老师姓名': 'docName', //
                  // '审核老师（医生业绩专用）': '', //
                  '用户昵称': 'nickname', //
                  '收货人姓名': 'linkman', //
                  '收货人电话': 'shMobile', //
                  '收货人地址': 'consigneeAddress', //
                  '订单属性': 'orderProperty', //
                  '订单状态': 'status', //
                  '付款时间': 'payTime', //
                  '订单价值': 'price', //
                  '订单药品': 'productName', //
                  '规格型号': 'modelName', //
                  '数量': 'count', //
                  '价格': 'modelPrice', //
                  '提成设置': 'proportion', //
                  '提成': 'deduct', //
                  '医生等级': 'doctorRank', //
                  // '审核提成设置': '', //
                  // '审核提成': '', //
                }
                setTimeout(() => {
                  document.getElementById('downFileBtn').click()
                  loading.close()
                }, 0)
              } else {
                this.$message(`温馨提示：暂无该时间段医生订单提成表`)
                loading.close()
              }

            } else {
              this.$message.error(data.msg)
            }
          })
        } else {
          this.$message.error('温馨提示：请选择时间进行导出')
        }
      },
      serviceResults () {//客服提成
        if (this.dataTime.length > 1) {
          const loading = this.$loading({
            lock: true,
            text: '下载中...',
            spinner: 'el-icon-loading',
            background: 'rgba(255, 255, 255, 0.7)'
          })
          this.dataSearch.startPayTime = this.dataTime[0]
          this.dataSearch.endPayTime = this.dataTime[1].slice(0, 11) + '23:59:59'
          this.text = `客服订单提成${this.dataTime[0].substring(-1, 10)}至${this.dataTime[1].substring(-1, 10)}表`
          this.$http({
            url: this.$http.adornUrl(`/orderMon/getOrderForServiceResultsByMon`),
            method: 'post',
            data: this.dataSearch
          }).then(({
            data
          }) => {
            if (data && data.code === 0) {
              if (data.list.length > 0) {
                this.jsonlist = data.list
                this.json_fields = {
                  '订单号': 'orderNum',    //单号
                  '客服姓名': 'serviceName', //
                  '用户昵称': 'nickname', //
                  '收货人姓名': 'linkman', //
                  '收货人电话': 'shMobile', //
                  '收货人地址': 'consigneeAddress', //
                  '订单属性': 'orderProperty', //
                  '订单状态': 'status', //
                  '付款时间': 'payTime', //
                  '订单价值': 'price', //
                  '订单药品': 'productName', //
                  '规格型号': 'modelName', //
                  '数量': 'count', //
                  '价格': 'modelPrice', //
                  '提成设置': 'proportion', //
                  '提成': 'deduct', //

                }
                setTimeout(() => {
                  document.getElementById('downFileBtn').click()
                  loading.close()
                }, 0)
              } else {
                this.$message(`温馨提示：暂无该时间段客服订单提成表`)
                loading.close()
              }

            } else {
              this.$message.error(data.msg)
            }
          })
        } else {
          this.$message.error('温馨提示：请选择时间进行导出')
        }
      },
      agentCommission () {//代理订单提成
        if (this.dataTime.length > 1) {
          const loading = this.$loading({
            lock: true,
            text: '下载中...',
            spinner: 'el-icon-loading',
            background: 'rgba(255, 255, 255, 0.7)'
          })
          this.dataSearch.startPayTime = this.dataTime[0]
          this.dataSearch.endPayTime = this.dataTime[1].slice(0, 11) + '23:59:59'
          this.text = `代理订单提成${this.dataTime[0].substring(-1, 10)}至${this.dataTime[1].substring(-1, 10)}导出表`
          this.$http({
            url: this.$http.adornUrl(`/orderMon/getOrderForAgentResultsByMon`),
            method: 'post',
            data: this.dataSearch
          }).then(({
            data
          }) => {
            if (data && data.code === 0) {

              if (data.list.length > 0) {
                this.jsonlist = data.list
                this.json_fields = {
                  '订单号': 'orderNum',    //单号
                  '代理商姓名': 'agentName', //名字
                  '代理区域': 'agentAddress', //地区
                  '用户昵称': 'nickname',
                  '收货人姓名': 'linkman',
                  '收货人电话': 'shMobile',
                  '收货人地址': 'consigneeAddress',
                  '订单属性': 'orderProperty',
                  '订单状态': 'status',
                  '付款时间': 'payTime',
                  '订单价值': 'modelPrice',
                  '订单药品': 'productName',
                  '规格型号 ': 'modelName',
                  '数量': 'count',
                  '价格': 'price',
                  '提成设置': 'proportion',
                  '提成': 'deduct',
                }
                setTimeout(() => {
                  document.getElementById('downFileBtn').click()
                  loading.close()
                }, 0)
              } else {
                this.$message(`温馨提示：暂无该时间段代理订单提成表`)
                loading.close()

              }

            } else {
              this.$message.error(data.msg)
            }
          })

        } else {
          this.$message.error('温馨提示：请选择时间进行导出')
        }

      },
      searchBtn () {
        if (this.dataTime.length == '2') {
          this.search.stateTime = this.dataTime[0]
          this.search.endTime = this.dataTime[1].slice(0, 11) + '23:59:59'
        }
      },
      doctorTable (type) {//医生专家课程提成
        this.dataSearch.type = type
        if (this.dataTime.length > 1) {
          const loading = this.$loading({
            lock: true,
            text: '下载中...',
            spinner: 'el-icon-loading',
            background: 'rgba(255, 255, 255, 0.7)'
          })
          this.dataSearch.startPayTime = this.dataTime[0]
          this.dataSearch.endPayTime = this.dataTime[1].slice(0, 11) + '23:59:59'
          if (type == '5') {
            this.text = `医生课程提成${this.dataTime[0].substring(-1, 10)}至${this.dataTime[1].substring(-1, 10)}表`
          } else {
            this.text = `专家课程提成${this.dataTime[0].substring(-1, 10)}至${this.dataTime[1].substring(-1, 10)}表`
          }
          this.$http({
            url: this.$http.adornUrl(`/study/studybuyrecord/coursecommission`),
            method: 'post',
            data: this.dataSearch
          }).then(({
            data
          }) => {
            if (data && data.code === 0) {
              data.studyBuyPeps.map((e) => {
                e.proportion = `${e.proportion * 100}‰`
              })
              if (data.studyBuyPeps.length > 0) {
                this.jsonlist = data.studyBuyPeps
                this.json_fields = {
                  '订单号': 'orderNum',    //单号
                  '老师名字': 'doctorTruename', //
                  '用户昵称': 'nickname', //
                  '用户电话': 'mobile', //
                  '付款时间': 'createTime', //
                  '课程名称': 'courseName', //
                  '课程类型': 'fitKind', //
                  '课程价格': 'courseprice', //
                  '订单价值': 'price', //
                  '提成设置': 'proportion', //
                  '提成': 'deduct', //
                }
                setTimeout(() => {
                  document.getElementById('downFileBtn').click()
                  loading.close()
                }, 0)
              } else {
                if (type == '5') {
                  this.$message(`温馨提示：暂无该时间段医生订单提成表`)
                } else {
                  this.$message(`温馨提示：暂无该时间段专家订单提成表`)
                }
                loading.close()
              }

            } else {
              this.$message.error(data.msg)
            }
          })
        } else {
          this.$message.error('温馨提示：请选择时间进行导出')
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .main {
    .mainTitle {
      height: 61px;
      background-color: #eee;
      line-height: 61px;

      label {
        margin-left: 32px;
      }
    }

    .contentBox {
      margin-top: 15px;

      table {

        /*border: 1px solid #ff0000;*/

        tr {
          border: 1px solid rgba(221, 221, 221, 1);

          th {
            width: 159px;
            height: 50px;
            border: 1px solid rgba(221, 221, 221, 1);
            border-collapse: collapse;
            text-align: center;
            color: #303133;
          }

          td {
            width: 159px;
            height: 50px;
            border: 1px solid rgba(221, 221, 221, 1);
            border-collapse: collapse;
            text-align: center;

            span {
              color: #26A3F3;
              cursor: pointer;
            }
          }

          td:nth-of-type(1) {

            span {
              color: #333;
              cursor: default;
            }
          }
        }
      }
    }
  }

</style>

