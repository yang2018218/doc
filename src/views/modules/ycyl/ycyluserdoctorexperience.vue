<template>
  <!--  所有专家信息管理-->
  <div class="mod-config">
    <div id="doctorSearch">
      <label class="agent_crux">
        专家姓名：
        <el-input placeholder="名字" v-model="truename" clearable></el-input>
      </label>
      <label class="agent_crux">
        专家手机：
        <el-input placeholder="手机" v-model="mobile" style="width: 8rem" clearable></el-input>
      </label>
      <label>
        擅长种类:
        <el-select placeholder="请输入" v-model="dataId" class="doctor" clearable>
          <el-option
            :key="inde" :label="item.dictName" :value="item.dataId" v-for="(item,inde) in enterpriseList"  >
          </el-option>
        </el-select>
      </label>
      <label class="">
        咨询次数：
        <el-input placeholder="" v-model="startClinicalNum" clearable></el-input>
        <span>-</span>
        <el-input placeholder="" v-model="endClinicalNum" clearable></el-input>
      </label>
      <label class="">
        从业年限：
        <el-input placeholder="" v-model="startYearsNum" clearable></el-input>
        <span>-</span>
        <el-input placeholder="" v-model="endYearsNum" clearable></el-input>
      </label>
      <label>
        <el-button type="primary" @click="searchMthod()" style="padding: 5px 20px">搜索</el-button>
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
        label="咨询次数"
        prop="clinicalNum">
      </el-table-column>
      <el-table-column
        align="center"
        header-align="center"
        label="咨询单"
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
        prop="auditAmount">
      </el-table-column>
      <el-table-column
        align="center"
        header-align="center"
        label="今日收益"
        prop="dayPrice">
      </el-table-column>

      <el-table-column
        align="center"
        fixed="right"
        header-align="center"
        label="操作"
        width="150">
        <template slot-scope="scope">
          <el-button @click="addOrUpdateHandle(scope.row.userId)" size="small" type="text">详情</el-button>
<!--          <el-button size="small" type="text" @click="toMallInfo(scope.row.userId)">业绩详情</el-button>-->
          <el-dropdown trigger="click">
  <span class="el-dropdown-link">
    业绩详情
  </span>
            <el-dropdown-menu slot="dropdown" >
              <el-dropdown-item @click.native="toMallInfo(scope.row.userId)">诊疗单业绩</el-dropdown-item>
              <el-dropdown-item @click.native="userBuyPerformancePage(scope.row.userId)">自购单业绩</el-dropdown-item>
              <el-dropdown-item @click.native="videoPerformancePage(scope.row.userId)">视频购买业绩</el-dropdown-item>
              <el-dropdown-item @click.native="performancePage(scope.row.userId)">视频单业绩</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
</el-table-column>
</el-table>
<el-pagination @size-change="sizeChangeHandle" @current-change="currentChangeHandle" :current-page="pageIndex" :page-sizes="[10, 20, 50, 100]" :page-size="pageSize" :total="totalPage" layout="total, sizes, prev, pager, next, jumper">
</el-pagination>
<!-- 弹窗, 新增 / 修改 -->
<add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"></add-or-update>
</div>
</template>
<script>
    import AddOrUpdate from './ycyluserdoctorexperience-add-or-update'

    export default {
        data() {
            return {
                adeptKind: '',
                truename: '',
                mobile: '',
                dataId: '',
                startClinicalNum: '',
                endClinicalNum: '',
                startYearsNum: '',
                endYearsNum: '',
                startWalletMoney: '',
                endWalletMoney: '',
                startAuditAmount: '',
                endAuditAmount: '',

                specialistUserid: '',
                enterpriseList: '',
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
        activated() {
            this.getDataList()
            this.variety()
        },
        methods: {
            searchMthod(pageIndex=1) {
                this.$http({
                    url: this.$http.adornUrl('/ycyl/ycyluserexpert/list'),
                    method: 'post',
                    data: ({
                        'page': pageIndex,
                        'pageSize': this.pageSize,
                        'key': this.dataForm.key,
                        'doctorStatus': '1',
                        'truename': this.truename,
                        'mobile': this.mobile,
                        'adeptKind': this.dataId,
                        'startClinicalNum': this.startClinicalNum,
                        'endClinicalNum': this.endClinicalNum,
                        'startYearsNum': this.startYearsNum,
                        'endYearsNum': this.endYearsNum,
                        'startWalletMoney': this.startWalletMoney,
                        'endWalletMoney': this.endWalletMoney,
                        'startAuditAmount': this.startAuditAmount,
                        'endAuditAmount': this.endAuditAmount,
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
                })
            },
            //路由跳转
            toMallInfo(userId) {
                this.$router.push({
                    path: '/expertDeta',
                    query: {
                        userId: userId,
                    }
                })
            },
          videoPerformancePage (userId) {//视频业绩
            this.$router.push({
              path: '/expertVideo',
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
          performancePage (userId) {//视频业绩
            this.$router.push({
              path: '/expertVideoOrder',
              query: {
                userId: userId,
              }
            })
          },
            //获取某个专家信息列表
            getDoctorUserID(user) {

            },
            //获取动物种类
            variety() {
                this.dataListLoading = true
                this.$http({
                    url: this.$http.adornUrl('/ycyl/ycyldictdata/list'),
                    method: 'post',
                    data: ({
                        'page': this.pageIndex,
                        "pageSize": "30",
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
            getDataList() {
                this.dataListLoading = true
                this.$http({
                    url: this.$http.adornUrl('/ycyl/ycyluserexpert/list'),
                    method: 'post',
                    data: ({
                        'page': this.pageIndex,
                        'pageSize': this.pageSize,
                        'key': this.dataForm.key,
                        'doctorStatus': '1'
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
            sizeChangeHandle(val) {
                this.pageSize = val
                this.pageIndex = 1
                this.getDataList()
            },
            // 当前页
            currentChangeHandle(val) {
                this.pageIndex = val
                this.getDataList(this.pageIndex)
            },
            // 多选
            selectionChangeHandle(val) {
                this.dataListSelections = val
            },
            //详情
            addOrUpdateHandle(data) {
                this.addOrUpdateVisible = true
                this.$nextTick(() => {
                    this.$refs.addOrUpdate.init(data)
                })
            },

            // 删除
            deleteHandle(id) {
                var ids = id ? [id] : this.dataListSelections.map(item => {
                    return item.expId
                })
                this.$confirm(`确定对[id=${ids.join(',')}]进行[${id ? '删除' : '批量删除'}]操作?`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$http({
                        url: this.$http.adornUrl('/ycyl/ycyluserdoctorexperience/delete'),
                        method: 'post',
                        data: this.$http.adornData(ids, false)
                    }).then(({
                        data
                    }) => {
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
<style lang="scss" scoped>
  .el-dropdown-link {
    cursor: pointer;
    color: #19678E;
    font-size: 12px;
  }

  .el-dropdown-link:hover {
    color: #409EFF;
  }
    .mod-config {
        #doctorSearch {
            background-color: #eee;
            border-radius: 6px;
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
