<template>
  <div class="mod-config">
    <el-table
      :data="dataList"
      border
      v-loading="dataListLoading"
      @selection-change="selectionChangeHandle"
      style="width: 100%;">
      <el-table-column
        prop="chapterName"
        header-align="center"
        align="center"
        label="章节名称">
      </el-table-column>
      <el-table-column
        prop=""
        header-align="center"
        align="center"
        label="章节时长" width="100">
        <div slot-scope="scope">
          <span>{{formatSeconds(scope.row.duration)}}</span>
        </div>
      </el-table-column>
      <el-table-column
        prop="duration"
        header-align="center"
        align="center"
        label="是否公开" width="100" v-if="excellentMessage === '1'" key="1">
      </el-table-column>
      <el-table-column
        prop="content"
        header-align="center"
        align="center"
        label="学习人数" width="120">
      </el-table-column>
      <el-table-column
        prop=""
        header-align="center"
        align="center"
        label="章节状态" width="120">
        <div slot-scope="scope">
          <span v-if="scope.row.status=='0'">下架</span>
          <span v-if="scope.row.status=='1'">正常</span>
        </div>
      </el-table-column>
      <el-table-column
        fixed="right"
        header-align="center"
        align="center"
        width="180"
        label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="addOrUpdateHandle(scope.row.chapterId)">查看章节</el-button>
          <el-dropdown trigger="click">
  <span class="el-dropdown-link">
    状态
  </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="statusMes(1,scope.row.chapterId)">上架</el-dropdown-item>
              <el-dropdown-item @click.native="statusMes(0,scope.row.chapterId)">下架</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  // import AddOrUpdate from './ycyloperationlog-add-or-update'
  export default {
    data () {
      return {
        excellentMessage: '1',
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
    props: {
      studyIdMessageID: String,
      required: true
    },
    components: {
      // AddOrUpdate
    },
    // activated () {
    //   this.getDataList()
    // },
    activated () {
      this.getDataList()
    },
    methods: {
      statusMes (sta, id) {
        this.$http({
          url: this.$http.adornUrl('/study/studycurriculumchapter/update'),
          method: 'post',
          data: ({
            'status': sta,
            'chapterId': id
          })
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.$message.success('成功提醒：恭喜您，修改成功')
            this.getDataList()
          } else {
            this.$message.error(`温馨提示：${data.msg}`)
          }
          this.dataListLoading = false
        })
      },
      // 获取数据列表
      getDataList (id, excellent) {
        if (excellent) {
          this.excellentMessage = excellent
        }
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl('/study/studycurriculumchapter/list'),
          method: 'post',
          data: ({
            'studyId': this.studyIdMessageID,
            'page': this.pageIndex + '',
            'limit': this.pageSize + '',
            'key': this.dataForm.key
          })
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.dataList = data.page.list
            this.totalPage = data.page.totalCount
            this.formatSeconds()
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
        this.getDataList()
      },
      // 多选
      selectionChangeHandle (val) {
        this.dataListSelections = val
      },
      // 查看章节详情
      addOrUpdateHandle (id) {
        // this.addOrUpdateVisible = true
        // this.$nextTick(() => {
        //   this.$refs.addOrUpdate.init(id)
        // })
        setTimeout(()=>{
          this.$emit('xiangQing', id)

        },0)
      },
      formatSeconds (value) {
        var val = value / 1000
        var theTime = parseInt(val)// 秒

        var theTime1 = 0// 分

        var theTime2 = 0// 小时

        if (theTime > 60) {

          theTime1 = parseInt(theTime / 60)

          theTime = parseInt(theTime % 60)

          if (theTime1 > 60) {

            theTime2 = parseInt(theTime1 / 60)

            theTime1 = parseInt(theTime1 % 60)

          }

        }

        var result = '' + parseInt(theTime) + '秒'

        if (theTime1 > 0) {

          result = '' + parseInt(theTime1) + '分' + result

        }

        if (theTime2 > 0) {

          result = '' + parseInt(theTime2) + '小时' + result

        }

        return result

      },
      // 删除
      deleteHandle (id) {

        this.$confirm('您确认对该视频进行删除？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http({
            url: this.$http.adornUrl('/study/studycurriculumchapter/deleteById'),
            method: 'get',
            params: {chapterId: id}

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
  .el-dialog__body {
    padding: 10px 0;
  }

  .el-dialog__body {
    padding: 10px 0;
  }

  .el-dropdown-link {
    cursor: pointer;
    color: #19678E;
    font-size: 12px;
  }

  .el-dropdown-link:hover {
    color: #409EFF;
  }
</style>

