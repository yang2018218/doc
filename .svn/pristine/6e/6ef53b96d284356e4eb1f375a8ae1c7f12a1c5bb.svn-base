<template style="border-radius: 10px">
  <el-dialog
    title="运费设置"
    :close-on-click-modal="false"
    :visible.sync="visible"
    center width="370px" border-radius="10px">
    <div class="content">
      <p><span>邮寄地区：</span> <span>{{city.name}}</span></p>
      <p><span>首重设置：</span> <input type="text" class="inp" :placeholder="city.firstHeavy" v-model="city.firstHeavy">&nbsp;&nbsp;
        Kg </p>
      <p><span>首重运费：</span> <input type="text" class="inp" :placeholder="city.firstHeavyPrice"
                                   v-model="city.firstHeavyPrice">&nbsp;&nbsp;元 </p>
      <p><span>续重运费：</span> <input type="text" class="inp" :placeholder="city.continuedHeavyPrice"
                                   v-model="city.continuedHeavyPrice">&nbsp;&nbsp;Kg/元</p>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  export default {
    data () {
      return {
        visible: false,
        city: {},
        freightId: '',

      }
    },
    methods: {
      init (data) {
        this.freightId = data.freightId
        this.city.name = data.name
        this.city.firstHeavy = data.firstHeavy
        this.city.firstHeavyPrice = data.firstHeavyPrice
        this.city.continuedHeavyPrice = data.continuedHeavyPrice
        this.visible = true

      },
      // 表单提交
      dataFormSubmit () {
        if (this.city.firstHeavyPrice && this.city.continuedHeavyPrice && this.city.firstHeavy && this.freightId) {
          this.$http({
            url: this.$http.adornUrl(`/ycyl/ycylfreight/heavy`),
            method: 'post',
            data: {
              firstHeavyPrice: this.city.firstHeavyPrice + '',
              continuedHeavyPrice: this.city.continuedHeavyPrice + '',
              firstHeavy: this.city.firstHeavy + '',
              freightId: this.freightId,
            }
          }).then(({data}) => {
            if (data && data.code === 0) {
              this.$message({
                message: '操作成功',
                type: 'success',
                duration: 1500,
                onClose: () => {
                  this.visible = false
                  this.$emit('refreshDataList')
                }
              })
            }
          })
        }else {
          this.$message.error("请仔细检查信息是否填写完整")
        }

      }

    }
  }

</script>
<style scoped lang="scss">
  .content {
    font-size: 16px;
    padding: 10px 15px 10px 15px;

    p {
      margin-bottom: 5px;

      .inp {
        text-indent: 20px;
        width: 150px;
        height: 30px;
        border: 1px solid rgba(221, 221, 221, 1);
        border-radius: 6px;
      }
    }
  }

  .dialog-footer {
    margin-top: -10px;
  }

</style>

