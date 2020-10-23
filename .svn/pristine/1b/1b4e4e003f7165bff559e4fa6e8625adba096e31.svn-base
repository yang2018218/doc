<template>
  <!--  畜牧新闻-->
  <div class="mod-config">

    <div id="doctorSearch">
      <label class="agent_crux">
        姓名：
        <el-input placeholder="发布人姓名" v-model.trim="searchData.truename" style="width: 8rem" clearable></el-input>
      </label>
      <label class="agent_crux">
        文章Id：
        <el-input placeholder="文章Id" v-model.trim="searchData.marketId" style="width: 300px" clearable></el-input>
      </label>
      <label class="">
        浏览量：
        <el-input placeholder="" v-model.trim="searchData.startViews" clearable></el-input>
        <span>-</span>
        <el-input placeholder="" v-model.trim="searchData.endViews" clearable></el-input>
      </label>
      <label class="">
        评论量：
        <el-input placeholder="" v-model.trim="searchData.startComments" clearable></el-input>
        <span>-</span>
        <el-input placeholder="" v-model.trim="searchData.endComments" clearable></el-input>
      </label>
      <label class="">
        播放量：
        <el-input placeholder="" v-model.trim="searchData.startAudioPlayback" clearable></el-input>
        <span>-</span>
        <el-input placeholder="" v-model.trim="searchData.endAudioPlayback" clearable></el-input>
      </label>
      <label>
        <!-- <button @click="searchGoods" class="chairman_sunch">搜索</button> -->
        <el-button type="primary" @click="searchGoods()" style="padding:8px 18px">搜索</el-button>
      </label>
    </div>
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">

      <el-form-item>
        <el-button @click="addOrUpdatText()" type="primary" style="padding:7px 18px">新增
        </el-button>
      </el-form-item>
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
        label="关系分类"
        prop="poultryType"
        width="100">
      </el-table-column>
      <el-table-column
        align="center"
        header-align="center"
        label="文章标题"
        prop="title">
      </el-table-column>
      <el-table-column
        align="center"
        header-align="center"
        label="推送ID"
        prop="marketId">
      </el-table-column>
      <el-table-column
        align="center"
        header-align="center"
        label="视频"
        prop="videoUrl"
        width="80"
      >
        <template slot-scope="scope">
          <el-tag v-if="scope.row.videoUrl === null " size="small" type="danger">无</el-tag>
          <el-tag v-else size="small">有</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        header-align="center"
        label="封面图片"
        prop=""
        width="80">
        <template slot-scope="scope">
          <img :src="scope.row.coverImg" width="40" height="40" @click="preimages(scope.row.coverImg)"
               class="head_pic"/>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        header-align="center"
        label="发布人"
        prop="truename"
        width="150">
      </el-table-column>
      <el-table-column
        align="center"
        header-align="center"
        label="发布时间"
        prop="createTime"
        width="180">
      </el-table-column>
      <el-table-column
        align="center"
        header-align="center"
        label="浏览量"
        prop="views"
        width="100">
      </el-table-column>
      <el-table-column
        align="center"
        header-align="center"
        label="评论量"
        prop="comments"
        width="100">
      </el-table-column>
      <el-table-column
        align="center"
        header-align="center"
        label="播放量"
        prop="audioPlayback"
        width="100">
      </el-table-column>
      <el-table-column
        align="center"
        header-align="center"
        label="推荐值"
        prop="recommended"
        width="100">
      </el-table-column>
      <el-table-column
        align="center"
        fixed="right"
        header-align="center"
        label="操作"
        width="150">
        <template slot-scope="scope">

          <el-button @click="deleteHandle(scope.row.marketId)" size="small" type="text">删除</el-button>
          <!--          详情-->
          <el-button @click="addOrUpdateHandle(scope.row.marketId)" size="small" type="text">修改</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :visible.sync="dialogpre_aa" custom-class="dialogpre_aa_cc">
      <img width="100%" :src="dialogpre" alt/>
    </el-dialog>
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
    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"></add-or-update>
  </div>
</template>

<script>
  import AddOrUpdate from './marketynamic-add-xaingqing'

  export default {
    data () {
      return {
        animal_type: '',
        dialogpre_aa: false,
        dialogpre: '',
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
        searchData: {},
      }
    },
    components: {
      AddOrUpdate
    },
    activated () {
      this.anianimalList()
      this.getDataList()
    },
    methods: {
      anianimalList () {//获取动物种类
        this.$http({
          url: this.$http.adornUrl('/ycyl/ycyldictdata/list'),
          method: 'post',
          data: {
            dictValue: 'animal_type',
            pageSize: '30'
          }
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.animal_type = data.page.list
          } else {
          }
        })
      },
      preimages (item) {
        this.dialogpre_aa = true
        this.dialogpre = item
      },
      //搜索
      searchGoods (pageIndex=1) {
        this.searchData.page = pageIndex
        this.searchData.pageSize = this.pageSize
        this.searchData.articleType= 1
        this.$http({
          url: this.$http.adornUrl(`/ycyl/ycylmarketdynamic/getPageList`),
          method: 'get',
          params: this.searchData
        }).then(({data}) => {
          if (data && data.code == 0) {
            this.dataList = data.page.list
            this.totalPage = data.page.totalCount
          } else {
            this.$message.error(data.msg)
          }
        })
      },
      // 获取数据列表
      getDataList () {
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl('/ycyl/ycylmarketdynamic/getPageList'),
          method: 'get',
          params: this.$http.adornParams({
            'page': this.pageIndex,
            'pageSize': this.pageSize,
            'key': this.dataForm.key,
            'articleType': 1
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
        this.searchGoods()
      },
      // 当前页
      currentChangeHandle (val) {
        this.pageIndex = val
        this.searchGoods(this.pageIndex)
      },
      // 多选
      selectionChangeHandle (val) {
        this.dataListSelections = val
      },
      // 详情
      addOrUpdateHandle (id) {
        let animal_type = this.animal_type
        this.addOrUpdateVisible = true
        this.$nextTick(() => {
          this.$refs.addOrUpdate.init(id, animal_type)
        })
      },
      //新增
      addOrUpdatText () {
        this.$router.push({
          path: '/marketdynamicUedito',
          // query: {
          //   userId: userId,
          // }
        })
      },
      // 删除
      deleteHandle (id) {
        var ids = id ? [id] : this.dataListSelections.map(item => {
          return item.marketId
        })
        this.$confirm(`确定删除 ?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http({
            url: this.$http.adornUrl('/ycyl/ycylmarketdynamic/delete'),
            method: 'post',
            data: this.$http.adornData(ids, false)
          }).then(({data}) => {
            if (data && data.code === 0) {
              this.$message({
                message: '删除成功',
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
    border-bottom: 16px;

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


