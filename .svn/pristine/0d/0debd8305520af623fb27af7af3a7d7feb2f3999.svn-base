<template>
  <div class="mod-config">
    <div id="doctorSearch">
      <label>
        <span class="demonstration">付款时间：</span>
        <el-date-picker
          v-model="startPayTime"
          type="date"
          value-format='yyyy-MM-dd 00:00:00'
          placeholder="选择日期" style="width: 9rem">
        </el-date-picker>
        -
        <el-date-picker
          v-model="endPayTime"
          type="date"
          value-format='yyyy-MM-dd 23:59:59'
          placeholder="选择日期" style="width: 9rem">
        </el-date-picker>
      </label>
      <label>
        <span class="demonstration">服务时间：</span>
        <el-date-picker
          v-model="startServiceTime"
          type="date"
          value-format='yyyy-MM-dd 00:00:00'
          placeholder="选择日期" style="width: 9rem">
        </el-date-picker>
        -
        <el-date-picker
          v-model="endServiceTime"
          type="date"
          value-format='yyyy-MM-dd 23:59:59'
          placeholder="选择日期" style="width: 9rem">
        </el-date-picker>
      </label>
      <label class="agent_crux">
        状态：
        <el-select v-model="status" placeholder="请选择">
          <el-option
            v-for="item in statusList"
            :key="item.value"
            :label="item.label"
            :value="item.sta">
          </el-option>
        </el-select>
      </label>
      <label>
        <button class="chairman_sunch" @click="searchMthod()">搜索</button>
      </label>
    </div>
    <header class="searchBox ">

      <label><span>药品价值：{{allMoney}}元</span></label>
      <label><span>订单金额：{{orderMoney}}元</span></label>
      <label><span>提成：{{deductMoney}}元</span></label>
      <label >
<!--        <download-excel-->
<!--          class = "export-excel-wrapper"-->
<!--          :data = "json_data"-->
<!--          :fields = "json_fields"-->
<!--          name = "远程诊断报告导出.xls">-->
<!--          <el-button type="primary" size="small">导出EXCEL</el-button>-->
<!--        </download-excel>-->
       </label>
      <label style="float: right">
        <el-popover
          placement="top"
          width="160"
          v-model="visibleExcel">
          <p>{{text}}</p>
          <div style="text-align: right; margin: 0">
            <el-button size="mini" type="text" @click="visibleExcel = false" style="margin-right:20px ">取消</el-button>
            <el-button type="primary" size="mini" style="margin: 0;padding: 0;cursor:auto "><download-excel
              style="mso-number-format:'\@';"
              class = "export-excel-wrapper"
              :data = "jsonlist"
              :fields = "json_fields"
              name = "医助业绩表格.xls">
              <el-button type="primary" size="mini" @click="visibleExcel = false" :disabled="isDisabled">确定</el-button>
            </download-excel></el-button>
          </div>
          <el-button slot="reference" type="warning" class="excel" style="padding: 8px 20px" @click="downloadFile()">
            下载文件
          </el-button>
        </el-popover>
      </label>
    </header>
    <el-table
      :data="dataList"
      border
      stripe
      v-loading="dataListLoading"
      @selection-change="selectionChangeHandle"
      style="width: 100%;">
      <el-table-column
        v-if="!type"
        prop=""
        header-align="center"
        align="center"
        label="药单ID">
        <div slot-scope="scope">
         <span v-if="scope.row.consulNum">
           {{scope.row.consulNum}}
         </span>
          <span v-if="scope.row.diagnosisNum">
           {{scope.row.diagnosisNum}}
         </span>
          <span v-if="!scope.row.diagnosisNum && !scope.row.consulNum">
       /
         </span>
        </div>
      </el-table-column>
      <el-table-column
        prop=""
        header-align="center"
        align="center"
        label="订单ID">
        <div slot-scope="scope">
         <span v-if="scope.row.status">
           {{scope.row.orderNum}}
         </span>
          <span v-else>
       /
         </span>
        </div>
      </el-table-column>
      <el-table-column
        prop="assistantTruename"
        header-align="center"
        align="center"
        label="医助姓名">
      </el-table-column>
      <el-table-column
        prop="teacherTruename"
        header-align="center"
        align="center"
        label="医生/专家姓名">
      </el-table-column>
      <el-table-column
        prop="mobile"
        header-align="center"
        align="center"
        label="用户电话">
      </el-table-column>
      <el-table-column
        prop="nickname"
        header-align="center"
        align="center"
        label="用户昵称">
      </el-table-column>
      <el-table-column
        v-if="type"
        prop="nickname"
        header-align="center"
        align="center"
        label="用户地区">
      </el-table-column>
      <el-table-column
        v-if="!type"
        prop="orderType"
        header-align="center"
        align="center"
        label="药单类型">
      </el-table-column>
      <el-table-column
        v-if="!type"
        prop="serviceTime"
        header-align="center"
        align="center"
        label="服务时间">
      </el-table-column>
      <el-table-column
        prop="payTime"
        header-align="center"
        align="center"
        label="付款时间">
        <div slot-scope="scope">
          <span v-if="scope.row.payTime">
            {{scope.row.payTime}}
          </span>
          <span v-else>
          /
          </span>
        </div>
      </el-table-column>
      <el-table-column
        prop="status"
        header-align="center"
        align="center"
        label="购买状态">
        <template slot-scope="scope">
          <el-tag size="small" type="danger" v-if="scope.row.status === 0">待付款</el-tag>
          <el-tag size="small" type="primary" v-if="scope.row.status === 1">已付款</el-tag>
          <el-tag size="small" type="warning" v-if="scope.row.status === 2">待收货</el-tag>
          <el-tag size="small" type="success" v-if="scope.row.status === 3">已完成</el-tag>
          <el-tag size="small" type="info" v-if="scope.row.status === 4">仓储审核</el-tag>
          <el-tag size="small" v-if="scope.row.status === 5">财务审核</el-tag>
          <p size="small" type="" v-if="scope.row.status === 6">退款完成</p>
          <p size='small' v-if="scope.row.status ==7">主仓审核</p>
          <p size='small' v-if="scope.row.status ==8">财务打款</p>
          <p size='small' v-if="scope.row.status ==9">急速退款</p>
          <p size='small' v-if="!scope.row.status">/</p>
        </template>
      </el-table-column>
      <el-table-column
        prop="price"
        header-align="center"
        align="center"
        label="订单价值">
      </el-table-column>
      <el-table-column
        prop="deduct"
        header-align="center"
        align="center"
        label="医助提成">
      </el-table-column>
      <el-table-column
        fixed="right"
        header-align="center"
        align="center"
        width="150"
        label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="addOrUpdateHandle(scope.row.pId)">详情</el-button>
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
    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"></add-or-update>
    <home-conentaddExert ref="homeConentaddExert" v-if="homeConentaddExertVisible"></home-conentaddExert>

  </div>
</template>
<script>
  import AddOrUpdate from './doctorhelp-add'
  import HomeConentaddExert from './HomeConent-add'

  export default {
    data () {
      return {
        isDisabled:false,
        jsonlist:[],
        visibleExcel:false,
        text:'数据正在处理中，请稍后...',
        json_fields: {
          "药单号": "diagnosisNum",
          "订单号": "orderNum",    //单号
          "医助姓名": "assistantTruename", //代理名字
          "医生姓名": "teacherTruename", //地区
          "用户昵称": "nickname",
          "用户电话": "mobile",
          "药单类型": "orderType",
          "服务时间": "serviceTime",
          "付款时间": "payTime",
          "订单价值": "price",
          "提成": "deduct",
          // "头部-损坏区域代码": {
          //   field: "phone.landline",
          //   //自定义回调函数
          //   callback: value => {
          //     return `损坏区域代码 - ${value}`;
          //   }
          // }
        },
        json_meta: [
          [
            {
              " key ": " charset ",
              " value ": " utf- 8 "
            }
          ]
        ],
        search:{},//搜索
        allMoney: '0',
        orderMoney: '0',
        deductMoney: '0',
        endPayTime: '',
        status: '',
        endServiceTime: '',
        startServiceTime: '',
        startPayTime: '',
        statusList: [
          {
            sta: '',
            label: '全部'
          }, {
            sta: '0',
            label: '未付款'
          },
          {
            sta: '1',
            label: '已付款'
          }, {
            sta: '2',
            label: '待收货'
          },

          {
            sta: '3',
            label: '已完成'
          },
          {
            sta: '4',
            label: '客服审核'
          },
          {
            sta: '5',
            label: '财务审核'
          },
          {
            sta: '6',
            label: '退款完成'
          },
          {
            sta: '7',
            label: '仓库审核'
          },
        ],
        sta: '',

        dataForm: {
          key: ''
        },
        dataList: [],
        pageIndex: 1,
        pageSize: 10,
        totalPage: 0,
        dataListLoading: false,
        dataListSelections: [],
        addOrUpdateVisible: false,
        homeConentaddExertVisible: false,
        type:null  //自购单或购物单
      }
    },
    components: {
      AddOrUpdate,
      HomeConentaddExert
    },
    activated () {
      this.type=this.$route.query.type
      this.getDataList()
      this.getSumPrice()

    },
    methods: {

      downloadFile () {//导出信息
        this.isDisabled = true
        var Id = this.$route.query.id
        this.$http({
          url: this.$http.adornUrl('/ycyl/ycyluserperformance/getForAssReq'),
          method: 'post',
          data: {
            'assistantUserId': Id,
            'endPayTime': this.endPayTime,
            'status': this.status,
            'endServiceTime': this.endServiceTime,
            'startPayTime': this.startPayTime,
             orderProperty: this.type?'1':'2',  //订单属性 1自购单2购物单4学习课程购买的单子
            'startServiceTime': this.startServiceTime,}
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.isDisabled = false
            this.text='数据整理完毕，请点击下载',
            this.jsonlist = data.list
          } else {
            this.$message.error(data.msg)
          }
        })
      },
      getSumPrice () {//视频单业绩
        var Id = this.$route.query.id
        this.$http({
          url: this.$http.adornUrl('/ycyl/ycyluserperformance/getAssPrice'),
          method: 'post',
          data: {
            'assistantUserId': Id,
            'endPayTime': this.endPayTime,
            'status': this.status,
            'endServiceTime': this.endServiceTime,
            'startPayTime': this.startPayTime,
            'startServiceTime': this.startServiceTime,
            orderProperty: this.type?'1':'2',  //订单属性 1自购单2购物单4学习课程购买的单子
          }
        }).then(({data}) => {
          if (data && data.code === 0) {
            if (data.price&&data.price.price) {
              this.allMoney = data.price.orderMoney
            } else {
              this.allMoney = '0'
            }
            if (data.price&&data.price.orderMoney) {
              this.orderMoney = data.price.price
            } else {
              this.orderMoney = '0'
            }
            if (data.price&&data.price.deduct) {
              this.deductMoney = data.price.deduct
            } else {
              this.deductMoney = '0'
            }
          } else {
            this.$message.error(data.msg)
          }
        })
      },
      searchMthod (pageIndex = 1) {
        this.getSumPrice()

        var Id = this.$route.query.id
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl('/ycyl/ycyluserperformance/getForAss'),
          method: 'post',
          data: ({
            'page': pageIndex,
            'pageSize': this.pageSize,
            'key': this.dataForm.key,
            'assistantUserId': Id,
            'endPayTime': this.endPayTime,
            'status': this.status,
            'endServiceTime': this.endServiceTime,
            'startPayTime': this.startPayTime,
            'startServiceTime': this.startServiceTime,
            'orderProperty':this.type?'1':'2'
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
      // 获取数据列表
      getDataList () {
        var Id = this.$route.query.id
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl('/ycyl/ycyluserperformance/getForAss'),
          method: 'post',
          data: ({
            'page': this.pageIndex,
            'pageSize': this.pageSize,
            'key': this.dataForm.key,
             orderProperty: this.type?'1':'2',  //订单属性 1自购单2购物单4学习课程购买的单子
            'assistantUserId': Id
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
        this.$http({
          url: this.$http.adornUrl('/ycyl/ycyluserperformance/getInfoById'),
          method: 'post',
          data: {
            pId: id
          }
        }).then(({data}) => {
          if (data && data.code === 0) {
            var data = data.page.list[0]
            if (!data.diagnosisNum && !data.consulNum) {
              this.$alert('该单没有详情', '温馨提示', {
                confirmButtonText: '确定',
                callback: action => {
                  this.$message({
                    type: 'info',
                    message: '该单没有详情'
                  })
                }
              })
            } else {
              if (data.doctorType == 5) {
                this.addOrUpdateVisible = true
                this.$nextTick(() => {
                  this.$refs.addOrUpdate.init(data,this.type)
                })
              } else if (data.doctorType == 6) {
                this.homeConentaddExertVisible = true
                this.$nextTick(() => {
                  this.$refs.homeConentaddExert.init(data,this.type)
                })
              }
            }
          } else {
            this.$message.error(data.msg)
          }
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
  .searchBox {
    background-color: #eee;
    width: 100%;
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

  #doctorSearch {
    background-color: #eee;
    border-radius: 7px;
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


