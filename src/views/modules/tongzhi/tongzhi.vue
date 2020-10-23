<template>
  <!--  系统通知-->
  <div class="mod-config">
    <div class="searchSty">
      <label>通知类型：
        <el-select v-model="searchData.noticeType" placeholder="请选择" clearable>
          <el-option
            v-for="item in options"
            :key="item.dataId"
            :label="item.dictName"
            :value="item.dataId">
          </el-option>
        </el-select>
      </label>
      <label>通知标题：
        <el-input v-model.trim="searchData.noticeTitle" placeholder="请输入标题" clearable></el-input>
      </label>
      <label>状态：
        <el-select v-model="searchData.noticeStatus" placeholder="请选择" clearable>
          <el-option
            v-for="item in stateList"
            :key="item.val"
            :label="item.message"
            :value="item.val">
          </el-option>
        </el-select>
      </label>
      <label>
        <el-button type="primary" style="padding: 7px 20px" @click="searchBtn()">搜索</el-button>
      </label>
    </div>
    <el-button @click="addTongZhi" type="primary" class="addSty" style="padding: 7px 20px;margin: 15px 0">新增</el-button>
    <el-table
      :data="dataList"
      border
      v-loading="dataListLoading"
      @selection-change="selectionChangeHandle"
      style="width: 100%;">
      <el-table-column
        prop="noticeTypeName"
        header-align="center"
        align="center"
        label="通知类型">
      </el-table-column>
      <el-table-column
        prop="noticeTitle"
        header-align="center"
        align="center"
        label="通知标题">
      </el-table-column>
      <el-table-column
        prop="createTime"
        header-align="center"
        align="center"
        label="创建时间">
      </el-table-column>
      <el-table-column
        prop="relatedId"
        header-align="center"
        align="center"
        label="相关ID/链接">
        <!--        <div slot-scope="scope">-->
        <!--          <span v-if="scope.row.noticeUrl">{{scope.row.relatedId}}</span>-->
        <!--          <span v-else-if="scope.row.relatedId">{{scope.row.relatedId}}</span>-->
        <!--          <span v-else-if="scope.row.relatedId">{{scope.row.relatedId}}</span>-->
        <!--        </div>-->
      </el-table-column>
      <el-table-column
        prop="remark"
        header-align="center"
        align="center"
        label="开始时间">
        <div slot-scope="scope">
          <span v-if="scope.row.startTime">{{scope.row.startTime}}</span>
          <span v-else="">/</span>
        </div>
      </el-table-column>
      <el-table-column
        prop="remark"
        header-align="center"
        align="center"
        label="结束时间">
        <div slot-scope="scope">
          <span v-if="scope.row.startTime">{{scope.row.endTime}}</span>
          <span v-else="">/</span>
        </div>
      </el-table-column>
      <el-table-column
        prop=""
        header-align="center"
        align="center"
        label="状态">
        <div slot-scope="scope">
          <span v-if="scope.row.noticeStatus==1" style="color: #2D64B3">已开启</span>
          <span v-if="scope.row.noticeStatus==3" style="color: red">已结束</span>
          <span v-if="scope.row.noticeStatus==2" style="color: greenyellow">未开启</span>
        </div>
      </el-table-column>
      <el-table-column
        fixed="right"
        header-align="center"
        align="center"
        width="150"
        label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="imgDetails(scope.row.noticeUrl)">查看图片</el-button>
          <el-dropdown>
  <span class="el-dropdown-link">
    状态管理
  </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="statusNumber('1',scope.row.id)">开启</el-dropdown-item>
              <el-dropdown-item @click.native="statusNumber('3',scope.row.id)">关闭</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
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
    <el-dialog
      title="图片详情"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <div style="width: 100%;height: 100%;">
        <img :src="imgUrl" alt="" style="width: 100%"/>
      </div>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">返回</el-button>

  </span>
    </el-dialog>
  </div>
</template>

<script>
  import AddOrUpdate from './tongzhi-add'

  export default {
    data () {
      return {
        stateList:[
          {
        val:'1',
        message:'开启'
        },
          {
            val:'3',
            message:'已结束'
          },
          {
            val:'2',
            message:'未开启'
          },
        ],
        imgUrl: '',
        dialogVisible: false,
        searchData: {},
        options: [],
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
      this.doctorList()
    },
    methods: {
      imgDetails (noticeUrl) {
        this.dialogVisible = true
        this.imgUrl = noticeUrl
      },
      statusNumber (status, id) {//状态管理
        var a = true
        this.dataList.forEach(e=>{
        })
        // if(){
        //
        // }
        this.$http({
          url: this.$http.adornUrl('/ycyl/ycylnotice/userOpenStatus'),
          method: 'post',
          data: {
            noticeStatus: status,
            id: id
          }
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.getDataList()
          } else {
            this.$message.error(`温馨提示：${data.msg}`)
            this.getDataList()
          }
        })
      },
      searchBtn (pageIndex=1) {//搜索
        this.searchData.noticeCategory = '1'
        this.searchData.pageSize = this.pageSize
        this.searchData.page = pageIndex
        this.$http({
          url: this.$http.adornUrl('/ycyl/ycylnotice/getPushList'),
          method: 'post',
          data: this.searchData
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.dataList = data.page.list
            this.totalPage = data.page.totalCount
          } else {
            this.$message.error(`温馨提示：${data.msg}`)
            this.getDataList()
          }
        })
      },
      doctorList () {//列表
        this.$http({
          url: this.$http.adornUrl('/ycyl/ycyldictdata/list'),
          method: 'post',
          data: {
            'page': this.pageIndex,
            'pageSize': '30',
            'key': this.dataForm.key,
            'dictValue': 'tongzhi'
          }
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.options = data.page.list
          } else {
            this.message.error(data.msg)
          }
          this.dataListLoading = false
        })
      },
      addTongZhi () {//新增
        this.addOrUpdateVisible = true
        this.$nextTick(() => {
          this.$refs.addOrUpdate.init()
        })

      },
      // 获取数据列表
      getDataList () {//通知
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl('/ycyl/ycylnotice/getPushList'),
          method: 'post',
          data: {
            'page': this.pageIndex,
            'pageSize': this.pageSize,
            'key': this.dataForm.key,
            'noticeCategory': '1',
          }
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
        this.searchBtn()
      },
      // 当前页
      currentChangeHandle (val) {
        this.pageIndex = val
        this.searchBtn(this.pageIndex)
      },
      // 多选
      selectionChangeHandle (val) {
        this.dataListSelections = val
      },
      // 新增 / 修改
      addOrUpdateHandle (id) {

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
            url: this.$http.adornUrl('/ycyl/ycylnotice/delete'),
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
  .el-dropdown-link {
    cursor: pointer;
    color: #19678E;
  }

  .el-icon-arrow-down {
    font-size: 12px;
  }

  .mod-config {
    .searchSty {
      height: 60px;
      background: rgba(238, 238, 238, 1);
      border-radius: 6px;
      line-height: 60px;

      label {
        margin-right: 30px;
      }

    }

    /*.addSty {*/
    /*  margin: 15px 0px;*/
    /*  padding: 7px 20px;*/
    /*  width: 90px;*/
    /*  height: 40px;*/
    /*  border-radius: 6px;*/
    /*  color: #fff;*/
    /*}*/

  }
</style>

