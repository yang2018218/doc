<template>
  <div>
    <div class="boxBig1">
      <form
        id="form1"
        style=" width: 76mm;
    height: 125mm;
    border: 1px solid #d9d9d9;
    font-family: 微软雅黑;"
      >
        <div
          class="title1"
          style="height: 12mm;
      font-size: 9pt;
      position: relative; border-bottom: 1px solid #666;"
        >
          <div style="position: absolute;bottom:0mm;font-size: 8pt;color: #aaa">
            <span>{{time1}}</span>
            <span>{{time2}}</span>第一次打印
          </div>
        </div>
        <div style="height: 15mm;border-bottom: 1px solid #d9d9d9;">
          <img style="width: 58mm;
       height: 15mm;margin-left: 8mm" id="yunDan" />
        </div>
        <div class="title3" style="border-bottom: 1px solid #d9d9d9; height: 8mm;width:75mm">
          <p
            style="
          text-align: center;
      line-height: 8mm;
       font-size: 24pt;
    margin:0;width:75mm"
          >{{kuaidiList.distributeInfo.shortAddress}}</p>
        </div>
        <div class="big" style="display: flex;border-bottom: 1px solid #d9d9d9">
          <div
            class="left"
            style="display:inline-block;width: 56mm;border-right:1px solid #d9d9d9;"
          >
            <div style="height:6mm;line-height: 6mm">
              <span style="font-weight: 600;font-size: 9pt;margin-right: 4mm;margin-left: 2mm">集</span>
              <span style="font-size: 9pt;font-weight: 600">{{packageCenterName}}</span>
            </div>
            <div style="height:18mm ; border-top: 1px solid #d9d9d9 ;">
              <div class="left" style="display: flex;">
                <div
                  style="width: 9mm;text-align: center;line-height: 18mm;font-size: 12pt;font-weight: 600;display: inline-block"
                >收</div>
                <div style="display: inline-block;width: 47mm;padding: 1mm 0">
                  <div style="font-size: 10pt;font-weight: 600;display: flex">
                    <span style=" width: auto;margin-right: 2mm">{{dataList.linkman}}</span>
                    <span style=" margin-right: 5mm;">{{dataList.mobile}}</span>
                  </div>
                  <div>
                    <p style="margin-top: 2mm;font-size: 10pt">{{dataList.address}}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="right" style="display: inline-block;width: 19.4mm">
            <div style="height: 14mm;border-bottom: 1px solid #d9d9d9">
              <p style="font-size: 12pt">{{kuaidiList.distributeInfo.printKeyWord}}</p>
            </div>
            <div style="height: 10mm;font-weight: 600;padding-top:1mm ">
              <span style="font-size: 9pt;margin-left: 3mm;">手机尾号</span>
              <span style="font-size: 11pt;margin-left: 3mm">{{weihao}}</span>
            </div>
          </div>
        </div>
        <div style="height: 10mm;display: flex">
          <div
            style="display: inline-block;width: 56mm;border-right: 1px solid #d9d9d9;display: flex"
          >
            <div
              style="width: 9mm;text-align: center;line-height: 8mm;font-size: 12pt;font-weight: 600;display: inline-block"
            >寄</div>
            <div>
              <div style="font-size: 8pt;font-weight: 600;display: inline-block;margin-top:1.5mm">
                <span style=" margin-right: 2mm;width: auto">万先生</span>
                <span style=" margin-right: 5mm;">18137182965</span>
              </div>
              <div>
                <p style="margin-top: 0.3mm;font-size: 9pt; ">河南省郑州市金水区</p>
              </div>
            </div>
          </div>
          <div style="display: inline-block;width: 19.4mm;height: 8mm;">
            <img src="@/assets/img/电话.png" alt="" style="margin:1mm 0 0 5mm;" />
          </div>
        </div>
        <div style="height: 13mm;border-bottom: 1px solid #d9d9d9;border-top:1px solid #d9d9d9;">
          <div
            style="display:inline-block;width: 22.5mm; font-size:18pt;text-align:center;padding-bottom: 2mm"
          >{{dizhi}}</div>
          <div style="display: inline-block;width: 50mm;height: 13mm;text-align: center;border-left: 1px solid #d9d9d9;">
            <img style="width: 50mm;display: inline-block;
       height: 12.5mm;" id="barcode" />
          </div>
        </div>
        <div style="height: 25mm;border-bottom:1px solid #d9d9d9 ;position: relative;width: 76mm">
          <span style="position: absolute;bottom: 0;right: 10px;font-size: 11pt;color: #999999">已验视</span>
        </div>
        <div style="height: 8mm;line-height: 8mm;border-bottom: 1px solid #999;width: 76mm">
          <p style="color: #999;text-align: center;font-size: 12pt">畜牧堂-互联网畜牧服务平台</p>
        </div>
      </form>
    </div>
    <div>
      <div class="select">
        <div class="first">
          <span>请选择快递公司：</span>
          <el-select v-model="trackingCompany" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.dataId"
              :label="item.remark"
              :value="item.remark"
            ></el-option>
          </el-select>
        </div>
        <div class="second">
          <span>请输入快递单号：</span>
          <input type="text" v-model="trackingNum" />
        </div>
      </div>
    </div>
    <div style="height: 50px"></div>
    <el-button type="primary" class="print-btn" @click="btnClickPrint">打印快递面单</el-button>
    <el-button @click="outWarehouse()">完成出库</el-button>
    <el-button @click="returnBtn">返回</el-button>
  </div>
</template>

<script>
    // import jrQrcode from 'jr-qrcode'
    import {
        getLodop
    } from "./../../../../src/LodopFuncs"; //导入模块
    import JsBarcode from "jsbarcode";

    export default {
        data() {
            return {
               // packageCenterName: "", //集散地
                options: "", //快递公司
                trackingNum: "", //快递单号
                trackingCompany: "圆通", // 快递公司
                dizhi: "",
                weihao: "",
                ji: "郑州市金水区中转站",
                qrcodeImg: "",
                time1: "",
                time2: "",
                value: "",
                dataList: null,
                kuaidiList: "",
                logisticProviderID: "",
                mailNo: "",
                clientID: "",
                qrCode: {
                    dtb: "700郑州",
                    mn: "1000021765",
                    pcn: "省内件",
                    rbc: "",
                    sbc: "210045"
                },
                originateOrgCode: 210045,
                packageCenterCode: 371910,
                printKeyWord: "",
                shortAddress: "300-200-30-500",
                packageCenterName: "",
                consigneeBranchCode: "",
                txLogisticID: "" //运单条形码
            };
        },
        created() {
            this.getTime();
            this.kuaidiList = this.$route.query.ycylOutbound;
            this.dataList = this.$route.query.dataList;
            this.packageCenterName = this.kuaidiList.distributeInfo.packageCenterName;
            // this.trackingNum = this.kuaidiList.txLogisticID;
            if (this.kuaidiList.distributeInfo.shortAddress.length > 10) {
                this.dizhi = this.kuaidiList.distributeInfo.shortAddress.slice(4, -4);
            } else if (
                this.kuaidiList.distributeInfo.shortAddress.length < 10 &&
                this.kuaidiList.distributeInfo.shortAddress.length > 7
            ) {
                this.dizhi = this.kuaidiList.distributeInfo.shortAddress.slice(4, -3);
            } else {
                this.dizhi = "";
            }
            // this.dizhi();
        },
        mounted() {
            this.courier(); //快递公司
            this.weihao = this.dataList.mobile.substr(this.dataList.mobile.length - 4);

            // this.qrcodeImg = jrQrcode.getQrBase64('111154321')
            JsBarcode("#barcode", this.kuaidiList.mailNo, {
                    format: "CODE128", //选择要使用的条形码类型
                    // text: '条形码的数据',
                    displayValue: true, //是否在条形码下方显示文字
                    textPosition: "bottom", //设置文本的垂直位置
                    height: 35,
                    width: 2,
                    fontOptions: "bold ",
                    lineColor: "#000"
                })
                .blank(20)
                // .options({ font: "OCR-B" });
            JsBarcode("#yunDan", this.kuaidiList.mailNo, {
                    format: "CODE128", //选择要使用的条形码类型
                    // text: '条形码的数据',
                    displayValue: true, //是否在条形码下方显示文字
                    textPosition: "bottom", //设置文本的垂直位置
                    height: 55,
                    width: 2,
                    fontOptions: "bold ",
                    lineColor: "#000"
                })
                .blank(20)
                // .options({ font: "OCR-B" });
        },

        methods: {
            courier() {
                //获取快递公司
                this.$http({
                    url: this.$http.adornUrl("/ycyl/ycyldictdata/list"),
                    method: "post",
                    data: {
                        dictValue: "delivery",
                        "pageSize": "30"
                    }
                }).then(({
                    data
                }) => {
                    if (data && data.code === 0) {
                        this.options = data.page.list;
                    }
                });
            },

            outWarehouse() {
                // 出库
                if (this.trackingCompany !== "") {
                    if (this.trackingNum !== "") {
                        this.$http({
                            url: this.$http.adornUrl("/ycyl/ycyloutbound/outbound"),
                            method: "post",
                            data: {
                                id: this.dataList.id,
                                status: 1,
                                orderProperty: this.dataList.orderProperty,
                                orderId: this.dataList.orderId,
                                trackingNum: this.trackingNum, //快递公司
                                trackingCompany: this.trackingCompany //快递号
                            }
                        }).then(({
                            data
                        }) => {
                            if (data && data.code == 0) {
                                // (this.trackingCompany = ""),
                                // (this.trackingNum = ""),
                                // (this.dialogVisiblea = false);
                                this.$message.success("出库成功");
                                this.returnBtn();
                            } else {
                                this.$message.error(data.msg);
                            }
                        });
                    } else {
                        this.$alert("请检查是否输入快递单号", "提示", {
                            confirmButtonText: "确定"
                        });
                    }
                } else {
                    this.$alert("请检查是否输入快递公司", "提示", {
                        confirmButtonText: "确定"
                    });
                }
            },
            // 地址的判断
            returnBtn() {
                this.$router.push({
                    path: "/ycyl-ycylmianoutput",
                    query: {
                        lujing: "tiaozhuan"
                    }
                });
                // /ycyl-ycylmianoutput
            },
            getTime() {
                var date = new Date();
                var seperator1 = "/";
                var seperator2 = ":";
                //以下代码依次是获取当前时间的年月日时分秒
                var year = date.getFullYear();
                var month = date.getMonth() + 1;
                var strDate = date.getDate();
                var minute = date.getMinutes();
                var hour = date.getHours();
                var second = date.getSeconds();
                //固定时间格式
                if (month >= 1 && month <= 9) {
                    month = "0" + month;
                }
                if (strDate >= 0 && strDate <= 9) {
                    strDate = "0" + strDate;
                }
                if (hour >= 0 && hour <= 9) {
                    hour = "0" + hour;
                }
                if (minute >= 0 && minute <= 9) {
                    minute = "0" + minute;
                }
                if (second >= 0 && second <= 9) {
                    second = "0" + second;
                }
                var time1 = year + seperator1 + month + seperator1 + strDate;
                var time2 = hour + seperator2 + minute + seperator2 + second;
                // var currentdate = year + seperator1 + month + seperator1 + strDate
                //   + ' ' + hour + seperator2 + minute + seperator2 + second
                this.time1 = time1;
                this.time2 = time2;
                // return currentdate;
            },
            getList() {},
            btnClickPrint() {
                let LODOP = getLodop();
                LODOP.PRINT_INIT("订货单");
                LODOP.SET_PRINT_STYLE("FontSize", 16);
                // LODOP.SET_PRINT_STYLE("Bold", 1);
                LODOP.ADD_PRINT_TEXT(50, 201, 260, 39, "");
                LODOP.ADD_PRINT_HTM(
                    0,
                    0,
                    350,
                    600,
                    document.getElementById("form1").innerHTML
                );
                //        LODOP.PRINT();
                LODOP.PREVIEW();
            }
        }
    };
</script>

<style scoped lang="scss">
    .select {
        margin-top: 50px;
        border: 1px solid #eee;
        padding: 18px;
        width: 287px;
        .first {
            height: 42px;
        }
        .second {
            margin-top: 20px;
            input {
                width: 190px;
                height: 32px;
                border: 1px solid rgba(221, 221, 221, 1);
                border-radius: 6px;
                padding-left: 5px;
            }
        }
    }

</style>
