<template>
  <!-- 财务退款管理 -->
  <div class="mod-config">
    <div id="doctorSearch">
      <label class="agent_crux">
        手机号：
        <el-input style="width:126px;" placeholder="手机号" v-model="searchData.mobile"></el-input>
      </label>
      <label class="agent_crux">
        地区：
        <el-input placeholder="用户地区" v-model="searchData.goodsAddress"></el-input>
      </label>
      <label>
        退款状态：
        <el-select placeholder="请选择" v-model="searchData.status" class="doctor" clearable>
          <el-option
            :key="inde" :label="item.name" :value="item.id" v-for="(item,inde) in enterpriseList">
          </el-option>
        </el-select>
      </label>
      <label class="">
        付款时间：
        <el-date-picker
          end-placeholder="结束日期"
          value-format='yyyy-MM-dd'
          range-separator=" - "
          start-placeholder="开始日期"
          type="daterange"
          v-model="value1">
        </el-date-picker>
      </label>
      <label class="">
        订单价值：
        <el-input placeholder="" v-model="searchData.startPrice"></el-input>
        <span>-</span>
        <el-input placeholder="" v-model="searchData.endPrice"></el-input>
      </label>
      <label class="">
        退款时间：
        <el-date-picker
          end-placeholder="结束日期"
          value-format='yyyy-MM-dd'
          range-separator=" - "
          start-placeholder="开始日期"
          type="daterange"
          v-model="value2">
        </el-date-picker>
      </label>
      <label class="">
        退款金额：
        <el-input placeholder="" v-model="searchData.startRefundPrice"></el-input>
        <span>-</span>
        <el-input placeholder="" v-model="searchData.endRefundPrice"></el-input>
      </label>
      <label>
        <button @click="searchGoods()" class="chairman_sunch">搜索</button>
      </label>
    </div>
    <el-table
      :data="dataList"
      @selection-change="selectionChangeHandle"
      border
      stripe
      style="width: 100%;"
      v-loading="dataListLoading">
      <el-table-column
        align="center"
        header-align="center"
        label="订单ID"
        prop="orderNum">
      </el-table-column>
      <el-table-column
        align="center"
        header-align="center"
        label="联系电话"
        prop="mobile">
      </el-table-column>
      <el-table-column
        align="center"
        header-align="center"
        label="用户昵称"
        prop="nickname">
      </el-table-column>
      <el-table-column
        align="center"
        header-align="center"
        label="用户地区"
        prop="userAddress">
      </el-table-column>
      <el-table-column
        align="center"
        header-align="center"
        label="付款时间"
        prop="createTime">
      </el-table-column>
      <el-table-column
        align="center"
        header-align="center"
        label="订单价值"
        prop="price">
        <div slot-scope="scope">
          <span>{{scope.row.price+scope.row.voucherMoney }}</span>
        </div>
      </el-table-column>
      <el-table-column
        align="center"
        header-align="center"
        label="退款金额"
        prop="refundPrice">
      </el-table-column>
      <el-table-column
        align="center"
        header-align="center"
        label="退款类型"
        prop="refundType">
        <template slot-scope="scope">
          <span v-if="scope.row.refundType==1">全额退款</span>
          <span v-if="scope.row.refundType==2">部分退款</span>
          <span v-if="!scope.row.refundType">/</span>
        </template>
      </el-table-column>
      <el-table-column align="center" header-align="center" label="退款申请时间" prop="refundApplyTime">
      </el-table-column>
      <el-table-column align="center" header-align="center" label="快递公司" prop="refundTrackingCompany">
      </el-table-column>
      <el-table-column align="center" header-align="center" label="退货快递单号" prop="refundTrackingNum">
      </el-table-column>

      <el-table-column align="center" header-align="center" label="订单状态" prop="status">
        <template slot-scope="scope">
          <el-tag size="small" type="danger" v-if="scope.row.status === 0">待付款</el-tag>
          <el-tag size="small" type="primary" v-if="scope.row.status === 1">已付款</el-tag>
          <el-tag size="small" type="warning" v-if="scope.row.status === 2">待收货</el-tag>
          <el-tag size="small" type="success" v-if="scope.row.status === 3">已完成</el-tag>
          <el-tag size="small" type="info" v-if="scope.row.status === 4">客服审核</el-tag>
          <el-tag size="small" v-if="scope.row.status === 5">财务审核</el-tag>
          <p size="small" type="" v-if="scope.row.status === 6">退款完成</p>
          <p size="small" type="" v-if="scope.row.status === 7">仓库审核</p>
          <p size="small" type="" v-if="scope.row.status === 8">财务打款</p>
          <p size="small" type="" v-if="scope.row.status === 9">急速退款</p>
        </template>
      </el-table-column>
      <el-table-column align="center" fixed="right" header-align="center" label="操作" width="130">
        <template slot-scope="scope">
          <el-button @click="addOrUpdateHandle(scope.row.orderId)" size="small" type="text">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination :current-page="pageIndex" :page-size="pageSize" :page-sizes="[10, 20, 50, 100]" :total="totalPage"
                   @current-change="currentChangeHandle" @size-change="sizeChangeHandle"
                   layout="total, sizes, prev, pager, next, jumper">
    </el-pagination>
    <!-- 弹窗, 详情 -->
    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"
                   @financeOpen="financeOpen"></add-or-update>
    <finance-open v-if="openVisible" ref="openvisible" @refreshDataList="getDataList"></finance-open>
  </div>
</template>

<script>
  import AddOrUpdate from './retreat-add'
  import FinanceOpen from './retreatfinance-open'

  export default {
    data () {
      return {
        dataForm: {
          key: '',
          time: '',
        },
        dictId: '',
        enterpriseList: [
          {id: 0, name: '待付款'},
          {id: 1, name: '已付款'},
          {id: 2, name: '待收货'},
          {id: 3, name: '已完成'},
          {
            id: 4,
            name: '客服审核'
          },
          // {
          //       id: 5,
          //       name: '财务审核'
          //   },
          {
            id: 6,
            name: '退款完成'
          }, {
            id: 7,
            name: '仓储审核'
          }, {
            id: 8,
            name: '财务打款'
          }, {
            id: 9,
            name: '急速退款'
          },
        ],
        dataList: [],
        pageIndex: 1,
        pageSize: 10,
        totalPage: 0,
        dataListLoading: false,
        dataListSelections: [],
        addOrUpdateVisible: false,
        openVisible: false,
        searchData: {
          status: '',
        },
        value1: [],
        value2: [],
      }
    },
    components: {
      AddOrUpdate,
      FinanceOpen
    },
    activated () {
      this.getDataList()
    },
    methods: {
      searchGoods (pageIndex = 1) {
        if (this.searchData.mobile && !/1\d{10}/.test(this.searchData.mobile)) {
          this.$message.error('手机号格式错误')
          return
        }
        this.searchData.page = pageIndex
        this.searchData.pageSize = this.pageSize
        if (this.value1.length > 1) {
          this.searchData.startCreatTime = this.value1[0] + ' 00:00:00'
          this.searchData.endCreatTime = this.value1[1] + ' 23:59:59'
        }
        if (this.value2.length > 1) {
          this.searchData.startRefundApplyTime = this.value2[0] + ' 00:00:00'
          this.searchData.endRefundApplyTime = this.value2[1] + ' 23:59:59'
        }
        if (this.searchData.status) {

          delete this.searchData.statuss
        }

        this.$http({
          url: this.$http.adornUrl('/ycyl/ycylorder/getPageList'),
          method: 'post',
          data: this.searchData
        }).then(({
          data
        }) => {
          if (data && data.code == 0) {
            this.dataList = data.page.list
            this.searchData.statuss = ['4', '5', '6', '7']
            this.totalPage = data.page.totalCount
          } else {
            this.$message.error(data.msg)
          }
        })
      },
      // 获取数据列表
      getDataList () {
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl('/ycyl/ycylorder/getPageList'),
          method: 'post',
          data: {
            'page': this.pageIndex,
            'pageSize': this.pageSize,
            'key': this.dataForm.key,
            'statuss': ['8', '9']
          }
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
        this.searchGoods()
      },
      // 当前页
      currentChangeHandle (val) {
        this.pageIndex = val
        this.searchGoods(this.pageIndex)
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
      financeOpen (id) {
        this.openVisible = true
        this.$nextTick(() => {
          this.$refs.openvisible.init(id)
        })
      },
    }
  }
</script>
<style lang="scss" scoped>
  #doctorSearch {
    // background-color: #E6FCCC;
    border-radius: 0.2rem;
    padding: 10px 5px;

    .chairman_sunch {
      background-color: rgb(25, 103, 142);
      color: #fff;
      height: 2rem;
      width: 4rem;
      border-radius: 10%;
      margin-left: 10px;
      border: 1px solid transparent;
    }

    label {
      margin-top: 0.5rem;
      display: inline-block;
      margin-left: 1rem;
    }

    .el-input {
      width: 6rem;
    }
  }
</style>
