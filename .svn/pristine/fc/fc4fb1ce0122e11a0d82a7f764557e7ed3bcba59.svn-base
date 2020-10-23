<template>
  <div class="mod-config">
    <div class="ycylagentwproductSearch">
      <label class="agent_crux">
        产品名称：
        <el-input
          placeholder="产品名称"
          v-model="searchData.productName"
          class="inputL"
          style="width: 6rem;"
        ></el-input>
      </label>

      <label style="margin-right: 4rem;">
        功能类目：
        <el-select
          placeholder="请选择"
          v-model="searchData.productType"
          class="inputL"
          style="width: 6rem;"
        >
          <el-option
            :key="index"
            :label="item.dictName"
            :value="item.dataId"
            v-for="(item,index) in medicine"
            style="width: 6rem;"
          ></el-option>
        </el-select>
      </label>

      <label class>
        总储量：
        <el-input style="width:160px;" v-model="searchData.startTotalReserves"></el-input>
        <span>-</span>
        <el-input style="width:160px;" v-model="searchData.endTotalReserves"></el-input>
      </label>

      <label>
        状态：
        <el-select placeholder="请选择" v-model="searchData.inventoryStatus">
          <el-option
            :key="item.shu"
            :label="item.label"
            :value="item.shu"
            v-for="item in dataForm.condition"
          ></el-option>
        </el-select>
      </label>
      <label style="width: 7rem;">
        适用种类：
        <el-select placeholder="请选择" v-model="searchData.fitKind" class="inputL">
          <el-option
            :key="inde"
            :label="item.dictName"
            :value="item.dataId"
            v-for="(item,inde) in enterpriseList"
            style="width: 6rem;"
          ></el-option>
        </el-select>
      </label>
      <label>
        <button @click="searchGoods" class="chairman_sunch">搜索</button>
      </label>
    </div>
    <el-table
      :data="dataList"
      @selection-change="selectionChangeHandle"
      border
      stripe
      style="width: 100%;"
      v-loading="dataListLoading"
    >
      <el-table-column align="center" header-align="center" label="商品ID" prop="mainId" width="120"></el-table-column>
      <el-table-column
        align="center"
        header-align="center"
        label="产品名称"
        prop="productName"
        width="160"
      ></el-table-column>
      <!--      确定-->
      <el-table-column align="center" header-align="center" label="适用种类" prop="fitKind" width="100"></el-table-column>
      <!--      确定-->
      <el-table-column
        align="center"
        header-align="center"
        label="功能类目"
        prop="productType"
        width="120"
      ></el-table-column>
      <el-table-column
        align="center"
        header-align="center"
        label="总储量"
        prop="totalReserves"
        width="80"
      ></el-table-column>
      <!--      添加状态-->
      <el-table-column align="center" header-align="center" label="状态" width="80">
        <template slot-scope="scope">
          <!-- {{ scope.row.inventoryStatus=='0'?"缺货":'正常'}} -->
          {{scope.row.inventoryStatus}}
        </template>
      </el-table-column>

      <!--      规格数-->
      <el-table-column align="center" header-align="center" label="规格1" prop="count1" width="95">
        <template slot-scope="scope">
          <p v-if="scope.row.count1">{{ scope.row.count1}}</p>
          <p v-else>0</p>
        </template>
      </el-table-column>
      <el-table-column align="center" header-align="center" label="规格2" prop="count2" width="95">
        <template slot-scope="scope">
          <p v-if="scope.row.count2">{{ scope.row.count2}}</p>
          <p v-else>0</p>
        </template>
      </el-table-column>
      <el-table-column align="center" header-align="center" label="规格3" prop="count3" width="95">
        <template slot-scope="scope">
          <p v-if="scope.row.count3">{{ scope.row.count3}}</p>
          <p v-else>0</p>
        </template>
      </el-table-column>
      <el-table-column align="center" header-align="center" label="规格4" prop="count4" width="95">
        <template slot-scope="scope">
          <p v-if="scope.row.count4">{{ scope.row.count4}}</p>
          <p v-else>0</p>
        </template>
      </el-table-column>
      <el-table-column align="center" header-align="center" label="规格5" prop="count5" width="95">
        <template slot-scope="scope">
          <p v-if="scope.row.count5">{{ scope.row.count5}}</p>
          <p v-else>0</p>
        </template>
      </el-table-column>
      <el-table-column align="center" header-align="center" label="规格6" prop="count6" width="95">
        <template slot-scope="scope">
          <p v-if="scope.row.count6">{{ scope.row.count6}}</p>
          <p v-else>0</p>
        </template>
      </el-table-column>
      <el-table-column align="center" header-align="center" label="规格7" prop="count7" width="95">
        <template slot-scope="scope">
          <p v-if="scope.row.count7">{{ scope.row.count7}}</p>
          <p v-else>0</p>
        </template>
      </el-table-column>
      <el-table-column align="center" header-align="center" label="规格8" prop="count8" width="95">
        <template slot-scope="scope">
          <p v-if="scope.row.count8">{{ scope.row.count8}}</p>
          <p v-else>0</p>
        </template>
      </el-table-column>
      <el-table-column align="center" header-align="center" label="规格9" prop="count9" width="95">
        <template slot-scope="scope">
          <p v-if="scope.row.count9">{{ scope.row.count9}}</p>
          <p v-else>0</p>
        </template>
      </el-table-column>
      <el-table-column align="center" fixed="right" header-align="center" label="操作" width="130">
        <template slot-scope="scope">
          <!--                    <el-button @click="addOrUpdateHandle(scope.row.wId)" size="small" type="text">管理</el-button>-->
                    <el-button @click="addOrUpdateHandle(scope.row)" size="small" type="text">管理</el-button>
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
      layout="total, sizes, prev, pager, next, jumper"
    >
    </el-pagination>
    <!-- 弹窗, 新增 / 修改 -->
    <add-or-update @refreshDataList="getDataList" ref="addOrUpdate" v-if="addOrUpdateVisible"></add-or-update>
  </div>
</template>

<script>
import AddOrUpdate from "./ycylagentwproduct-add-or-update";

export default {
  data() {
    return {
      mainstate: "",
      dictName: "",
      dictId: "",
      medicine: "",
      enterpriseList: "",
      dataForm: {
        key: "",
        condition: [
          {
            shu: "0",
            label: "正常"
          },

          {
            shu: "1",
            label: "缺货"
          }
        ],
        shu: ""
      },
      dataList: [],
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      dataListLoading: false,
      dataListSelections: [],
      addOrUpdateVisible: false,
      searchData: {}
    };
  },
  components: {
    AddOrUpdate
  },
  activated() {
    this.userId = this.$route.query.agentUserId;
    this.getDataList();
    this.variety();
    this.virus();
  },
  methods: {
    searchGoods() {
      this.searchData.page = this.pageIndex;
      this.searchData.pageSize = this.pageSize;
      this.searchData.userId = this.this.$route.query.c;

      this.$http({
        url: this.$http.adornUrl("/ycyl/ycylagentwproduct/list"),
        method: "post",
        data: this.searchData
      }).then(({ data }) => {
        if (data && data.code == 0) {
          this.call(data.page.list);
          for (let k in this.searchData) {
            this.searchData[k] = "";
          }
          this.dataList = data.page.list;
          this.totalPage = data.page.totalCount;
        } else {
          this.$message.error(data.msg);
        }
      });
    },
    // 获取动物种类数据
    variety() {
      var that = this;
      this.dataListLoading = true;
      this.$http({
        url: this.$http.adornUrl("/ycyl/ycyldictdata/list"),
        method: "post",
        data: {
          page: this.pageIndex,
          pageSize: "30",
          key: this.dataForm.key,
          dictValue: "animal_type"
        }
      }).then(({ data }) => {
        if (data && data.code === 0) {
          this.enterpriseList = data.page.list;
          // this.totalPage = data.page.totalCount
          this.animal_type = data.animal_type;

        } else {
          this.dataList = [];
          this.totalPage = 0;
          this.animal_type = [];
        }
      });
    },
    // 获取药品种类的方法
    virus() {
      // eslint-disable-next-line no-unused-vars
      var that = this;
      this.dataListLoading = true;
      this.$http({
        url: this.$http.adornUrl("/ycyl/ycyldictdata/list"),
        method: "post",
        data: {
          page: this.pageIndex,
          pageSize: "30",
          key: this.dataForm.key,
          dictValue: "sys_drug"
        }
      }).then(({ data }) => {
        if (data && data.code === 0) {
          var that = this;
          this.medicine = data.page.list;
          this.totalPage = data.page.totalCount;
        } else {
        }
      });
    },
    // 获取数据列表
    getDataList() {
      this.dataListLoading = true;
      this.$http({
        //ycylagentwproduct
        url: this.$http.adornUrl("/ycyl/ycylagentwproduct/list"),

        method: "post",
        data: {
          page: this.pageIndex,
          pageSize: this.pageSize,
          key: this.dataForm.key,
          userId: this.userId
        }
      }).then(({ data }) => {
        if (data && data.code === 0) {
          this.dataList = data.page.list;
          this.dataList.map(item => {
            item.list.map((v, i) => {
              item["count" + (i + 1)] = v.count;
            });
          });
          this.totalPage = data.page.totalCount;
        } else {
          this.dataList = [];
          this.totalPage = 0;
        }
        this.dataListLoading = false;
        this.call(data.page.list);
      });
    },
    call(numList) {
      for (var i in numList) {
        if (numList[i].inventoryStatus == "0") {
          numList[i].inventoryStatus = "正常";
        } else {
          numList[i].inventoryStatus = "缺货";
        }
      }
    },
    // 每页数
    sizeChangeHandle(val) {
      this.pageSize = val;
      this.pageIndex = 1;
      this.getDataList();
    },
    // 当前页
    currentChangeHandle(val) {
      this.pageIndex = val;
      this.getDataList();
    },
    // 多选
    selectionChangeHandle(val) {
      this.dataListSelections = val;
    },
    // 详情
    addOrUpdateHandle(data) {
      this.addOrUpdateVisible = true;
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init(data);
      });
    },
    // 删除
    deleteHandle(id) {
      var ids = id
        ? [id]
        : this.dataListSelections.map(item => {
            return item.labelId;
          });
      this.$confirm(
        `确定对[id=${ids.join(",")}]进行[${id ? "删除" : "批量删除"}]操作?`,
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      ).then(() => {
        this.$http({
          url: this.$http.adornUrl("/ycyl/ycyllabel/delete"),
          method: "post",
          data: this.$http.adornData(ids, false)
        }).then(({ data }) => {
          if (data && data.code === 0) {
            this.$message({
              message: "操作成功",
              type: "success",
              duration: 1500,
              onClose: () => {
                this.getDataList();
              }
            });
          } else {
            this.$message.error(data.msg);
          }
        });
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.agent_crux {
  width: 8rem;
  .inputL {
    width: 7rem !important;
  }
}

.mod-config {
  .ycylagentwproductSearch {
    background-color: #eee;
    border-radius: 0.4rem;
    margin-bottom: 16px;
    padding: 10px 5px;
    .chairman_sunch {
      background-color: rgb(25, 103, 142);
      color: #fff;
      height: 2rem;
      width: 4rem;
      border-radius: 10%;
      margin-left: 50px;
      border: 1px solid transparent;
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
}
.mod-config .el-input--suffix {
  width: 155px;
}
</style>
<style lang="scss" scoped>
.el-select,
.el-input {
  width: 200px;
}
</style>
