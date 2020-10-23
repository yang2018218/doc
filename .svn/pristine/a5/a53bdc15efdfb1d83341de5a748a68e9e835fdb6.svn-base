
<template>
  <div class="send-ticket-info">
    <el-form
      :inline="true"
      :model="searchForm"
      :rules="searchFormRules"
      @keyup.enter.native="getDataList(1)"
      class="search-box"
    >
      <el-form-item label="代金券类型:">
        <el-select v-model="searchForm.voucherType" clearable class="typeSelect">
          <el-option label="代金券" value="1"></el-option>
          <el-option label="打折券" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="领取张数:" prop="startGetSheetDetail">
        <el-input v-model.number="searchForm.startGetSheetDetail" clearable class="num-box"></el-input> -
      </el-form-item>
      <el-form-item prop="endGetSheetDetail">
        <el-input v-model.number="searchForm.endGetSheetDetail" clearable class="num-box"></el-input>
      </el-form-item>
      <el-form-item label="使用张数:" prop="startUseSheetsDetail">
        <el-input v-model.number="searchForm.startUseSheetsDetail" clearable class="num-box"></el-input> -
      </el-form-item>
      <el-form-item prop="endUseSheetsDetail">
        <el-input v-model.number="searchForm.endUseSheetsDetail" clearable class="num-box"></el-input>
      </el-form-item>
      <el-form-item label="会员代金券面额:">
        <el-input v-model="searchForm.memberMinimum" clearable class="num-box2"></el-input>-
        <el-input v-model="searchForm.memberMaximum" clearable class="num-box2"></el-input>
      </el-form-item>
      <el-form-item label="非会员代金券面额:">
        <el-input v-model="searchForm.commonMinimum" clearable class="num-box2"></el-input>-
        <el-input v-model="searchForm.commonMaximum" clearable class="num-box2"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button style="padding:8px 20px;" type="primary" @click="getDataList(1)">搜索</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="dataList" border v-loading="dataListLoading">
      <el-table-column align="center" header-align="center" label="代金券ID" prop="voucherId"></el-table-column>
      <el-table-column align="center" header-align="center" label="代金券类型">
        <div slot-scope="scope">{{scope.row.voucherType==1?'代金券':'打折券'}}</div>
      </el-table-column>
      <el-table-column align="center" header-align="center" label="代金券来源">
        <div slot-scope="scope">{{scope.row.dataType==2?'发放':'获取'}}</div>
      </el-table-column>
      <el-table-column align="center" header-align="center" label="代金券名称" prop="voucherName"></el-table-column>
      <el-table-column align="center" header-align="center" label="代金券面额(非会员)">
        <div slot-scope="scope">{{scope.row.commonMinimum}}~{{scope.row.commonMaximum}}</div>
      </el-table-column>
      <el-table-column align="center" header-align="center" label="代金券面额(会员)">
        <div slot-scope="scope">{{scope.row.memberMinimum}}~{{scope.row.memberMaximum}}</div>
      </el-table-column>
      <el-table-column align="center" header-align="center" label="领取张数" prop="getSheetsDetail"></el-table-column>
      <el-table-column align="center" header-align="center" label="使用张数" prop="useSheetsDetail"></el-table-column>
      <el-table-column align="center" header-align="center" label="状态">
        <template slot-scope="scope"><el-tag :type="scope.row.status==1?'success':'info'">{{scope.row.status|statusFilter}}</el-tag></template>
      </el-table-column>
      <el-table-column align="center" header-align="center" label="操作">
        <template slot-scope="scope"><el-button v-if="isAuth('ycyl:voucherissueddetail:info')" type="text" @click="lookDetails(scope.row.detailId)">查看详情</el-button></template>
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
    <!-- 代金券详情 -->
      <el-dialog :visible="couponDetailsDialog" title="代金券详情" center :show-close="false" width="30%" class="details-dialog" @close="couponDetailsDialog=false">
        <div>代金券类型：{{currentLookCouponDeatails.voucherType==1?'代金券':'打折券'}}</div>
        <div>代金券名称：{{currentLookCouponDeatails.voucherName}}</div>
        <div v-if="currentLookCouponDeatails.dataType==2">发放主题：{{currentLookCouponDeatails.theme}}</div>
        <div v-if="currentLookCouponDeatails.dataType==1">
          <span>获取方式：{{currentLookCouponDeatails.getWay}}</span>
          <span style="margin-left:20px;">券包名称：{{currentLookCouponDeatails.packageName}}</span>
        </div>
        <div v-if="currentLookCouponDeatails.dataType==2">
          <div v-if="currentLookCouponDeatails.isPerpetual==1">活动发放时间：永久</div>
          <div v-else>活动有效期：{{currentLookCouponDeatails.issBeginTime}}————{{currentLookCouponDeatails.issEndTime}}</div>
        </div>
        <div v-if="currentLookCouponDeatails.dataType==1">
          <div v-if="currentLookCouponDeatails.isPerpetual==1">活动获取时间：永久</div>
          <div v-else>活动有效期：{{currentLookCouponDeatails.getBeginTime}}————{{currentLookCouponDeatails.getEndTime}}</div>
        </div>
        <div v-if="currentLookCouponDeatails.useType==2">代金券有效期：{{currentLookCouponDeatails.useDays}}天</div>
        <div v-else>代金券有效期：{{currentLookCouponDeatails.beginTime}}————{{currentLookCouponDeatails.endTime}}</div>
        <div>
          <span>会员使用条件：{{currentLookCouponDeatails.memberMinAvailMoney}}</span>
          <span style="margin-left:20px;">非会员使用条件：{{currentLookCouponDeatails.commonMinAvailMoney}}</span></div>
        <div>
          <span>会员代金券面额：{{currentLookCouponDeatails.memberMinimum}}~{{currentLookCouponDeatails.memberMaximum}}</span>
          <span style="margin-left:20px;">非会员代金券面额：{{currentLookCouponDeatails.commonMinimum}}~{{currentLookCouponDeatails.commonMaximum}}</span></div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="couponDetailsDialog=false">返回</el-button>
        </span>
      </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dataListLoading: false,
      couponDetailsDialog: false,
      currentLookCouponDeatails: {},
      searchForm: {},
      dataList: [],
      searchFormRules: {
        startGetSheetDetail: [
          { type: "number", message: "请输入数字", trigger: "blur" },
        ],
        endGetSheetDetail: [{ type: "number", message: "请输入数字", trigger: "blur" }],
        startUseSheetsDetail: [
          { type: "number", message: "请输入数字", trigger: "blur" },
        ],
        endUseSheetsDetail: [{ type: "number", message: "请输入数字", trigger: "blur" }],
      },
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
    };
  },
  created(){
    this.getDataList()
  },
  methods: {
    getDataList(page) {
      this.dataListLoading=true;
      this.searchForm.page=page||this.pageIndex;
      this.searchForm.pageSize=this.pageSize;
      this.$http({
        url:this.$http.adornUrl('/voucherissueddetail/list'),
        method:"post",
        data:this.searchForm
      }).then(data=>{
        if(data&&data.data.code===0){
          this.dataList=data.data.page.list;
          this.totalPage=data.data.page.totalCount;
        }else{
          this.$message.error(data.data.msg)
        }
        this.dataListLoading=false
      })
    },
    // 查看详情
    lookDetails(id){
      this.$http({
        url:this.$http.adornUrl('/voucherissueddetail/info/'+id),
        method:"post",
      }).then(data=>{
        if(data&&data.data.code===0){
          this.couponDetailsDialog=true
          this.currentLookCouponDeatails=data.data.list[0]
        }else{
          this.$message.error(data.data.msg)
        }
      })

    },
    // 每页数
    sizeChangeHandle(val) {
      this.pageSize = val;
      this.pageIndex = 1;
      this.getDataList();
    },
    // 当前页
    currentChangeHandle(val) {
      this.pageIndex = val;
      this.getDataList();
    },
  },
  filters:{
    statusFilter:function(item){
      switch(item){
        case 0:
          return "已关闭"
        case 1:
          return "开启中"
        case 2:
          return "等待开启"
        case 3:
          return "已结束"
      }
    }
  }
};
</script>
<style>
.send-ticket-info .typeSelect .el-input {
  width: 100px;
}
.send-ticket-info .el-range-separator {
  width: 30px;
}
.send-ticket-info .search-box {
  padding: 10px;
  border-radius: 6px;
  margin-bottom: 10px;
  background-color: #eeeeee;
}
.send-ticket-info .search-box .num-box {
  width: 60px;
}
.send-ticket-info .search-box .num-box2 {
  width: 80px;
}
</style>
<style lang="scss" scoped>
.details-dialog div{
  line-height: 30px;
}
</style>
