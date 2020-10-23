<template>
  <!--  代理商信息管理页面-->
  <div class="mod-user">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
      <div id="useragent_sunch">
        <label class="">
          服务商名字：
          <el-input placeholder="姓名" v-model="truename"></el-input>
        </label>
        <label class="agent_crux">
          服务商手机：
          <el-input placeholder="手机号" v-model="mobile"></el-input>
        </label>
        <label class="agent_crux">
          地区：
          <el-input placeholder="服务商所在地区" v-model="adress"></el-input>
        </label>
        <label>
          服务商等级：
          <el-select placeholder="请选择" v-model="level">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </label>

        <label>
          <span class="demonstration">加入时间：</span>
          <el-date-picker
            v-model="startCreateTime"
            type="date"
            value-format='yyyy-MM-dd 00:00:00'
            placeholder="选择日期" style="width: 9rem">
          </el-date-picker>
          -
          <el-date-picker
            v-model="endCreateTime"
            type="date"
            value-format='yyyy-MM-dd 23:59:59'
            placeholder="选择日期" style="width: 9rem">
          </el-date-picker>
        </label>

        <label>
          仓储状态：
          <el-select v-model="remark" placeholder="请选择">
            <el-option
              v-for="item in opt"
              :key="item.val"
              :label="item.label"
              :value="item.val">
            </el-option>
          </el-select>
        </label>
        <label>
          <el-button type="primary" @click="searchMethod()" style="padding:8px 18px">搜索</el-button>
        </label>
      </div>
    </el-form>
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
        prop="truename"
        width="120"
      >
      </el-table-column>
      <el-table-column
        align="center"
        header-align="center"
        label="等级"
        prop="level"
        width="100"
      >
        <template slot-scope="scope">
          <span v-if="scope.row.level ==1" size="small">市级</span>
          <span v-if="scope.row.level ==2" size="small">县级</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        header-align="center"
        label="负责地区"
        prop="area">
      </el-table-column>
      <el-table-column
        align="center"
        header-align="center"
        label="手机号"
        prop="mobile"
        width="150"
      >
      </el-table-column>
      <el-table-column
        align="center"
        header-align="center"
        label="区域用户量"
        prop="userNum"
        width="120"
      >
      </el-table-column>
      <el-table-column
        align="center"
        header-align="center"
        label="总出单"
        prop="count"
        width="120"
      >
      </el-table-column>
      <el-table-column
        align="center"
        header-align="center"
        label="退货单"
        prop="refundCount"
        width="120"
      >
      </el-table-column>
      <el-table-column
        align="center"
        header-align="center"
        label="可提现"
        prop="walletMoney"
        width="120"
      >
      </el-table-column>
      <el-table-column
        align="center"
        header-align="center"
        label="仓储状态"
        prop="productStatus"
        width="100">
        <template slot-scope="scope">
          <span v-if="scope.row.productStatus == 1" style="color:#ff0000">缺货</span>
          <span v-if="scope.row.productStatus == 0" style="color:green">正常</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        header-align="center"
        label="信用值"
        prop="userFaith"
        width="120"
      >
      </el-table-column>
      <el-table-column
        align="center"
        header-align="center"
        label="状态"
        prop="status"
        width="120"
      >
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status == 1" size="small">正常</el-tag>
          <el-tag v-else-if="scope.row.status == 0" size="small" type="danger">隐藏</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        fixed="right"
        header-align="center"
        label="操作"
        width="200">
        <template class="caozuo" slot-scope="scope">
          <el-button @click="addOrUpdateHandle(scope.row.userId)" size="small" type="text"
                     v-if="isAuth('sys:user:update')">资料
          </el-button>
          <el-button @click="toMallInfo(scope.row.userId)" size="small" type="text">业绩详情</el-button>
          <el-button @click="useragentStateTo(scope.row)" size="small" type="text">
            状态
          </el-button>
          <el-button @click="deleteHandle(scope.row.agentId)" size="small" type="text">删除</el-button>
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
      layout="total, sizes, prev, pager, next, jumper">
    </el-pagination>
    <!-- 弹窗, 新增 / 修改 -->
    <add-or-update @refreshDataList="getDataList" ref="addOrUpdate" v-if="addOrUpdateVisible"></add-or-update>

    <useragent-state @refreshDataList="getDataList" ref="useragentState" v-if="useragentStateVisible"></useragent-state>
  </div>
</template>
<script>
  import AddOrUpdate from './useragent-add-or-updata'
  import useragentState from './useragentstate'

  export default {
    data () {
      return {
        adress: '',
        remark: '',
        truename: '',
        mobile: '',
        level: '',
        startCreateTime: '',
        endCreateTime: '',
        dataForm: {
          userName: ''
        },
        dataList: [],
        pageIndex: 1,
        pageSize: 10,
        totalPage: 0,
        dataListLoading: false,
        dataListSelections: [],
        addOrUpdateVisible: false,
        addOrUpdateVisibleZL: false,
        useragentStateVisible: false,

        value1: '',

        options: [{
          value: 1,
          label: '市级'
        }, {
          value: 2,
          label: '县级'
        }
        ],
        value: '选项1',
        searchData: {},
        opt: [{
          val: '0',
          label: '缺货'
        }, {
          val: '1',
          label: '正常'
        }
        ],
        val: ''
      }
    },
    components: {
      AddOrUpdate,
      useragentState
    },
    activated () {
      this.getDataList()
    },
    methods: {
      searchMethod (pageIndex = 1) {
        this.$http({
          url: this.$http.adornUrl('/ycyl/ycyluseragent/list'),
          method: 'post',
          data: this.$http.adornParams({
            'page': pageIndex,
            'pageSize': this.pageSize,
            'username': this.dataForm.userName,
            'status': 1,
            'agentStatus': 1,
            'truename': this.truename,
            'mobile': this.mobile,
            'level': this.level,
            'startCreateTime': this.startCreateTime,
            'endCreateTime': this.endCreateTime,
            'remark': this.remark,
            address: this.adress

          })
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.dataList = data.page.list
            this.totalPage = data.page.totalCount
          } else {
            this.dataList = []
            this.totalPage = 0
          }

        })
      },
      //路径跳转
      toMallInfo (userId) {
        this.$router.push({
          path: '/useragentnewage',
          query: {
            userId: userId,
          }
        })
      },
      // 获取数据列表
      getDataList () {
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl('/ycyl/ycyluseragent/list'),
          method: 'post',
          data: this.$http.adornParams({
            'page': this.pageIndex,
            'pageSize': this.pageSize,
            'username': this.dataForm.userName,
            // 'status': 1,
            'agentStatus': 1,
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
        this.getDataList(this.pageIndex)
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
      //状态
      useragentStateTo (sta) {
        this.useragentStateVisible = true
        this.$nextTick(() => {
          this.$refs.useragentState.state(sta)
        })
      },
      // 删除
      addOrUpdateHandleZL (id) {
        this.addOrUpdateVisible = true
        this.$nextTick(() => {
          this.$refs.addOrUpdate.init(id)
        })
      },
      deleteHandle (id) {
        var ids = id ? [id] : this.dataListSelections.map(item => {
          return item.agentId
        })
        this.$confirm(`确定对[id=${ids.join(',')}]进行[${id ? '删除' : '批量删除'}]操作?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http({
            url: this.$http.adornUrl('/ycyl/ycyluseragent/delete'),
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
<style lang="scss" scoped>

  #useragent_sunch {
    padding: 0.3rem 2.0rem;
    border-radius: 0.4rem;
    background-color: #eee;
    margin-bottom: 16px;
  }


  label {
    line-height: 35px;
    display: inline-block;
    margin-left: 0.3rem;

    .el-input {
      width: 8rem;
    }

  }

  .chairman_sunch {
    background-color: rgb(25, 103, 142);
    color: #fff;
    height: 2rem;
    width: 4rem;
    border-radius: 10%;
    margin-left: 10px;
    border: 1px solid transparent;
  }

  .agent_time {
    width: 18rem;
  }

</style>

