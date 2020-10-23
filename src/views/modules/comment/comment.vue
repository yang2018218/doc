<template>
  <div class="mod-config">
    <div id="doctorSearch">
      <label class="agent_crux">
        回复用户昵称：
        <el-input placeholder="昵称" v-model="search.nickname" style="width: 8rem"></el-input>
      </label>
      <label class="agent_crux">
        手机号：
        <el-input placeholder="回复用户手机号" v-model="search.mobile" style="width: 8rem" clear></el-input>
      </label>
      <label class="agent_crux">
        信息来源：
        <el-select v-model="search.articleType" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>

      </label>
      <label class="agent_crux">
        状态：
        <el-select v-model="search.status" placeholder="请选择">
          <el-option
            v-for="item in statusList"
            :key="item.value"
            :label="item.label"
            :value="item.sta">
          </el-option>
        </el-select>
      </label>
      <label>
        <el-button type="primary" @click="searchMthod()" style="padding:8px 18px">搜索</el-button>
      </label>
    </div>

    <el-table
      :data="dataList"
      stripe
      @selection-change="selectionChangeHandle"
      border
      style="width: 100%;"
      v-loading="dataListLoading">
<!--      <el-table-column-->
<!--        align="center"-->
<!--        header-align="center"-->
<!--        type="selection"-->
<!--        width="50">-->
<!--      </el-table-column>-->
      <el-table-column
        align="center"
        header-align="center"
        label="信息来源"
        prop="articleType"
        width="120">
        <template slot-scope="scope">
          <span v-if="scope.row.articleType==1">畜牧新闻</span>
          <span v-if="scope.row.articleType==2">畜牧知识</span>
          <span v-if="scope.row.articleType==3">市场行情</span>
          <span v-if="scope.row.articleType==4">畜牧圈</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        header-align="center"
        label="发布用户昵称"
        prop="earnedNickname"
        width="200">
      </el-table-column>
      <el-table-column
        align="center"
        header-align="center"
        label="文章ID"
        prop="articleId"
        width="200">
      </el-table-column>
      <el-table-column
        align="center"
        header-align="center"
        label="回复用户昵称"
        prop="nickname"
        width="150">
      </el-table-column>
      <el-table-column
        align="center"
        header-align="center"
        label="回复用户手机"
        prop="mobile"
        width="150">
      </el-table-column>
      <el-table-column
        align="center"
        header-align="center"
        label="回复内容"
        prop="content"
      >
      </el-table-column>

      <el-table-column
        align="center"
        header-align="center"
        label="状态"
        prop="status"
        width="90">
        <template slot-scope="scope">
          <el-tag size="small" type="danger" v-if="scope.row.status === 0">未审核</el-tag>
          <el-tag color="yellow" size="small" v-if="scope.row.status === 2">未通过</el-tag>
          <el-tag size="small" v-if="scope.row.status === 1">已通过</el-tag>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        fixed="right"
        header-align="center"
        label="操作"
        width="150">
        <template slot-scope="scope">
          <el-dropdown trigger="click">
      <span class="el-dropdown-link">
        审核
      </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="statusMansge(scope.row.commentId,1)">通过</el-dropdown-item>
              <el-dropdown-item @click.native="statusMansge(scope.row.commentId,2)">未通过</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-button @click="deleteHandle(scope.row.commentId)" size="small" type="text">删除</el-button>
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
    <!-- 审核弹窗-->
    <!--    <add-or-update @refreshDataList="getDataList" ref="addOrUpdate" v-if="addOrUpdateVisible"></add-or-update>-->
  </div>
</template>

<script>
  // import AddOrUpdate from './ycylpoultrycircle-add-or-update'

  export default {
    data () {
      return {
        search:{},
        mobile: '',
        nickname: '',
        status: '',
        articleType: '',
        statusList: [
          {
            sta: '',
            label: '全部'
          },{
            sta: '1',
            label: '已通过'
          }, {
            sta: '2',
            label: '未通过'
          }, {
            sta: '0',
            label: '未审核'
          },],
        sta: '',
        options: [
          {
            value: '',
            label: '全部'
          },
          {
            value: '4',
            label: '畜牧圈'
          }, {
            value: '1',
            label: '畜牧新闻'
          }, {
            value: '2',
            label: '畜牧知识'
          }, {
            value: '3',
            label: '市场行情'
          },],
        value: '',
        dataForm: {
          key: '',
          time: ''
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
      // AddOrUpdate
    },
    activated () {
      this.getDataList()
    },
    methods: {
      //搜索方法
      searchMthod (pageIndex=1) {
        this.search.page=pageIndex
        this.search.pageSize=this.pageSize
        this.$http({
          url: this.$http.adornUrl('/ycyl/ycylcommentrecord/getPageList'),
          method: 'post',
          data: this.search
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
      statusMansge (id, sta) {
        this.$http({
          url: this.$http.adornUrl('/ycyl/ycylcommentrecord/update'),
          method: 'post',
          data: {
            'page': this.pageIndex,
            'pageSize': this.pageSize,
            'key': this.dataForm.key,
            'commentId': id,
            'status': sta
          }
        }).then(({data}) => {
          //this.getDataList()
          if (data && data.code === 0) {
            this.searchMthod(this.pageIndex)

          } else {
            this.dataList = []
            this.totalPage = 0
          }
          this.dataListLoading = false
        })
      },
      // 获取数据列表
      getDataList () {
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl('/ycyl/ycylcommentrecord/getPageList'),
          method: 'post',
          data: {
            'page': this.pageIndex,
            'pageSize': this.pageSize,
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
        this.searchMthod()
      },
      // 当前页
      currentChangeHandle (val) {
        this.pageIndex = val
        this.searchMthod(this.pageIndex)
      },
      // 多选
      selectionChangeHandle (val) {
        this.dataListSelections = val
      },
      // 弹出窗
      addOrUpdateHandle (id) {
        this.addOrUpdateVisible = true
        this.$nextTick(() => {
          this.$refs.addOrUpdate.init(id)
        })
      },
      // 删除
      deleteHandle (id) {
        var ids = id ? [id] : this.dataListSelections.map(item => {
          return item.cId
        })
        this.$confirm(`确定删除 ?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http({
            url: this.$http.adornUrl('/ycyl/ycylcommentrecord/delete'),
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
  #doctorSearch {
    background-color: #eee;
    border-radius: 0.4rem;
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

  .el-dropdown-link {
    font-size: 12px;
    color: #19678E;
    margin-right: 0.5rem;
  }
</style>


