<template>
  <!--  代理商个人资料-->
  <el-dialog
    :close-on-click-modal="false"
    :visible.sync="visible"
    center
    title="代理商个人资料"
    width="700px">
    <div :key="index" id="agencyCount" v-for="(dataArr,index) in dataList">
      <div class="agencyCountTop">
        <ul>
          <li>代理姓名 ： {{dataArr.truename}}</li>
          <li>负责区域 ：{{dataArr.area}}</li>
        </ul>
        <ul>
          <li v-if="dataArr.level==1">代理等级 ： 市级</li>
          <li v-if="dataArr.level==2">代理等级 ： 县级</li>
          <li>身份证号 ： {{dataArr.idcard}}</li>
        </ul>
        <ul>
          <li>手机号码 ：{{dataArr.mobile}}</li>
          <li>可提余额 ： {{dataArr.totalAmount}}</li>
        </ul>
        <ul>
          <li>信用积分 ： {{dataArr.userFaith}}</li>
          <li>钱包余额 ： {{dataArr.walletMoney}}</li>
        </ul>
        <div class="Address"><p>个人住址 ：{{dataArr.address}}</p></div>
      </div>
      <div class="idPhoto">
        <ul>
          <li>
<!--            <img alt="" :src="dataArr.idcardFrontImgUrl">-->
            <el-image
              style="width: 180px; height: 190px"
              :src="dataArr.idcardFrontImgUrl"
              :preview-src-list="imgList">
            </el-image>
            <p>身份证正面照片</p></li>
          <li>
<!--            <img alt="" :src="dataArr.idcardFrontImgUrl">-->
            <el-image
              style="width: 180px; height: 190px"
              :src="dataArr.idcardReverseImgUrl"
              :preview-src-list="imgList">
            </el-image>
            <p>身份证反面照片</p></li>
        </ul>
      </div>

      <div class="idPhoto">
        <ul>
          <li>
<!--            <img alt="" :src="dataArr.headImgUrl">-->
            <el-image
              style="width: 180px; height: 190px"
              :src="dataArr.doorHeadImgUrl"
              :preview-src-list="imgList">
            </el-image>
            <p>门店照片</p></li>
          <li>
            <el-image
              style="width: 180px; height: 190px"
              :src="dataArr.indoorImgUrl"
              :preview-src-list="imgList">
            </el-image>
            <p>门店室内照片</p></li>
        </ul>
      </div>
    </div>
    <!--    <div style="height: 5rem"></div>-->
    <span class="dialog-footer" slot="footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button @click="visible = false" style="background-color: #0BB2D4">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  export default {
    data () {
      return {
        pageIndex: 1,
        pageSize: 10,
        totalPage: 0,
        visible: false,
        dataList: [],
        imgList: [],
      }
    },
    methods: {
      init (id) {
        this.visible = true
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl('/ycyl/ycyluseragent/list'),
          method: 'post',
          data: {
            'page': this.pageIndex,
            'pageSize': this.pageSize,
            'userId': id
          }
        }).then(({
          data
        }) => {
          if (data && data.code === 0) {
            this.dataList = data.page.list
            this.totalPage = data.page.totalCount
            for (let a in this.dataList[0]) {
              if (a == 'idcardFrontImgUrl' || a == 'idcardReverseImgUrl' || a == 'indoorImgUrl' || a == 'doorHeadImgUrl') {
                this.imgList.push(this.dataList[0][a])
              }

            }
          } else {
            this.dataList = []
            this.totalPage = 0
          }
          this.dataListLoading = false
        })
      },
    }
  }
</script>
<style lang="scss" scoped>
  #agencyCount {
    font-size: 16px;

    .agencyCountTop {
      ul {
        padding-left: 3rem;

        li {
          display: inline-block;
          width: 40%;
          /*background-color: #dfe4ed;*/
        }

        li:nth-of-type(2) {
          margin-left: 3rem;
          width: 45%;
        }
      }
    }

    .Address {
      padding-left: 3rem;
      line-height: 25px;
    }

    .idPhoto {
      margin: 3rem 0;

      ul {
        display: flex;
        justify-content: space-evenly;

        li {
          width: 15rem;
          height: 13rem;
          /*border: 1px solid red;*/
          text-align: center;

          img {
            width: 100%;
            height: 100%;
            /*border: 1px solid blue;*/
            display: block;
          }

          p {
            line-height: 30px;
          }
        }
      }
    }
  }
</style>
