<template>
  <div class="mod-config">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
      <el-button type="primary" @click="addOrUpdateHandle()" style="margin-bottom: 16px">添加</el-button>
    </el-form>
    <el-table
      :data="dataList"
      border
      stripe
      v-loading="dataListLoading"
      @selection-change="selectionChangeHandle"
      style="width: 100%;">

      <el-table-column
        prop="dictValue"
        header-align="center"
        align="center"
        label="分类标识">
      </el-table-column>
      <el-table-column
        prop="dictName"
        header-align="center"
        align="center"
        label="名称">
      </el-table-column>
      <el-table-column
        prop="remark"
        header-align="center"
        align="center"
        label="备注">
      </el-table-column>
      <el-table-column
        prop="isShow"
        header-align="center"
        align="center"
        label="是否显示" width="100">
        <template slot-scope="scope">
          <span style="color: red" v-if="scope.row.isShow == 0">不显示</span>
          <el-tag style="color: green" v-if="scope.row.isShow == 1">显示</el-tag>
        </template>
</el-table-column>
<el-table-column prop="createTime" header-align="center" align="center" label="创建时间">
</el-table-column>

<el-table-column fixed="right" header-align="center" align="center" width="150" label="操作">
    <template slot-scope="scope">
          <el-button type="text" size="small" @click="addOrUpdateHandle(scope.row.dataId,scope.row.dictValue)">修改
          </el-button>
        </template>
</el-table-column>
</el-table>
<el-pagination @size-change="sizeChangeHandle" @current-change="currentChangeHandle" :current-page="pageIndex" :page-sizes="[10, 20, 50, 100]" :page-size="pageSize" :total="totalPage" layout="total, sizes, prev, pager, next, jumper">
</el-pagination>
<p>{{this.$route.query.name}}</p>
<!-- 弹窗, 新增 / 修改 -->
<add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList" v-bind:panges="PanerNanu" v-bind:PanerN="PanerNenu"></add-or-update>
</div>
</template>

<script>
    import AddOrUpdate from './ycyldictdata-add-or-update'
    //     function parseUrl () {
    //       var url = location.href;
    //     var i = url.indexOf('?');
    //     if (i == -1) return;
    //     var querystr = url.substr(i + 1);
    //     var arr1 = querystr.split('&');
    //     var arr2 = {};
    //     for (i in arr1) {
    //       var ta = arr1[i].split('=');
    //       arr2[ta[0]] = ta[1]
    //     }
    //       return arr2
    // }

    export default {
        data() {
            return {
                GetdictId: '',
                dictVal: '',
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
                PanerNanu: '',
                PanerNenu: ''

            }
        },
        components: {
            AddOrUpdate
        },
        activated() {
            this.getDataList()
        },
        methods: {
            // 获取数据列表
            getDataList() {
                var dictId = this.$route.query.dictId
                this.dictVal = this.$route.query.dictValue
                this.GetdictId = this.$route.query.dictId
                var that = this
                this.$http({
                    url: this.$http.adornUrl('/ycyl/ycyldictdata/list'),
                    method: 'post',
                    data: {
                        'page': this.pageIndex,
                        'pageSize': '30',
                        'key': this.dataForm.key,
                        'dictValue': this.dictVal,
                        'dataId': dictId,
                    }
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
                this.$route.query.dictId
                that.PanerNenu = this.$route.query.dictId
                that.PanerNanu = '1111'
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
                this.getDataList()
            },
            // 多选
            selectionChangeHandle(val) {
                this.dataListSelections = val
            },
            // 新增 / 修改
            addOrUpdateHandle(id) {
                var val = this.dictVal
                var GetdictId = this.GetdictId
                this.addOrUpdateVisible = true
                this.$nextTick(() => {
                    this.$refs.addOrUpdate.init(id, val, GetdictId)
                })
            },
        }
    }
</script>
