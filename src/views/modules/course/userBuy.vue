<template>
  <div class="mod-config">
    <div class="searchBox">
      <label>
        讲师姓名：
        <el-select v-model="searchData.truename" placeholder="请选择" @click.native="doctorExample" clearable>
          <el-option
            v-for="item in options"
            :key="item.userId"
            :label="item.truename"
            :value="item.truename">
          </el-option>
        </el-select>
      </label>
      <label>
        课程名称：
        <el-input
          placeholder="请输入内容"
          v-model="searchData.courseName"
          oninput="this.value = this.value.trim()"
          clearable>
        </el-input>
      </label>
      <label>
        创建时间：
        <el-date-picker
          width="200px"
          @click.native="dianji"
          v-model="dataTime"
          value-format="yyyy-MM-dd"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </label>
      <label>
        课程类型：
        <el-select v-model="searchData.fitKind" placeholder="请选择" clearable>
          <el-option
            v-for="item in animals"
            :key="item.dictId"
            :label="item.name"
            :value="item.dictId">
          </el-option>
        </el-select>
      </label>
      <label>
        <el-button type="success" class="searchStyle" @click="search()">搜索</el-button>
      </label>
    </div>
    <header class="searchBox ">

      <label><span>总购买金额：{{buyMoney}}</span></label>
      <label><span>总提成：{{doctorMoney}}</span></label>
      <label >
            <el-button slot="reference" type="warning" class="excel" style="padding: 8px 20px" @click="downloadFile()">
            下载文件
          </el-button>
      </label>
    </header>
    <el-table
      :data="dataList"
      border
      v-loading="dataListLoading"
      @selection-change="selectionChangeHandle"
      style="width: 100%;">
      <el-table-column
        prop="courseName"
        header-align="center"
        align="center"
        label="课程名称">
      </el-table-column>
      <el-table-column
        prop="fitKind"
        header-align="center"
        align="center"
        label="课程类型">
      </el-table-column>
      <el-table-column
        prop="nickname"
        header-align="center"
        align="center"
        label="用户名称">
      </el-table-column>
      <el-table-column
        prop="mobile"
        header-align="center"
        align="center"
        label="用户手机号">
      </el-table-column>
      <el-table-column
        prop="doctorTruename"
        header-align="center"
        align="center"
        label="主讲老师名称">
      </el-table-column>
      <el-table-column
        prop="price"
        header-align="center"
        align="center"
        label="付款金额">
      </el-table-column>
      <el-table-column
        prop="createTime"
        header-align="center"
        align="center"
        label="购买时间">
      </el-table-column>
      <el-table-column
        prop="deduct"
        header-align="center"
        align="center"
        label="提成">
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
    <!--    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"></add-or-update>-->
  </div>
</template>
<script>
  // import AddOrUpdate from './ycyloperationlog-add-or-update'
  export default {
    data () {
      return {
        buyMoney: '',
        doctorMoney: '',
        text: '数据请求中，请稍等',
        isdisabled: true,
        visibleExcel: false,
        excelPath: '',//导出路径
        searchData: {},//检索集合
        animalType: '',//动物种类
        animals: [],//动物种类数组
        dataTime: '',//检索时间
        input: '',//课程名称
        options: [],
        value: '',
        expertName: '',//专家名字
        doctorName: '',//医生名字
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
    },
    activated () {
      this.getAnimal()
      this.getDataList()
      this.getDoctor()
      this.getExpert()
    },
    methods: {
      statistics (pageIndex=1) {//统计
        this.searchData.page = pageIndex
        this.searchData.pageSize = this.pageSize
        this.searchData.key = this.dataForm.key
        if (this.dataTime && this.dataTime.length > 1) {
          this.searchData.startCreateTime = this.dataTime[0]+' 00:00:00'
          this.searchData.endCreateTime = this.dataTime[1]+' 23:59:59'
        }
        this.$http({
          url: this.$http.adornUrl('/study/studybuyrecord/getPriceAndDeduct'),
          method: 'post',
          data: this.searchData
        }).then(({data}) => {
          if (data && data.code === 0) {
            if (data.price){
              this.buyMoney = data.price[0].price
              this.doctorMoney = data.price[0].deduct
            }
          } else {
            this.$message.error(data.msg)
          }
          this.dataListLoading = false
        })
      },
      search (pageIndex=1) {
        this.searchData.page = pageIndex
        this.searchData.pageSize = this.pageSize
        this.searchData.key = this.dataForm.key
        if (this.dataTime && this.dataTime.length > 1) {
          this.searchData.startCreateTime = this.dataTime[0]+' 00:00:00'
          this.searchData.endCreateTime = this.dataTime[1]+' 23:59:59'
        }
        this.$http({
          url: this.$http.adornUrl('/study/studybuyrecord/list'),
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
      downloadFile () {//导出信息
        const loading = this.$loading({
          lock: true,
          text: '下载中...',
          spinner: 'el-icon-loading',
          background: 'rgba(255, 255, 255, 0.7)'
        });
        if (this.dataTime && this.dataTime.length > 1) {
          this.searchData.startCreateTime = this.dataTime[0]+' 00:00:00'
          this.searchData.endCreateTime = this.dataTime[1]+' 23:59:59'
        }
        this.$http({
          url: this.$http.adornUrl('/study/studybuyrecord/getStudyBuyRep'),
          method: 'post',
          data: this.searchData
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.text = '数据请求完毕，请点击确定进行下载'
            this.excelPath = data.path
            window.location.href=this.excelPath
            loading.close()
          } else {
            this.$message.error(data.msg)
          }
        })

      },
      getAnimal () {
        // animals
        this.$http({
          url: this.$http.adornUrl('/study/studyanimaldict/list'),
          method: 'post',
          data: {
            page: '1',
            pageSize: '30',
            dictValue: 'animal_type'
          }
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.animals = data.list
          } else {
            this.$message.error('暂未获取到动物种类，请联系管理员或稍后重试')
          }
        })
      },
      dianji () {
      },
      doctorExample () {
        this.expertName.forEach(e => {
          this.doctorName.push(e)
        })
        this.options = this.doctorName
      },
      getDoctor () {//获取所有医生
        this.$http({
          url: this.$http.adornUrl('/ycyl/ycyluserdoctor/getAllDoctor'),
          method: 'post',
          data: {
            page: 1,
            pageSize: '100',
            doctorStatus: '1'
          }
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.doctorName = data.doc
          } else {
            this.$message.error('获取医生信息错误，请稍后重试或联系管理员')
          }
        })
      },
      getExpert () {//获取所有专家
        this.$http({
          url: this.$http.adornUrl('/ycyl/ycyluserexpert/getAllExpert'),
          method: 'post',
          data: {
            page: 1,
            pageSize: '100',
            doctorStatus: '1'
          }
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.expertName = data.exp
          } else {
            this.$message.error('获取专家信息错误，请稍后重试或联系管理员')
          }
        })
      },// 获取数据列表
      getDataList () {
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl('/study/studybuyrecord/list'),
          method: 'post',
          data: ({
            'page': this.pageIndex,
            'pageSize': this.pageSize,
            'key': this.dataForm.key
          })
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.statistics()
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
        this.search(this.pageIndex)
      },
      // 当前页
      currentChangeHandle (val) {
        this.pageIndex = val
        this.search(this.pageIndex)
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
          return item.logId
        })
        this.$confirm(`确定对[id=${ids.join(',')}]进行[${id ? '删除' : '批量删除'}]操作?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http({
            url: this.$http.adornUrl('/generator/ycyloperationlog/delete'),
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
<style scoped lang="scss">
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

