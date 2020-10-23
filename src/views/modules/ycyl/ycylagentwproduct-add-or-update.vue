<template>
  <el-dialog
    :close-on-click-modal="false"
    :title="'代理商仓储产品管理'"
    :visible.sync="visible"
    center
    width="700px"
  >
    <div id="manage">
      <ul class="elDialong">

        <li>
          <span>产品名称：<i></i></span>{{dataForm.productName}}
        </li>
      </ul>
      <ul class="elDialong">
        <li >
          <span> 商品ID： <i></i></span>{{dataForm.productNo}}
        </li>

      </ul>
      <ul class="elDialong">
        <li class="elDialongLeft">
          <span>动物种类：<i></i></span>{{dataForm.fitKind}}
        </li>
        <li>
          <span>功能类目：<i></i></span>{{dataForm.productType}}
        </li>
      </ul>
      <ul class="elDialong">

        <li class="elDialongLeft"><span>总储量：<i></i></span>{{dataForm.totalReserves}}</li>
        <li><span>规格数：<i></i></span>{{standardnumber}}</li>
      </ul>
    </div>

    <div class="standardConnect">
      <ul>
        <li :key="index" v-for="(standard,index) in this.dataForm.list">
          <span>规格： {{standard.modelName}}</span>
          <span>数量：{{standard.count}}</span>
          <span>调整为： <el-input placeholder="请输入入库量" v-model="standard.count" style="height: 30px;"></el-input></span>
        </li>
      </ul>
    </div>
    <span class="dialog-footer" slot="footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button @click="dataFormSubmit()" type="primary">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  export default {
    data() {
      return {
        standardnumber: '',
        visible: false,
        dataForm: {
          wId: 0,
          userId: '',
          agentId: '',
          fitKind: '',
          productType: '',
          createUserId: '',
          createTime: '',
          totalReserves: '',
          inventoryStatus: ''
        },
      }
    },


    methods: {
      init(data) {
        this.visible = true;
        this.dataForm = data;
        this.standardnumber = this.dataForm.list.length
      },
      // 表单提交
      dataFormSubmit() {

      if(this.dataForm.list.some(item=>item.count<0))
       return this.$message.error('库存数量不能为负')


        this.$http({
          url: this.$http.adornUrl(`/ycyl/ycylagentwproduct/${!this.dataForm.wId ? 'save' : 'updateAgentCount'}`),
          method: 'post',
          data: this.$http.adornData(this.dataForm)
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.$message({
              message: '操作成功',
              type: 'success',
              duration: 1500,
              onClose: () => {
                this.visible = false;
                this.$emit('refreshDataList')
              }
            })
          } else {
            this.$message.error(data.msg)
          }
        })
      }


    },
  }
</script>
<style lang="scss" scoped>
  .el-dialog {
    #manage {
      font-size: 16px;
      padding-left: 2rem;

      .elDialong {
        margin-top: 1rem;
        .elDialongLeft{
          width: 20rem;
        }
        li {
          display: inline-block;
          line-height: 0;

          span {
            width: 5em;
            text-align: justify;
            display: inline-block;

            i {
              display: inline-block; /*padding-left: 100%;*/
              width: 100%;
              line-height: 0;
            }
          }
        }
      }
    }
    .standardConnect{
      font-size: 16px;
      margin-top: 2rem;
      ul{
        li{
          line-height: 2.5em;
        padding-left: 2rem;
          span{
            display: inline-block;
            margin-left: 2.5%;
          }
         span:nth-of-type(1){
           width: 25%;
           /*background-color: red;*/
         }
          span:nth-of-type(2){
            width: 25%;
            /*background-color: blue;*/
            line-height: 2em;
          }
          span:nth-of-type(3){
            width: 40%;
            /*background-color: green;*/
          }
        }
      }
    }

  }


</style>

