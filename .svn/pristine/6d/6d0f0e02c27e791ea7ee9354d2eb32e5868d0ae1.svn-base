<template>
  <!--  出库页面-->
  <div class="mainoutput">
    <div class="mainoutput_header">
      <div class="first">
        <span>订单编号：</span>
        <input v-model="searchData.orderNo" class="search" type="text" placeholder="请输入订单编号"/>
      </div>
      <div class="first">
        <span>地址：</span>
        <input v-model="searchData.agentAddress" class="search" type="text" placeholder="请输入地址"/>
      </div>
      <div class="first">
        <span>状态：</span>
        <select class="first_select" v-model="output">
          <option v-for="(item,index) in outputArr" :key="index" :value="item.id">{{item.name}}</option>
        </select>
      </div>
      <div class="first">
        <span>属性：</span>
        <select class="second_select" v-model="orderProperty">
          <option v-for="(item,index) in enterpriseList" :key="index" :value="item.id">{{item.name}}</option>
        </select>
      </div>
      <div class="first">
        <span>财务通过时间：</span>
        <el-date-picker
          v-model="searchData.startTime"
          value-format="yyyy-MM-dd HH:mm:ss"
          type="datetime"
          placeholder="选择日期时间"
        ></el-date-picker>
        <span class="line">
          <i></i>
        </span>
        <el-date-picker
          v-model="searchData.endTime"
          value-format="yyyy-MM-dd HH:mm:ss"
          type="datetime"
          placeholder="选择日期时间"
        ></el-date-picker>
      </div>
      <div class="first">
        <span>操作时间:</span>
        <el-date-picker
          v-model="searchData.startOperatingTime"
          value-format="yyyy-MM-dd HH:mm:ss"
          type="datetime"
          placeholder="选择日期时间"
        ></el-date-picker>
        <span class="line">
          <i></i>
        </span>
        <el-date-picker
          v-model="searchData.endOperatingTime"
          value-format="yyyy-MM-dd HH:mm:ss"
          type="datetime"
          placeholder="选择日期时间"
        ></el-date-picker>
      </div>
      <el-button @click="searchGoods()" type="primary" style="padding: 8px 20px;margin-left: 20px">搜 索</el-button>
      <el-popover
        placement="bottom"
        width="160"
        v-model="visibleExcel">
        <p>请确认您是否要下载用户的收货信息</p>
        <div style="text-align: right; margin: 0">
          <el-button size="mini" type="text" @click="visibleExcel = false">取消</el-button>
          <el-button type="primary" size="mini" @click="visibleExcel = false"><a :href="this.excelPath"
                                                                                 style="list-style: none">确定</a>
          </el-button>
        </div>
        <el-button slot="reference" type="warning" class="excel" @click="downLoadImportResult">导出出库信息</el-button>
      </el-popover>

    </div>
    <el-table :data="tableData" style="width: 100%" border stripe>
      <el-table-column align="center" prop="orderNo" label="订单编号"></el-table-column>
      <el-table-column align="center" prop="createTime" label="财务通过时间"></el-table-column>
      <el-table-column align="center" label="订单属性">
        <template slot-scope="scope">
          <span>{{ fn(scope.row.orderProperty) }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="linkman" label="收货人姓名"></el-table-column>
      <el-table-column align="center" prop="agentName" label="代理商名称"></el-table-column>
      <el-table-column align="center" prop="agentAddress" label="代理商区域">
      </el-table-column>

      <el-table-column align="center" prop="withdrawMoney" label="状态">
        <template slot-scope="scope">
          <span size="small" style="color:red" v-if="scope.row.status==0">未出库</span>
          <span size="small" style="color:#999" v-if="scope.row.status==1">已出库</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="operatingTime" label="操作时间"></el-table-column>

      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            v-if="scope.row.status==0"
            @click="handleClickd(scope.row)"
          >未出库
          </el-button>
          <el-button
            type="text"
            size="small"
            style="font-size:12px;color: #f56c6c"
            v-if="scope.row.status==1"
            @click="handleClickd(scope.row)"
          >已出库
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :current-page="pageIndex"
      :page-size="pageSize"
      :page-sizes="[10, 20, 50, 100]"
      :total="totalPage"
      @current-change="currentChangeHandle"
      @size-change="sizeChangeHandle"
      layout="total, sizes, prev, pager, next, jumper"
    ></el-pagination>
    <!-- 出库页面 -->
    <el-dialog
      title="出库管理"
      :visible.sync="dialogVisiblea"
      width="761px"
      :center="true"
      custom-class="dislogmian_a"
    >
      <ul class="main_out_uu">
        <li>
          订单ID：
          <span>{{ycylOutbound.orderNo}}</span>
        </li>
        <li>
          订单属性：
          <span>{{fn(ycylOutbound.orderProperty)}}</span>
        </li>
        <li>
          下单时间：
          <span>{{ycylOutbound.payTime}}</span>
        </li>
        <li>
          订单状态：
          <span>{{ycylOutbound.STATUS=='0'?'未处理':'已处理'}}</span>
        </li>
      </ul>
      <el-table
        :data="ycylOutbound.outboundDetails"
        style="width: 100%"
        border
        :show-header="false"
      >
        <el-table-column align="left">
          <template slot-scope="scope">
            <span style="text-align: left">产品{{scope.$index+1}}： {{ scope.row.productName }}</span>
          </template>
        </el-table-column>

        <el-table-column align="left">
          <template slot-scope="scope">
            <span>规格:</span>
            <span>{{scope.row.modelName}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center">
          <template slot-scope="scope">
            <span>数量： {{scope.row.count}}</span>
          </template>
        </el-table-column>
      </el-table>
      <div class="main_content">
        <div class="title clearfix">
          <span>收&nbsp;&nbsp;货&nbsp;&nbsp;人：</span>
          <p>{{ycylOutbound.linkman}}</p>
        </div>
        <div class="title clearfix">
          <span>联系电话：</span>
          <p>{{ycylOutbound.mobile}}</p>
        </div>
        <div class="title clearfix">
          <span>收货地址：</span>
          <p>{{ycylOutbound.address}}</p>
        </div>
        <div class="title clearfix">
          <span>备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注：</span>
          <p>{{ycylOutbound.remark}}</p>
        </div>
        <div class="title clearfix">
          <span>区域代理：</span>
          <p>{{ycylOutbound.agentAdress}}</p>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="outbound">生成出库单</el-button>
        <el-button @click="express">{{outputtixt}}</el-button>
        <!-- <el-button @click="out">完成出库</el-button> -->
      </span>

    </el-dialog>
    <!-- 出库单明细 -->
    <el-dialog
      title
      :visible.sync="dialogVisibleb"
      width="768px"
      :center="true"
      custom-class="dislogmian_b dislogmian_a"
    >
      <form id="form2" style="width:672px">
        <p style="text-align: center;font-size:18px;margin-bottom:1rem">出库单明细</p>
        <ul class="main_out_uu_b clearfix">
          <div style="
        ">
            <li style="  display: inline-block;width:300px">
              订 &nbsp;单 &nbsp;号：
              <span>{{ycylOutbound.orderNo}}</span>
            </li>
            <li style="display: inline-block;width:300px">
              药品数目：
              <span>{{typeLength}}</span>种
            </li>
          </div>
          <div style="
        ">
            <li style="  display: inline-block;width:300px">
              下单时间：
              <span>{{ycylOutbound.createTime}}</span>
            </li>
            <li style="display: inline-block;width:300px">
              收&nbsp; 货&nbsp; 人：
              <span>{{ycylOutbound.linkman}}</span>
            </li>
          </div>
          <div>
            <li style="  display: inline-block;width:300px">
              订单属性：
              <span>{{fn(ycylOutbound.orderProperty)}}</span>
            </li>
            <li style="  display: inline-block;width:300px">
              联系电话：
              <span>{{ycylOutbound.mobile}}</span>
            </li>
          </div>
          <div style=" ">
            <li style="  display: inline-block;width:300px">
              区域代理：
              <span>{{ycylOutbound.agentAdress}}</span>
            </li>
          </div>
          <div style=" ">
            <li style="  display: inline-block;width:600px">
              收货地址：
              <span>{{ycylOutbound.address}}</span>
            </li>
          </div>
        </ul>
        <table
          border="1"
          style=" border-collapse: collapse;
     border: none;border:solid 1px #888;width:100%;margin-left:2.3em"
        >
          <tr>
            <td style="border:solid 1px #888; width:10%;  text-align: center;">序号</td>
            <td style="border:solid 1px #888; width:30%; text-align: center;">产品名</td>
            <td style="border:solid 1px #888; width:30%; text-align: center;">规格名称</td>
            <td style="border:solid 1px #888; width:10%; text-align: center;">数量</td>
            <td style="border:solid 1px #888; width:20%; text-align: center;">库位</td>
          </tr>
          <tr v-for="(item,index) in ycylOutbound.outboundDetails" :key="index">
            <td style="border:solid 1px #888; width:10%;  text-align: center;">{{index}}</td>
            <td style="border:solid 1px #888; width:30%; text-align: center;">{{item.productName}}</td>
            <td style="border:solid 1px #888; width:30%; text-align: center;">{{item.modelName}}</td>
            <td style="border:solid 1px #888; width:20%; text-align: center;">{{item.count}}</td>
            <td style="border:solid 1px #888; width:10%; text-align: center;">{{item.place}}</td>
          </tr>
        </table>
        <p style="padding-top:8px;margin-left:2.3em">用户备注：{{ycylOutbound.remark}}</p>
        <div class="clearfix" style="padding-top:10px;width:672px">
          <p style="float:right;">
            经办人：
            <span style="display:inline-block;border-bottom:2px solid #666;width:140px;"></span>
          </p>
        </div>
      </form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="A4daYin">打印明细</el-button>
        <el-button @click="back">返回</el-button>
      </span>
    </el-dialog>
    <!-- 电子面单信息 -->
    <el-dialog
      title="输入快递信息"
      :visible.sync="centerDialogVisibleInput"
      width="30%"
      center>
      <div class="select" v-for="(item,index) in  parcel" :key="index">
        <p style="font-size: 15px">包裹{{index+1}} </p>
        <section style="display: flex">
          <div>
            <div class="first">
              <span>请选择快递公司：</span>
              <el-select v-model="item.trackingCompany" placeholder="请选择" class="selectBox">
                <el-option
                  v-for="item in options"
                  :key="item.dataId"
                  :label="item.remark"
                  :value="item.remark"
                ></el-option>
              </el-select>
            </div>
            <div class="second" style="margin-top: 10px">
              <span>请输入快递单号：</span>
              <el-input type="text" style="width: 250px" v-model="item.trackingNum"/>
            </div>
          </div>
          <div class="removeBoxNum">
            <span @click="removeOdd(index)"><span class="iconfont icon-jianshao removeBox"></span>移除快递</span>
          </div>
        </section>
      </div>
      <div class="iconfontBox">
        <p>
          <span class="iconfont icon-tianjia " @click="addParcel()"></span>
          <span @click="addParcel()">添加快递信息</span>
        </p>
      </div>
      <span slot="footer" class="dialog-footer">
    <el-button @click="quxiaoBtn()">取 消</el-button>
    <el-button type="primary" @click="outWarehouse()" v-if="!isSky">确定</el-button>
    <el-button type="primary" @click="amend()" v-if="isSky">保存修改</el-button>
  </span>
    </el-dialog>
  </div>
</template>
<script>
  // import JsBarcode from 'jsbarcode'
  // import jsbarcode  from "./../../../../static/jsbarcode3.8.0JsBarcode.all.min"
  import paganation from '@/components/paganation'
  import {getLodop} from './../../../../src/LodopFuncs'

  export default {
    data () {
      return {
        isSky: '',
        outputtixt: '',//物流信息汉字
        dataList: [],
        pageIndex: 1,
        // pageSize: 10,
        totalPage: 0,
        parcel: [{trackingCompany: '', trackingNum: ''}],
        orderIdChuKu: '',
        IdChuKu: '',
        centerDialogVisibleInput: false,
        excelPath: '',
        visibleExcel: false,//打印表格
        // lujing:'',
        kuaidiList: '',
        miandan: false,
        trackingCompany: '', //快递公司
        trackingNum: '', //单号
        typeLength: '', //判断药品长度
        orderId: '', //订单id
        tableData: [], //后台返回表格中数据
        page: 1,
        pageSize: 10,
        pages: {},
        dialogVisiblea: false,
        dialogVisibleb: false, //出库单明细
        output: '',
        orderProperty: '',
        orderPropertyChuKu: '',
        enterpriseList: [
          //属性
          {name: '全部', id: ''},
          {name: '自购单', id: '1'},
          {name: '购物单', id: '2'},
          {name: '进货单', id: '3'},
          {name: '视频单', id: '4'}
        ],
        options: [], //后台返回的物流公司
        value: '', //选中的快递公司
        ycylOutbound: {}, //出库订单
        searchData: {},
        outputArr: [
          {name: '全部', id: ''},
          {name: '未出库', id: '0'},
          {name: '已出库', id: '1'}
        ]
      }
    },
    created () {
      console.clear()

      // 不要在create时调用jsbarcode库，此时相关DOM还未加载。
    },
    components: {
      paganation
    },
    mounted () {

      // JsBarcode("#barcode", "",{
      //
      //   format: "CODE128",//选择要使用的条形码类型
      //
      //   text: '条形码的数据',
      //
      //   displayValue: true,//是否在条形码下方显示文字
      //
      //   textPosition: "bottom"//设置文本的垂直位置
      //
      // })
    },
    computed: {},
    watch: {},
    beforeMount () {
      this.getList()
      this.getWulLiu()
    },

    methods: {
      amend () {
        //  修改物流信息
        var trackingNu
        var trackingCom
        this.parcel.forEach(e => {
          if (trackingCom) {
            trackingCom = `${trackingCom},${e.trackingCompany}`
          } else {
            trackingCom = `${e.trackingCompany}`
          }
          if (trackingNu) {
            trackingNu = `${trackingNu},${e.trackingNum}`
          } else {
            trackingNu = `${e.trackingNum}`
          }
        })
        this.$http({
          url: this.$http.adornUrl('/ycyl/ycyloutbound/update'),
          method: 'post',
          data: {
            id: this.IdChuKu,
            orderId: this.orderId,
            trackingNum: trackingNu, //快递号
            trackingCompany: trackingCom //快递公司
          }
        }).then(({
          data
        }) => {
          if (data && data.code == 0) {
            this.centerDialogVisibleInput = false
            this.searchGoods()
            this.parcel = [{trackingCompany: '', trackingNum: ''}]
            this.$message.success('修改成功')
            this.returnBtn()
          } else {
            this.$message.error(data.msg)
          }
        })
      },
      removeOdd (index) {
        this.parcel.splice(index, 1)
      },
      currentChangeHandle (val) {//页数
        this.pageIndex = val
        // this.getDataList();
        this.searchGoods(this.pageIndex)

      },
      sizeChangeHandle (val) {//每页数量
        this.pageSize = val
        this.pageIndex = 1
        // this.getDataList();
        this.searchGoods()
      },
      addParcel () {//添加新的快递
        var addPar = false
        this.parcel.forEach(e => {
          if (e.trackingCompany && e.trackingNum) {
            addPar = true
          } else {
            addPar = false
          }
        })
        if (addPar) {
          var arr = {trackingCompany: '', trackingNum: ''}
          this.parcel.push(arr)
        } else {
          this.$message.error('错误提醒：请您将快递信息完善后添加新的快递信息')
        }
      },
      outWarehouse () {
        var trackingCom
        var trackingNu
        if (this.parcel[0].trackingCompany && this.parcel[0].trackingNum) {
        } else {
          this.$message({message: '请您填写物流信息'})
          return
        }
        this.parcel.forEach(e => {
          if (trackingCom) {
            trackingCom = `${trackingCom},${e.trackingCompany}`
          } else {
            trackingCom = `${e.trackingCompany}`
          }
          if (trackingNu) {
            trackingNu = `${trackingNu},${e.trackingNum}`
          } else {
            trackingNu = `${e.trackingNum}`
          }
        })
        this.$http({
          url: this.$http.adornUrl('/ycyl/ycyloutbound/outbound'),
          method: 'post',
          data: {
            id: this.IdChuKu,
            status: 1,
            orderProperty: this.orderPropertyChuKu,
            orderId: this.orderIdChuKu,
            trackingNum: trackingNu, //快递号
            trackingCompany: trackingCom //快递公司
          }
        }).then(({
          data
        }) => {
          if (data && data.code == 0) {
            this.centerDialogVisibleInput = false
            this.searchGoods()
            this.parcel = [{trackingCompany: '', trackingNum: ''}]
            this.$message.success('出库成功')
            this.returnBtn()
          } else {
            this.$message.error(data.msg)
          }
        })
      },
      returnBtn () {
        this.$router.push({
          path: '/ycyl-ycylmianoutput',
          query: {
            lujing: 'tiaozhuan'
          }
        })
        // /ycyl-ycylmianoutput
      },
      getWulLiu () {
        this.$http({
          url: this.$http.adornUrl('/ycyl/ycyldictdata/list'),
          method: 'post',
          data: {
            dictValue: 'delivery'
          }
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.options = data.page.list
          }
        })
      },
      quxiaoBtn () {
        this.centerDialogVisibleInput = false
        this.dialogVisiblea = true
      },
      /* confirmExcel(){//确认下载
         this.visibleExcel= false
       },*/
      downLoadImportResult () {//导出信息
        this.$http({
          url: this.$http.adornUrl('/ycyl/ycyloutbound/getNotOutbound'),
          method: 'post',
          data: this.searchData
        }).then(({data}) => {
          this.excelPath = data.path
        })
      },
      //打印
      A4daYin () {
        let LODOP = getLodop()
        LODOP.PRINT_INIT('订货单')
        LODOP.SET_PRINT_STYLE('FontSize', 16)
        LODOP.ADD_PRINT_TEXT(50, 231, 260, 39, '')
        LODOP.ADD_PRINT_HTM(
          20,
          10,
          350,
          600,
          document.getElementById('form2').innerHTML
        )
        LODOP.PREVIEW()
      },
      //检索
      searchGoods (pageIndex = 1) {
        this.searchData.status = this.output
        this.searchData.orderProperty = this.orderProperty
        this.searchData.page = pageIndex
        this.searchData.pageSize = this.pageSize
        this.$http({
          url: this.$http.adornUrl('/ycyl/ycyloutbound/getPageList'),
          method: 'post',
          data: this.searchData
        }).then(({data}) => {
          if (data && data.code == 0) {
            this.tableData = data.page.list
            this.pages = data.page
            this.totalPage = data.page.totalCount
          } else {
            this.$message.error(data.msg)
          }
        })
      },
      //完成出库
      // out() {
      //   if (!this.trackingCompany == "") {
      //     if (!this.trackingNum == "") {
      //       this.$http({
      //         url: this.$http.adornUrl("/ycyl/ycyloutbound/outbound"),
      //         method: "post",
      //         data: {
      //           id: this.ycylOutbound.id,
      //           status: 1,
      //           orderProperty: this.ycylOutbound.orderProperty,
      //           orderId: this.orderId,
      //           trackingNum: this.trackingNum,
      //           trackingCompany: this.trackingCompany
      //         }
      //       }).then(({ data }) => {
      //         if (data && data.code == 0) {
      //           (this.trackingCompany = ""),
      //             (this.trackingNum = ""),
      //             (this.dialogVisiblea = false);
      //           this.$message.success("出库成功");
      //           this.getList();
      //         } else {
      //           this.$message.error(data.msg);
      //         }
      //       });
      //     } else {
      //       this.$alert("请检查是否输入快递单号", "提示", {
      //         confirmButtonText: "确定"
      //       });
      //     }
      //   } else {
      //     this.$alert("请检查是否输入快递公司", "提示", {
      //       confirmButtonText: "确定"
      //     });
      //   }
      // },
      back () {
        this.dialogVisibleb = false
        this.dialogVisiblea = true
      },
      express () {
        this.centerDialogVisibleInput = true
        this.dialogVisiblea = false
        // this.dialogVisiblea = false
        // this.miandan = true
        // this.$http({
        //   url: this.$http.adornUrl('/ycyl/ycyloutbound/printOrder'),
        //   method: 'post',
        //   data: {
        //     orderNo: this.ycylOutbound.orderNo,
        //     addressId: this.ycylOutbound.addressId,
        //     sendName: '万先生',
        //     sendPhone: '18137182965',
        //     sendProv: '河南省',
        //     sendCity: '郑州市',
        //     sendArea: '金水区',
        //     sendAddress: '，',
        //     itemName: '其他',
        //     remark: this.ycylOutbound.remark,
        //   }
        // }).then(({data}) => {
        //   if (data && data.code == 0) {
        //     this.$router.push({
        //       path: '/miandan',
        //       query: {ycylOutbound: data.Response, dataList: this.ycylOutbound}
        //     })
        //   } else {
        //     this.$message.error(data.msg)
        //   }
        // })
      },
      outbound () {
        this.dialogVisiblea = false
        this.dialogVisibleb = true
      },
      handleClickd (data) {
        this.isSky = ''
        this.outputtixt = '填写物流信息'
        // if (data.status == 1) {
        //   return this.$message('该商品已出库')
        // }
        this.dialogVisiblea = true
        this.$http({
          url: this.$http.adornUrl('/ycyl/ycyloutbound/infoById'),
          method: 'post',
          data: {
            id: data.id
          }
        }).then(({data}) => {
          if (data && data.code == 0) {
            var ishave = true
            var obj = []
            this.ycylOutbound = data.ycylOutbound[0]
            if (data.ycylOutbound[0].trackingNum) {
              this.isSky = '1'
              this.outputtixt = '修改物流信息'
              ishave = true
            } else {
              ishave = false
            }
            if (data.ycylOutbound[0].trackingNum && data.ycylOutbound[0].trackingNum.indexOf(',') == -1) {
              var aa = {}
              aa.trackingCompany = data.ycylOutbound[0].trackingCompany
              aa.trackingNum = data.ycylOutbound[0].trackingNum
              obj.push(aa)
            } else {
              if (ishave) {
                var objA = data.ycylOutbound[0].trackingCompany.split(',')
                var objB = data.ycylOutbound[0].trackingNum.split(',')
                objA.map((e, i) => {
                  obj.push({trackingCompany: e, trackingNum: objB[i]})
                })
              }

            }
            if (ishave) {
              this.parcel = obj
            } else {

            }
            this.typeLength = this.ycylOutbound.outboundDetails.length
            this.orderId = this.ycylOutbound.orderId
            this.orderPropertyChuKu = data.ycylOutbound[0].orderProperty
            this.IdChuKu = data.ycylOutbound[0].id
            this.orderIdChuKu = data.ycylOutbound[0].orderId
          } else {
            this.$message.error(data.msg)
          }
        })

        //获取物流公司
        // this.$http({
        //   url: this.$http.adornUrl("/ycyl/ycyldictdata/list"),
        //   method: "post",
        //   data: {
        //     dictValue: "delivery"
        //   }
        // }).then(({ data }) => {
        //   if (data && data.code === 0) {
        //     this.options = data.page.list;
        //   }
        // });
      },
      handleClickdd (data) {
        this.dialogVisiblea = true
      },
      sureb (data) {
        this.$http({
          url: this.$http.adornUrl('/ycyl/ycyloutbound/getPageList'),
          method: 'post',
          data
        }).then(({data}) => {
          if (data && data.code == 0) {
            this.tableData = data.page.list
            this.pages = data.page
          } else {
            this.$message.error(data.msg)
          }
        })
      },
      //获取数据
      getList () {
        this.$http({
          url: this.$http.adornUrl('/ycyl/ycyloutbound/getPageList'),
          method: 'post',
          data: {
            page: this.page,
            pageSize: this.pageSize,
            status: 0
          }
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.tableData = data.page.list
            this.pages = data.page
            this.totalPage = data.page.totalCount
          } else {
            this.$message.error(data.msg)
          }
        })
      },
      fn (w) {
        switch (w) {
          case '1':
            return '自购单'
            break
          case '2':
            return '购物单'
            break
          case '3':
            return '进货单'
            break
          case '4':
            return '视频单'
            break
        }
      },
      // fb (w) {
      //   switch (w) {
      //     case 1:
      //       return '产品一：'
      //       break
      //     case 2:
      //       return '产品二：'
      //       break
      //     case 3:
      //       return '产品三：'
      //       break
      //     case 4:
      //       return '产品四：'
      //       break
      //     case 5:
      //       return '产品五：'
      //       break
      //     case 6:
      //       return '产品六：'
      //       break
      //     case 7:
      //       return '产品七：'
      //       break
      //     case 8:
      //       return '产品八：'
      //       break
      //     case 9:
      //       return '产品九：'
      //       break
      //     case 10:
      //       return '产品十：'
      //       break
      //     case 11:
      //       return '产品十一：'
      //       break
      //     case 12:
      //       return '产品十二：'
      //       break
      //     case 13:
      //       return '产品十三：'
      //       break
      //     case 14:
      //       return '产品十四：'
      //       break
      //     case 15:
      //       return '产品十五：'
      //       break
      //     case 16:
      //       return '产品十六：'
      //       break
      //     case 17:
      //       return '产品十七：'
      //       break
      //   }
      // }
    }
  }
</script>
<style lang="scss">
  .mainoutput {
    .el-date-editor.el-input,
    .el-date-editor.el-input__inner {
      width: 200px;
    }

    .el-input__inner {
      border-color: rgba(221, 221, 221, 1);
    }

    .el-table {
      margin-top: 20px;
    }

    .mainoutput_header {
      line-height: 46px;

      .mian_out {
        background: rgba(69, 200, 220, 1);
        padding: 6px 20px;
        margin-left: 30px;
      }
    }

    .el-dialog__close {
      height: 0;
    }

    .el-dialog__header {
      text-align: center;
    }

    .dislogmian_a {
      border-radius: 10px;

      .el-dialog__body {
        padding-left: 70px;
      }

      .el-button--primary {
        /*background: #45c8dc;*/
      }

      .el-button--medium {
        padding: 8px 30px;
      }

      .el-dialog__body {
        // border-top:;
        margin: 0 48px;
        border-color: #ddd;
        padding: 10px 0;
      }

      .el-dialog__footer {
        padding: 10px 47px 20px;
      }

      .dialog-footer {
        display: flex;
        justify-content: space-between;
      }
    }

    .dislogmian_b {
      .main_out_uu_b {
        li {
          float: left;
          width: 50%;
        }

        .te {
          overflow: hidden;

          span:first-of-type {
            float: left;
          }

          span:last-of-type {
            float: left;
            max-width: 266px;
          }
        }
      }

      .dialog-footer {
        display: flex;
        justify-content: space-around;
      }
    }
  }
</style>
<style lang="scss" scoped>
  .mainoutput {
    .main_out_uu {
      overflow: hidden;

      li:nth-of-type(2n) {
        float: left;

        width: 50%;
      }

      li:nth-of-type(2n-1) {
        float: left;
        width: 50%;
      }
    }

    .main_content {
      margin-top: 15px;
      color: #333;
      border: 1px solid #eee;
      padding: 18px;

      .title {
        height: 27px;

        span {
          float: left;
          min-width: 70px;
        }

        > p {
          float: left;
          word-break: break-all;
          max-width: 581px;
        }
      }
    }

    // .select {
    //   border: 1px solid #eee;
    //   padding: 18px;

    //   .first {
    //     height: 42px;
    //   }

    //   .second {
    //     > input {
    //       width: 190px;
    //       height: 32px;
    //       border: 1px solid rgba(221, 221, 221, 1);
    //       border-radius: 6px;
    //       padding-left: 5px;
    //     }
    //   }
    // }
  }

  .excel {
    margin-left: 200px;
    padding: 8px 20px;

  }
</style>
<style lang="scss" scoped>
  // 头部样式
  .mainoutput {
    select,
    input,
    button {
      outline: none;
    }

    i {
      font-style: normal;
      width: 30px;
      height: 2px;
      background: rgba(153, 153, 153, 1);
    }

    .line {
      position: relative;
      display: inline-block;
      width: 30px;

      i {
        position: absolute;
        top: -7px;
        left: 0;
      }
    }

    select {
      border: 1px solid rgba(221, 221, 221, 1);
      border-radius: 6px;
      color: #666;
    }

    .first {
      display: inline-block;

      span {
        color: #333;
      }

      .search {
        width: 206px;
        height: 30px;
        border: 1px solid rgba(221, 221, 221, 1);
        border-radius: 6px;
        padding-left: 10px;
        margin-right: 18px;
      }

      .first_select {
        width: 108px;
        height: 30px;
        margin-right: 18px;
      }

      .second_select {
        width: 65px;
        height: 30px;
        margin-right: 18px;
      }

      .three_select {
        width: 94px;
        height: 30px;
      }

      input {
        width: 66px;
        height: 30px;
        border: 2px solid rgba(221, 221, 221, 1);
        border-radius: 6px;
        padding-left: 5px;
      }
    }
  }

  /*  快递单*/
  #form1 {
    width: 100mm;
    height: 180mm;
    border: 1px solid #d9d9d9;

    div {
      border-bottom: 1px solid #d9d9d9;
    }

    .title1 {
      height: 14mm;
    }

    .title2 {
      height: 15.5mm;
      /*border-bottom: 1px solid #d9d9d9;*/

      p {
        text-align: center;
        line-height: 15.5mm;
        font-size: 30pt;
        margin: 0;
      }
    }
  }

  .iconfontBox {

    margin-top: 20px !important;

    p {
      text-align: center;
      line-height: 20px;

      span {
        color: #26A3F3;
        line-height: 20px;
        display: inline-block;
        font-size: 15px;
      }

      span:hover {
        cursor: pointer;
      }
    }
  }

  .removeBoxNum {
    line-height: 70px;

    span {
      margin-left: 20px;
      font-size: 15px;
      color: #ff0000;
      cursor: pointer;
    }
  }
</style>

