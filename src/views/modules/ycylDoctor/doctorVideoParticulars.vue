<template>
  <el-dialog
    title="医生视频单业绩详情"
    :close-on-click-modal="false"
    :visible.sync="visible" width="700px" center>
    <div class="mainBox">
      <section>
        <span>订&nbsp;单&nbsp;号&nbsp;&nbsp;：{{dataList.orderNum}}</span>
        <span>订单状态：{{fn(dataList.status)}}</span>
      </section>
      <section>
        <span>课程名称：{{dataList.courseName}}</span>
        <span>付款时间：{{dataList.payTime}}</span>
      </section>
      <section>
        <span>主讲老师：{{dataList.doctorName}}</span>
        <span>指导老师id：{{dataList.payTime}}</span>
      </section>
      <section>
        <span>用户昵称：{{dataList.nickname}}</span>
        <span>药单价值：{{dataList.price}}</span>
      </section>
      <section>
        <span>药品种类：{{dataList.species}}</span>
      </section>
      <section>
        <span style="width: auto">章节名称：{{dataList.chapterName}}</span>
      </section>
      <section>
        <span>推荐主题：{{dataList.species}}</span>
      </section>
      <section>
        <span>用户地址：{{dataList.userAddress}}</span>
      </section>
      <p class="title_p">药品详情</p>
      <div class="drugBox">
        <p v-for="(item,index) in dataList.list" :key="index">
          <span>产品名称：{{item.productName}}</span><span>规格：{{item.modelName}}</span><span>数量：{{item.count}}</span>
        </p>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">返回</el-button>
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
      fn (i) {
        switch (i) {
          case 0:
            return '未付款'
            break
          case 1:
            return '已付款'
            break
          case 2:
            return '已发货'
            break
          case 3:
            return '已完成'
            break
          case 4:
            return '客服审核'
            break
          case 5:
            return '财务审核'
            break
          case 6:
            return '退款完成'
            break
          case 7:
            return '仓库审核'
            break
          case 8:
            return '财务打款'
            break
          case 9:
            return '急速退款'
            break
        }
      },
      init (id) {
        this.visible = true
        this.$http({
          url: this.$http.adornUrl('/study/studyorderresults/getById'),
          method: 'post',
          data: {
            resultsId: id
          }
        }).then(({data}) => {
          if (data && data.code === 0) {

            this.dataList = data.list
          } else {
            this.$message.error(data.msg)
          }
        })

      },

    }
  }
</script>
<style lang="scss" scoped>
  .mainBox {
    font-size: 16px;
    color: #333;

    section {
      span {
        display: inline-block;
        width: 48%;
        line-height: 23px;
      }

      span:nth-of-type(2) {
        margin-left: 20px;
      }
    }

    .title_p {
      font-size: 20px !important;
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
      line-height: 28px;
      width: 100%;
      text-align: center;
      margin: 20px 0;
    }

    .drugBox {
      p {
        line-height: 30px;
        span {
          display: inline-block;
        }
        span:nth-of-type(1){
          width: 350px;
        }
        span:nth-of-type(2){
          width: 200px;
        }
        span:nth-of-type(3){
          width: 100px;
        }
      }
    }
  }
</style>

