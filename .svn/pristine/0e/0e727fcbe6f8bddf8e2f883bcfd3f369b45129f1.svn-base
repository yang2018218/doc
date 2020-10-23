<template>
  <!-- 客服端代理进货审核页 -->
  <el-dialog
    :close-on-click-modal="false"
    :visible.sync="visible"
    center
    style="font-size:24px"
    title="诊断单详情"
    width="700px"
  >
    <div class="contentBox">
      <div class="contentBox_top">
        <section>
          <footer>
            <div>订单ID <i></i>
            </div>
            ：
            <p>{{dataList.specialistNum}}</p>
          </footer>
          <footer>
            <div>服务时间 <i></i>
            </div>
            ：
            <p>{{dataList.createTime}}</p>
          </footer>
        </section>
        <section>
          <footer>
            <div>老&nbsp;&nbsp;&nbsp;&nbsp;师 <i></i>
            </div>
            ：
            <p>{{dataList.docTruename}}</p>
          </footer>
          <footer>
            <div>老师ID <i></i>
            </div>
            ：
            <p></p>
          </footer>
        </section>
<!--        <section>-->
<!--          <footer>-->
<!--            <div>审核医生 <i></i>-->
<!--            </div>-->
<!--            ：-->
<!--            <p></p>-->
<!--          </footer>-->
<!--          <footer>-->
<!--            <div>审核人ID <i></i>-->
<!--            </div>-->
<!--            ：-->
<!--            <p></p>-->
<!--          </footer>-->
<!--        </section>-->
        <section>
          <footer>
            <div>用户昵称 <i></i>
            </div>
            ：
            <p>{{dataList.nickname}}</p>
          </footer>
          <footer>
            <div>用户电话 <i></i>
            </div>
            ：
            <p>{{dataList.mobile}}</p>
          </footer>
        </section>
        <section>
          <footer>
            <div>诊疗动物 <i></i>
            </div>
            ：
            <p>{{dataList.animal}}</p>
          </footer>
          <footer>
            <div>药单价值 <i></i>
            </div>
            ：
            <p>{{dataList.price}}</p>
          </footer>
        </section>
        <section>
          <footer>
            <div>动物日龄 <i></i>
            </div>
            ：
            <p>{{dataList.ageDays}}</p>
          </footer>
          <footer>
            <div>药品种类 <i></i>
            </div>
            ：
            <p v-if="dataList.product">{{dataList.product.length}}</p>
          </footer>
        </section>
        <section>
          <footer>
            <div>养殖规模 <i></i>
            </div>
            ：
            <p>{{dataList.scale}}</p>
          </footer>
        </section>
<!--        <div><span >用户地区</span>&nbsp;：<div style=""> </div></div>-->
        <div class="bingzheng"><span>诊疗病症</span>&nbsp;：<div><p>{{dataList.disease}}</p></div></div>
        <div class="bingzheng"><span>病症描述</span>&nbsp;：<div><p>{{dataList.means}}</p></div></div>
        <div class="bingzheng"><span>使用方法</span>&nbsp;：<div><p>{{dataList.usage}}</p></div></div>
      </div>
      <div class="contentBox_conten">
        <p class="title">药品详情</p>
        <div>
          <p v-for="(item,index) in dataList.product" :key="index" class="content_p">
            <span class="productName">产品名字： {{item.productName}}</span><span class="productModel">规格：{{item.modelName}}</span><span class="productNumber">数量： {{item.count}}</span>

          </p>
        </div>
      </div>

    </div>

    <span class="dialog-footer" slot="footer">
<el-button style="padding: 10px 20px" @click="visible = false">返回</el-button>

    </span>
  </el-dialog>
</template>
<script>
  export default {
    data () {
      return {
        visible: false,
        dataList: '',
      }
    },
    methods: {
      init (id) {
        this.visible = true
        this.orderId = id
        this.$http({//详情
          url: this.$http.adornUrl(`/ycyl/ycylassistantspecialistinfo/getSpecialistInfoById`),
          method: 'get',
          params: this.$http.adornParams({
            infoId: id
          })
        }).then(({
          data
        }) => {
          if (data && data.code === 0) {
            this.dataList = data.info

          }else {
            this.$message.error(data.msg)
          }
        })

      }
    }
  }
</script>
<style lang="scss" scoped>
  .contentBox {
    padding: 5px 10px;
    font-size: 16px;
    border-top: 1px solid #d9d9d9;
    .contentBox_top {
      border-bottom:1px solid #d9d9d9 ;
      padding-bottom: 20px;
      footer {
        display: inline-block;
        width: 300px;

        div {
          display: inline-block;
          width: 64px;
          /*border: 1px solid red;*/
          text-align: justify;
          line-height: 0;

          i {
            display: inline-block;
            width: 100%
          }
        }

        p {
          display: inline-block;
        }
      }
      .bingzheng{
        display: flex;
        margin-top: 5px;
        span{
          width: 64px;
          display: inline-block;
        }
        div{
          /*border: 1px solid #ff0000;*/
          width: 520px;
        }
      }

    }
    .contentBox_conten{
      .title{
        font-weight: 500;
        font-size: 20px;
        text-align: center;
        color: #222;
        padding: 10px 0;
      }
      div{
        .content_p{
          font-size: 16px;
          margin-top: 10px;
          span{
            display: inline-block;
          }
          .productName{
            /*background-color: red;*/
            width: 290px;
          }
          .productModel{
            /*background-color: #0BB2D4;*/
            width: 160px;
          }
          .productNumber{
            /*background-color: #0000cc;*/
            width: 160px;
          }

        }
      }
    }
  }

</style>
