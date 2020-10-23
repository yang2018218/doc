<template>
  <el-dialog
    :close-on-click-modal="true"
    :visible.sync="visible"
    center
    title="订单详情"
    width="700px"
  >
    <div id="agentBox">
      <div class="agentBoxTop">
        <div>
          <span>订&nbsp;&nbsp;单&nbsp;ID ：{{dataList.orderNum}}</span>
          <span>药品价值 ：{{dataList.price}}</span>
        </div>
        <div>
          <span>用户昵称 ：{{dataList.nickname}}</span>
          <span class="countStyle">用户电话 ：{{dataList.mobile}}</span>
        </div>
        <div>
          <span>代理收益 ：{{dataList.agentAmount}}</span>
          <span class="countStyle">购买时间 ：{{dataList.payTime}}</span>
        </div>

        <div v-if="dataList.doctorName">
          <span>医生姓名 ：{{dataList.doctorName}}</span>
          <span class="countStyle">医生手机 ：{{dataList.doctorMobile}}</span>
        </div>
        <div>
          <span style="width: auto">所属代理商 ：{{dataList.agentName}}</span>
        </div>
        <div>  <span style="width: auto">用户区域 ：{{dataList.userAddress}}</span></div>
        <div>
          <span style="width:100%">收货地址：{{dataList.userAddress}}</span>
        </div>
      </div>
      <div class="agentBoxBottom">
        <h3>药品详情</h3>
        <div :key="ind" v-for="(item,ind) in dataList.list">
          <span style="width:20rem">药品名称 ：{{item.productName}}</span>
          <span style="width:200px">规格 ：{{item.modelName}}</span>
          <span>数量 ：{{item.count}}</span>
        </div>
      </div>
    </div>
    <span class="dialog-footer" slot="footer">
      <el-button @click="visible = false">返回</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      dataList: {},
      visible: false,
      dataForm: {
        content: 0
      }
    };
  },
  methods: {
    init(id) {
      this.visible = true;
      this.dataListLoading = true;
      this.$http({
        url: this.$http.adornUrl("/ycyl/ycylorder/infoById"),
        method: "post",
        data: ({
          page: this.pageIndex,
          pageSize: this.pageSize,
          key: this.dataForm.key,
          orderId: id
        })
      }).then(({ data }) => {
        if (data && data.code === 0) {
          this.dataList = data.orderDetails||{};
        } else {
          this.dataList = [];
          this.totalPage = 0;
        }
        this.dataListLoading = false;
      });
    }
  }
};
</script>
<style lang="scss" scoped>
#agentBox {
  font-size: 16px;

  span {
    display: inline-block;
  }

  .agentBoxTop {
    div {
      span {
        width: 18rem;
        margin-left: 1.5rem;
      }


      p {
        display: inline-block;
        margin-left: 2rem;
        font-size: 14px;
      }
    }
  }

  .agentBoxBottom {
    h3 {
      font-size: 18px;
      font-weight: 500;
      text-align: center;
      margin: 2rem 0;
    }

    div {
      /*margin-left: 2rem;*/

      span:nth-of-type(1) {
        width: 15rem;
      }

      span:nth-of-type(2) {
        width: 8rem;
      }

      span:nth-of-type(3) {
        width: 6rem;
      }
    }
  }
  .countStyle {
    width: auto;
  }
}
</style>
