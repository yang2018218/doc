<template>
  <!--  商品编辑页-->
  <el-dialog
    :close-on-click-modal="false"
    :visible.sync="visible"
    title="商品编辑"
    width="1450px">
    <div class="godown">
      <div class="godown_title">
        <span class="godownID" style="margin-top: -10px">商品ID：{{dataForm.productNo}}</span>
        <el-form
          :model="dataForm"
          :rules="dataRule"
          class="el-my-form"
          label-position="right"
          label-width="80px"
          ref="dataForm">
          <el-row>
            <el-col :span="10">
              <el-form-item label="适用种类" prop="fitKind">
                <el-checkbox-group v-model="typeList" style="margin-left: 0;">
                  <el-checkbox :key="panner.dataId" :label="panner.dataId" v-for="panner in pannerName"
                               style="display: inline-block;margin-left: 0rem;">
                    {{panner.dictName}}
                  </el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="功能类目" prop="productType" style="margin-left: 0rem;">
                <el-select :placeholder="dataForm.productType" v-model="yaoType">
                  <el-option
                    :key="index"
                    :label="item.dictName"
                    :value="item.dataId"
                    v-for="(item,index) in medicineNew">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="产品名称" prop="productType" style="margin-left: 3rem">
                <el-input :placeholder="dataForm.productName" style="display: inline-block;width: 250px;"
                          v-model="dataForm.productName" @change="dianji()"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>

      <!--添加新的规格-->
      <ul class="godown_connect">
        <li :key="index" class="godownConnectLi" v-for="(pan,index) in dataForm.list">
          <div class="godown_connectBox">

            <div class="godownConentes">
              <span style="display: inline-block;line-height: 32px;"> 规格：{{index+1}} </span>
              <div>
                <el-input :placeholder="pan.modelName" style="display: inline-block" v-model="pan.modelName"></el-input>
              </div>
              <div>重量：
                <el-input
                  oninput="value=value.replace(/[^\d\.\d{0,2}]/g,'')"
                  :placeholder="pan.weight" style="display: inline-block"
                  v-model="pan.weight"></el-input>
              </div>
              <div>主仓警戒线：
                <el-input :placeholder="pan.mainWarningLine" style="display: inline-block"
                          oninput="this.value = this.value.replace(/[\D]/g,'')"
                          v-model="pan.mainWarningLine"
                ></el-input>
              </div>
              <div>一级警戒线：
                <el-input oninput="this.value = this.value.replace(/[\D]/g,'')" :placeholder="pan.oneWarningLine"
                          style="display: inline-block"
                          v-model="pan.oneWarningLine"></el-input>
              </div>
              <div>二级警戒线：
                <el-input :placeholder="pan.twoWarningLine" style="display: inline-block"
                          v-model="pan.twoWarningLine" oninput="this.value = this.value.replace(/[\D]/g,'')"></el-input>
              </div>
              <div>库位：
                <el-input :placeholder="pan.place" style="display: inline-block" v-model="pan.place"></el-input>
              </div>
              <div>
                厂商：
                <el-input :placeholder="pan.manufacturer" style="display: inline-block"
                          v-model="pan.manufacturer"></el-input>
              </div>

              <div>是否最小：
                <span v-if="pan.theSmall=='0'">否</span>
                <span v-if="pan.theSmall=='1'">是</span>

              </div>
              <div>
                <el-link type="primary" @click="removeList(index)">移除</el-link>
              </div>
            </div>
          </div>
        </li>
      </ul>
      <div class="btn_Btn">
        <el-button @click="AddForm" class="newlyAdd" type="primary" style=" padding: 8px 20px !important;">添加普通规格
        </el-button>
        <el-button @click="AddFormSmall" class="newlyAdd" style="color: #333; padding: 8px 20px !important;">添加最小规格
        </el-button>
      </div>
      <div class="godownFooter">
    <span class="dialog-footer" slot="footer">
  <el-popover
    placement="top"
    width="160"
    v-model="visibleRec">
  <p>您确认要对这个商品进行编辑吗？</p>
  <div style="text-align: right; margin: 0">
    <el-button size="mini" type="text" @click="visibleRec = false">取消</el-button>
    <el-button type="primary" size="mini" @click="dataForcount()" :disabled="isDisable">确定</el-button>
  </div>
  <el-button slot="reference">确认编辑</el-button>
</el-popover>
      <!--        <el-button @click="dataForcount()" type="primary" :disabled="isDisable">确认编辑</el-button>-->
      </span>
      </div>
    </div>
  </el-dialog>
</template>
<script>
  export default {
    data: function () {
      return {
        visibleRec: false,
        isDisable: false,
        yaoType: '',
        normsList: '',
        visible: false,
        dataList: '',
        typeList: [],
        dataForm: {
          mainId: 0,
          status: 1,
          list: [],
          typeList: [],
        },
        dataRule: {
          name: [{
            required: true,
            message: '姓名不能为空',
            trigger: 'blur'
          }],
        },
        dataFormed: {
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
          }],
        },
      }
    },
    mounted () {
      this.guige()
    },
    //动物种类
    props: ['pannerName', 'medicineNew'],
    methods: {
      dianji(){
      },
      AddFormSmall () {//添加最小规格
        var this_ = this
        var little = true
        this_.dataForm.list.forEach((i) => {
          if (i.theSmall === '1') {
            little = false
          }
        })
        if (little) {
          if (this_.dataForm.list && this_.dataForm.list.length <= 8) {
            this_.dataForm.list.push({
              index: this_.dataForm.list.length,
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
      removeList (index) {
        this.$confirm('您是否要删除该产品规格', '温馨提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.yichu(index)

        })
      },
      yichu (index) {
        this.$http({
          url: this.$http.adornUrl('/ycyl/ycylmainproductmodel/deleteById'),
          method: 'get',
          params: this.$http.adornParams({
            'modelId': this.dataForm.list.splice(index, 1)[0].modelId
          })
        }).then(({
          data
        }) => {
          if (data && data.code === 0) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          }

        })
      },
      guige () {
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
      init (data, animal) {
        this.typeList = []

        this.visible = true
        this.dataForm = data
        var ite = this.dataForm.productType
        this.medicineNew.forEach(it => {
          if (ite == it.dictName) {

            this.yaoType = it.dataId
          }
        }),

          data.fitKind.split(',').forEach(item => {

            this.pannerName.forEach(items => {

              if (item == items.dictName) {

                this.typeList.push(items.dataId)
              }
            })

            let map = new Map()
            let array = new Array() // 数组用于返回结果
            for (let i = 0; i < this.typeList.length; i++) {
              if (map.has(this.typeList[i])) { // 如果有该key值
                map.set(this.typeList[i], true)
              } else {
                map.set(this.typeList[i], false) // 如果没有该key值
                array.push(this.typeList[i])
              }
            }

            this.typeList = array

          })

        let arr = data.list
        this.dataForm.list = arr.filter((item) => {
          return item.modelId
        })
      },
      AddForm () {
        if (this.dataForm.list.length <= 8) {
          this.dataForm.list.push({
            modelName: '',
            manufacturer: '',
            units: '',
            place: '',
            twoWarningLine: '',
            oneWarningLine: '',
            mainWarningLine: '',
            count: '',
            weight: '',//重量
            theSmall: '0',

          })
        }
      },
      dataListNumber () {
        this.isDisable = true
        setTimeout(() => {
          this.isDisable = false
        }, 5000)
        this.dataForm.list.map(item => {
          delete item.count
          if (/[\u4e00-\u9fa5]/.test(item.units)) {
            this.normsList.forEach(items => {
              if (items.dictName == item.units) {
                item.units = items.dataId
              }
            })
          }
        })
        this.$http({
          url: this.$http.adornUrl(`/ycyl/ycylmainproduct/save`),
          method: 'post',
          data: {
            'productName': this.dataForm.productName,
            'mainId': this.dataForm.mainId,
            'fitKind': this.typeList.join(','),
            'productType': this.yaoType,
            'list': this.dataForm.list,
          }
        }).then(({
          data
        }) => {
          if (data && data.code === 0) {
            this.visibleRec = false
            this.typeList.splice(0)
            this.$message({
              message: '操作成功',
              type: 'success',
              duration: 1500,
              onClose: () => {
                this.visible = false
                this.$emit('refreshDataList')
                // location.reload();
              }
            })
          } else {
            this.$message.error(data.msg)
          }
        })
      },
      //提交数据
      dataForcount () {
        var popupData = true
        this.dataForm.list.forEach((e) => {
          if (e.oneWarningLine===0){
            e.oneWarningLine ='0'
          }
          if (e.twoWarningLine===0){
            e.twoWarningLine ='0'
          }
          if (e.weight && e.manufacturer && e.modelName && e.place && e.mainWarningLine && e.oneWarningLine && e.twoWarningLine) {

          } else {
            popupData = false
          }

        })
        if (popupData) {
          this.dataListNumber()
        } else {
          this.$message.error('请仔细检查信息是否填写完整')
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .btn_Btn {
    margin-top: 40px;
    /*border: 1px solid #ff0000;*/
    width: 100%;
    text-align: center;

    .newlyAdd {

      color: #fff;
    }
  }

  .el-dialog {
    .godown_titleBox {
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      line-height: 50px;
    }

    .godownConnectLi {
      margin: 0.5rem 0;
    }

    .el-input {
      width: 96px;
      font-size: 13px;
    }

    .el-input__inner {
      padding: 0 0.5rem;
    }

    .godown_connectBox {
      /* display: flex; */
      justify-content: space-evenly;

      .godownConentes {
        display: flex;
        justify-content: space-evenly;
      }

      .element.style {
        width: 96px;
      }
    }

    .newly_TopBox {
      display: flex;
      justify-content: space-evenly;
      margin: 0;
    }

    .godownFooter {
      margin: 3rem 1.5rem 0 0;
      text-align: right;
    }
  }
</style>
