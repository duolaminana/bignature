<template>
  <div class="app-container saleOrder">
    <div class="search-box">
      <el-form :label-width="isZh ? '100px' : '120px'" inline size="small">
        <div>
          <el-form-item :label="$t('logistics.logisticsTrace.customerUserName')">
            <el-input
              v-model.trim="postData.customerUserName"
              clearable
              :placeholder="$t('logistics.logisticsTrace.customerUserName')"
              style="width: 200px"
            />
          </el-form-item>
          <el-form-item :label="$t('logistics.logisticsTrace.orderNo')">
            <el-input
              v-model.trim="postData.orderNo"
              clearable
              :placeholder="$t('logistics.logisticsTrace.orderNo')"
              style="width: 200px"
            />
          </el-form-item>
          <el-form-item :label="$t('common.table.status')">
            <el-select v-model="postData.orderStatus" clearable :placeholder="$t('common.table.status')" style="width: 200px">
              <el-option :label="isZh?'全部':'All'" value=""></el-option>
              <el-option v-for="(item, index) in orderStatusList" :label="isZh?item.label:item.labelEn" :value="item.value" :key="index"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div>
          <el-form-item :label="$t('logistics.logisticsTrace.countryCode')" prop="countryCode">
            <el-select
              filterable
              remote
              :remote-method="getCountryList"
              :loading="loading1"
              v-model="postData.customerCountryCode"
              clearable
              :placeholder="$t('logistics.logisticsTrace.countryCodeExplain')"
              style="width: 200px"
            >
              <el-option
                v-for="(item, index) in countryList"
                :label="item.chEnName"
                :value="item.countryCode"
                :key="index"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('finance.financeService.start')">
            <el-date-picker
              v-model="postData.orderStartTime"
              :picker-options="pickerOptionsStart"
              type="datetime"
              style="width: 200px">
            </el-date-picker>
          </el-form-item>
          <el-form-item :label="$t('finance.financeService.end')">
            <el-date-picker
              v-model="postData.orderEndTime"
              :picker-options="pickerOptionsEnd"
              type="datetime"
              style="width: 200px">
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="export" @click="searchData">{{$t('common.search')}}</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
    <div class="topBtns">
      <!--<el-button type="primary" size="small" @click="deleteClick">删除</el-button>-->
      <el-button type="primary" size="small" class="export" @click="exportExcelFun()">{{$t('common.export')}}</el-button>
    </div>
    <el-table
      v-loading="listLoading"
      :data="dataList"
      element-loading-text="loading。。。"
      border
      fit
      size="mini"
      row-key="id"
      :header-cell-style="{background: '#a7bfee'}"
      @selection-change="getSelect"
    >
      <el-table-column align="center" type="selection" width="55"></el-table-column>
      <el-table-column :label="$t('logistics.logisticsTrace.orderNo')" prop="orderNo" show-overflow-tooltip />

      <el-table-column min-width="110" :label="$t('logistics.logisticsTrace.customerUserName')" prop="buyerName" show-overflow-tooltip />

      <el-table-column min-width="130" :label="$t('logistics.logisticsTrace.countryPhone')" show-overflow-tooltip>
        <template slot-scope="scope">{{scope.row.buyerCountryCode}}/{{scope.row.buyerTelephone}}</template>
      </el-table-column>

      <el-table-column align="center" width="80" :label="$t('logistics.logisticsTrace.prodcutSkuCount')" prop="prodcutSkuCount" />

      <el-table-column align="center" :label="$t('logistics.logisticsTrace.totalAmount')" prop="totalAmount" show-overflow-tooltip>
        <template slot-scope="scope">{{scope.row.totalAmount | moneyFmt}}</template>
      </el-table-column>

      <el-table-column align="center" width="100" :label="$t('logistics.logisticsTrace.createUserName')" prop="createUserName" show-overflow-tooltip/>

      <el-table-column align="center" width="150" :label="$t('logistics.logisticsTrace.rangeTime')" prop="createTime">
        <template slot-scope="scope">{{scope.row.createTime | timeFmt}}</template>
      </el-table-column>

      <el-table-column align="center" :width="isZh?'100px':'120px'" :label="$t('logistics.logisticsTrace.statusStr')" prop="statusStr">
        <template slot-scope="scope">
          {{scope.row.orderStatus | statusFmt(orderStatusList, isZh)}}
        </template>
      </el-table-column>

      <el-table-column header-align="center" :label="$t('common.table.actions')" :width="isZh?'180px': '200px'" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" class="export table-btn-width" @click="goRouter(0, scope.row.bid)">{{$t('common.table.view')}}</el-button>
          <el-button type="primary" size="mini" v-if="scope.row.orderStatus > 11" @click="openDialog(scope.row.bid)">
            {{$t('common.table.maintenance')}}
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <Pagination :total="postData.total" :page.sync="postData.pageIndex" :limit.sync="postData.pageSize" @pagination="getDataList"></Pagination>

    <el-dialog :visible.sync="dialogVisible" :title="$t('logistics.logisticsTrace.orderMaintenance')" width="1100px" center :close-on-click-modal="false">
      <el-form ref="detailForm" :model="detailForm" label-width="120px" size="small">
        <el-row>
          <el-col :span="8">
            <el-form-item :label="$t('logistics.logisticsTrace.orderNo')">{{detailForm.orderNo}}</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="$t('logistics.logisticsTrace.rangeTime')">{{detailForm.createTime | timeFmt}}</el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-item" justify="space-around">
          <el-col :span="11">
            <table class="form-table" border="0" cellspacing="0" cellpadding="0" width="100%">
              <tr>
                <td width="40%">{{$t('logistics.logisticsTrace.buyer')}}</td>
                <td width="60%">
                  {{detailForm.buyerName}}
                </td>
              </tr>
              <tr>
                <td>{{$t('logistics.logisticsTrace.buyerContactBy')}}</td>
                <td>
                  {{detailForm.buyerContactBy}}
                </td>
              </tr>
              <tr>
                <td>{{$t('logistics.logisticsTrace.buyerAddress')}}</td>
                <td>{{detailForm.buyerAddress}}</td>
              </tr>
              <tr>
                <td>{{$t('logistics.logisticsTrace.buyerTelephone')}}</td>
                <td>{{detailForm.buyerTelephone}}</td>
              </tr>
              <tr>
                <td>{{$t('logistics.logisticsTrace.buyerEmail')}}</td>
                <td>{{detailForm.buyerEmail}}</td>
              </tr>
              <tr>
                <td>
                  <span class="label-required">{{$t('logistics.logisticsTrace.buyerBank')}}</span>
                </td>
                <td>{{detailForm.buyerBank}}</td>
              </tr>
              <tr>
                <td>{{$t('logistics.logisticsTrace.buyerBankAccount')}}</td>
                <td>{{detailForm.buyerBankAccount}}</td>
              </tr>
              <tr>
                <td>{{$t('logistics.logisticsTrace.buyerSwiftcode')}}</td>
                <td>{{detailForm.buyerSwiftcode}}</td>
              </tr>
              <tr>
                <td>{{$t('logistics.logisticsTrace.arrivePort')}}</td>
                <td>{{detailForm.arrivePort}}</td>
              </tr>
            </table>
          </el-col>
          <el-col :span="11">
            <table class="form-table" border="0" cellspacing="0" cellpadding="0" width="100%">
              <tr>
                <td width="40%">{{$t('logistics.logisticsTrace.seller')}}</td>
                <td width="60%">
                  {{detailForm.sellerName}}
                </td>
              </tr>
              <tr>
                <td>{{$t('logistics.logisticsTrace.sellerContact')}}</td>
                <td>{{detailForm.sellerContact}}</td>
              </tr>
              <tr>
                <td>{{$t('logistics.logisticsTrace.sellerAddress')}}</td>
                <td>{{detailForm.sellerAddress}}</td>
              </tr>
              <tr>
                <td>{{$t('logistics.logisticsTrace.sellerTelephone')}}</td>
                <td>{{detailForm.sellerTelephone}}</td>
              </tr>
              <tr>
                <td>{{$t('logistics.logisticsTrace.sellerEmail')}}</td>
                <td>{{detailForm.sellerEmail}}</td>
              </tr>
              <tr>
                <td>
                  <span class="label-required">{{$t('logistics.logisticsTrace.sellerBank')}}</span>
                </td>
                <td>{{detailForm.sellerBank}}</td>
              </tr>
              <tr>
                <td>{{$t('logistics.logisticsTrace.sellerBankAccount')}}</td>
                <td>{{detailForm.sellerBankAccount}}</td>
              </tr>
              <tr>
                <td>{{$t('logistics.logisticsTrace.sellerSwifcode')}}</td>
                <td>{{detailForm.sellerSwifcode}}</td>
              </tr>
              <tr>
                <td>{{$t('logistics.logisticsTrace.departurePort')}}</td>
                <td>{{detailForm.departurePort}}</td>
              </tr>
            </table>
          </el-col>
        </el-row>
        <div class="step-node">{{$t('logistics.logisticsTrace.OrderNodeProgress')}}</div>
        <div style="margin: 20px 0; border-bottom: 1px solid #eee;">{{$t('logistics.logisticsTrace.logisticsProcess')}}
          <order-step :list="nodeList3" :can-click="true"></order-step>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="danger" size="small" @click="dialogVisible=false">{{$t('common.buttonText.close')}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from "@/components/Pagination";
import OrderStep from "@/components/OrderStep";
import { parseTime } from "@/utils/index";
import { selectCountryListApi, getSupplyCompanyList, selectgetDictionaryBykeyApi } from "@/api/system";
import {
  listCustomerInfoContactApi,
  listCustomerContact
} from "@/api/customer";
import { getLinkList } from "@/api/supplier";
import {
  getSaleOrderList,
  saleOrderDetail,
  allNodeSaleOrder,
  exportSalesOrderExcelApi
} from "@/api/order";
import moneyFmt from "@/mixin/moneyFmt";
export default {
  components: {
    Pagination,
    OrderStep
  },
  mixins: [moneyFmt],
  data() {
    return {
      list: null,
      listLoading: true,
      loading1: false,
      dialogVisible: false,
      rangeTime: [],
      selectList: [],
      orderStatusList: [],
      postData: {
        pageIndex: 1,
        pageSize: 10,
        total: 0,
        customerUserName: "",
        orderNo: "",
        orderStatus: '',
        customerCountryCode: "",
        orderEndTime: "",
        orderStartTime: ""
      },
      dataList: [],
      countryList: [],
      detailForm: {},
      pickerOptionsStart: {
        disabledDate: (time) => {
          if (this.postData.orderEndTime) {
            return time.getTime() > this.postData.orderEndTime
          }
        }
      },
      pickerOptionsEnd: {
        disabledDate: (time) => {
          if (this.postData.orderStartTime) {
            return time.getTime() < this.postData.orderStartTime
          }
        }
      },
      customerInfoList: [],
      sysCustomerInfoList: [],
      modalList: [],
      allNodeList: [],
      // nodeList1: [],
      // nodeList2: [],
      nodeList3: []
    };
  },
  created() {
    this.getOrderStatusList();
    this.getDataList();
    this.getCustomerInfoListFun();
    this.getSysCustomerInfoListFun();
  },
  methods: {
    goRouter(type, id) {
      let path =
        type === 1 ? "/order/sale/editOrder" : "/order/sale/saleOrderDetail";
      this.$router.push({
        path: path,
        query: {
          id: id,
          type: type
        }
      });
    },
    // 查询获取国家
    getCountryList(query) {
      if (query !== "") {
        this.loading1 = true;
        setTimeout(() => {
          this.loading1 = false;
          selectCountryListApi(query).then(res => {
            this.countryList = res.data || [];
          });
        }, 200);
      } else {
        this.countryList = [];
      }
    },
    getOrderStatusList() {
      selectgetDictionaryBykeyApi({ key: 'order status' }).then(res => {
        this.orderStatusList = res.data || [];
      }).catch(err => {
        this.$message.error(err.message)
      });
    },
    // 客户人列表
    getCustomerInfoListFun() {
      listCustomerInfoContactApi()
        .then(res => {
          this.customerInfoList = res.data || [];
        })
        .catch(err => {
          this.$message.error(err.message);
        });
    },
    // 客户下的联系人列表
    customerContactFun(val, type) {
      let api = type ? listCustomerContact : getLinkList;
      let obj = type ? { customerBId: val } : { supplierBId: val };
      api(obj).then(res => {
        this.modalList = type ? res.data.list : res.data;
      }).catch(err => {
        this.$message.error(err.message);
      });
    },
    // 主体企业列表
    getSysCustomerInfoListFun() {
      getSupplyCompanyList()
        .then(res => {
          this.sysCustomerInfoList = res.data || [];
        })
        .catch(err => {
          this.$message.error(err.message);
        });
    },
    openDialog(id) {
      this.getSaleOrderDetail(id);
      this.getAllNodeSaleOrder(id);
    },
    getSaleOrderDetail(id) {
      saleOrderDetail({ orderBid: id })
        .then(res => {
          this.detailForm = Object.assign(this.detailForm, res.data);
          this.dialogVisible = true;
          this.customerContactFun(this.detailForm.customerBId || this.detailForm.supplierBId, this.detailForm.salesOrderType);
        })
        .catch(err => {
          this.$message.error(err.message);
        });
    },
    getAllNodeSaleOrder(id) {
      allNodeSaleOrder({ orderBid: id }).then(res => {
        let allNodeList = res.data.workflowProcessList.map((e, index) => {
          e.currentCompletion = (e.currentCompletion || 0).toString();
          return { ...e };
        });
        // this.nodeList1 = allNodeList.filter(e => e.nodeType === 1);
        // this.nodeList2 = allNodeList.filter(e => e.nodeType === 2);
        this.nodeList3 = allNodeList.filter(e => e.nodeType === 3);
      }).catch(err => {
        this.$message.error(err.message);
      });
    },
    getSearchTime(date) {
      if (date && date.length) {
        this.postData.orderStartTime = date[0];
        this.postData.orderEndTime = date[1];
      } else {
        this.postData.orderStartTime = "";
        this.postData.orderEndTime = "";
      }
    },
    searchData() {
      this.postData.pageIndex = 1;
      this.getDataList();
    },
    getDataList() {
      let obj = {};
      for (let key in this.postData) {
        if (this.postData[key] !== "") {
          obj[key] = this.postData[key];
        }
      }
      obj.apiType = 2;
      getSaleOrderList(obj)
        .then(res => {
          this.dataList = res.data.list;
          this.postData.total = res.data.total;
          this.listLoading = false;
        })
        .catch(err => {
          this.listLoading = false;
          this.$message.error(err.message);
        });
    },
    // 勾选触发 selects为选择的数据数组
    getSelect(selects) {
      this.selectList = selects;
    },
    // 导出操作
    exportExcelFun() {
      let obj = {
        pageIndex: '',
        pageSize: '',
        customerUserName: this.postData.customerUserName,
        orderNo: this.postData.orderNo,
        customerCountryCode: this.postData.customerCountryCode,
        orderEndTime: this.postData.orderEndTime,
        orderStartTime: this.postData.orderStartTime
      };
      exportSalesOrderExcelApi(obj).then(res => {
        const link = document.createElement('a');
        let blob = new Blob([res.data], { type: 'application/vnd.ms-excel' });
        link.style.display = 'none';
        link.href = URL.createObjectURL(blob);
        link.setAttribute('download', 'SalesOrder.xls');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link)
      }).catch(err => {
        this.$message.error(err.message)
      });
    }
  },
  filters: {
    timeFmt(val) {
      if (val) {
        return parseTime(val);
      }
    },
    statusFmt(val, arr, isZh) {
      let objArr = arr.filter(e => Number(e.value) === val);
      if (objArr.length) {
        return isZh ? objArr[0].label : objArr[0].labelEn
      } else {
        return val
      }
    }
  }
};
</script>

<style lang="scss">
@import "~@/styles/variables.scss";
.saleOrder {
  .search-box {
    margin-bottom: 15px;
    border-bottom: 1px solid $border-light-color;
  }
  .topBtns {
    margin-bottom: 10px;
    text-align: right;
    button {
      margin: 0 10px;
    }
  }
  .row-item {
    margin-bottom: 20px;
  }
  .step-node {
    position: relative;
    font-weight: bold;
    font-size: 15px;
    line-height: 40px;
    padding: 5px 5px 5px 20px;
    border-bottom: 1px solid $border-light-color;
  }
}
</style>
