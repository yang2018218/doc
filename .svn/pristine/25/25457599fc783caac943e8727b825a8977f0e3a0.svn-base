<template>
  <!-- 添加仓储商品 -->
  <div>
    <el-dialog
      :close-on-click-modal="false"
      :title="!dataForm.id ? '添加仓储商品' : '修改'"
      :visible.sync="visible"
      class="newly"
    >
      <el-form
        :model="dataForm"
        :rules="dataRule"
        @keyup.enter.native="dataFormSubmit()"
        label-width="80px"
        ref="dataForm"
      >
        <div class="newly_TopBox">
          <el-form-item label="适用种类" prop="fitKind">
            <el-checkbox-group v-model="dataForm.fitKind">
              <el-checkbox
                :key="index"
                :label="pannerNam.dataId"
                v-for="(pannerNam,index) in pannerName"
              >{{pannerNam.dictName}}
              </el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="功能类目" prop="productType">
            <el-select placeholder="请选择" v-model="dataForm.productType">
              <el-option
                :key="index"
                :label="item.dictName"
                :value="item.dataId"
                v-for="(item,index) in medicineNew"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="产品名称" prop="productName">
            <el-input placeholder="请输入产品名称" v-model="dataForm.productName" style="width: 250px"></el-input>
          </el-form-item>
        </div>
      </el-form>
      <div class="newly_newConent">
        <el-main prop="">
          <el-col :span="24" class="warp-main" v-loading="">
            <el-form :key="i" class="demo-form-inline" v-for="(item, i) in  dataForm.FormArr">
              <el-form-item label="" prop="">
                <li prop="">
                  <label class="everyLabel">
                    规格{{i+1}}：
                    <el-input placeholder="输入名称" required="规格名为必填" v-model="item.modelName"></el-input>
                  </label>
                  <label class="everyLabel">
                    重量：
                    <el-input placeholder="单位为Kg" @change="changeMess(item.weight)"
                              oninput="value=value.replace(/[^\d\.\d{0,2}]/g,'')" required="重量为必填"
                              v-model="item.weight"></el-input>
                  </label>
                  <label class="everyLabel">
                    主仓预警线：
                    <el-input oninput="this.value = this.value.replace(/[\D]/g,'')" placeholder="主仓预警"
                              required="主仓警戒线为必填"
                              v-model="item.mainWarningLine" ></el-input>
                  </label>
                  <label class="everyLabel">
                    一级预警线：
                    <el-input oninput="this.value = this.value.replace(/[\D]/g,'')" @input="ntn(item.oneWarningLine)" placeholder="一级预警" required="一级警戒线为必填"
                              v-model="item.oneWarningLine"></el-input>
                  </label>
                  <label class="everyLabel">
                    二级预警线：
                    <el-input oninput="this.value = this.value.replace(/[\D]/g,'')" placeholder="二级预警" required="二级警戒线为必填"
                              v-model="item.twoWarningLine"></el-input>
                  </label>
                  <label class="everyLabel">
                    库位：
                    <el-input placeholder="产品库位" required="库位为必填" v-model="item.place"></el-input>
                  </label>
                  <label class="everyLabel">
                    厂商：
                    <el-input placeholder="厂商名称" required="厂商为必填" v-model="item.manufacturer"></el-input>
                  </label>
                  <label class="everyLabel">
                    是否最小：
                    <span v-if="item.theSmall=='1'">是</span>
                    <span v-if="item.theSmall=='0'">否</span>
                  </label>
                  <label class="everyLabel">
                    <el-link type="primary" @click="Delete(item.index)">移除</el-link>
                  </label>
                </li>
              </el-form-item>

            </el-form>

          </el-col>

        </el-main>
        <div class="btn_btn">
          <el-button @click="AddForm()" class="newlyAdd" type="primary" style=" padding: 8px 20px !important;">添加普通规格
          </el-button>
          <el-button @click="AddFormSmall()" class="" style=" padding: 8px 20px !important;">
            添加最小规格
          </el-button>
        </div>
      </div>
      <span class="dialog-footer" slot="footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button @click="dataFormSubmit()" type="primary" :disabled="isDisable">确定</el-button>
    </span>
    </el-dialog>
  </div>
</template>

<script>

  export default {
    data () {
      return {
        isDisable: false,//防止多次提交
        orderBy: 1,
        loadingbut: false, // 审核提交加载中
        loadingbuttext: '确定',
        normsList: '',
        list: [],
        b: '',
        visible: false,

        dataForm: {
          mainId: 0,
          status: '1',
          productName: '',
          fitKind: [],
          productType: '',
          createTime: '',
          dictName: '',
          medicineNew: '',
          numnerNew: '0',

          FormArr: [{
            index: 0,
            modelName: '',
            manufacturer: '',
            units: '',
            place: '',
            twoWarningLine: '',
            oneWarningLine: '',
            mainWarningLine: '',
            weight: '',//重量
            theSmall: '0',
          }]
        },

        dataRule: {
          productName: [{
            required: true,
            message: '药品名字不能为空',
            trigger: 'blur'
          }],
          fitKind: [{
            required: true,
            message: '动物种类不能为空',
            trigger: 'change'
          }],
          productType: [{
            required: true,
            message: '药品类型不可以为空',
            trigger: 'change'
          }],
        }
      }
    },
    props: ['pannerName', 'medicineNew'],
    methods: {
      ntn(i){
      },
      mainWarningLineData (data) {
      },
      changeMess (weights) {

      },
      AddFormSmall () {//添加最小规格
        var this_ = this
        var little = true
        var little1 = this.dataForm.FormArr.find((i) => {
          return i.theSmall === '1'
        })
        if (!little1) {
          if (this_.dataForm.FormArr.length <= 8) {
            this_.dataForm.FormArr.push({
              index: this_.dataForm.FormArr.length,
              modelName: '',
              manufacturer: '',
              units: '',
              place: '',
              twoWarningLine: '',
              oneWarningLine: '',
              mainWarningLine: '',
              weight: '',//重量
              theSmall: '1',
            })
          } else {
            this_.$message.error('最多只可以有9种规格')
          }
        } else {
          this.$message.error('已经有最小规格啦')
        }
      },
      norms () {
        // 获取字典表中的药品规格

      },
      AddForm () {
        if (this.dataForm.FormArr.length <= 8) {
          this.dataForm.FormArr.push({
            index: this.dataForm.FormArr.length,
            modelName: '',
            manufacturer: '',
            units: '',
            place: '',
            twoWarningLine: '',
            oneWarningLine: '',
            mainWarningLine: '',
            weight: '',//重量
            theSmall: '0',
          })
        } else {
          this.$message.error('最多只可以有9种规格')
        }
      },
      Delete (index) {
        if (this.dataForm.FormArr.length > 1) {
          this.dataForm.FormArr.splice(index, 1)
          for (let i in this.dataForm.FormArr) {
            this.dataForm.FormArr[i].index = i
          }
        } else {
          this.$message.error('不可以删除啦')
        }
      },

      init (id) {
        this.$http({
          url: this.$http.adornUrl('/ycyl/ycyldictdata/list'),
          method: 'post',
          data: {
            dictValue: 'norms',
            'pageSize': '30'
          }
        }).then(({
          data
        }) => {
          if (data && data.code === 0) {
            this.normsList = data.page.list
          }
        })
        this.visible = true
      },
      dataListNumber () {
        this.isDisable = true
        setTimeout(() => {
          this.isDisable = false   //点击一次时隔两秒后才能再次点击
        }, 2000)
        this.dataForm.FormArr.forEach((item, i) => item.orderBy = ++i)
        this.loadingbut = true,
          this.loadingbuttext = '审核中...',
          this.$refs['dataForm'].validate(valid => {
            var b = this.dataForm.fitKind.join(',')
            if (valid) {
              this.$http({
                url: this.$http.adornUrl(
                  `/ycyl/ycylmainproduct/${
                    !this.dataForm.mainId ? 'save' : 'update'
                  }`
                ),
                method: 'post',
                data: this.$http.adornData({
                  productName: this.dataForm.productName,
                  fitKind: b,
                  productType: this.dataForm.productType,
                  // createTime: this.dataForm.createTime,
                  modelName: this.dataForm.FormArr.modelName,
                  list: this.dataForm.FormArr,
                  status: this.dataForm.status
                }),

              }).then(({
                data
              }) => {
                if (data && data.code === 0) {
                  this.loadingbut = false,
                    this.loadingbuttext = '确定',
                    this.$message({
                      message: '操作成功',
                      type: 'success',
                      duration: 150,
                      onClose: () => {
                        this.visible = false
                        location.reload()
                        this.$emit('refreshDataList')
                      }
                    })
                } else {
                  this.$message.error(data.msg)
                }
              })
            }
          })
      },
      // 表单提交
      dataFormSubmit () {
        var contentList = true

        this.dataForm.FormArr.forEach((e) => {
          if (e.mainWarningLine && e.manufacturer && e.modelName && e.oneWarningLine && e.place && e.twoWarningLine && e.weight) {
          } else {
            contentList = false
          }
        })
        if (contentList) {
          this.dataListNumber()
        } else {
          this.$message.error('请检查信息是否填写完整')
        }

      }
    }
  }
</script>
<style lang="scss" scond>
  .el-checkbox {
    margin-right: 0 !important;
  }

  .btn_btn {
    width: 100%;
    text-align: center;
  }

  .everyLabel {
    padding: 0 3px;
  }

  .newly {
    border: 1px solid #999;

    .newly_TopBox {
      display: flex;
      justify-content: space-evenly;
      margin-bottom: 10px;
      border-bottom: 2px solid #999;
    }

    .newly_newConent {
      .el-input {
        width: 96px !important;
      }

      .el-button--medium {
        background-color: #fff;
        color: #999;
        border: 1px solid #dcdfe6;
        height: 30px;
        padding-left: 10px;
        padding-right: 10px;
        padding-top: 8px;
        margin-left: 10px;
      }

      .newlyAdd {
        color: #FFF;
        text-align: center;
      }

      .newlyMinus {
        background-color: red;
        color: #688;
      }
    }

    .storage {
      background-color: #999;
      height: 2px;
    }

    .el-dialog__header {
      text-align: center;
    }

    .el-dialog {
      width: 75% !important;
      /*height: 75% !important;*/
      padding-bottom: 5vh;
    }

    .el-main {
      padding: 20px 10px;
    }
  }
</style>
