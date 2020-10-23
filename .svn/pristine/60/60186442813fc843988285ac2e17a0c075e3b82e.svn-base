<template>
  <div class="mod-config">
    <div id="doctorSearch">
      <label class="agent_crux">
        名字：
        <el-input style="width:126px;" placeholder="发布人名字" v-model.trim="searchData.truename"></el-input>
      </label>
      <label class="agent_crux">
        文章ID：
        <el-input style="width:300px;" placeholder="文章Id" v-model.trim="searchData.marketId"></el-input>
      </label>
      <label class="">
        浏览量：
        <el-input placeholder="" v-model.trim="searchData.startViews"></el-input>
        <span>-</span>
        <el-input placeholder="" v-model.trim="searchData.endViews"></el-input>
      </label>
      <label class="">
        评论量：
        <el-input placeholder="" v-model.trim="searchData.startComments"></el-input>
        <span>-</span>
        <el-input placeholder="" v-model.trim="searchData.endComments"></el-input>
      </label>
      <label class="">
        播放量：
        <el-input placeholder="" v-model.trim="searchData.startAudioPlayback"></el-input>
        <span>-</span>
        <el-input placeholder="" v-model.trim="searchData.endAudioPlayback"></el-input>
      </label>
      <label>
        是否有视频：
        <el-select v-model="remarka" placeholder="请选择">
          <el-option
            v-for="item in opta"
            :key="item.val"
            :label="item.label"
            :value="item.val">
          </el-option>
        </el-select>
      </label>
      <label>
        状态：
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
        <el-button type="primary" @click="searchGoods()" style="padding:8px 18px">搜索</el-button>

      </label>
    </div>
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
      <el-form-item>
        <el-button @click="addOrUpdatText()" type="primary" style="padding:8px 18px">新增
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

      <!-- <el-table-column
       align="center"
       header-align="center"
       label="文章ID"
       prop="poultryType"
       >
     </el-table-column> -->
      <el-table-column
        align="center"
        header-align="center"
        label="文章标题"
        prop="title">
      </el-table-column>
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
        label="推送id"
        prop="marketId"
        width="">
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
        header-align="center"
        label="状态"
        prop="status"
        width="100">
        <template slot-scope="scope">
          <span>{{scope.row.status==0?'下线':'上线'}} </span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        fixed="right"
        header-align="center"
        label="操作"
        width="150">
        <template slot-scope="scope">
          <el-button @click="addOrUpdateHandle(scope.row.marketId)" size="small" type="text">编辑</el-button>
          <el-button @click="deleteHandle(scope.row.marketId)" size="small" type="text">删除</el-button>
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
  import AddOrUpdate from './ycylmarketdynamic-add'

  export default {
    data () {
      return {
        animal_type: '',
        dataForm: {
          key: '',
          time: ''
        },
        remark: '',
        remarka: '',
        opt: [{
          val: '0',
          label: '下线'
        }, {
          val: '1',
          label: '上线'
        }
        ],
        opta: [{
          val: '2',
          label: '无视频'
        }, {
          val: '1',
          label: '有视频'
        }
        ],
        dataList: [],
        dialogpre_aa: false,
        dialogpre: '',
        pageIndex: 1,
        pageSize: 10,
        totalPage: 0,
        dataListLoading: false,
        dataListSelections: [],
        addOrUpdateVisible: false,
        searchData: {},
        qqTime: [],
      }
    },
    components: {
      AddOrUpdate
    },
    activated () {
      this.getDataList()
      this.anianimalList()
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
      searchGoods (pageIndex = 1) {
        this.searchData.page = pageIndex
        this.searchData.pageSize = this.pageSize
        this.searchData.status = this.remark
        this.searchData.videoUrl = this.remarka
        this.searchData.articleType = 2

        this.$http({
          url: this.$http.adornUrl(`/ycyl/ycylmarketdynamic/getPageList`),
          method: 'get',
          params: this.searchData
        }).then(({data}) => {
          if (data && data.code == 0) {
            // for(let k in this.searchData){
            //      this.searchData[k]=''
            //    }
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
            'articleType': 2
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
      preimages (item) {
        this.dialogpre_aa = true
        this.dialogpre = item
      },
      // 多选
      selectionChangeHandle (val) {
        this.dataListSelections = val
      },
      // 编辑
      addOrUpdateHandle (id) {
        this.addOrUpdateVisible = true
        var animal_type = this.animal_type
        this.$nextTick(() => {
          this.$refs.addOrUpdate.init(id, animal_type)
        })
      },
      //新增
      addOrUpdatText () {
        this.$router.push({
          path: '/ycylmarketdynamicUeditor',
        })
      },
      // 删除
      deleteHandle (id) {
        var ids = id ? [id] : this.dataListSelections.map(item => {
          return item.marketId
        })
        this.$confirm(`确定删除吗 ?`, '提示', {
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
</style>

