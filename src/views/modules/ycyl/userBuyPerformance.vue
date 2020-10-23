<template>
  <div class="mod-config">
    <div class="searchBox">
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
        <el-button type="success" class="searchStyle" @click="getDataList(1)">搜索</el-button>
      </label>
    </div>
    <header class="searchBox ">
      <label><span>订单金额：{{price}}元</span></label>
      <label><span>提成：{{deduct}}元</span></label>
      <label style="float: right">
        <el-button slot="reference" type="warning" class="excel" style="padding: 8px 20px" @click="downloadFile()">下载文件</el-button>
      </label>
    </header>
    <el-table
      :data="dataList"
      border
      style="width:100%;"
      v-loading="dataListLoading"
    >
      <el-table-column align="center" header-align="center" label="订单ID" prop="orderNum"></el-table-column>
      <el-table-column align="center" header-align="center" label="付款时间" prop="payTime">
        <div slot-scope="scope">
          <span v-if="scope.row.payTime">{{scope.row.payTime}}</span>
          <span v-else>/</span>
        </div>
      </el-table-column>
      <el-table-column align="center" header-align="center" :label="role=='doctor'?'指导老师':'咨询专家'" prop="teacherTruename"></el-table-column>
      <el-table-column align="center" header-align="center" label="订单价值" prop="price"></el-table-column>
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
          <el-button @click="details(scope.row.pId)" size="small" type="text">详情</el-button>
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
    <!-- 详情弹窗 -->
    <el-dialog :close-on-click-modal="false" :visible.sync="visible" center :title="role=='doctor'?'医生':'专家'+'自购单业绩详情'" width="700px">
    <div class="DoctorCount">
      <div>
        <ul :key="index" v-for="(castNum,index) in dataCase">
          <li><span style="">订单号：{{castNum.orderNum}}</span> <span>订单状态：{{fn(castNum.status)}}</span></li>
          <li><span>服务时间：{{castNum.serviceTime}}</span> <span>付款时间：{{castNum.payTime}}</span></li>
          <li><span>{{role=='doctor'?'指导老师：':'咨询专家：'}}{{castNum.teacherTruename}}</span> <span style="width: auto;">{{role=='doctor'?'老&nbsp;&nbsp;师&nbsp;&nbsp;':'专&nbsp;&nbsp;家&nbsp;&nbsp;'}}ID：{{castNum.teacherUserId}}</span></li>
          <li><span>医助姓名：{{castNum.assistantTruename}}</span> <span style="width: auto;">医&nbsp;&nbsp;助&nbsp;&nbsp;ID：{{castNum.assistantUserId}}</span></li>
          <li><span>用户昵称：{{castNum.nickname}}</span> <span>用户手机：{{castNum.mobile}}</span></li>
          <li><span>诊疗动物：{{castNum.animal}}</span> <span>养殖规模：{{castNum.breedScale}}</span></li>
          <li><span>药单价值：{{castNum.price}}</span> <span>药品种类：{{castNum.typeCount}}</span></li>
          <div class="doctorBottom">
            <p>药品详情</p>
            <ul>
              <li :key="index" v-for="(docCon,index) in castNum.list"><span style="width: 500px;">药品名称： {{docCon.productName}}</span><span
                style="width: 350px">规格：{{docCon.modelName}}</span><span
                style="width: 150px"> 数量： {{docCon.count}}</span>
              </li>
            </ul>
          </div>
        </ul>
      </div>
    </div>
    <span class="dialog-footer" slot="footer">
      <el-button @click="visible = false">返回</el-button>
    </span>
  </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      role:"",
      price:'0',//订单金额
      deduct:'0',//提成
      dataTime:[],//检索时间
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
      teacherUserId: "",
      dataCase: "",
      dataList: [],
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      dataListLoading: false,
      visible: false
    };
  },
  activated() {
    this.teacherUserId = this.$route.query.userId;
    this.role = this.$route.query.role;
    this.getDataList();
    this.getSumPrice();
  },
  methods: {
    downloadFile () {//导出信息
      const loading = this.$loading({
        lock: true,
        text: '下载中...',
        spinner: 'el-icon-loading',
        background: 'rgba(255, 255, 255, 0.7)'
      });
      this.searchData.teacherUserId = this.teacherUserId
      this.searchData.orderProperty = "1"
      if (this.dataTime && this.dataTime.length > 1) {
        this.searchData.startPayTime = this.dataTime[0]+" 00:00:00"
        this.searchData.endPayTime = this.dataTime[1]+" 23:59:59"
      }
      this.$http({
        url: this.$http.adornUrl('/ycyl/ycyluserperformance/getForDocReq'),
        method: 'post',
        data: this.searchData
      }).then(({data}) => {
        if (data && data.code === 0) {
          window.location.href=data.path
          loading.close()
        } else {
          loading.close()
         this.$message.error(data.msg)
        }
      })
    },
    getDataList(i) {
      this.dataListLoading = true;
      if (this.dataTime && this.dataTime.length > 1) {
        this.searchData.startPayTime = this.dataTime[0]+" 00:00:00"
        this.searchData.endPayTime = this.dataTime[1]+" 23:59:59"
      }
      this.$http({
        url: this.$http.adornUrl("/ycyl/ycyluserperformance/getForDoc"),
        method: "post",
        data: {
          page: i||this.pageIndex,
          pageSize: this.pageSize,
          orderProperty: '1',  //订单属性 1自购单2购物单4学习课程购买的单子
          teacherUserId: this.teacherUserId,
          ...this.searchData
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
    getSumPrice(){//统计
      if (this.dataTime && this.dataTime.length > 1) {
        this.searchData.startPayTime = this.dataTime[0]+" 00:00:00"
        this.searchData.endPayTime = this.dataTime[1]+" 23:59:59"
      }
      this.searchData.teacherUserId=this.teacherUserId
      this.$http({
        url: this.$http.adornUrl('/ycyl/ycyluserperformance/getDocPrice'),
        method: 'post',
        data: {
          orderProperty: '1',  //订单属性 1自购单2购物单4学习课程购买的单子
          teacherUserId: this.teacherUserId,
          ...this.searchData
        }
      }).then(({data}) => {
        if (data && data.code === 0) {
          if (data.price){
            this.price = data.price.price||0
            this.deduct = data.price.deduct||0
            if(!data.price.deduct){
              this.doctorMoney = 0
            }
          }else {
            this.orderMoney = 0
            this.doctorMoney = 0
          }
        } else {
          this.$message.error(data.msg)
        }
        this.dataListLoading = false
      })
    },
    details(i) {
      this.$http({
        url: this.$http.adornUrl("/ycyl/ycyluserperformance/getPageList"),
        method: "post",
        data: {
          page: this.pageIndex,
          pageSize: this.pageSize,
          pId: i
        }
      }).then(({ data }) => {
        if (data && data.code === 0) {
          this.visible=true
          this.dataCase = data.page.list;
          this.totalPage = data.page.totalCount;
        } else {
          this.dataCase = [];
          this.totalPage = 0;
        }
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
     fn (key) {
        switch (key) {
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
      },

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
    .DoctorCount {
    padding-left: 0.5rem;
    font-size: 16px;
    line-height: 20px;

    div {
      ul {
        li {
          margin-top: 6px;
          display: flex;

          span {
            text-align: left;
            width: 15rem;
          }
        }

        .malady {
          // background-color: #dfe4ed;
          margin-top: 1rem;

          p {
            padding: 0 1rem;
            // background-color: #dfe4ed;
            padding: 0.5rem 0;
            line-height: 23px;
          }
        }
      }
    }

    .doctorBottom {
      margin-top: 16px;

      p {
        text-align: center;
        text-indent: -64px;
        font-size: 16px;
        margin-bottom: 16px;
      }
    }
  }
</style>

