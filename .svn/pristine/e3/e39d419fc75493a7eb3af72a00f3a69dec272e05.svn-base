<template>
  <el-dialog
    :close-on-click-modal="false"
    :visible.sync="visible"
    title="医生信息详情"
    width="780px"
    center
  >
    <div class="doctorCount">
      <section class="imgRight">
        <div>
          <img :src="dataListNumber.headImgUrl"/>
        </div>
      </section>
      <div>
        <ul>
          <li>
            <span>
              姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名
              <i></i>
            </span>
            ：{{usernumber.truename}}
          </li>
          <li>
            <span>
              电&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;话
              <i></i>
            </span>
            ：
            {{usernumber.mobile}}
          </li>
          <li>
            <span>
              医生等级
              <i></i>
            </span>
            ：{{fn(usernumber.doctorRank)}}
          </li>

          <li>
            <span>
              就职单位
              <i></i>
            </span>
            ：
            {{usernumber.company}}
          </li>
          <li>
            <span>
              身份证号
              <i></i>
            </span>
            ：{{usernumber.idcard}}
          </li>

          <li>
            <span>
              从业年限
              <i></i>
            </span>
            ：
            {{usernumber.yearsNum}}
          </li>
          <li>
            <span>
              个人地址
              <i></i>
            </span>
            ：{{usernumber.address}}
          </li>

          <li>
            <span>
              擅长种类
              <i></i>
            </span>
            ：
            {{usernumber.adeptKind}}
          </li>
          <div class="territory templone1 domain" style="overflow:hidden">
            <p>擅长领域：</p>
            <ul id="oeskfddslsl" v-if="usernumber.adeptTerritory">
              <li v-for="(ited ,ind ) in usernumber.adeptTerritory.split(',')" :key="ind">{{ited}}</li>
            </ul>
          </div>
          <li>
            <span>
              执业经历
              <i></i>
            </span>：
          </li>
        </ul>
      </div>

      <ul class="doctorConter" style="border: 1px solid #ddd">
        <li :key="index" v-for="(doctorsee,index) in usernumber.list">
          <section>
            <div>
              开始时间：
              <span>{{doctorsee.startDate}}</span>
            </div>
            <span class="noText">&nbsp;-&nbsp;</span>
            <div>
              结束时间：
              <span>{{doctorsee.endDate}}</span>
            </div>
          </section>

          <section>就职单位：{{doctorsee.company}}</section>
          <section>经历描述：{{doctorsee.intor}}</section>
        </li>
      </ul>
      <p class="videoTitle">视频案例</p>
      <div class="doctorVideo" style="padding-left: 4rem; display: flex;">
        <section
          v-for="(ited,ind) in videoUrlList"
          :key="ind"
          style="display: inline-block;margin-left: 1rem;"
        >
          <video
            :src="ited.videoUrl"
            controls="controls"
            style="display: inline-block; width: 8rem;"
          ></video>
        </section>
      </div>
      <p class="videoTitle">身份证件</p>
      <div id="idCounter" style="padding-left: 4rem;">
        <section>
          <el-image
            style="width: 100px; height: 100px"
            :src="usernumber.idcardFrontImgUrl"
            :preview-src-list="srcList"
          ></el-image>
          <p>身份证正面照</p>
        </section>
        <section>
          <el-image
            style="width: 100px; height: 100px"
            :src="usernumber.idcardReverseImgUrl"
            :preview-src-list="srcList"
          ></el-image>
          <p>身份证反面照</p>
        </section>
      </div>
      <p class="videoTitle">执业证件</p>
      <header style="padding-left: 15rem;">
        <header>
          <el-image
            style="width: 100px; height: 100px"
            :src="usernumber.certificateCoverImgUrl"
            :preview-src-list="srcList"
          ></el-image>
        </header>
        <p>执业证封面</p>
      </header>
    </div>
    <span class="dialog-footer" slot="footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button @click="visible = false" type="primary">确定</el-button>
    </span>
  </el-dialog>
</template>
<script>
  export default {
    data () {
      return {
        dataListNumber: '',
        visible: false,
        srcList: [],
        dataList: '',
        videoUrlList: ''
      }
    },
    props: ['usernumber'],
    methods: {
      fn (key) {
        switch (key) {
          case 1:
            return '一级医生'
            break
          case 2:
            return '二级医生'
            break
        }
      },
      init (data) {
        this.visible = true
        this.dataForm = data
        this.$http({
          url: this.$http.adornUrl('/ycyl/ycyluserdoctor/infoById'),
          method: 'post',
          data: {
            userId: data
          }
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.dataListNumber = data.ycyluserdoctor
            for (let k in this.usernumber) {
              if (
                k == 'idcardFrontImgUrl' ||
                k == 'idcardReverseImgUrl' ||
                k == 'certificateCoverImgUrl'
              ) {
                this.srcList.push(this.usernumber[k])
              }
            }
            this.videoUrlList = this.dataListNumber.listexample
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
  .doctorCount {
    padding: 0 2rem;
    font-size: 16px;
    position: relative;

    .imgRight {
      position: absolute;
      right: 10px;
      top: 10px;
      width: 150px;
      height: 200px;
      overflow: hidden;

      div {
        text-align: center;
        display: table-cell;
        vertical-align: middle;

        img {
          max-height:100%;max-width:100%;
        }
      }

    }

    .videoTitle {
      margin: 0.5rem 0;
      color: #333;
    }

    .doctorTop {
      .doctorVideo {
        display: flex;
        margin-bottom: 1rem;

        section {
          width: 30%;

          video {
            width: 100%;
            height: 100%;
          }
        }
      }

      div {
        display: flex;
        justify-content: space-between;

        ul {
          li {
            color: #666;

            span {
              display: inline-block;
              width: 4rem;
              text-align: justify;
              line-height: 0;
              color: #333;

              i {
                width: 100%;
                display: inline-block;
              }
            }
          }
        }
      }
    }

    li {
      margin-top: 0.5rem;
    }

    #idCounter {
      /*display: flex;*/
      /*justify-content: space-evenly;*/
      section {
        display: inline-block;
        width: 45%;
        margin-left: 3%;
        /* border: 1px solid red; */
        img {
          width: 100%;
        }
      }
    }

    .medicalPhoto {
      /* border: 1px solid red; */
      section {
        width: 80%;
      }
    }

    .doctorConter {
      margin-left: 2rem;
      /* border: 1px solid red; */
      padding: 0.8rem 0.5rem;
      border-radius: 0.5rem;

      li {
        margin: 1rem 0;
      }

      section {
        line-height: 25px;
      }

      div {
        display: inline-block;
      }

      .noText {
        font-size: 18px;
      }
    }
  }

  #oeskfddslsl {
    margin-left: 2rem;

    li {
      border: 1px solid #bababa;
      margin-right: 0.5rem;
      line-height: 25px;
      width: 15rem;
      margin-top: 1rem;
      padding: 0.5rem 0;
      text-align: center;
      border-radius: 0.3rem;
    }
  }
</style>
