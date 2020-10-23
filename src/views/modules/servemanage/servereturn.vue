<!--退款单号填写-->
<template>
  <div class="mod-config">
    <div id="doctorSearch">
      <label class="agent_crux">
        手机号：
        <el-input style="width:140px;" placeholder="手机号" v-model="searchData.mobile" clearable></el-input>
      </label>
      <label>
        订单状态：
        <el-select placeholder="请选择" v-model="searchData.status" class="doctor" clearable>
          <el-option
            :key="inde"
            :label="item.name"
            :value="item.id"
            v-for="(item,inde) in enterpriseList"
          ></el-option>
        </el-select>
      </label>
      <label class>
        付款时间：
        <el-date-picker
          clearable
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd"
          range-separator=" - "
          start-placeholder="开始日期"
          type="daterange"
          v-model="qqTime"
        ></el-date-picker>
      </label>
      <label class>
        订单价值：
        <el-input placeholder v-model="searchData.startPrice" clearable></el-input>
        <span>-</span>
        <el-input placeholder v-model="searchData.endPrice" clearable></el-input>
      </label>
      <label class>
        退款金额：
        <el-input placeholder v-model="searchData.startRefundPrice" clearable></el-input>
        <span>-</span>
        <el-input placeholder v-model="searchData.endRefundPrice" clearable></el-input>
      </label>
      <label>
        快递公司：
        <el-select v-model="searchData.deliverWay" placeholder="请选择" clearable>
          <el-option
            v-for="item in options"
            :key="item.dataId"
            :value="item.dataId"
            :label="item.remark"
          ></el-option>
        </el-select>
      </label>
      <label>
         <el-button type="primary" @click="searchGoods()" style="padding:7px 18px">搜索</el-button>
        <!-- <button @click="searchGoods" class="chairman_sunch">搜索</button> -->
      </label>
    </div>
    <el-table
      :data="dataList"
      @selection-change="selectionChangeHandle"
      border
      stripe
      style="width: 100%;"
      v-loading="dataListLoading"
    >
      <el-table-column align="center" header-align="center" label="订单ID" prop="orderNum"></el-table-column>
      <el-table-column align="center" header-align="center" label="用户手机" width="110" prop="mobile"></el-table-column>
      <el-table-column align="center" header-align="center" label="用户昵称" prop="nickname"></el-table-column>
      <el-table-column align="center" header-align="center" label="用户地区" prop="userAddress"></el-table-column>
      <el-table-column align="center" header-align="center" label="付款时间" prop="payTime"></el-table-column>
      <el-table-column align="center" header-align="center" label="总金额" prop="sumPrice" width="80"></el-table-column>
      <el-table-column align="center" header-align="center" label="订单价值" prop="price" width="80"></el-table-column>
      <el-table-column align="center" header-align="center" label="快递费用" prop="freight" width="80"></el-table-column>
      <el-table-column
        align="center"
        header-align="center"
        label="打款金额"
        prop="amountMoney"
        width="80"
      ></el-table-column>
      <el-table-column
        align="center"
        header-align="center"
        label="退款类型"
        prop="refundType"
        width="80"
      >
        <template slot-scope="scope">
          <el-tag size="small" type="danger" v-if="scope.row.refundType == 1">全额退款</el-tag>
          <el-tag size="small" type="warning" v-if="scope.row.refundType == 2">半额退款</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        header-align="center"
        label="退款金额"
        prop="refundPrice"
        width="80"
      ></el-table-column>
      <el-table-column align="center" header-align="center" label="申请时间" prop="refundApplyTime"></el-table-column>
      <el-table-column align="center" header-align="center" label="退款状态" prop="status" width="100">
        <template slot-scope="scope">
          <el-tag size="small" type="danger" v-if="scope.row.status === 0">待付款</el-tag>
          <el-tag size="small" type="primary" v-if="scope.row.status === 1">已付款</el-tag>
          <el-tag size="small" type="warning" v-if="scope.row.status === 2">待收货</el-tag>
          <el-tag size="small" type="success" v-if="scope.row.status === 3">已完成</el-tag>
          <el-tag size="small" type="info" v-if="scope.row.status === 4">客服审核</el-tag>
          <el-tag size="small" v-if="scope.row.status === 5">财务审核</el-tag>
          <p size="small" type v-if="scope.row.status === 6">退款完成</p>
          <p size="small" type v-if="scope.row.status === 7">仓储审核</p>
          <p size="small" type v-if="scope.row.status === 8">财务打款</p>
          <p size="small" type v-if="scope.row.status === 9">急速退款</p>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        header-align="center"
        label="快递公司"
        prop="trackingCompany"
        width="80"
      >
      </el-table-column>

      <el-table-column align="center" fixed="right" header-align="center" label="操作" width="160">
        <template slot-scope="scope">
          <el-button @click="addOrUpdateHandle(scope.row.orderId)" size="small" type="text">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--    {{dataList}}-->
    <el-pagination
      :current-page="pageIndex"
      :page-size="pageSize"
      :page-sizes="[10, 20, 50, 100]"
      :total="totalPage"
      @current-change="currentChangeHandle"
      @size-change="sizeChangeHandle"
      layout="total, sizes, prev, pager, next, jumper"
    ></el-pagination>
    <!-- 弹窗, 新增 / 修改 -->
    <add-or-update
      v-if="addOrUpdateVisible"
      ref="addOrUpdate"
      @refreshDataList="getDataList"
      @tuiHuoD="refundUpdateHandle"
      @wuliu="remark"
      @tuiHuoXin="tuihuoInfo"
    ></add-or-update>
    <refund-add v-if="refundVisible" ref="refundadd" @refreshDataList="getDataList"></refund-add>
    <indent-remark v-if="RemarkVisible" ref="IndentRemark" @refreshDataList="getDataList"></indent-remark>
  </div>
</template>
<script>
import AddOrUpdate from "./servereturn-add";
import RefundAdd from "./servereturn-xiugai";
import IndentRemark from "./servember";
export default {
  data() {
    return {
      dataForm: {
        key: "",
        time: ""
      },
      dictId: "",
      enterpriseList: [
        // {
        //   id: '0',
        //   name: "待付款"
        // },
        // {
        //   id: 1,
        //   name: "已付款"
        // },
        // {
        //   id: 2,
        //   name: "待收货"
        // },
        // {
        //   id: 3,
        //   name: "已完成"
        // },
        {
          id: 4,
          name: "客服审核"
        },
        // {
        //   id: 5,
        //   name: "财务审核"
        // },
        {
          id: 6,
          name: "退款完成"
        },
        {
          id: 7,
          name: "仓储审核"
        },
        {
          id: 8,
          name: "财务打款"
        },
        {
          id: 9,
          name: "急速退款"
        }
      ],
      dataList: [],
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      dataListLoading: false,
      dataListSelections: [],
      addOrUpdateVisible: false,
      refundVisible: false,
      RemarkVisible: false,
      options: [],
      value: "",
      qqTime: [],
      searchData: {}
    };
  },
  created() {
    //获取物流公司
    this.$http({
      url: this.$http.adornUrl("/ycyl/ycyldictdata/list"),
      method: "post",
      data: {
        dictValue: "delivery",
        pageSize: "30"
      }
    }).then(({ data }) => {
      if (data && data.code === 0) {
        this.options = data.page.list;
        this.options.unshift({
          remark: "全部"
        });
        this.value = this.options[0].dataId;
      } else {
        this.$message.error(data.msg);
      }
    });
  },
  components: {
    AddOrUpdate,
    RefundAdd,
    IndentRemark
  },
  activated() {
    this.getDataList();
  },
  methods: {
    tuihuoInfo(id) {
      //跳转
      this.RemarkVisible = true;
      this.$nextTick(() => {
        this.$refs.IndentRemark.init(id);
      });
    },
    searchGoods(pageIndex=1) {
      if (this.searchData.mobile && !/1\d{10}/.test(this.searchData.mobile)) {
        this.$message.error("手机号格式错误");
        return;
      }
      this.searchData.page = pageIndex;
      this.searchData.pageSize = this.pageSize;
      if (this.qqTime.length>1){
        this.searchData.endPayTime = this.qqTime[1]+' 23:59:59';
        this.searchData.startPayTime = this.qqTime[0]+' 00:00:00';
      }
      this.searchData.statuss=["4","5","6","7","8","9"]

      this.$http({
        url: this.$http.adornUrl("/ycyl/ycylorder/getForReturnOrder"),
        method: "post",
        data: this.searchData
      }).then(({ data }) => {
        if (data && data.code == 0) {
          // for (let k in this.searchData) {
          //   this.searchData[k] = "";
          // }
          // this.qqTime = [];
          // this.qqTimeb = [];
          this.dataList = data.page.list;
          this.totalPage = data.page.totalCount;
        } else {
          this.$message.error(data.msg);
        }
      });
    },
    // 获取数据列表
    getDataList() {
      this.dataListLoading = true;
      this.$http({
        url: this.$http.adornUrl("/ycyl/ycylorder/getForReturnOrder"),
        method: "post",
        data: {
          page: this.pageIndex,
          pageSize: this.pageSize,
          key: this.dataForm.key,
          statuss: ["4","5","6","7","8","9"]
        }
      }).then(({ data }) => {
        if (data && data.code === 0) {
          this.dataList = data.page.list;
          this.totalPage = data.page.totalCount;
        } else {
          this.dataList = [];
          this.totalPage = 0;
        }
        this.dataListLoading = false;
      });
    },
    // 每页数
    sizeChangeHandle(val) {
      this.pageSize = val;
      this.pageIndex = 1;
      this.searchGoods();
    },
    // 当前页
    currentChangeHandle(val) {
      this.pageIndex = val;
      this.searchGoods(this.pageIndex);
    },
    // 多选
    selectionChangeHandle(val) {
      this.dataListSelections = val;
    },
    // 详情
    addOrUpdateHandle(id) {
      this.addOrUpdateVisible = true;
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init(id);
      });
    },
    refundUpdateHandle(id) {
      this.refundVisible = true;
      this.$nextTick(() => {
        this.$refs.refundadd.init(id);
      });
    },
    remark(data) {
      this.RemarkVisible = true;
      this.$nextTick(() => {
        this.$refs.IndentRemark.init(data);
      });
    }
  }
};
</script>
<style lang="scss" scoped>
#doctorSearch {
  background-color: #eee;
  border-radius: 0.4rem;
  margin-bottom: 16px;
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
<style lang="scss">
.el-select-dropdown__wrap {
  max-height: 325px;
}
</style>
