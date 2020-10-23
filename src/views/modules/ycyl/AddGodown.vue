<template>
  <!--  主仓入库管理-->
  <el-dialog
    :close-on-click-modal="false"
    :visible.sync="visible"
    title="商品入库管理"
    width="1200px">
    <div class="godown">
      <div class="godown_title">
        <ul>
          <li class="godown_titleBox">
            <span>商品ID：{{dataForm.productNo}}</span>
            <span> 功能类目：{{dataForm.productType}}</span>
            <span>适用种类：{{dataForm.fitKind}}</span>
            <span>产品名称：{{dataForm.productName}}</span>
          </li>
        </ul>
      </div>
      <ul class="godown_connect">
        <li :key="index" class="godownConnectLi" v-for="(pan,index) in dataN">
          <div class="godown_connectBox">
            <p>产品规格{{index+1}}： <span class="specification">
            {{pan.modelName}}
          </span></p>
            <div class="inputBox">
              <div class="inp">入库数量：
                <span v-if="pan.theSmall=='0'">
                  <el-input placeholder="请输入" v-model="pan.count" style="width: 120px;height: 30px"></el-input>
                </span>
                <span v-if="pan.theSmall=='1'">
                  <el-input placeholder="请输入" v-model="pan.count=0" style="width: 120px;height: 30px"
                            disabled></el-input>
                </span>
              </div>
              <div class="location">产品库位：
                <el-input placeholder="请输入" v-model="pan.place" style="width: 120px;height: 30px" disabled></el-input>
              </div>
            </div>
            <div class="inputBox">
              <div class="inp">采购单价：
                <span>
                  <el-input placeholder="请输入单价" v-model="pan.unitPrice" style="width: 120px;height: 30px"
                            @blur="countNumber(index)"></el-input>
                </span>
              </div>
              <div class="location">采购金额：
                <el-input :placeholder="pan.sumPrice" v-model="pan.sumPrice" style="width: 120px;height: 30px"
                ></el-input>
              </div>
            </div>
            <p style="font-size: 16px" class="inputBox">生产厂商：<span style="">{{pan.manufacturer}}</span></p>
          </div>
        </li>
      </ul>
      <div class="godownPhoto">
        <p style="letter-spacing:.2em;">请上传入库截图:</p>
        <div>
          <el-upload
            ref="uploadClear"
            :action="this.$http.adornUrl('/sys/oss/uploadAll')"
            :data="folderNameTer"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :on-success="handsuccess"
            list-type="picture-card"
            name="fileUpload"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
        </div>
        <el-dialog :visible.sync="dialogVisible">
          <img :src="dialogImageUrl" alt="" width="100%">
        </el-dialog>
      </div>
      <div class="godownFooter">
         <span class="dialog-footer" slot="footer">
           <el-popover
             placement="top"
             width="160"
             v-model="visibleRec">
  <p>您确认要入库这个商品吗？</p>
  <div style="text-align: right; margin: 0">
    <el-button size="mini" type="text" @click="visibleRec = false">取消</el-button>
    <el-button type="primary" size="mini" @click="dataphoto()" :disabled="isDisable">确定</el-button>
  </div>
  <el-button slot="reference">确认入库</el-button>
</el-popover>
           <!--        <el-button @click="dataphoto()" type="primary" :disabled="isDisable">确认入库</el-button>-->
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
        uploadClear: '',
        dataN: '',
        dataPhotoImg: {
          mainId: '',
          photoImg: [],
        },
        folderNameTer: {
          folderName: 'ycylManage'
        },
        dialogImageUrl: '',
        dialogVisible: false,
        visible: false,
        dataList: '',
        fileUpload: {
          'name': '1'
        },
        dataForm: {
          dialogImageUrl: '',
          dialogVisible: false
        },
      }
    },
    mounted () {
    },
    methods: {
      countNumber (index) {
        this.dataN[index].sumPrice = this.dataN[index].unitPrice * this.dataN[index].count
        this.dataN.splice(index, 1, this.dataN[index])
      },
      init (data) {
        if (this.$refs.uploadClear) {
          this.$refs.uploadClear.clearFiles()
        }
        this.dataPhotoImg.mainId = data.mainId
        this.visible = true
        this.dataForm = data
        data.list.map(e => {
          e.count = ''
          e.sumPrice = ''
          e.unitPrice = ''
        })
        this.dataN = data.list
      },
      handleRemove (file, fileList) {
      },
      //图片获取
      handlePictureCardPreview (file) {
        this.dialogImageUrl = file.url
        this.dialogVisible = true
      },
      handsuccess (file) {
        for (var i = 0; i < file.paths.length; i++) {
          this.dataForm.url = file.paths[i]
        }
        this.dataForm.url = file.paths
      },
      dataphoto () {//确认入库
        this.isDisable = true
        setTimeout(() => {
          this.isDisable = false   //点击一次时隔两秒后才能再次点击
        }, 2000)
        if (this.dataForm.url == null) {
          this.$alert('您没有添加图片，请仔细确认后再确认！', '提醒', {
            confirmButtonText: '确定',
          })
        } else {
          // this.$confirm('您确定将此产品入库吗?', '温馨提示', {
          //   confirmButtonText: '确定',
          //   cancelButtonText: '取消',
          //   type: 'warning'
          // }).then(() => {
          //   this.dataForcount()
          // }).catch(() => {
          //   this.$message({
          //     type: 'info',
          //     message: '已取消入库'
          //   });
          // });
          this.dataForcount()
        }

      },
      //提交数据
      dataForcount () {
        var A
        this.dataN.map((e, index) => {
          if (!e.count) {
            A = index
            this.dataN.splice(A, 1)
          }
        })
        this.dataN.map((item) => {
          for (let k in item) {
            delete item.createTime
            delete item.inventoryStatus
            delete item.createTime
            delete item.status
            delete item.manufacturer
            delete item.place
            delete item.units
            delete item.userId
          }
        })
        this.$http({
          url: this.$http.adornUrl(`/ycyl/ycylmainproduct/save`),
          method: 'post',
          data: {
            mainId: this.dataForm.mainId,
            list: this.dataN,
            url: this.dataForm.url.join(',')
          }
        }).then(({
          data
        }) => {
          if (data && data.code === 0) {
            this.visibleRec = false
            this.$message({
              message: '操作成功',
              type: 'success',
              duration: 1500,
              onClose: () => {
                this.visible = false
                this.$emit('refreshRKList')
              }
            })
          } else {
            this.$message.error(data.msg)
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .godown {
    font-size: 16px;

    .godown_title {
      ul {
        margin-bottom: 1vw;
      }
    }

    .godown_titleBox {
      display: flex;
      justify-content: space-evenly;

      .godown_titleBox span {
        line-height: 20px;
      }
    }

    .godown_connect {
      border: 1px solid #eee;
      padding: 2rem 0;

      .godownConnectLi {
        display: inline-block;
        width: 45%;
        border: 1px solid #ddd;
        border-radius: 6.5px;
        margin-left: 32px;
        margin-top: 16px;

        div {
          display: inline-block;

          h3 {
            font-size: 20px;
            font-weight: 500;
            color: rgba(51, 51, 51, 1);
          }

          .specification {
            display: inline-block;
            width: 200px;
          }

          .inp {
            width: 260px;
          }

          .location {
            width: 220px;
          }

          .unitBox {
            width: 7rem;
            /*background-color: #999999;*/
            margin-left: 0.5rem;
          }
        }

        .godown_connectBox {
          padding: 8px 8px;

          .inputBox {
            line-height: 40px;
          }
        }
      }
    }

    .godownPhoto {
      text-align: center;
      margin-top: 1rem;

      div {
        margin: 1rem auto;
        width: 150px;
        height: 170px;
        overflow: hidden;
      }
    }

    .godownFooter {
      text-align: center;
      padding: 2rem 0;
    }
  }
</style>
