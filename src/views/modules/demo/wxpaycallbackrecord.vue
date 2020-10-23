<template>
  <div class="mod-config">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
      <el-form-item>
        <el-input v-model="dataForm.key" placeholder="参数名" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="getDataList()">查询</el-button>
        <el-button v-if="isAuth('generator:wxpaycallbackrecord:save')" type="primary" @click="addOrUpdateHandle()">新增</el-button>
        <el-button v-if="isAuth('generator:wxpaycallbackrecord:delete')" type="danger" @click="deleteHandle()" :disabled="dataListSelections.length <= 0">批量删除</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="dataList"
      border
      v-loading="dataListLoading"
      @selection-change="selectionChangeHandle"
      style="width: 100%;">

      <el-table-column
        prop="id"
        header-align="center"
        align="center"
        label="">
      </el-table-column>
      <el-table-column
        prop="payOrderNo"
        header-align="center"
        align="center"
        label="订单号 pay_order_no">
      </el-table-column>
      <el-table-column
        prop="wxTransactionId"
        header-align="center"
        align="center"
        label="微信支付订单号 wx_transaction_id">
      </el-table-column>
      <el-table-column
        prop="appid"
        header-align="center"
        align="center"
        label="appId">
      </el-table-column>
      <el-table-column
        prop="mchId"
        header-align="center"
        align="center"
        label="mch_id">
      </el-table-column>
      <el-table-column
        prop="deviceInfo"
        header-align="center"
        align="center"
        label="device_info">
      </el-table-column>
      <el-table-column
        prop="resultCode"
        header-align="center"
        align="center"
        label="result_code">
      </el-table-column>
      <el-table-column
        prop="errCode"
        header-align="center"
        align="center"
        label="err_code">
      </el-table-column>
      <el-table-column
        prop="errCodeDes"
        header-align="center"
        align="center"
        label="err_code_des">
      </el-table-column>
      <el-table-column
        prop="openid"
        header-align="center"
        align="center"
        label="openid">
      </el-table-column>
      <el-table-column
        prop="isSubscribe"
        header-align="center"
        align="center"
        label="is_subscribe">
      </el-table-column>
      <el-table-column
        prop="tradeType"
        header-align="center"
        align="center"
        label="trade_type">
      </el-table-column>
      <el-table-column
        prop="bankType"
        header-align="center"
        align="center"
        label="bank_type">
      </el-table-column>
      <el-table-column
        prop="totalFee"
        header-align="center"
        align="center"
        label="total_fee">
      </el-table-column>
      <el-table-column
        prop="settlementTotalFee"
        header-align="center"
        align="center"
        label="settlement_total_fee">
      </el-table-column>
      <el-table-column
        prop="feeType"
        header-align="center"
        align="center"
        label="fee_type">
      </el-table-column>
      <el-table-column
        prop="cashFee"
        header-align="center"
        align="center"
        label="cash_fee">
      </el-table-column>
      <el-table-column
        prop="cashFeeType"
        header-align="center"
        align="center"
        label="cash_fee_type">
      </el-table-column>
      <el-table-column
        prop="couponCount"
        header-align="center"
        align="center"
        label="coupon_count">
      </el-table-column>
      <el-table-column
        prop="couponFee"
        header-align="center"
        align="center"
        label="coupon_fee_$n">
      </el-table-column>
      <el-table-column
        prop="attach"
        header-align="center"
        align="center"
        label="attach">
      </el-table-column>
      <el-table-column
        prop="timeEnd"
        header-align="center"
        align="center"
        label="time_end">
      </el-table-column>
      <el-table-column
        prop="addTime"
        header-align="center"
        align="center"
        label="add_time">
      </el-table-column>
      <el-table-column
        fixed="right"
        header-align="center"
        align="center"
        width="150"
        label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="addOrUpdateHandle(scope.row.id)">修改</el-button>
          <el-button type="text" size="small" @click="deleteHandle(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="sizeChangeHandle"
      @current-change="currentChangeHandle"
      :current-page="pageIndex"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pageSize"
      :total="totalPage"
      layout="total, sizes, prev, pager, next, jumper">
    </el-pagination>
    <!-- 弹窗, 新增 / 修改 -->
    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"></add-or-update>
  </div>
</template>

<script>
  import AddOrUpdate from './wxpaycallbackrecord-add-or-update'
  export default {
    data () {
      return {
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
      this.getDataList()
    },
    methods: {
      // 获取数据列表
      getDataList () {
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl('/generator/wxpaycallbackrecord/list'),
          method: 'get',
          params: this.$http.adornParams({
            'page': this.pageIndex,
            'limit': this.pageSize,
            'key': this.dataForm.key
          })
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
      // 新增 / 修改
      addOrUpdateHandle (id) {
        this.addOrUpdateVisible = true
        this.$nextTick(() => {
          this.$refs.addOrUpdate.init(id)
        })
      },
      // 删除
      deleteHandle (id) {
        var ids = id ? [id] : this.dataListSelections.map(item => {
          return item.id
        })
        this.$confirm(`确定对[id=${ids.join(',')}]进行[${id ? '删除' : '批量删除'}]操作?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http({
            url: this.$http.adornUrl('/generator/wxpaycallbackrecord/delete'),
            method: 'post',
            data: this.$http.adornData(ids, false)
          }).then(({data}) => {
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
