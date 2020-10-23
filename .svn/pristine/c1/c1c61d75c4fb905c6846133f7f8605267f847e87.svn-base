<template>
  <div class="mod-config">
    <div class="useragent_sunch">
      <label class="agent_crux">
        申请人：
        <el-input
          placeholder="请输入申请人"
          v-model.trim="searchData.applicantName"
          clearable
        ></el-input>
      </label>
      <label class="agent_crux">
        申请时间：
        <el-date-picker
          value-format="yyyy-MM-dd HH:mm:ss"
          v-model="searchData.timeRange"
          type="datetimerange"
          range-separator="至"
          start-placeholde="开始时间"
          end-placeholde="结束时间"
          clearable
        ></el-date-picker>
      </label>
      <label class="agent_crux">
        申请单号：
        <el-input
          placeholder="请输入申请单号"
          v-model.trim="searchData.orderNum"
          clearable
        ></el-input>
      </label>
      <label class="agent_crux">
        属性：
        <el-select v-model="searchData.orderType" placeholder="请选择">
          <el-option
            v-for="item in attributes"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </label>
      <label>
        <el-button type="primary" @click="getDataList()" style="padding:8px 20px">搜索</el-button>
      </label>
    </div>
    <div class="line">
      <span>药品价值：{{statistics.price}}元</span>
      <span>快递总费用：{{statistics.freight}}元</span>
      <el-button
        v-if="isAuth('ycyl:localPushOutManage:add')"
        type="primary"
        @click="add"
        style="margin-bottom: 16px;padding: 8px 20px;"
      >新增地推出库</el-button>

      <el-button
        type="warning"
        @click="exportTable()"
        style="margin-bottom: 16px;padding: 8px 20px;float:right;"
      >导出表格</el-button>
      <download-excel
        v-show="false"
        class="export-excel-wrapper"
        :data="jsonlist"
        :fields="json_fields"
        id="downloadExcel"
        name="地推出库管理.xls"
      ></download-excel>
    </div>
    <el-table :data="dataList" border style="width: 100%;" v-loading="dataListLoading">
      <el-table-column align="center" header-align="center" label="申请单号" prop="orderNum"></el-table-column>
      <el-table-column align="center" header-align="center" label="申请时间" prop="createTime"></el-table-column>
      <el-table-column align="center" header-align="center" label="申请人" prop="applicantName"></el-table-column>
      <el-table-column align="center" header-align="center" label="申请人所属部门" prop="applicantDepartment"></el-table-column>
      <el-table-column align="center" header-align="center" label="属性">
        <template slot-scope="scope">{{scope.row.orderType|orderTypeFilter(that)}}</template>
      </el-table-column>
      <el-table-column align="center" header-align="center" label="快递单号" prop="courierNo"></el-table-column>
      <el-table-column align="center" header-align="center" label="申请药品价值" prop="price"></el-table-column>
      <el-table-column align="center" header-align="center" label="快递费用" prop="freight"></el-table-column>
      <el-table-column align="center" header-align="center" label="操作">
        <template slot-scope="scope">
          <el-button @click="getDetails(scope.row.id)" type="text" size="small">详情</el-button>
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
    ></el-pagination>
    <!-- 新增地推出库弹窗 -->
    <el-dialog
      title="出库单"
      :visible="dialogFromVisible"
      center
      width="1135px"
      custom-class="my-dialog"
      id="pushOut"
      :show-close="true"
      @close="dialogFromVisible=false"
      :close-on-click-modal="true"
    >
      <div class="dialog-in">
        <el-form
          :model="form"
          :rules="addRules"
          ref="form"
          label-width="125px"
          label-position="right"
          size="medium"
          @keyup.enter.native="submit()"
        >
          <div class="form-line">
            <el-form-item label="申请人名称:" class="form-item" prop="applicantName">
              <el-input v-model="form.applicantName" class="form-input" clearable></el-input>
            </el-form-item>
            <el-form-item label="申请人所属部门:" class="form-item" prop="applicantDepartment">
              <el-input v-model="form.applicantDepartment" class="form-input" clearable></el-input>
            </el-form-item>
          </div>
          <div class="form-line" id="formLine">
            <el-form-item label="出库方式:" class="form-item" prop="orderType">
              <el-select
                v-model="form.orderType"
                placeholder="请选择出库方式"
                class="form-select"
                @change="selectOrderType"
              >
                <el-option
                  v-for="item in attributes"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                  class="form-select"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="快递公司:" class="form-item" :prop="selectCompany?'':'courierCompany'">
              <el-select
                v-model="form.courierCompany"
                placeholder="请选择快递公司"
                class="form-select"
                :disabled="selectCompany"
                @change="selectcom"
              >
                <el-option
                  v-for="item in courierCompany"
                  :key="item.dataId"
                  :label="item.remark"
                  :value="item.remark"
                  class="form-select"
                ></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="form-line">
            <el-form-item label="物流单号:" class="form-item" :prop="selectCompany?'':'courierNo'">
              <el-input
                v-model="form.courierNo"
                class="form-input"
                clearable
                :disabled="selectCompany"
              ></el-input>
            </el-form-item>
            <el-form-item label="快递费用:" class="form-item" :prop="selectCompany?'':'freight'">
              <el-input
                v-model="form.freight"
                class="form-input"
                clearable
                :disabled="selectCompany"
              ></el-input>
            </el-form-item>
          </div>
          <el-form-item label="收获地址:" class="row" :prop="selectCompany?'':'address'">
            <el-input type="textarea" v-model="form.address" clearable :disabled="selectCompany"></el-input>
          </el-form-item>
          <el-form-item label="申请用途:" class="row" prop="use">
            <el-input type="textarea" v-model="form.use" clearable></el-input>
          </el-form-item>
          <div class="upload">
            <span class="span">上传照片:</span>
            <el-upload
              class="avatar-uploader"
              :action="$http.adornUrl('/sys/oss/uploadAll')"
              :show-file-list="false"
              :before-upload="beforeUpload"
              name="fileUpload"
              :data="{folderName: 'topush'}"
              accept=".jpeg, .jpg, .gif, .png"
              :on-success="imgUploadSuccess"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
            >
              <img v-if="form.url" :src="form.url" class="upload-img" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="form.url" alt />
            </el-dialog>
          </div>
          <div class="tit">申请药品</div>
          <div class="search">
            <el-input class="input" v-model.trim="DrugName" @input="getDrugList" clearable></el-input>
            <el-button class="button" type="primary" @click="getDrugList">搜索药品</el-button>
          </div>
          <section class="drugBox">
            <ul>
              <li v-for="(item,index) in DrugList" :key="index">
                <section>
                  <div class="drugBox_divlift">
                    <img
                      :src="/,/.test(item.mainImages)? item.mainImages.split(',')[0]:item.mainImages"
                      alt
                    />
                  </div>
                  <div class="drugBox_divRight">
                    <p style>{{item.productName}}</p>
                    <span @click="drugBtnEnsure(item)" class="drugConfirm">确定</span>
                  </div>
                </section>
              </li>
            </ul>
          </section>
          <div class="search-result">
            <div
              v-for="(item,index) in form.list"
              :key="index"
              :style="{background:colorList[index%6]}"
              class="item"
            >
              {{item.productName}}：{{item.modelName}} x{{item.count}}
              <span
                @click="deleteItem(index)"
                class="item"
              >X</span>
            </div>
          </div>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          @click="submit()"
          style="background:#45C8DC;margin-right:100px;border:none;"
        >通过</el-button>
        <el-button @click="dialogFromVisible=false">返回</el-button>
      </span>
    </el-dialog>
    <!-- 新增地推出库二级弹窗 -->
    <el-dialog
      title="商品详情"
      :modal-append-to-body="false"
      :visible.sync="centerDialogVisibleDrug"
      width="400px"
      :modal="false"
      center
    >
      <div class="shopingBox" id="addDrugTan">
        <section>
          <div class="shopingBox_divLift">
            <img :src="/,/.test(ProductModel)? ProductModel.split(',')[0]:ProductModel" alt />
          </div>
          <div>
            <el-form ref="typeCheckForm" :model="drugSize" label-width="50px">
              <el-form-item label="规格" prop="modelNameValueId" :rules="[{required:true,message:'请选择规格'}]">
                <el-select v-model="drugSize.modelNameValueId" clearable placeholder="请选择">
                <el-option
                  v-for="item in particulars"
                  :key="item.modelId"
                  :label="item.modelName"
                  :value="item.modelId"
                ></el-option>
              </el-select>
              </el-form-item>
              <el-form-item label="数量" prop="count" :rules="[{ required: true, message: '数量不能为空'},{ type: 'number', message: '数量必须为数字值'}]">
                <el-input type="count"  v-model.number="drugSize.count" placeholder="请输入数量"></el-input>
              </el-form-item>
            </el-form>
          </div>
        </section>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisibleDrug = false" style="padding: 5px 20px">取 消</el-button>
        <el-button type="primary" @click="getProductList()" style="padding: 5px 20px">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 详情弹窗 -->
    <el-dialog
      class="details-dialog"
      title="出库单详情"
      :visible="detailsDialogVisible"
      width="890px"
      center
      :before-close="closeDetailsDialogVisible"
    >
      <div class="details-dialog-in">
        <div class="row">
          <span>申请人名称：{{details.applicantName}}</span>
          <span>申请人所属部门：{{details.applicantDepartment}}</span>
        </div>
        <div class="row">
          <span>出库方式：{{details.orderType|orderTypeFilter(that)}}</span>
          <span>快递公司：{{details.courierCompany}}</span>
        </div>
        <div class="row">
          <span>快递单号：{{details.courierNo}}</span>
          <span>快递费用：{{details.freight}}</span>
        </div>
        <div class="row">
          <span>订单价值：{{details.price}}</span>
        </div>
        <div class="row">收货地址：{{details.address}}</div>
        <div class="row">申请用途：{{details.use}}</div>
        <div class="row-img">
          上传照片：
          <div v-if="details.url" style="margin-top:10px;">
            <el-image class="img" v-for="(item,index) in details.url.split(',')" :key="index" :src="item" :preview-src-list="details.url.split(',')"></el-image>
          </div>
        </div>
        <div class="detailsTit">申请药品</div>
        <div class="search-result">
          <div
            v-for="(item,index) in details.list"
            :key="index"
            :style="{background:colorList[index%6]}"
            class="item"
          >{{item.productName}}：{{item.modelName}} x{{item.count}}</div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    var checkNumber = (rule, value, callback) => {
      if (value >= 0) {
        callback();
      } else {
        return callback(new Error("请输入数字类型"));
      }
    };
    return {
      addRules: {
        applicantName: [
          { required: true, message: "申请人不能为空", trigger: "blur" },
        ],
        applicantDepartment: [
          {
            required: true,
            message: "申请人所属部门不能为空",
            trigger: "blur",
          },
        ],
        orderType: [
          { required: true, message: "请选择出库方式", trigger: "change" },
        ],
        courierCompany: [
          { required: true, message: "请选择快递公司", trigger: "change" },
        ],
        courierNo: [
          { required: true, message: "物流单号不能为空", trigger: "blur" },
        ],
        freight: [
          { required: true, message: "快递费用不能为空", trigger: "blur" },
          { validator: checkNumber, trigger: "blur" },
        ],
        address: [
          { required: true, message: "收货地址不能为空", trigger: "blur" },
        ],
        use: [{ required: true, message: "申请用途不能为空", trigger: "blur" }],
      },
      that: this,
      selectCompany: false,
      statistics: { price: "0", freight: "0" },
      searchData: {},
      DrugName: "",
      dataList: [],
      courierCompany: [],
      attributes: [
        { label: "自提", value: 1 },
        { label: "快递", value: 2 },
      ],
      DrugList: [],
      colorList: [
        "#479BFF",
        "#F7915A",
        "#9147FF",
        "#F17272",
        "#69CC3E",
        "#4765FF",
      ],
      dataListLoading: false,
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      dialogFromVisible: false,
      form: {
        courierCompany: "",
      },
      dialogVisible: false,
      //3级弹窗

      centerDialogVisibleDrug: false,
      DrugShoping: "",
      particulars: [],
      ProductModel: "", //药品选中的图片
      drugSize:{
        modelNameValueId: "", //药品详情id
        count:""
      },
      // 出库单详情
      details: {},
      detailsDialogVisible: false,
      // 导出
      jsonlist: [],
      json_fields: {
        申请单号: "orderNum",
        申请时间: "createTime",
        申请人: "applicantName",
        申请人所属部门: "applicantDepartment",
        属性: "orderType",
        快递单号: "courierNo",
        申请药品价值: "price",
        快递费用: "freight",
      },
    };
  },
  created() {
    this.getCourierCompany();
    this.getDataList();
    this.getsum();
  },
  filters: {
    orderTypeFilter: function (val, that) {
      if (!val) return "";
      var a;
      that.attributes.map((item) => {
        if (item.value == val) a = item.label;
      });
      return a;
    },
  },

  methods: {
    add() {
      this.dialogFromVisible = true;
      setTimeout(() => {
        this.$refs["form"].clearValidate();
      }, 0);
    },
    // 选择出库方式
    selectOrderType(val) {
      if (val == 1) {
        this.selectCompany = true;
        this.$set(this.form, "courierCompany", "");
        this.$set(this.form, "courierNo", "");
        this.$set(this.form, "freight", "");
        this.$set(this.form, "address", "");
        this.$refs["form"].clearValidate();
      } else {
        this.selectCompany = false;
      }
    },
    selectcom(val) {
      this.$set(this.form, "courierCompany", val);
    },
    // 获取快递公司
    getCourierCompany() {
      this.$http({
        url: this.$http.adornUrl("/ycyl/ycyldictdata/list"),
        method: "post",
        data: {
          dictValue: "delivery",
          pageSize: "30",
        },
      }).then(({ data }) => {
        if (data && data.code === 0) {
          this.courierCompany = data.page.list;
        } else {
          this.$message.error(data.msg);
        }
      });
    },
    // 获取药品价值和快递总费用
    getsum() {
      this.$http({
        url: this.$http.adornUrl("/topushorder/getSumPrice"),
        method: "post",
        data: this.$http.adornData({
          page: this.pageIndex,
          pageSize: this.pageSize,
        }),
      }).then(({ data }) => {
        if (data && data.code === 0) {
          this.statistics = data.list || {};
        }
      });
    },
    // 获取数据列表
    getDataList(pageIndex=1) {
      this.dataListLoading = true;
      this.$http({
        url: this.$http.adornUrl("/topushorder/getPageList"),
        method: "post",
        data: this.$http.adornData({
          page: pageIndex,
          pageSize: this.pageSize,
          applicantName: this.searchData.applicantName || "",
          orderNum: this.searchData.orderNum || "",
          orderType: this.searchData.orderType || "",
          startCreateTime: this.searchData.timeRange
            ? this.searchData.timeRange[0]
            : "",
          endCreateTime: this.searchData.timeRange
            ? this.searchData.timeRange[1]
            : "",
        }),
      }).then(({ data }) => {
        if (data && data.code === 0) {
          this.dataList = data.page.list;
          this.totalPage = data.page.totalCount;
        } else {
          this.dataList = [];
          this.totalPage = 0;
        }
        this.dataListLoading = false;
      });
    },
    // 导出表格
    exportTable() {
      var loading = this.$loading({
        lock: true,
        text: "下载中",
        spinner: "el-icon-loading",
        background: "rgba(255,255,255,0.7)",
      });
      this.$http({
        url: this.$http.adornUrl("/topushorder/getList"),
        method: "post",
        data: this.$http.adornData({
          applicantName: this.searchData.applicantName || "",
          orderNum: this.searchData.orderNum || "",
          orderType: this.searchData.orderType || "",
          startCreateTime: this.searchData.timeRange
            ? this.searchData.timeRange[0]
            : "",
          endCreateTime: this.searchData.timeRange
            ? this.searchData.timeRange[1]
            : "",
        }),
      }).then(({ data }) => {
        if (data && data.code === 0) {
          data.list = data.list.map((item) => {
            this.attributes.map((itemIn) => {
              if (itemIn.value == item.orderType) item.orderType = itemIn.label;
            });
            return item;
          });
          this.jsonlist = data.list;
          setTimeout(function () {
            document.querySelector("#downloadExcel").click();
            loading.close();
          }, 0);
        } else {
          loading.close();
        }
      });
    },
    // 查看详情
    getDetails(data) {
      this.detailsDialogVisible = true;
      this.$http({
        url: this.$http.adornUrl("/topushorder/getInfoById?id=" + data),
        method: "post",
      }).then(({ data }) => {
        if (data && data.code === 0) {
          this.details = data.toPushOrder;
        } else {
          this.details = {};
        }
      });
    },
    // 图片上传前
    beforeUpload(file) {
      const isLt5M = file.size / 1024 / 1024 < 5;
      if (!isLt5M) {
        this.$message.error("上传图片大小不能超过5MB");
      }
    },
    // 图片上传成功
    imgUploadSuccess(res, file, fileList) {
      this.$set(this.form, "url", res.paths[0]);
    },
    handleRemove(file, fileList) {
      this.$set(this.form, "url", "");
    },
    handlePictureCardPreview(file) {
      this.form.url = file.url;
      this.dialogVisible = true;
    },
    // 新增
    submit() {
      this.$refs["form"].validate((valid) => {
        this.form.list ? "" : this.$message("请选择药品");
        this.form.url ? "" : this.$message("请上传图片");
        if (valid && this.form.url && this.form.list) {
          this.$http({
            url: this.$http.adornUrl("/topushorder/save"),
            method: "post",
            data: this.$http.adornData(this.form),
          }).then(({ data }) => {
            if (data && data.code === 0) {
              this.$message({ message: "添加成功", duration: 1 });
              this.form = {};
              this.DrugName = "";
              this.DrugList = [];
              this.dialogFromVisible = false;
              this.getDataList();
            } else {
              this.$message.error(data.msg);
            }
          });
        }
      });
    },
    // 每页数
    sizeChangeHandle(val) {
      this.pageSize = val;
      this.pageIndex = 1;
      this.getDataList(this.pageIndex);
    },
    // 当前页
    currentChangeHandle(val) {
      this.pageIndex = val;
      this.getDataList(this.pageIndex);
    },

    // 药品搜索
    getDrugList() {
      if (this.DrugName) {
        this.$http({
          url: this.$http.adornUrl("/ycyl/ycylproduct/getByName"),
          method: "post",
          data: {
            status: 1,
            productName: this.DrugName,
          },
        }).then(({ data }) => {
          if (data && data.code === 0) {
            this.DrugList = data.list;
          } else {
          }
        });
      } else {
        this.DrugList = [];
      }
    },
    // 药品确认
    drugBtnEnsure(id) {
      var status = true;
      this.form.list &&
        this.form.list.map((item) => {
          if (item.productId == id.productId) {
            this.$message.warning("您已选择过" + item.modelName);
            status = false;
          }
        });
      if (!status) return;
      this.$set(this.drugSize,'modelNameValueId','')
      this.dangQianProductName = id;
      this.centerDialogVisibleDrug = true;
      setTimeout(()=>{
        this.$refs.typeCheckForm.clearValidate()
      })
      this.ProductModel = id.mainImages;
      this.$http({
        url: this.$http.adornUrl("/ycyl/ycylproductmodel/infoByProductId"),
        method: "get",
        params: this.$http.adornParams({
          productId: id.productId,
        }),
      }).then(({ data }) => {
        if (data && data.code === 0) {
          data.ycylProductModel.map((e) => {
            if (e.theSmall && e.theSmall == "1") {
              data.ycylProductModel.splice(
                data.ycylProductModel.findIndex((v) => v.theSmall == "1"),
              );
            }
          });
          this.particulars = data.ycylProductModel;
        } else {
          this.$message.error(data.msg);
        }
      });
    },
    // 药品规格选择
    getProductList() {
      this.$refs.typeCheckForm.validate((valid) => {
        if (valid) {
          this.centerDialogVisibleDrug = false;
          this.dangQianProductName.modelId = this.drugSize.modelNameValueId;
          this.particulars.forEach((e) => {
            if (e.modelId == this.drugSize.modelNameValueId) {
              this.dangQianProductName.modelName = e.modelName;
              this.dangQianProductName.price = e.price;
              this.dangQianProductName.marketPrice = e.marketPrice;
            }
          });
          this.form.list = this.form.list ? this.form.list : [];
          this.dangQianProductName.count = this.drugSize.count;
          this.form.list.push(this.dangQianProductName);
          this.$set(this.drugSize,"count",'')
        } else {
          return false;
        }
      });
    },
    // 删除药品
    deleteItem(i) {
      this.form.list.splice(i, 1);
      this.colorList.push(this.colorList.splice(i, 1));
    },
    closeDetailsDialogVisible() {
      this.detailsDialogVisible = false;
    },
  },
};
</script>
<style>
#pushOut .el-input__inner {
  height: 40px;
}

#formLine .el-input__inner {
  width: 290px;
}

#formLine .el-input {
  width: 290px;
}

.upload .span {
  margin-left: -100px;
  margin-right: 20px;
}
</style>
<style lang="scss" scoped>
.mod-config {
  .useragent_sunch {
    padding: 10px 5px;
    border-radius: 0.4rem;
    margin-bottom: 16px;
    background-color: #eeeeee;

    label {
      margin-left: 16px;
    }
  }

  .line {
    span {
      margin-right: 20px;
    }
  }

  .dialog-in {
    font-size: 20px;
    padding: 20px 45px;

    .row {
      margin-bottom: 20px;
    }

    .drugBox {
      ul {
        li {
          &:nth-child(3n + 3) {
            margin-right: 0;
          }

          border: 1px solid #ccc;
          border-radius: 10px;
          margin: 5px 0;
          padding: 5px 0;
          width: 310px;
          margin-right: 30px;
          display: inline-block;

          section {
            display: flex;
            margin: 5px 5px;

            div {
              display: inline-block;
            }

            .drugBox_divlift {
              width: 100px;
              height: 80px;
              display: inline-block;

              img {
                width: 100%;
              }
            }

            .drugBox_divRight {
              font-size: 16px;
              margin-left: 10px;
              display: inline-block;
              position: relative;

              span {
                position: absolute;
                bottom: 5px;
              }

              span:hover {
                color: #3880de;
                cursor: pointer;
              }
            }
          }
        }
      }
    }

    .form-line {
      display: flex;
      justify-content: space-between;
      margin-bottom: 12px;

      .form-item {
        width: 414px;

        .form-input,
        .form-select {
          width: 290px;

          .el-input__inner {
            width: 290px;
          }

          .el-input {
            width: 290px;

            .el-input__inner {
              width: 290px;
            }
          }
        }
      }
    }

    .upload,
    .tit,
    .search {
      display: flex;
      justify-content: center;
    }
    .avatar-uploader {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .upload-img {
      width: 148px;
      height: 148px;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 148px;
      height: 148px;
      line-height: 148px;
      text-align: center;
    }
    .tit {
      margin: 20px 0;
    }

    .search {
      margin-bottom: 10px;

      .input {
        width: 727px;
        margin-right: 13px;

        input {
          height: 40px !important;
        }
      }

      .button {
        width: 107px;
        height: 40px;
        background: #45c8dc;
        border: none;
        color: #ffffff;
      }
    }

    .search-result {
      display: flex;
      flex-wrap: wrap;

      .item:nth-child(3n + 3) {
        margin-right: 0;
      }

      .item {
        width: 310px;
        height: 50px;
        border-radius: 6px;
        font-size: 18px;
        text-align: center;
        line-height: 50px;
        margin-top: 20px;
        font-size: 14px;
        color: #ffffff;
        position: relative;
        margin-right: 30px;

        span {
          position: absolute;
          cursor: pointer;
          top: -20px;
          right: -30px;
          width: 28px;
          height: 28px;
          line-height: 28px;
          border-radius: 0;
          border-bottom-left-radius: 6px;
          background: rgba(#ffffff, 0.4);
          color: #ffffff;
        }
      }
    }
  }
}

.shopingBox {
  section {
    display: flex;

    .shopingBox_divLift {
      width: 100px;
      height: 80px;
      margin-right: 20px;

      img {
        width: 100%;
      }
    }
  }
}

.search-result {
  display: flex;
  flex-wrap: wrap;

  .item:nth-child(3n + 3) {
    margin-right: 0;
  }

  .item {
    width: 310px;
    height: 50px;
    border-radius: 6px;
    font-size: 18px;
    text-align: center;
    line-height: 50px;
    margin-top: 20px;
    color: #ffffff;
    position: relative;
    margin-right: 30px;

    span {
      position: absolute;
      cursor: pointer;
      top: -20px;
      right: -30px;
      width: 28px;
      height: 28px;
      line-height: 28px;
      border-radius: 0;
      border-bottom-left-radius: 6px;
      background: rgba(#ffffff, 0.4);
      color: #ffffff;
    }
  }
}

// 出库单详情
.details-dialog {
  font-size: 16px;

  .details-dialog-in {
    padding: 20px 40px;

    .row {
      display: flex;
      justify-content: space-between;
      margin-bottom: 22px;
    }

    .row-img {
      .img {
        width: 250px;
        height: 160px;
        background: rgba(192, 192, 192, 1);
        border: 1px solid rgba(221, 221, 221, 1);
        border-radius: 10px;
        margin-right: 4px;

        &:nth-child(3n + 3) {
          margin-right: 0;
        }
      }
    }

    .detailsTit {
      text-align: center;
      line-height: 40px;
      font-size: 20px;
      font-weight: bold;
      color: #333333;
    }

    .search-result {
      .item {
        width: 240px;
        height: auto;
        line-height: 30px;
        font-size: 14px;
        margin-right: 12px;
      }
    }
  }
}
</style>
