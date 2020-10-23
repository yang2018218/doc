<template>
  <div class="mod-config">

    <div id="doctorSearch">
      <label class="agent_crux">
        昵称：
        <el-input placeholder="昵称" v-model="dataForm.nickname" style="width: 8rem"></el-input>
      </label>
      <label class="agent_crux">
        手机号：
        <el-input placeholder="手机号" v-model="dataForm.mobile" style="width: 8rem"></el-input>
      </label>

      <label class="">
        点赞量：
        <el-input placeholder="" v-model="dataForm.startLikeNum"></el-input>
        <span>-</span>
        <el-input placeholder="" v-model="dataForm.endLikeNum"></el-input>
      </label>
      <label class="">
        评论量：
        <el-input placeholder="" v-model="dataForm.startRecordNum"></el-input>
        <span>-</span>
        <el-input placeholder="" v-model="dataForm.endRecordNum"></el-input>
      </label>
      <label>内容Id：
        <el-input placeholder="" v-model="dataForm.cId" style="width: 250px"></el-input>
      </label>
      <label class="agent_crux">
        状态：
        <el-select v-model="dataForm.status" placeholder="请选择">
          <el-option
            v-for="item in statusList"
            :key="item.value"
            :label="item.label"
            :value="item.sta">
          </el-option>
        </el-select>

      </label>
      <label>
        <el-button type="primary" @click="searchMthod()" style="padding:7px 18px">搜索</el-button>
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
        label="手机号"
        prop="mobile"
        width="120">
      </el-table-column>
      <el-table-column
        align="center"
        header-align="center"
        label="推送ID"
        prop="cId"
        width="120">
      </el-table-column>
      <el-table-column
        align="center"
        header-align="center"
        label="用户昵称"
        prop="nickname"
        width="160">
      </el-table-column>
      <el-table-column
        align="center"
        header-align="center"
        label="内容"
        prop="content">
      </el-table-column>
      <el-table-column
        align="center"
        header-align="center"
        label="图片"
        prop="url" style="padding: 0">
        <template slot-scope="scope">
          <div style="display: flex;">
            <img :src="item.imageUrl" @click="preimages(item.imageUrl)" v-for="(item,index) in scope.row.url"
                 style="display: inline-block;width: 3rem;margin-left: 1rem" :key="index"/>
          </div>
        </template>
      </el-table-column>
      <el-table-column align="center" header-align="center" label="浏览量" prop="pageViewNum" width="80">
      </el-table-column>
      <el-table-column align="center" header-align="center" label="评论量" prop="recordNum" width="80">
      </el-table-column>
      <el-table-column align="center" header-align="center" label="状态" prop="likeNum" width="80">
        <template slot-scope="scope">
          <el-tag size="small" type="danger" v-if="scope.row.status === 0">未审核</el-tag>
          <el-tag color="yellow" size="small" v-if="scope.row.status === 2">未通过</el-tag>
          <el-tag size="small" v-if="scope.row.status === 1">已通过</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" fixed="right" header-align="center" label="操作" width="150">
        <template slot-scope="scope">
          <el-button @click="addOrUpdateHandle(scope.row.cId,scope.row.status)" size="small" type="text">审核</el-button>
          <el-button @click="deleteHandle(scope.row.cId)" size="small" type="text">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :visible.sync="dialogpre_aa" custom-class="dialogpre_aa_cc">
      <img width="100%" :src="dialogpre" alt/>
    </el-dialog>
    <el-pagination :current-page="pageIndex" :page-size="pageSize" :page-sizes="[10, 20, 50, 100]" :total="totalPage"
                   @current-change="currentChangeHandle" @size-change="sizeChangeHandle"
                   layout="total, sizes, prev, pager, next, jumper">
    </el-pagination>
    <!-- 审核弹窗-->
    <add-or-update @refreshDataList="getDataList" ref="addOrUpdate" v-if="addOrUpdateVisible"></add-or-update>
  </div>
</template>

<script>
  import AddOrUpdate from './ycylpoultrycircle-add-or-update'

  export default {
    data () {
      return {
        dialogpre_aa: false,
        dialogpre: '',
        status: '',
        nickname: '',
        mobile: '',
        startLikeNum: '',
        endLikeNum: '',
        startRecordNum: '',
        endRecordNum: '',
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
        addOrUpdateVisible: false,
        statusList: [{
          sta: '',
          label: '全部'
        }, {
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
      }
    },
    components: {
      AddOrUpdate
    },
    activated () {
      this.getDataList()
    },
    methods: {
      preimages (item) {
        this.dialogpre_aa = true
        this.dialogpre = item
      },
      searchMthod (pageIndex = 1) {
        this.dataForm.page = pageIndex
        this.dataForm.pageSize = this.pageSize
        this.dataForm.key = this.dataForm.key
        this.$http({
          url: this.$http.adornUrl('/ycyl/ycylpoultrycircle/list'),
          method: 'post',
          data: this.dataForm
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
      // 获取数据列表
      getDataList () {
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl('/ycyl/ycylpoultrycircle/list'),
          method: 'post',
          data: ({
            'page': this.pageIndex,
            'pageSize': this.pageSize,
            'key': this.dataForm.key,
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
      addOrUpdateHandle (id, s) {
        this.addOrUpdateVisible = true
        this.$nextTick(() => {
          this.$refs.addOrUpdate.init(id, s)
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
            url: this.$http.adornUrl('/ycyl/ycylpoultrycircle/delete'),
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
  #doctorSearch {
    background-color: #eee;
    border-radius: 0.4rem;
    padding: 10px 5px;
    margin-bottom: 16px;

    .chairman_sunch {
      color: #fff;
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
