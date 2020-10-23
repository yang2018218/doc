<template>
  <div class="mod-config">
    <div class="searchBox">
      <label>
        购买时间：
        <el-date-picker
          width="200px"
          v-model="dataTime"
          value-format="yyyy-MM-dd"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </label>
      <label>
        订单状态：
        <el-select v-model="searchData.status" placeholder="请选择" clearable>
          <el-option
            v-for="item in statusList"
            :key="item.val"
            :label="item.name"
            :value="item.val">
          </el-option>
        </el-select>
      </label>

      <label>
        <el-button type="success" class="searchStyle" @click="search()">搜索</el-button>
      </label>
    </div>
    <header class="searchBox ">

      <label><span>订单金额：{{orderMoney}}</span></label>
      <label><span>提成：{{deductMoney}}</span></label>
      <label >
        <el-popover
          placement="bottom"
          width="160"
          v-model="visibleExcel" >
          <p>{{text}}</p>
          <div style="text-align: right; margin: 0">
            <el-button size="mini" type="text" @click="visibleExcel = false">取消</el-button>
            <el-button :disabled="isdisabled" type="primary" size="mini" @click="visibleExcel = false">
              <a :href="this.excelPath" style="list-style: none">确定</a>
            </el-button>
          </div>
          <el-button slot="reference" type="success" class="excel" style="padding: 8px 20px;float: right" @click="downloadFile()">
            下载文件
          </el-button>
          <div style="clear: both"></div>
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
        label="订单号"
      >
      </el-table-column>
      <el-table-column
        prop="buyTime"
        header-align="center"
        align="center"
        label="购买时间">
      </el-table-column>
      <el-table-column
        prop="nikename"
        header-align="center"
        align="center"
        label="用户昵称">
      </el-table-column>
      <el-table-column
        prop="mobile"
        header-align="center"
        align="center"
        label="用户电话"
      >
      </el-table-column>
      <el-table-column
        prop="deliverTimes"
        header-align="center"
        align="center"
        label="发货时间">
      </el-table-column>
      <el-table-column
        prop="orderMoney"
        header-align="center"
        align="center"
        label="价值"
        width="110">
      </el-table-column>
      <el-table-column
        prop="deductMoney"
        header-align="center"
        align="center"
        label="提成"
        width="110">
      </el-table-column>
      <el-table-column
        prop="deductMoney"
        header-align="center"
        align="center"
        label="订单状态"
        width="120">
        <template slot-scope="scope">
          <span>{{fn(scope.row.status)}}</span>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        header-align="center"
        align="center"
        width="150"
        label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="addOrUpdateHandle(scope.row.orderId)">详细</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @size-change="sizeChangeHandle" @current-change="currentChangeHandle" :current-page="pageIndex"
                   :page-sizes="[10, 20, 50, 100]" :page-size="pageSize" :total="totalPage"
                   layout="total, sizes, prev, pager, next, jumper">
    </el-pagination>
    <!-- 弹窗, 新增 / 修改 -->
    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"></add-or-update>
  </div>
</template>
<script>
  import AddOrUpdate from './useragent-new-age-add'

  export default {
    data () {
      return {
        orderMoney:'0',//订单金额
        deductMoney:'0',//提成
        isdisabled:false,
        excelPath:"",
        text:'数据正在处理，请等待...',
        visibleExcel:false,//按钮
        searchData:{},
        dataTime:'',
        statusList: [
          {
            name: '未付款',
            val: '0'
          },
          {
            name: '已付款',
            val: '1'
          },
          {
            name: '已发货',
            val: '2'
          },
          {
            name: '已完成',
            val: '3'
          },
          {
            name: '客服审核',
            val: '4'
          }, {
            name: '退款完成',
            val: '6'
          },
          {
            name: '主仓审核',
            val: '7'
          },
          {
            name: '财务打款',
            val: '8'
          },
          {
            name: '急速退款',
            val: '9'
          },

        ],
        id:'',
        dataForm: {
          key: ''
        },
        dataList: [],
        pageIndex: 1,
        pageSize: 10,
        totalPage: 0,
        dataListLoading: false,
        dataListSelections: [],
        addOrUpdateVisible: false
      }
    },
    components: {
      AddOrUpdate
    },
    activated () {
      this.getDataList(this.$route.query.userId)
    },
    methods: {
      downloadFile () {//导出信息
        const loading = this.$loading({
          lock: true,
          text: '下载中...',
          spinner: 'el-icon-loading',
          background: 'rgba(255, 255, 255, 0.7)'
        });
        if (this.dataTime && this.dataTime.length > 1) {
          this.searchData.startBuyTime = this.dataTime[0]+' 00:00:00'
          this.searchData.endBuyTime = this.dataTime[1]+' 23:59:59'
        }
        // this.$message.error('接口未完善')
        this.$http({
          url: this.$http.adornUrl('/ycyl/ycylagentperformance/getAgentPerReq'),
          method: 'post',
          data: this.searchData
        }).then(({data}) => {
          if (data && data.code === 0) {

            this.excelPath = data.path
            window.location.href=this.excelPath
            this.isdisabled = false
            loading.close()
          } else {
            this.dataList = []
            this.totalPage = 0
          }
        })
      },
      search (pageIndex=1) {//搜索
        this.getSumPrice()
        this.searchData.page = pageIndex
        this.searchData.pageSize = this.pageSize
        this.searchData.key = this.dataForm.key
        if (this.dataTime && this.dataTime.length > 1) {
          this.searchData.startBuyTime = this.dataTime[0]+' 00:00:00'
          this.searchData.endBuyTime = this.dataTime[1]+' 23:59:59'
        }
        this.$http({
          url: this.$http.adornUrl('/ycyl/ycylagentperformance/getPageList'),
          method: 'post',
          data: this.searchData
        }).then(({data}) => {
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
      getSumPrice(){//视频单业绩
        if (this.dataTime && this.dataTime.length > 1) {
          this.searchData.startBuyTime = this.dataTime[0]+' 00:00:00'
          this.searchData.endBuyTime = this.dataTime[1]+' 23:59:59'
        }
        this.searchData.userId = this.id
        this.$http({
          url: this.$http.adornUrl('/ycyl/ycylagentperformance/getSumPrice'),
          method: 'post',
          data: this.searchData
        }).then(({data}) => {
          if (data && data.code === 0) {
            if (data.price){
              this.orderMoney = data.price.orderMoney
              this.deductMoney = data.price.deductMoney
            }else {
              this.orderMoney = 0
              this.deductMoney =0
            }


          } else {
            this.$message.error(data.msg)
          }
          this.dataListLoading = false
        })
      },

      // 获取数据列表
      getDataList (id) {
        this.id = id
        this.getSumPrice()
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl('/ycyl/ycylagentperformance/getPageList'),
          method: 'post',
          data: ({
            'page': this.pageIndex,
            'pageSize': this.pageSize,
            'key': this.dataForm.key,
            'userId': id
          })
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
        this.getDataList(this.id)
      },
      // 当前页
      currentChangeHandle (val) {
        this.pageIndex = val
        this.getDataList(this.id)
      },
      // 多选
      selectionChangeHandle (val) {
        this.dataListSelections = val
      },
      // 详情
      addOrUpdateHandle (id) {
        this.addOrUpdateVisible = true
        this.$nextTick(() => {
          this.$refs.addOrUpdate.init(id)
        })
      },
      fn (ele) {
        switch (ele) {
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
      }
    }
  }
</script>
<style scoped lang="scss">
  .mod-config {
    .searchBox {
      background-color: #eee;
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
  }
</style>
