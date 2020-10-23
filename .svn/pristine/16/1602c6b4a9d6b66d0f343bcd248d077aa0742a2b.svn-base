<template>
  <div class="mod-config">
    <el-table
      :data="dataList"
      :v-loading="loading"
      @selection-change="selectionChangeHandle"
      border
      style="width: 100%;"
      v-loading="dataListLoading"
    >
      <el-table-column align="center" header-align="center" label="订单ID" prop="orderNum"></el-table-column>
      <el-table-column align="center" header-align="center" label="订单属性" prop>
        <template slot-scope="scope">
          <el-tag size="small" type="danger" v-if="scope.row.orderProperty === 1">自购单</el-tag>
          <el-tag size="small" type="info" v-if="scope.row.orderProperty === 2">购物单</el-tag>
          <el-tag size="small" type="success" v-if="scope.row.orderProperty === 3">进货单</el-tag>
          <el-tag size="small" type="success" v-if="scope.row.orderProperty === 4">视频单</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" header-align="center" label="付款时间" prop="payTime"></el-table-column>
      <el-table-column align="center" header-align="center" label="联系电话" prop="mobile"></el-table-column>
      <!--      <el-table-column align="center" header-align="center" label="实付金额" prop="price"></el-table-column>-->
      <el-table-column align="center" header-align="center" label="订单价值" prop="price">
        <div slot-scope="scope">
          <span>{{scope.row.price+scope.row.voucherMoney}}</span>
        </div>
      </el-table-column>
      <el-table-column align="center" header-align="center" label="订单状态" prop="status">
        <template slot-scope="scope">
          <el-tag size="small" type="danger" v-if="scope.row.status === 0">待付款</el-tag>
          <el-tag size="small" type="primary" v-if="scope.row.status === 1">已付款</el-tag>
          <el-tag size="small" type="warning" v-if="scope.row.status === 2">待收货</el-tag>
          <el-tag size="small" type="success" v-if="scope.row.status === 3">已完成</el-tag>
          <el-tag size="small" type="info" v-if="scope.row.status === 4">客服审核</el-tag>
          <el-tag size="small" v-if="scope.row.status === 5">财务审核</el-tag>
          <p size="small" type v-if="scope.row.status === 6">退款完成</p>
          <p size="small" type v-if="scope.row.status === 7">仓库审核</p>
          <p size="small" type v-if="scope.row.status === 8">财务退款</p>
          <p size="small" type v-if="scope.row.status === 9">急速退款</p>
        </template>
      </el-table-column>
      <el-table-column align="center" fixed="right" header-align="center" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="addOrUpdateHandle(scope.row)" size="small" type="text">去出库</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :current-page="pageIndex"
      :page-size="pageSize"
      :page-sizes="[10, 20, 50, 100]"
      :total="totalPage"
      @current-change="currentChangeHandle"
      @size-change="sizeChangeHandle"
      layout="total, sizes, prev, pager, next, jumper"
    ></el-pagination>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        visibleNew: false,
        sta: 1,
        dataForm: {
          key: '',
          time: ''
        },
        dictId: '',
        enterpriseList: [
          //订单状态
          {
            id: '0',
            name: '待付款'
          },
          {
            id: 1,
            name: '已付款'
          },
          {
            id: 2,
            name: '待收货'
          },
          {
            id: 3,
            name: '已完成'
          },
          {
            id: 4,
            name: '客服审核'
          },
          {
            id: 5,
            name: '财务审核'
          },
          {
            id: 6,
            name: '退款完成'
          },
          {
            id: 7,
            name: '仓库审核'
          },
          {
            id: 8,
            name: '财务打款'
          },
          {
            id: 9,
            name: '急速退款'
          }
        ],
        enterpriseArr: [
          //订单属性
          {
            id: 1,
            name: '自购单'
          },
          {
            id: 2,
            name: '购物单'
          },
          {
            id: 3,
            name: '进货单'
          },
          {
            id: 4,
            name: '视频单'
          }
        ],
        dict: 1,
        dataList: [],
        pageIndex: 1,
        pageSize: 10,
        totalPage: 0,
        dataListLoading: false,
        dataListSelections: [],
        addOrUpdateVisible: false,
        options: [],
        value: '', //选中的快递公司
        searchData: {},
        qqTime: [],
        loading: true
      }
    },
    activated () {
      this.getDataList()
    },
    methods: {
      searchGoods () {
        if (this.searchData.mobile && !/1\d{10}/.test(this.searchData.mobile)) {
          this.$message.error('手机号格式错误')
          return
        }
        this.searchData.page = this.pageIndex
        this.searchData.pageSize = this.pageSize
        this.searchData.orderProperty = this.dictId
        if (this.dict === ' ') {
          delete this.searchData.status
        } else {
          this.searchData.status = this.dict
        }
        this.searchData.endCreateTime = this.qqTime[1]
        this.searchData.startCreateTime = this.qqTime[0]
        this.searchData.deliverWay = this.value;
        (this.searchData.outboundWay = 1), (this.searchData.jump = 1)
        this.$http({
          url: this.$http.adornUrl('/ycyl/ycylorder/getOutboundOrder'),
          method: 'post',
          data: this.searchData
        }).then(({data}) => {
          if (data && data.code == 0) {
            for (let k in this.searchData) {
              this.searchData[k] = ''
            }
            this.dictId = ''
            this.qqTime = []
            this.value = ''
            this.dict = ''
            this.dataList = data.page.list
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
          url: this.$http.adornUrl('/ycyl/ycylorder/getOutboundOrder'),
          method: 'post',
          data: {
            page: this.pageIndex,
            pageSize: this.pageSize,
            key: this.dataForm.key,
            status: this.sta,
            outboundWay: 1,
            jump: 1
          }
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
      // 每页数
      sizeChangeHandle (val) {
        this.pageSize = val
        this.pageIndex = 1
        this.getDataList()
      },
      // 当前页
      currentChangeHandle (val) {
        this.pageIndex = val
        this.getDataList()
      },
      // 多选
      selectionChangeHandle (val) {
        this.dataListSelections = val
      },
      open (data) {
        this.$confirm('您要将该订单进行出库吗', '温馨提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            this.addOrUpdateHandle(data)

          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            })
          })
      },
      addOrUpdateHandle (data) {
        // 开始加入出库单
        if (this.sta == 1) {
          this.$http({
            url: this.$http.adornUrl('/ycyl/ycylorder/outbound'),
            method: 'post',
            data: {
              orderId: data.orderId
            }
          }).then(({data}) => {
            if (data && data.code === 0) {
              this.$message({
                type: 'success',
                message: '添加成功!'
              })
              this.getDataList()
            } else {
              this.dataList = []
              this.totalPage = 0
            }
          })
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  #doctorSearch {
    background-color: #eeeeee;
    border-radius: 0.4rem;
    padding: 10px 5px;
    margin-bottom: 16px;

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
<style lang="scss">
  .el-select-dropdown__wrap {
    max-height: 325px;
  }
</style>
