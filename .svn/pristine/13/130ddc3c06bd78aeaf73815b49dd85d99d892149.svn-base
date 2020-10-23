<template>
  <!--  某个医生所有案例-->
  <div class="mod-config">
    <div class="searchBox">
      <label>
        付款时间：
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
        诊疗时间：
        <el-date-picker
          width="200px"
          v-model="diagnosisTime"
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
      <label><span>开出药单价值：{{allorderMoney}}元</span></label>
      <label><span>订单金额：{{orderMoney}}元</span></label>
      <label><span>提成：{{doctorMoney}}元</span></label>
      <label style="float: right">
            <el-button slot="reference" type="warning" class="excel" style="padding: 8px 20px" @click="downloadFile()">
            下载文件
          </el-button>
      </label>
    </header>
    <el-table
      :data="dataList"
      @selection-change="selectionChangeHandle"
      border
      style="width:100%;"
      v-loading="dataListLoading"
    >
      <el-table-column align="center" header-align="center" label="药单号" prop="orderNum">
        <div slot-scope="scope">
          <span v-if="scope.row.consulNum">{{scope.row.consulNum}}</span>
          <span v-if="scope.row.diagnosisNum">{{scope.row.diagnosisNum}}</span>
          <span v-if="!scope.row.diagnosisNum && !scope.row.consulNum">/</span>
        </div>

      </el-table-column>
      <el-table-column align="center" header-align="center" label="订单号" prop="orderNum"></el-table-column>
      <el-table-column align="center" header-align="center" label="诊疗时间" prop="createTime"></el-table-column>
      <el-table-column align="center" header-align="center" label="付款时间" prop="payTime">
        <div slot-scope="scope">
          <span v-if="scope.row.payTime">{{scope.row.payTime}}</span>
          <span v-else>/</span>
        </div>
      </el-table-column>
      <el-table-column align="center" header-align="center" label="指导老师" prop="teacherTruename"></el-table-column>
      <el-table-column align="center" header-align="center" label="审核医生" prop="">
        <div slot-scope="scope">
          <span v-if="scope.row.doctorTruename">{{scope.row.doctorTruename}}</span>
          <span v-else>/</span>
        </div>
      </el-table-column>
      <el-table-column align="center" header-align="center" label="药单价值" prop="orderMoney">
        <div slot-scope="scope">
          <span v-if="scope.row.orderMoney">{{scope.row.orderMoney}}</span>
          <span v-else>0</span>
        </div>
      </el-table-column>
      <el-table-column align="center" header-align="center" label="订单价格" prop="orderMoney">
        <div slot-scope="scope">
          <span v-if="scope.row.price">{{scope.row.price}}</span>
          <span v-else>0</span>
        </div>
      </el-table-column>
      <el-table-column align="center" header-align="center" label="提成" prop="orderMoney">
        <div slot-scope="scope">
          <span v-if="scope.row.deduct">{{scope.row.deduct}}</span>
          <span v-else>0</span>
        </div>
      </el-table-column>
      <el-table-column align="center" header-align="center" label="订单状态" prop="status">
        <template slot-scope="scope">
          <span size="small" v-if="scope.row.status === 0" style="color: #ff4d51">待付款</span>
          <span size="small" v-if="scope.row.status === 1" style="color: #05d3f5">已付款</span>
          <span size="small" v-if="scope.row.status === 2" style="color: #aa7700">待收货</span>
          <span size="small" v-if="scope.row.status === 3" style="color: #6ce26c">已完成</span>
          <span size="small" v-if="scope.row.status === 4" style="color: #00537d">客服审核</span>
          <span size="small" v-if="scope.row.status === 5" style="color: #3a87ad">财务审核</span>
          <span size="small" v-if="scope.row.status === 6" style="color: #66afe9">退款完成</span>
          <span size="small" v-if="scope.row.status === 7" style="color: #3b4249">仓库审核</span>
          <span size="small" v-if="scope.row.status === 8" style="color: #006F94">财务打款</span>
        </template>
      </el-table-column>
      <el-table-column align="center" fixed="right" header-align="center" label="操作" width="150">
        <template slot-scope="scope">
          <el-button @click="addOrUpdateHandle(scope.row.pId)" size="small" type="text">订单详情</el-button>
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
    <!-- 弹窗, 新增 / 修改 -->
    <add-or-update
      @refreshDataList="getDataList"
      ref="addOrUpdate"
      v-if="addOrUpdateVisible"
      v-bind:doctorCase="dataCase"
    ></add-or-update>
  </div>
</template>
<script>
import AddOrUpdate from "./DoctorPerformanceminute";

export default {
  data() {
    return {
      allorderMoney:'0',//开出药单价值
      orderMoney:'0',//订单金额
      doctorMoney:'0',//提成
      excelPath:"",
      visibleExcel:false,//按钮
      dataTime:[],//检索时间
      diagnosisTime:[],//诊疗时间
      searchData:{},//检索的条件
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
      teacherID: "",
      dataCase: "",
      dataForm: {
        key: ""
      },
      dataList: [],
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      dataListLoading: false,
      dataListSelections: [],
      addOrUpdateVisible: false
    };
  },
  components: {
    AddOrUpdate
  },
  activated() {
    this.teacherID = this.$route.query.userId;
    this.getDataList(this.$route.query.userId);
  },
  methods: {
    downloadFile () {//导出信息
      const loading = this.$loading({
        lock: true,
        text: '下载中...',
        spinner: 'el-icon-loading',
        background: 'rgba(255, 255, 255, 0.7)'
      });
      this.searchData.orderProperty='2'
      this.searchData.teacherUserId = this.teacherID
      if (this.diagnosisTime && this.diagnosisTime.length > 1) {
        this.searchData.startCreateTime = this.diagnosisTime[0]+' 00:00:00'
        this.searchData.endCreateTime = this.diagnosisTime[1]+' 23:59:59'
      }
      if (this.dataTime && this.dataTime.length > 1) {
        this.searchData.startPayTime = this.dataTime[0]+' 00:00:00'
        this.searchData.endPayTime = this.dataTime[1]+' 23:59:59'
      }
      this.$http({
        url: this.$http.adornUrl('/ycyl/ycyluserperformance/getForDocReq'),
        method: 'post',
        data: this.searchData
      }).then(({data}) => {
        if (data && data.code === 0) {
          this.excelPath = data.path
          window.location.href=this.excelPath
          loading.close()
        } else {
          loading.close()
         this.$message.error(data.msg)
        }
      })
    },
    search (pageIndex=1) {//搜索
      this.searchData.orderProperty='2'
        this.searchData.teacherUserId = this.teacherID
      this.getSumPrice()
      this.searchData.page= pageIndex,
      // this.searchData.teacherUserId = this.teacherID
      this.searchData.pageSize = this.pageSize
      this.searchData.key = this.dataForm.key
      if (this.diagnosisTime && this.diagnosisTime.length > 1) {
        this.searchData.startCreateTime = this.diagnosisTime[0]+' 00:00:00'
        this.searchData.endCreateTime = this.diagnosisTime[1]+' 23:59:59'
      }
      if (this.dataTime && this.dataTime.length > 1) {
        this.searchData.startPayTime = this.dataTime[0]+' 00:00:00'
        this.searchData.endPayTime = this.dataTime[1]+' 23:59:59'
      }
      this.$http({
        url: this.$http.adornUrl('/ycyl/ycyluserperformance/getForDoc'),
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
    getSumPrice(){//统计
      if (this.diagnosisTime && this.diagnosisTime.length > 1) {
        this.searchData.startCreateTime = this.diagnosisTime[0]+' 00:00:00'
        this.searchData.endCreateTime = this.diagnosisTime[1]+' 23:59:59'
      }
      if (this.dataTime && this.dataTime.length > 1) {
        this.searchData.startPayTime = this.dataTime[0]+' 00:00:00'
        this.searchData.endPayTime = this.dataTime[1]+' 23:59:59'
      }
      this.searchData.orderProperty='2',
      this.searchData.teacherUserId=this.teacherID
      this.$http({
        url: this.$http.adornUrl('/ycyl/ycyluserperformance/getDocPrice'),
        method: 'post',
        data: this.searchData
      }).then(({data}) => {
        if (data && data.code === 0) {
          if (data.price){
            this.allorderMoney = data.price.orderMoney
            this.orderMoney = data.price.price
            this.doctorMoney = data.price.deduct
            if(!data.price.deduct){
              this.doctorMoney = 0
            }
          }else {
            this.allorderMoney = 0
            this.orderMoney = 0
            this.doctorMoney = 0
          }
        } else {
          this.$message.error(data.msg)
        }
        this.dataListLoading = false
      })
    },
    // 获取医生案例列表
    getDataList(doid) {
      this.getSumPrice()
      this.dataListLoading = true;
      this.$http({
        url: this.$http.adornUrl("/ycyl/ycyluserperformance/getForDoc"),
        method: "post",
        data: {
          page: this.pageIndex,
          pageSize: this.pageSize,
          orderProperty:'2',
          key: this.dataForm.key,
          teacherUserId: this.teacherID
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
    //单独案例
    rollsCourt(id) {
      this.dataListLoading = true;
      this.$http({
        url: this.$http.adornUrl("/ycyl/ycyluserperformance/getPageList"),
        method: "post",
        data: {
          page: this.pageIndex,
          pageSize: this.pageSize,
          key: this.dataForm.key,
          pId: id
        }
      }).then(({ data }) => {
        if (data && data.code === 0) {
          this.dataCase = data.page.list;
          this.totalPage = data.page.totalCount;
        } else {
          this.dataCase = [];
          this.totalPage = 0;
        }
        this.dataListLoading = false;
      });
    },
    // 每页数
    sizeChangeHandle(val) {
      this.pageSize = val;
      this.pageIndex = 1;
      this.search(this.pageIndex);
    },
    // 当前页
    currentChangeHandle(val) {
      this.pageIndex = val;
      this.search(this.pageIndex);
    },
    // 多选
    selectionChangeHandle(val) {
      this.dataListSelections = val;
    },
    // 案例详情
    addOrUpdateHandle(id) {
      this.addOrUpdateVisible = true;
      this.rollsCourt(id);

      this.$nextTick(() => {
        this.$refs.addOrUpdate.init();
      });
    },
    // 删除
    deleteHandle(id) {
      var ids = id
        ? [id]
        : this.dataListSelections.map(item => {
            return item.exaId;
          });
      this.$confirm(
        `确定对[id=${ids.join(",")}]进行[${id ? "删除" : "批量删除"}]操作?`,
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      ).then(() => {
        this.$http({
          url: this.$http.adornUrl("/ycyl/ycyluserdoctorexample/delete"),
          method: "post",
          data: this.$http.adornData(ids, false)
        }).then(({ data }) => {
          if (data && data.code === 0) {
            this.$message({
              message: "操作成功",
              type: "success",
              duration: 1500,
              onClose: () => {
                this.getDataList();
              }
            });
          } else {
            this.$message.error(data.msg);
          }
        });
      });
    }
  }
};
</script>
<style lang="scss" scoped>
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

