<template>
  <!--  客服个人详情页-->
  <div class="mod-config">
    <div id="doctorSearch">
      <label>订单号：
        <el-input
          style="width: 200px"
          placeholder="请输入单号"
          oninput="this.value = this.value.trim()"
          v-model="searchdata.orderNum"
          clearable>
        </el-input>
      </label>
      <label>用户电话：
        <el-input
          style="width: 144px"
          placeholder="请输入电话"
          oninput="this.value = this.value.trim()"
          v-model="searchdata.mobile"
          clearable>
        </el-input>
      </label>
      <label>
        <span class="nstration">付款时间：</span>
        <el-date-picker
          v-model="startPayTime"
          type="date"
          value-format='yyyy-MM-dd 00:00:00'
          placeholder="选择日期" style="width: 144px">
        </el-date-picker>
        -
        <el-date-picker
          v-model="endPayTime"
          type="date"
          value-format='yyyy-MM-dd 23:59:59'
          placeholder="选择日期" style="width: 144px">
        </el-date-picker>
      </label>
      <label class="agent_crux">
        状态：
        <el-select v-model="searchdata.status" placeholder="请选择">
          <el-option
            v-for="item in statusList"
            :key="item.value"
            :label="item.label"
            :value="item.sta">
          </el-option>
        </el-select>
      </label>
      <label>
        <button class="chairman_sunch" @click="searchMthod()">搜索</button>
      </label>
    </div>
    <header class="searchBox ">
      <label><span>订单金额：{{orderMoney}}元</span></label>
      <label><span>提成：{{deductMoney}}元</span></label>
      <label>
        <!--        <download-excel-->
        <!--          class = "export-excel-wrapper"-->
        <!--          :data = "json_data"-->
        <!--          :fields = "json_fields"-->
        <!--          name = "远程诊断报告导出.xls">-->
        <!--          <el-button type="primary" size="small">导出EXCEL</el-button>-->
        <!--        </download-excel>-->
      </label>
      <label style="float: right">
        <el-popover
          placement="top"
          width="160"
          v-model="visibleExcel">
          <p>{{text}}</p>
          <div style="text-align: right; margin: 0">
            <el-button size="mini" type="text" @click="visibleExcel = false" style="margin-right:20px ">取消</el-button>
            <el-button type="primary" size="mini" style="margin: 0;padding: 0;cursor:auto ">
              <download-excel
                style="mso-number-format:'\@';"
                class="export-excel-wrapper"
                :data="jsonlist"
                :fields="json_fields"
                name="客服业绩表格.xls">
                <el-button type="primary" size="mini" @click="visibleExcel = false" :disabled="isDisabled">确定
                </el-button>
              </download-excel>
            </el-button>
          </div>
          <el-button slot="reference" type="warning" class="excel" style="padding: 8px 20px" @click="downloadFile()">
            下载文件
          </el-button>
        </el-popover>
      </label>
    </header>

    <el-table
      :data="dataList"
      border
      stripe
      v-loading="dataListLoading"
      @selection-change="selectionChangeHandle"
      style="width: 100%;">

      <el-table-column
        prop="orderNum"
        header-align="center"
        align="center"
        label="订单号">
      </el-table-column>
      <el-table-column
        prop="serviceName"
        header-align="center"
        align="center"
        label="客服姓名">
      </el-table-column>
      <el-table-column
        prop="orderProperty"
        header-align="center"
        align="center"
        label="订单属性"
        width="100">
        <div slot-scope="scope">
          <span v-if="scope.row.orderProperty=='1'">自购单</span>
          <span v-if="scope.row.orderProperty=='2'">购物单</span>
          <span v-if="scope.row.orderProperty=='3'">进货单</span>
          <span v-if="scope.row.orderProperty=='4'">视频单</span>
        </div>
      </el-table-column>
      <el-table-column
        prop="mobile"
        header-align="center"
        align="center"
        label="用户手机">
      </el-table-column>
      <el-table-column
        prop="nickname"
        header-align="center"
        align="center"
        label="用户昵称">
      </el-table-column>
      <el-table-column
        prop="payTime"
        header-align="center"
        align="center"
        label="付款时间">
        <div slot-scope="scope">
          <span v-if="scope.row.payTime">{{scope.row.payTime}}</span>
          <span v-if="!scope.row.payTime">/</span>
        </div>
      </el-table-column>
      <el-table-column
        prop="price"
        header-align="center"
        align="center"
        label="订单金额">
        <div slot-scope="scope">
          <span>{{scope.row.price+scope.row.voucherMoney}}</span>
        </div>
      </el-table-column>
      <el-table-column
        prop=""
        header-align="center"
        align="center"
        label="提成" width="120">
        <div slot-scope="scope">
          <span v-if="scope.row.deduct">{{scope.row.deduct}}</span>
          <span v-else>/</span>
        </div>
      </el-table-column>
      <el-table-column
        prop='status'
        header-align="center"
        align="center"
        label="状态">
        <template slot-scope="scope">
          <el-tag size="small" type="danger" v-if="scope.row.status === 0">待付款</el-tag>
          <el-tag size="small" type="primary" v-if="scope.row.status === 1">已付款</el-tag>
          <el-tag size="small" type="warning" v-if="scope.row.status === 2">待收货</el-tag>
          <el-tag size="small" type="success" v-if="scope.row.status === 3">已完成</el-tag>
          <el-tag size="small" type="info" v-if="scope.row.status === 4">客服审核</el-tag>
          <el-tag size="small" v-if="scope.row.status === 5">财务审核</el-tag>
          <p size="small" type="" v-if="scope.row.status === 6">退款完成</p>
          <p size="small" type="" v-if="scope.row.status === 7">仓库审核</p>
          <p size="small" type="" v-if="scope.row.status === 8">财务退款</p>
          <p size="small" type="" v-if="scope.row.status === 9">急速退款</p>
        </template>
      </el-table-column>
      <el-table-column fixed="right" header-align="center" align="center" width="150" label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="addOrUpdateHandle(scope.row.orderId)">订单详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @size-change="sizeChangeHandle" @current-change="currentChangeHandle" :current-page="pageIndex"
                   :page-sizes="[10, 20, 50, 100]" :page-size="pageSize" :total="totalPage"
                   layout="total, sizes, prev, pager, next, jumper">
    </el-pagination>
    <!-- 订单详情 -->
    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"></add-or-update>
  </div>
</template>
<script>
  import AddOrUpdate from './servemanage-main-add'

  export default {
    data () {
      return {
        jsonlist: [],
        visibleExcel :false,
        text: '数据正在处理中，请稍后...',
        json_fields: {
          '订单号': 'orderNum',    //单号
          '客服姓名': 'serviceName', //名字
          '订单属性': 'orderType', //地区
          '用户昵称': 'nickname',
          '用户电话': 'mobile',
          '付款时间': 'payTime',
          '订单价值': 'price',
          '提成': 'deduct',
          '状态': 'statusName'
        },
        json_meta: [
          [
            {
              ' key ': ' charset ',
              ' value ': ' utf- 8 '
            }
          ]
        ],
        isDisabled: false,
        orderMoney: '0',
        deductMoney: '0',
        searchdata: {},
        endPayTime: '',
        status: '',
        endServiceTime: '',
        statusList: [{
          sta: '',
          label: '全部'
        }, {
          sta: '0',
          label: '未付款'
        }, {
          sta: '1',
          label: '已付款'
        }, {
          sta: '2',
          label: '待收货'
        },

          {
            sta: '3',
            label: '已完成'
          }, {
            sta: '4',
            label: '客服审核'
          }, {
            sta: '5',
            label: '财务审核'
          }, {
            sta: '6',
            label: '退款完成'
          }, {
            sta: '7',
            label: '仓库审核'
          }, {
            sta: '8',
            label: '财务退款'
          }
          , {
            sta: '9',
            label: '急速退款'
          },
        ],
        sta: '',
        truename: '',
        startPayTime: '',
        startServiceTime: '',
        dataForm: {
          key: ''
        },
        dataList: [],
        pageIndex: 1,
        pageSize: 10,
        totalPage: 0,
        dataListLoading: false,
        dataListSelections: [],
        addOrUpdateVisible: false,
        userId: '',
      }
    },
    components: {
      AddOrUpdate
    },
    activated () {
      this.getDataList()
      this.getSumPrice()
    },
    methods: {
      downloadFile () {//导出信息
        this.isDisabled = true
        this.searchdata.serviceUserId = this.userId
        if (this.endPayTime && this.startPayTime) {
          this.searchdata.endPayTime = this.endPayTime
          this.searchdata.startPayTime = this.startPayTime
        }
        this.$http({
          url: this.$http.adornUrl('/ycyl/ycyluserperformance/getForSerReq '),
          method: 'post',
          data: this.searchdata
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.isDisabled = false
            this.text = '数据整理完毕，请点击下载',
              data.list.map(e => {
                if (e.orderProperty == '1') {
                  e.orderType = '自购单'
                } else if (e.orderProperty == '2') {
                  e.orderType = '购物单'
                } else if (e.orderProperty == '3') {
                  e.orderType = '进货单'
                }else if (e.orderProperty == '4') {
                  e.orderType = '视频单'
                }

                if (e.status == '0') {
                  e.statusName = '待付款'
                } else if (e.status == '1') {
                  e.statusName = '已付款'
                } else if (e.status == '2') {
                  e.statusName = '待收货'
                } else if (e.status == '3') {
                  e.statusName = '已完成'
                } else if (e.status == '4') {
                  e.statusName = '客服审核'
                } else if (e.status == '6') {
                  e.statusName = '退款完成'
                } else if (e.status == '7') {
                  e.statusName = '主仓审核'
                } else if (e.status == '8') {
                  e.statusName = '财务打款'
                } else if (e.status == '9') {
                  e.statusName = '急速退款'
                }
              })
            this.jsonlist = data.list
          } else {
            this.$message.error(data.msg)
          }
        })

      },
      getSumPrice () {//视频单业绩
        this.searchdata.serviceUserId = this.userId
        if (this.endPayTime && this.startPayTime) {
          this.searchdata.endPayTime = this.endPayTime
          this.searchdata.startPayTime = this.startPayTime
        }
        this.$http({
          url: this.$http.adornUrl('/ycyl/ycyluserperformance/getSerPrice'),
          method: 'post',
          data: this.searchdata
        }).then(({data}) => {
          if (data && data.code === 0) {
            if (data.price&&data.price.price) {
              this.orderMoney = data.price.price
            } else {
              this.orderMoney = '0'
            }
            if (data.price&&data.price.deduct) {
              this.deductMoney = data.price.deduct
            } else {
              this.deduct = '0'
            }
          } else {
            this.$message.error(data.msg)
          }
        })
      },

      searchMthod (pageIndex = 1) {
        this.getSumPrice()
        this.searchdata.page = pageIndex
        this.searchdata.pageSize = this.pageSize
        this.searchdata.key = this.dataForm.key
        this.searchdata.serviceUserId = this.userId
        if (this.endPayTime && this.startPayTime) {
          this.searchdata.endPayTime = this.endPayTime
          this.searchdata.startPayTime = this.startPayTime
        }
        this.$http({
          url: this.$http.adornUrl('/ycyl/ycyluserperformance/getForSer'),
          method: 'post',
          data: this.searchdata
        }).then(({
          data
        }) => {
          if (data && data.code === 0) {
            this.dataList = data.page.list
            this.totalPage = data.page.totalCount
          } else {
            this.dataList = []
            this.totalPage = 0
          }
        })
      },
      statusManage (id, sta) {
        this.$http({
          url: this.$http.adornUrl('/sys/user/updateUserStatus'),
          method: 'post',
          data: {
            'userId': id,
            'userType': '4',
            'status': sta
          }
        }).then(({
          data
        }) => {
          this.getDataList()
          if (data && data.code === 0) {
          } else {
            this.dataList = []
            this.totalPage = 0
          }
        })
      },
      // 获取数据列表
      getDataList () {
        this.userId = this.$route.query.userID
        this.searchdata.page = this.pageIndex
        this.searchdata.pageSize = this.pageSize
        this.searchdata.key = this.dataForm.key
        this.searchdata.serviceUserId = this.userId
        this.$http({
          url: this.$http.adornUrl('/ycyl/ycyluserperformance/getForSer'),
          method: 'post',
          data: this.searchdata
        }).then(({
          data
        }) => {
          if (data && data.code === 0) {
            this.dataList = data.page.list
            this.totalPage = data.page.totalCount
          } else {
            this.dataList = []
            this.totalPage = 0
          }
          this.dataListLoading = false
        })
      },
      // 每页数
      sizeChangeHandle (val) {
        this.pageSize = val
        this.pageIndex = 1
        this.searchMthod(this.pageIndex)
      },
      // 当前页
      currentChangeHandle (val) {
        this.pageIndex = val
        this.searchMthod(this.pageIndex)
      },
      // 多选
      selectionChangeHandle (val) {
        this.dataListSelections = val
      },
      // 弹窗详情
      addOrUpdateHandle (id) {
        this.addOrUpdateVisible = true
        this.$nextTick(() => {
          this.$refs.addOrUpdate.init(id)
        })
      },
      // 删除
      deleteHandle (id) {
        var ids = id ? [id] : this.dataListSelections.map(item => {
          return item.dictId
        })
        this.$confirm(`确定对[id=${ids.join(',')}]进行[${id ? '删除' : '批量删除'}]操作?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http({
            url: this.$http.adornUrl('/generator/ycyldict/delete'),
            method: 'post',
            data: this.$http.adornData(ids, false)
          }).then(({
            data
          }) => {
            if (data && data.code === 0) {
              this.$message({
                message: '操作成功',
                type: 'success',
                duration: 1500,
                onClose: () => {
                  this.getDataList()
                }
              })
            } else {
              this.$message.error(data.msg)
            }
          })
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
  .searchBox {
    background-color: #eee;
    width: 100%;
    padding: 8px 0;
    margin-bottom: 10px;

    label {
      margin-left: 5px;
    }
  }

  header {
    background-color: #fff !important;

    label {
      font-size: 16px;
      margin-right: 20px;
    }
  }

  .el-dropdown-link:hover {
    color: #0BB2D4;
  }

  .el-dropdown-link {
    font-size: 12px;
    color: #19678E;
  }

  #doctorSearch {
    background-color: #eee;
    border-radius: 0.4rem;
    padding: 10px 5px;
    margin-bottom: 16px;

    .chairman_sunch {
      background-color: rgb(25, 103, 142);
      color: #fff;
      height: 32px;
      width: 64px;
      border-radius: 10%;
      margin-left: 10px;
      border: 1px solid transparent;
    }

    label {
      margin-top: 8px;
      display: inline-block;
      margin-left: 16px;
    }

    .el-input {
      width: 96px;
    }
  }
</style>
