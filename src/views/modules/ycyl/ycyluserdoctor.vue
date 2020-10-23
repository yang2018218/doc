<template>
  <!--  医生主页-->
  <div class="mod-config">
    <div id="doctorSearch">
      <label class="agent_crux">
        名字：
        <el-input class="" placeholder="名字" v-model="search_list.truename" clearable></el-input>
      </label>
      <label class="agent_crux">
        手机号：
        <el-input class="te" placeholder="手机号" v-model="search_list.mobile" style="width: 8rem" clearable></el-input>
      </label>
      <label>
        擅长种类：
        <el-select placeholder="请选择" v-model="search_list.adeptKind" class="doctor" clearable>
          <el-option
            :key="inde" :label="item.dictName" :value="item.dataId" v-for="(item,inde) in enterpriseList">
          </el-option>
        </el-select>
      </label>
      <label class="">
        诊疗次数：
        <el-input placeholder="" v-model="search_list.startClinicNumber" clearable></el-input>
        <span>-</span>
        <el-input placeholder="" v-model="search_list.endClinicNumber" clearable></el-input>
      </label>
      <label class="">
        从业年限：
        <el-input placeholder="" v-model="search_list.startYearsNum" clearable></el-input>
        <span>-</span>
        <el-input placeholder="" v-model="search_list.endYearsNum" clearable></el-input>
      </label>
      <label>
        <button class="chairman_sunch" @click="searchListNumber()">搜索</button>
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
        label="姓名"
        prop="truename">
      </el-table-column>
      <el-table-column
        align="center"
        header-align="center"
        label="手机号"
        prop="mobile">
      </el-table-column>
      <el-table-column
        align="center"
        header-align="center"
        label="地区"
        prop="address">
      </el-table-column>
      <el-table-column
        align="center"
        header-align="center"
        label="擅长类型"
        prop="adeptKind">
      </el-table-column>
      <el-table-column
        align="center"
        header-align="center"
        label="诊疗次数"
        prop="clinicalNum">
      </el-table-column>
      <el-table-column
        align="center"
        header-align="center"
        label="开出药单"
        prop="medicineSingle">
      </el-table-column>
      <el-table-column
        align="center"
        header-align="center"
        label="销售金额"
        prop="sumPrice">
      </el-table-column>
      <el-table-column
        align="center"
        header-align="center"
        label="可提现金额"
        prop="walletMoney">
      </el-table-column>
      <el-table-column
        align="center"
        header-align="center"
        label="审核中金额"
        prop="currentAmount">
      </el-table-column>
      <el-table-column
        align="center"
        header-align="center"
        label="今日收益"
        prop="dayPrice">
      </el-table-column>
      <el-table-column
        align="center"
        header-align="center"
        label="等级"
        prop="doctorRank">
        <template slot-scope="scope">
          <p v-if="scope.row.doctorRank==1">一级</p>
          <p v-if="scope.row.doctorRank==2">二级</p>
        </template>
      </el-table-column>
      <el-table-column align="center" fixed="right" header-align="center" label="操作" width="150">
        <template slot-scope="scope">
          <el-button @click="addOrUpdateHandle(scope.row.userId)" size="small" type="text">详情</el-button>
          <el-dropdown trigger="click">
  <span class="el-dropdown-link">
    业绩详情
  </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="toMallInfo(scope.row.userId)">诊疗单业绩</el-dropdown-item>
              <el-dropdown-item @click.native="userBuyPerformancePage(scope.row.userId)">自购单业绩</el-dropdown-item>
              <el-dropdown-item @click.native="videoPerformancePage(scope.row.userId)">视频购买业绩</el-dropdown-item>
              <el-dropdown-item @click.native="performancePage(scope.row.userId)">视频单业绩</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination :current-page="pageIndex" :page-size="pageSize" :page-sizes="[10, 20, 50, 100]" :total="totalPage"
                   @current-change="currentChangeHandle" @size-change="sizeChangeHandle"
                   layout="total, sizes, prev, pager, next, jumper">
    </el-pagination>
    <!-- 弹窗, 新增 / 修改 -->
    <add-or-update @refreshDataList="getDataList" ref="addOrUpdate" v-if="addOrUpdateVisible"
                   v-bind:usernumber="DoctorUserid"></add-or-update>
  </div>
</template>
<script>
  import AddOrUpdate from './ycyluserdoctor-add-or-update'

  export default {
    data () {
      return {
        search_list: {},
        searchList: {
          truename: '', //名字
          mobile: '', //手机号
          adeptKind : '', //擅长种类
          startClinicNumber: '', //诊疗次数（开始）
          endClinicNumber: '', //诊疗次数（结束）
          startYearsNum: '', //从业年限（开始）
          endYearsNum: '', //从业年限（结束）
        },
        dictId: '',
        DoctorUserid: '',
        enterpriseList: '',
        dataForm: {
          key: '',
          userId: ''
        },
        dataList: [],
        pageIndex: 1,
        pageSize: 10,
        totalPage: 0,
        dataListLoading: false,
        dataListSelections: [],
        addOrUpdateVisible: false,
        value1: '',
      }
    },
    components: {
      AddOrUpdate
    },
    activated () {
      this.getDataList()
      this.variety()

    },
    methods: {
      performancePage(userId){//视频单业绩
        this.$router.push({
          path: '/doctorVideoOrer',
          query: {
            userId: userId,
          }
        })
      },
      searchListNumber (pageIndex) {
        this.search_list.doctorStatus = '1'
        this.search_list.page = pageIndex
        this.search_list.pageSize = this.pageSize
        this.key = this.dataForm.key
        this.$http({
          url: this.$http.adornUrl('/ycyl/ycyluserdoctor/list'),
          method: 'post',
          data: this.search_list

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
      toMallInfo (userId) {//诊疗单业绩
        this.$router.push({
          path: '/doctorPerformance',
          query: {
            userId: userId,
          }
        })
      },
      videoPerformancePage (userId) {//视频业绩
        this.$router.push({
          path: '/doctorVideo',
          query: {
            userId: userId,
          }
        })
      },
      userBuyPerformancePage(userId){ //自购单业绩
          this.$router.push({
            path:"/userBuyPerformance",
            query:{
              userId,
              role:"doctor"
            }
          })
      },
      // 获取动物种类数据
      variety () {
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl('/ycyl/ycyldictdata/list'),
          method: 'post',
          data: ({
            'page': this.pageIndex,
            'pageSize': '30',
            'key': this.dataForm.key,
            'dictValue': 'animal_type'
          })
        }).then(({
          data
        }) => {
          if (data && data.code === 0) {
            this.enterpriseList = data.page.list
            this.animal_type = data.animal_type
          } else {
            this.dataList = []
            this.totalPage = 0
            this.animal_type = []
          }
        })
      },
      // 获取数据列表
      getDataList () {
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl('/ycyl/ycyluserdoctor/list'),
          method: 'post',
          data: ({
            'page': this.pageIndex,
            'pageSize': this.pageSize,
            'key': this.dataForm.key,
            'doctorStatus': '1',

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
      //获取医生信息列表
      getDoctorUserID (user) {
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl('/ycyl/ycyluserdoctor/infoById'),
          method: 'post',
          data: ({
            'page': this.pageIndex,
            'pageSize': this.pageSize,
            'key': this.dataForm.key,
            'userId': user
          })
        }).then(({
          data
        }) => {
          if (data && data.code === 0) {
            this.DoctorUserid = data.ycyluserdoctor
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
        this.searchListNumber()
      },
      // 当前页
      currentChangeHandle (val) {
        this.pageIndex = val
        this.searchListNumber(this.pageIndex)
      },
      // 多选
      selectionChangeHandle (val) {
        this.dataListSelections = val
      },
      //管理
      addOrUpdateHandle (data) {
        this.getDoctorUserID(data)
        this.addOrUpdateVisible = true
        this.$nextTick(() => {
          this.$refs.addOrUpdate.init(data)

        })
      },

    }
  }
</script>
<style lang="scss">
  .el-dropdown-link {
    cursor: pointer;
    color: #19678E;
    font-size: 12px;
  }

  .el-dropdown-link:hover {
    color: #409EFF;
  }
  .mod-config {
    .te {
      padding-right: 0;
    }
  }
</style>
<style lang="scss" scoped>
  .mod-config {
    .te {
      padding-right: 0;
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
        width: 112px;
      }
    }
  }
</style>
