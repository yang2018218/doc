<template>
  <div class="mod-config">
    <div id="doctorSearch">
      <label class="agent_crux">
        手机号：
        <el-input placeholder="手机号" style="width:126px;" v-model="searchData.mobile" clearable></el-input>
      </label>
      <label class="agent_crux">
        姓名：
        <el-input placeholder="姓名" v-model="searchData.nickname" clearable></el-input>
      </label>
      <label class="agent_crux">
        订单Id：
        <el-input placeholder="订单id" v-model="searchData.orderNum" style="width:188px;" clearable></el-input>
      </label>

      <label>
        订单状态：
        <el-select placeholder="请选择" v-model="searchData.status" class="doctor" clearable>
          <el-option
            :key="inde" :label="item.name" :value="item.id" v-for="(item,inde) in enterpriseList">
          </el-option>
        </el-select>
      </label>
      <label class="">
        申请时间：
        <el-date-picker
          end-placeholder="结束日期"
          value-format='yyyy-MM-dd'
          range-separator=" - "
          start-placeholder="开始日期"
          type="daterange"
          v-model="qqTime" clearable>
        </el-date-picker>
      </label>
      <label class="">
        进货价值：
        <el-input placeholder="" v-model="searchData.startPrice" clearable></el-input>
        <span>-</span>
        <el-input placeholder="" v-model="searchData.endPrice" clearable></el-input>
      </label>
      <label>
        <el-button type="primary" @click="searchGoods()" style="padding:7px 18px">搜索</el-button>
      </label>
    </div>

    <el-table
      :data="dataList"
      @selection-change="selectionChangeHandle"
      border
      stripe
      style="width: 100%;"
      v-loading="dataListLoading">
      <!--  -->
      <el-table-column
        align="center"
        header-align="center"
        label="订单ID"
        prop="orderNum">
      </el-table-column>
      <el-table-column align="center" header-align="center" label="用户昵称" prop="nickname">
      </el-table-column>
      <el-table-column align="center" header-align="center" label="用户手机号" prop="mobile">
      </el-table-column>
      <el-table-column
        align="center"
        header-align="center"
        label="订单类型"
        prop="">
        <template slot-scope="scope">
          <el-tag size="small" type="danger" v-if="scope.row.orderProperty === 1">自购单</el-tag>
          <el-tag size="small" type="info" v-if="scope.row.orderProperty === 2">购物单</el-tag>
          <el-tag size="small" type="success" v-if="scope.row.orderProperty === 3">进货单</el-tag>
          <el-tag size="small" type="success" v-if="scope.row.orderProperty === 4">视频单</el-tag>

        </template>
      </el-table-column>
      <el-table-column align="center" header-align="center" label="用户区域" prop="userAddress">
      </el-table-column>
      <el-table-column align="center" header-align="center" label="申请时间" prop="refundApplyTime">
      </el-table-column>

      <el-table-column align="center" header-align="center" label="订单价值" prop="price">
      </el-table-column>
      <el-table-column align="center" header-align="center" label="退款类型">
        <template slot-scope="scope">
          <span>{{scope.row.refundType==1?'全额退款':'部分退款'}} </span>
        </template>
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
        </template>
      </el-table-column>

      <el-table-column align="center" fixed="right" header-align="center" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="addOrUpdateHandle(scope.row.orderId)" size="small" type="text">详情</el-button>
          <!--          <el-button @click="replenis(scope.row.agentUserId)" size="small" type="text">库存状况</el-button>-->
          <!--          <el-button @click="deleteHandle(scope.row.orderId)" size="small" type="text">删除</el-button>-->
        </template>
      </el-table-column>
    </el-table>

    <el-pagination :current-page="pageIndex" :page-size="pageSize" :page-sizes="[10, 20, 50, 100]" :total="totalPage"
                   @current-change="currentChangeHandle" @size-change="sizeChangeHandle"
                   layout="total, sizes, prev, pager, next, jumper">
    </el-pagination>
    <!-- 弹窗, 新增 / 修改 -->
    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"></add-or-update>
  </div>
</template>

<script>
  import AddOrUpdate from './salesreturn0-add'

  export default {
    data () {
      return {

        dataForm: {
          key: '',
          time: '',
        },
        dictId: '',
        enterpriseList: [{
          id: '0',
          name: '待付款'
        }, {
          id: 1,
          name: '已付款'
        }, {
          id: 2,
          name: '待收货'
        }, {
          id: 3,
          name: '已完成'
        }, {
          id: 4,
          name: '客服审核'
        }, {
          id: 8,
          name: '财务打款'
        }, {
          id: 6,
          name: '退款完成'
        }, {
          id: 7,
          name: '仓库审核'
        },

        ],
        options: [{
          dataId: 1,
          dictName: '全额退款'
        }, {
          dataId: 2,
          dictName: '部分退款'
        }

        ],
        dataList: [],
        pageIndex: 1,
        pageSize: 10,
        totalPage: 0,
        dataListLoading: false,
        dataListSelections: [],
        addOrUpdateVisible: false,
        searchData: {
          status:6
        },
        qqTime: [],

      }
    },
    components: {
      AddOrUpdate
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
        if (this.qqTime && this.qqTime.length == 2) {
          this.searchData.endCreateTime = this.qqTime[1]+" 23:59:59"
          this.searchData.startCreateTime = this.qqTime[0]+" 00:00:00"
        }
        this.searchData.page = this.pageIndex
        this.searchData.pageSize = this.pageSize
        this.$http({
          url: this.$http.adornUrl('/ycyl/ycylorder/getPageList'),
          method: 'post',
          data: this.searchData
        }).then(({
          data
        }) => {
          if (data && data.code == 0) {
            this.dataList = data.page.list
            this.totalPage = data.page.totalCount
          } else {

            this.$message.error(data.msg)
          }
        })
      },
      //路径跳转
      replenis (id) {
        this.$router.push({
          path: '/producttian',
          query: {
            agentUserId: id
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
            //  "refundType": 3,
            'status': 6
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
        this.searchGoods()
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
    }
  }
</script>
<style lang="scss" scoped>
  #doctorSearch {
    background-color: #eee;
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
