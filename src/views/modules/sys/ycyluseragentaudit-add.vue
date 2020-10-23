<template>
<!--  代理商审核详情页-->
  <el-dialog
    :close-on-click-modal="false"
    :visible.sync="visible"
    center
    title="代理商审核"
    width="600px">
    <div class="audit">
      <div class="auditTop">
        <div>
          <p>代理姓名：{{ycylUserAgent.truename}}</p>
          <p>身份证号：{{ycylUserAgent.idcard}}</p>
        </div>
        <div>
          <p>手机号码：{{ycylUserAgent.mobile}}</p>
          <p>提现账号：{{ycylUserAgent.alipayAccount}}</p>
        </div>
        <div>
          <p v-if="ycylUserAgent.level==1">代理等级：市级</p>
          <p v-if="ycylUserAgent.level==2">代理等级：县级</p>
          <p></p>
        </div>
        <section>
          <p>负责区域：{{ycylUserAgent.provinceId}}{{ycylUserAgent.cityId}}{{ycylUserAgent.areaId}}</p>
        </section>
        <section>
          <p>个人地址：{{ycylUserAgent.address}}</p>
        </section>
      </div>
      <div class="auditConnect">
        <div class="auditConnectTop">
          <section>
            <ul>
              <li>
<!--                <img :src="ycylUserAgent.idcardFrontImgUrl" alt="">-->
                <el-image
                  style="width: 180px; height: 190px"
                  :src="ycylUserAgent.idcardFrontImgUrl"
                  :preview-src-list="userAgentImgList">
                </el-image>
                <p>身份证正面照片</p></li>
              <li>
<!--                <img :src="ycylUserAgent.idcardReverseImgUrl" alt="">-->
                <el-image
                  style="width: 180px; height: 190px"
                  :src="ycylUserAgent.idcardReverseImgUrl"
                  :preview-src-list="userAgentImgList">
                </el-image>
                <p>身份证反面照片</p></li>
            </ul>
          </section>
          <section>
            <ul>
              <li>
<!--                <img :src="ycylUserAgent.doorHeadImgUrl" alt="">-->
                <el-image
                  style="width: 180px; height: 190px"
                  :src="ycylUserAgent.doorHeadImgUrl"
                  :preview-src-list="userAgentImgList">
                </el-image>
                <p>门店照</p></li>
              <li>
<!--                <img :src="ycylUserAgent.indoorImgUrl" alt="">-->
                <el-image
                  style="width: 180px; height: 190px"
                  :src="ycylUserAgent.indoorImgUrl"
                  :preview-src-list="userAgentImgList">
                </el-image>
                <p>室内照</p></li>
            </ul>
          </section>
        </div>
        <div class="auditConnectBottom">
          <section>驳回理由：</section>
          <div>
            <label class="useageBox" for="useage">
                <textarea class="drugUserage" id="useage"
                          style="vertical-align:top;outline:none; height: 8rem ;width: 26rem"
                          v-model="rejectReason"></textarea>
            </label>
          </div>
        </div>
        <div class="credit">
          代理信用：

          <input value='{$ITEM->inoutnum}' min="0"
                 placeholder="请输入信用值..."
                 onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}"
                 onafterpaste="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'0')}else{this.value=this.value.replace(/\D/g,'')}"
                 style="width: 10rem;height: 1.5rem" v-model="userFaith">元
        </div>
      </div>
    </div>
    <span class="dialog-footer" slot="footer">
      <el-button @click="dataFormSubmit()" type="primary">通过</el-button>
       <el-button @click="dataRejectReason()">驳回</el-button>
      <el-button @click="visible = false">取消</el-button>

    </span>
  </el-dialog>
</template>
<script>
  export default {
    data () {
      return {
        userAgentImgList:[],
        userFaith: '',
        rejectReason: '',
        visible: false,
        ycylUserAgent: '',
        id:'',
      }
    },
    methods: {
      init (id) {
        this.userFaith = '';
        this.id=id;
        this.visible = true;
        this.$http({
          url: this.$http.adornUrl('/ycyl/ycyluseragent/infoById'),
          method: 'post',
          data: ({
            'userId': id
          })
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.ycylUserAgent = data.ycylUserAgent
            for (let e in this.ycylUserAgent){
              if (e == 'idcardFrontImgUrl' ||  e == 'idcardReverseImgUrl' || e=='doorHeadImgUrl' || e=='indoorImgUrl'){
                this.userAgentImgList.push(this.ycylUserAgent[e])
              }
            }
          } else {
            this.dataList = []
            this.totalPage = 0
          }
        })
      },
      // 通过
      dataFormSubmit () {
      var than = this
        this.$http({
          url: this.$http.adornUrl('/ycyl/ycyluseragent/update'),
          method: 'post',
          params: this.$http.adornParams({
            'agentId': this.ycylUserAgent.agentId,
            'status': 1,
            'userFaith': this.userFaith*100,
            'userId': this.id

          })
        }).then(({data}) => {
          if (data && data.code === 0) {
            than.userFaith='';
            this.$emit('refreshDataList')
            this.visible = false
          } else {
            this.dataList = []
            this.totalPage = 0
          }
        })
      },
      //  驳回
      dataRejectReason () {
        this.$http({
          url: this.$http.adornUrl('/ycyl/ycyluseragent/update'),
          method: 'post',
          params: this.$http.adornParams({
            'agentId': this.ycylUserAgent.agentId,
            'status': 0,
            // 'agentSta':2,
            'userFaith': this.userFaith*100,
            'userId': this.id,
            'rejectReason': this.rejectReason

          })
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.$emit('refreshDataList')
            this.visible = false
          } else {
            this.dataList = []
            this.totalPage = 0
          }
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
  .audit {
    font-size: 16px;
    padding: 0.5rem;

    .auditTop {
      div {
        margin-top: 5px;

        p {
          display: inline-block;
        }

        p:nth-of-type(1) {
          /*background-color: red;*/
          width: 45%;
        }

        p:nth-of-type(2) {
          margin-left: 2%;
          /*background-color: blue;*/
          width: 50%;
        }

      }

      section {
        p {
          margin-top: 5px;
        }
      }
    }

    .auditConnect {
      .auditConnectTop {
        section {
          margin-top: 3rem;

          ul {
            display: flex;
            justify-content: space-between;

            li {
              width: 15rem;
              height: 13rem;
              /*border: 1px solid red;*/
              text-align: center;

              img {
                width: 100%;
                height: 100%;
                border: 1px solid blue;
                display: block;
              }

              p {
                line-height: 30px;
              }
            }

          }
        }
      }
    }

    .auditConnectBottom {
      margin-top: 3rem;

      .section {
        display: inline-block;
      }

      div {
        display: inline-block;
        width: 20rem;
        height: 8rem;
        /*border: 1px solid red;*/
        margin-left: 5rem;

        .useageBox {
          height: 8rem;
          display: inline-block;
        }
      }
    }

    .credit {
      margin-top: 2rem;
    }
  }

</style>

