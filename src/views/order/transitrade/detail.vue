<template>
  <div class="app-container editOrder">
    <div class="edit-title">{{$t('order.sale.transferOrder')}}</div>
    <el-form ref="editForm" :model="editForm" :label-width="isZh?'100px': '150px'" size="small" class="edit-form" label-position="left">
      <el-row>
        <el-col :span="8">
          <el-form-item :label="$t('order.sale.orderNo')">
            {{editForm.orderNo}}
          </el-form-item>
        </el-col>
        <el-col :span="8" v-if="editForm.quotedNo">
          <el-form-item :label="$t('order.sale.quotedOrderNo')">
            {{editForm.quotedNo}}
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="$t('order.sale.orderDate')">
            {{(editForm.createTime || new Date()) | timeFmt}}
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item :label="$t('order.sale.clientNo')">
            <el-input v-model="editForm.clientPoNo" readonly style="width: 200px" />
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item :label="$t('order.sale.clientDate')">
            <el-date-picker v-model="editForm.clientPoDate" type="datetime" disabled style="width: 200px"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" class="row-item" justify="space-around">
        <el-col :span="11">
          <table class="form-table" border="0" cellspacing="0" cellpadding="0" width="100%;" style="text-align: left">
            <tr>
              <td width="40%" style="min-width: 100px">{{$t('order.sale.buyer')}}</td>
              <td width="60%">
                <!--<el-select v-model="editForm.customerBId" disabled placeholder="请选择公司名称" size="mini" class="edit-form-width input-center">-->
                  <!--<el-option v-for="(item, index) in customerInfoList" :label="item.companyName" :value="item.bid" :key="index"></el-option>-->
                <!--</el-select>-->
                {{editForm.buyerName}}
              </td>
            </tr>
            <tr>
              <td>{{$t('order.sale.contact')}}</td>
              <td>
                {{editForm.buyerContactBy}}
              </td>
            </tr>
            <tr>
              <td>{{$t('order.sale.address')}}</td><td>{{editForm.buyerAddress}}</td>
            </tr>
            <tr>
              <td>{{$t('order.sale.contactPhone')}}</td><td>{{editForm.buyerTelephone}}</td>
            </tr>
            <tr>
              <td>{{$t('order.sale.email')}}</td><td>{{editForm.buyerEmail}}</td>
            </tr>
            <tr>
              <td><span class="label-required">{{$t('order.sale.bank')}}</span></td>
              <td>
                {{editForm.buyerBank}}
              </td>
            </tr>
            <tr>
              <td>{{$t('order.sale.bankAccount')}}</td><td>{{editForm.buyerBankAccount}}</td>
            </tr>
            <tr>
              <td>{{$t('order.sale.swiftCode')}}</td><td>{{editForm.buyerSwiftcode}}</td>
            </tr>
          </table>
        </el-col>
        <el-col :span="11">
          <table class="form-table" border="0" cellspacing="0" cellpadding="0" width="100%" style="text-align: left">
            <tr>
              <td width="40%" style="min-width: 100px">{{$t('order.sale.seller')}}</td>
              <td width="60%">
                {{editForm.sellerName}}
              </td>
            </tr>
            <tr>
              <td>{{$t('order.sale.contact')}}</td><td>{{editForm.sellerContact}}</td>
            </tr>
            <tr>
              <td>{{$t('order.sale.address')}}</td><td>{{editForm.sellerAddress}}</td>
            </tr>
            <tr>
              <td>{{$t('order.sale.contactPhone')}}</td><td>{{editForm.sellerTelephone}}</td>
            </tr>
            <tr>
              <td>{{$t('order.sale.email')}}</td><td>{{editForm.sellerEmail}}</td>
            </tr>
            <tr>
              <td><span class="label-required">{{$t('order.sale.bank')}}</span></td>
              <td>
                {{editForm.sellerBank}}
              </td>
            </tr>
            <tr>
              <td>{{$t('order.sale.bankAccount')}}</td><td>{{editForm.sellerBankAccount}}</td>
            </tr>
            <tr>
              <td>{{$t('order.sale.swiftCode')}}</td><td>{{editForm.sellerSwifcode}}</td>
            </tr>
          </table>
        </el-col>
      </el-row>
      <div class="table-top">
        <div class="top-title">{{$t('order.sale.products')}}</div>
      </div>
      <el-table
        :data="orderSkuList"
        border
        fit
        show-summary
        size="small"
        max-height="520"
        style="font-size: 12px"
        :header-cell-style="{background: '#a7bfee'}">

        <el-table-column align="center" type="index" :label="$t('common.table.id')" width="55"/>

        <el-table-column align="center" width="110" :label="$t('product.product.customsCode')" prop="customsCode">
          <template slot-scope="scope">
            {{scope.row.customsCode}}
          </template>
        </el-table-column>

        <el-table-column align="center" width="80" :label="$t('product.product.skuCode')" prop="skuCode">
          <template slot-scope="scope">
            {{scope.row.skuCode}}
          </template>
        </el-table-column>

        <el-table-column align="center" width="150" :label="$t('product.product.productName')" prop="productName" show-overflow-tooltip>
          <template slot-scope="scope">
            {{isZh ? scope.row.cnProductName : scope.row.enProductName}}
          </template>
        </el-table-column>

        <el-table-column align="center" width="180" :label="$t('order.sale.productDescription')" prop="productDescription" show-overflow-tooltip>
          <template slot-scope="scope">
            {{isZh ? scope.row.cnAttrValueList : scope.row.enAttrValueList}}
          </template>
        </el-table-column>

        <el-table-column align="center" width="130" :label="$t('order.sale.reference')" prop="clientProductRef">
          <template slot-scope="scope">
            {{isZh ? scope.row.cnSkuReference : scope.row.enSkuReference}}
          </template>
        </el-table-column>

        <el-table-column align="center" min-width="80" :label="$t('order.sale.quotedQuantity')">
          <template slot-scope="scope">
            {{scope.row.productQuantity}}
          </template>
        </el-table-column>

        <el-table-column align="center" width="80" :label="$t('order.sale.unit')" >
          <template slot-scope="scope">
            {{scope.row.productUnit}}
          </template>
        </el-table-column>

        <el-table-column align="center" min-width="80" :label="$t('order.sale.quotedPrice')">
          <template slot-scope="scope">
            {{scope.row.productPrice}}
          </template>
        </el-table-column>

        <el-table-column align="center" min-width="80" :label="$t('order.sale.amount')" prop="productAmount"/>

        <el-table-column align="center" min-width="160" :label="$t('common.table.remark')">
          <template slot-scope="scope">
            {{scope.row.productRemark}}
          </template>
        </el-table-column>
      </el-table>
      <el-form-item/>
      <el-row>
        <el-col :span="12">
          <el-form-item :label="$t('order.sale.freight')">
            {{editForm.orderFreight | moneyFmt}}
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="$t('order.sale.totalAmount')">
            {{allAmount | moneyFmt}}
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item :label="$t('order.sale.deliveryDate')" prop="dateOfDelivery">
            <el-input v-model="editForm.dateOfDelivery" readonly style="width: 700px"/>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item :label="$t('order.sale.departure')" prop="departurePort">
            <el-input v-model="editForm.departurePort" disabled class="edit-form-width" style="width: 700px"/>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item :label="$t('order.sale.destination')" prop="arrivePort">
            <el-input v-model="editForm.arrivePort" disabled class="edit-form-width" style="width: 700px"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="$t('order.sale.transportBy')" prop="entrustTransportation">
            <el-select v-model="editForm.entrustTransportation" disabled class="edit-form-width">
              <el-option :label="isZh?'SGI': 'SGI'" :value="0"></el-option>
              <el-option :label="isZh?'自提':'Self'" :value="1"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="$t('order.sale.transportationMethod')" prop="transportationWay">
            <el-select v-model="editForm.transportationWay" class="edit-form-width" disabled>
              <el-option v-for="(item,index) in transportList" :label="isZh?item.label:item.labelEn" :value="item.value" :key="index"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="$t('order.sale.currency')" prop="orderCurrency">
            <el-select filterable remote :remote-method="getCurrencyCodeList" :loading="loading2" v-model="editForm.orderCurrency" disabled placeholder="请输入币种名或者币种编码查找" class="edit-form-width">
              <el-option v-for="(item, index) in currencyCodeList" :label="item.searchCurrencyCodeStr" :value="item.currencyCode" :key="index"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="$t('order.sale.payWay')" prop="payMode">
            <el-select v-model="editForm.payMode" disabled placeholder="请选择付款方式" class="edit-form-width">
              <el-option v-for="(item, index) in paymentList" :label="isZh?item.label:item.labelEn" :value="item.value" :key="index"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item :label="$t('order.sale.payTerm')">
        <table border="0" cellspacing="0" cellpadding="0" class="tableSet">
          <thead>
          <tr>
            <th>{{$t('common.table.id')}}</th>
            <th>{{$t('order.sale.payNode')}}</th>
            <th>{{$t('order.sale.payPercent')}}</th>
            <th>{{$t('order.sale.payDays')}}</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item, index) in controlTowerList" :key="index">
            <td>{{index + 1}}</td>
            <td>{{item.nodeName}}</td>
            <td>
              {{item.paymentRatio}}%
            </td>
            <td>
              {{item.paymentTerm || 0}}{{$t('order.sale.days')}}
            </td>
          </tr>
          <tr v-if="!controlTowerList.length">
            <td colspan="4" style="text-align: center;padding: 5px">{{$t('common.noData')}}</td>
          </tr>
          </tbody>
        </table>
      </el-form-item>

      <el-row style="margin-top: 16px">
        <el-col>
          <el-form-item :label="$t('order.sale.fileType')">
            <el-checkbox-group v-model="fileTypeCheck" disabled>
              <el-checkbox v-for="(item, index) in fileTypeList" :label="item.value" :key="index">
                <span>{{isZh?item.label:item.labelEn}}</span>
                <!--<span v-else>{{newFileType}}</span>-->
              </el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item :label="$t('common.table.remark')" prop="orderRemarks">
            <el-input v-model="editForm.orderRemarks" disabled :autosize="{ minRows: 4, maxRows: 6}" type="textarea" size="small" clearable style="width: 80%"/>
          </el-form-item>
        </el-col>
      </el-row>

      <div style="margin: 20px;">
        <order-step v-if="!Number($route.query.type)" :list="allNodeList"></order-step>
      </div>

      <el-form-item v-if="!Number($route.query.type)" style="margin-top: 35px">
        <div class="order-record" @click="openRecordDialog">{{$t('order.sale.recordFiles')}}</div>
      </el-form-item>

      <el-form-item style="text-align: center">
        <!--<el-button type="primary" size="small" v-if="Number($route.query.type) === 4" :loading="loading2" @click="checkOrder">{{$t('order.sale.confirm')}}</el-button>-->
        <el-button type="danger" size="small" @click="closePage">{{$t('common.buttonText.back')}}</el-button>
      </el-form-item>
    </el-form>

    <el-dialog :visible.sync="dialogVisible1" :title="$t('order.sale.recordFiles')" width="1000px" center :close-on-click-modal="false">
      <el-form label-width="120px" size="small">
        <el-row>
          <el-col :span="10">
            <el-form-item :label="$t('order.sale.orderNo')">
              {{editForm.orderNo}}
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item :label="$t('order.sale.orderDate')">
              {{editForm.createTime | timeFmt}}
            </el-form-item>
          </el-col>
        </el-row>
        <div style="margin-top: 20px">
          {{$t('order.sale.orderPrecess')}}
        </div>
        <order-step :list="allNodeList"></order-step>

        <!--<ApprovalHistory></ApprovalHistory>-->

        <div class="file-record-item">
          <div class="file-record-label">{{$t('order.sale.payVoucher')}}：</div>
          <el-table
            :data="payRecordList"
            border
            fit
            size="small"
            max-height="200"
            :header-cell-style="{background: '#a7bfee'}">
            <el-table-column
              align="center"
              type="index"
              label="序号"
              width="55">
            </el-table-column>

            <el-table-column align="center" width="180" :label="$t('order.sale.uploadTime')">
              <template slot-scope="scope">
                {{scope.row.createTime | timeFmt}}
              </template>
            </el-table-column>

            <el-table-column align="center" :label="$t('order.sale.voucher')">
              <template slot-scope="scope">
                {{scope.row.attachmentName}}
              </template>
            </el-table-column>

            <el-table-column align="center" width="120" :label="$t('common.table.actions')">
              <template slot-scope="scope">
                <el-button type="primary" size="mini" class="export" @click="exportFile(scope.row.attachmentPath)">{{$t('common.download')}}</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>

        <div class="file-record-item">
          <div class="file-record-label">{{$t('order.sale.stockVoucher')}}：</div>
          <el-table
            :data="stockRecordList"
            border
            fit
            size="small"
            max-height="200"
            :header-cell-style="{background: '#a7bfee'}">
            <el-table-column
              align="center"
              type="index"
              label="序号"
              width="55">
            </el-table-column>

            <el-table-column align="center" width="180" :label="$t('order.sale.uploadTime')">
              <template slot-scope="scope">
                {{scope.row.attachmentUploadTime | timeFmt}}
              </template>
            </el-table-column>

            <el-table-column align="center" :label="$t('order.sale.voucher')">
              <template slot-scope="scope">
                {{scope.row.attachmentName || ''}}
              </template>
            </el-table-column>

            <el-table-column align="center" width="120" :label="$t('common.table.actions')">
              <template slot-scope="scope">
                <el-button type="primary" size="mini" class="export" @click="exportFile(scope.row.attachmentPath)">{{$t('common.download')}}</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>

        <div class="file-record-item">
          <div class="file-record-label">{{$t('order.sale.deliveryVoucher')}}：</div>
          <el-table
            :data="deliveryRecordList"
            border
            fit
            size="small"
            max-height="200"
            :header-cell-style="{background: '#a7bfee'}">
            <el-table-column
              align="center"
              type="index"
              label="序号"
              width="55">
            </el-table-column>

            <el-table-column align="center" width="180" :label="$t('order.sale.uploadTime')">
              <template slot-scope="scope">
                {{scope.row.attachmentUploadTime | timeFmt}}
              </template>
            </el-table-column>

            <el-table-column align="center" :label="$t('order.sale.voucher')">
              <template slot-scope="scope">
                {{scope.row.attachmentName || ''}}
              </template>
            </el-table-column>

            <el-table-column align="center" width="120" :label="$t('common.table.actions')">
              <template slot-scope="scope">
                <el-button type="primary" size="mini" class="export" @click="exportFile(scope.row.attachmentPath)">{{$t('common.download')}}</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>

        <div class="file-record-item">
          <div class="file-record-label">{{$t('order.sale.checkVoucher')}}：</div>
          <el-table
            :data="checkRecordList"
            border
            fit
            size="small"
            max-height="200"
            :header-cell-style="{background: '#a7bfee'}">
            <el-table-column
              align="center"
              type="index"
              label="序号"
              width="55">
            </el-table-column>

            <el-table-column align="center" width="180" :label="$t('order.sale.uploadTime')">
              <template slot-scope="scope">
                {{scope.row.attachmentUploadTime | timeFmt}}
              </template>
            </el-table-column>

            <el-table-column align="center" :label="$t('order.sale.voucher')">
              <template slot-scope="scope">
                {{scope.row.attachmentName || ''}}
              </template>
            </el-table-column>

            <el-table-column align="center" width="120" :label="$t('common.table.actions')">
              <template slot-scope="scope">
                <el-button type="primary" size="mini" class="export" @click="exportFile(scope.row.attachmentPath)">{{$t('common.download')}}</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>

        <div class="file-record-item">
          <div class="file-record-label">{{$t('order.sale.relatedFile')}}：</div>
          <el-table
            :data="relateRecordList"
            border
            fit
            size="small"
            max-height="200"
            :header-cell-style="{background: '#a7bfee'}">
            <el-table-column
              align="center"
              type="index"
              label="序号"
              width="55">
            </el-table-column>

            <el-table-column align="center" width="180" :label="$t('order.sale.attachmentType')">
              <template slot-scope="scope">
                {{scope.row.attachmentRelevantType}}
              </template>
            </el-table-column>

            <el-table-column align="center" width="180" :label="$t('order.sale.uploadTime')">
              <template slot-scope="scope">
                {{scope.row.attachmentUploadTime | timeFmt}}
              </template>
            </el-table-column>

            <el-table-column align="center" :label="$t('order.sale.voucher')">
              <template slot-scope="scope">
                {{scope.row.attachmentName || ''}}
              </template>
            </el-table-column>

            <el-table-column align="center" width="120" :label="$t('common.table.actions')">
              <template slot-scope="scope">
                <el-button type="primary" size="mini" class="export" @click="downFile(scope.row.attachmentPath)">{{$t('common.download')}}</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="danger" size="small" @click="dialogVisible1=false">{{$t('common.buttonText.close')}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// import Pagination from '@/components/Pagination'
import OrderStep from '@/components/OrderStep'
import { selectCurrencyCodeListApi, getSupplyCompanyList, selectgetDictionaryBykeyApi, selectSysOrderParameterApi } from '@/api/system'
import { listCustomerInfoContactApi, listCustomerContact } from '@/api/customer'
import { parseTime } from '@/utils/index'
import { getLinkList } from "@/api/supplier";
import { saleOrderDetail, checkSaleOrder, allNodeSaleOrder, saleOrderRecRecord, listOrderRelatFilesApi, stockRecord } from '@/api/transitrade'
import moneyFmt from '@/mixin/moneyFmt'
export default {
  components: {
    // Pagination,
    OrderStep
  },
  mixins: [moneyFmt],
  filters: {
    timeFmt(val) {
      if (val) {
        return parseTime(val)
      }
    }
  },
  data() {
    return {
      listLoading1: false,
      dialogVisible: false,
      dialogVisible1: false,
      loading1: false,
      loading2: false,
      currencyCodeList: [],
      customerInfoList: [],
      modalList: [],
      selectList: [],
      dialogSelectList: [],
      controlTowerList: [],
      quoteSkuList: [],
      orderSkuList: [],
      fileTypeCheck: [],
      allNodeList: [],
      payRecordList: [],
      stockRecordList: [],
      deliveryRecordList: [],
      checkRecordList: [],
      relateRecordList: [],
      newFileType: '',
      editForm: {
        quotedNo: '',
        quotedTime: '',
        customerBId: '',
        buyerContactBy: '',
        buyerAddress: '',
        buyerTelephone: '',
        buyerEmail: '',
        buyerBankId: '',
        buyerBank: '',
        buyerBankAccount: '',
        buyerSwiftcode: '',
        sellerContact: '',
        sellerAddress: '',
        sellerTelephone: '',
        sellerEmail: '',
        sellerBankId: '',
        sellerBank: '',
        sellerBankAccount: '',
        sellerSwifcode: '',
        sysCompanyBId: '',
        transportationWay: 2,
        entrustTransportation: 0,
        shippingPort: '',
        purposePort: '',
        emailAddress: '',
        orderCurrency: '',
        exchangeRate: 0,
        dateOfDelivery: 0,
        payMode: '',
        quotedRemarks: '',
        orderFreight: 0,
        toleranceNumber: '',
        choosedAttachment: '',
        orderRemarks: '',
        arrivePort: '',
        departurePort: ''
      },
      searchObj: {
        productCode: '',
        productName: '',
        pageNum: 1,
        pageSize: 10,
        total: 0
      },
      sysCustomerInfoList: [],
      customerBankList: [],
      sysBankList: [],
      fileTypeList: []
    }
  },
  computed: {
    activeRoute() {
      let visitedViews = this.$store.state.tagsView.visitedViews;
      let activePath = visitedViews.filter(e => {
        return e.path === this.$route.path
      })[0];
      return activePath
    },
    transportList() {
      return this.$store.state.order.transportList
    },
    paymentList() {
      return this.$store.state.order.paymentList
    },
    quoteMoneyTotal() {
      let val = 0;
      this.quoteSkuList.forEach(e => {
        val += Number(e.quoteMoney)
      });
      val += Number(this.editForm.orderFreight);
      return val
    },
    allAmount() {
      let val = 0;
      this.orderSkuList.forEach(e => {
        val += Number(e.productAmount)
      });
      val += Number(this.editForm.orderFreight);
      return val.toFixed(4)
    }
  },
  watch: {
    'editForm.customerBId' (val) {
      if (val) {
        this.customerContactFun(val);
      }
    }
  },
  created() {
    this.getCurrencyCodeList();
    this.getFileTypeList();
    this.getCustomerInfoListFun();
    this.getSysCustomerInfoListFun();
    this.getSaleOrderDetail();
    this.getAllNodeSaleOrder()
  },
  destroyed() {
    this.$store.commit('SET_QUOTE_SKU', null);
  },
  methods: {
    closePage() {
      this.$store.dispatch('delView', this.activeRoute).then(() => {
        this.$router.back()
      })
    },
    // 勾选触发 selects为选择的数据数组
    getSelect(selects) {
      this.selectList = selects;
    },
    getFileTypeList() {
      selectgetDictionaryBykeyApi({ key: 'allowable attachment' }).then(res => {
        this.getSaleSetting(res.data);
      }).catch(err => {
        this.$message.error(err.message)
      });
    },
    getSaleSetting(fileTypeList) {
      selectSysOrderParameterApi({ orderParameterType: 3 }).then(res => {
        if (res.data) {
          this.editForm.toleranceNumber = res.data.toleranceNumber
        }
        let saleFileType = res.data.sysOrderParameterAnnexList.filter(e => {
          // if (e.dictCode === '8' && e.isAllow) {
          //   this.newFileType = e.customizeName;
          // }
          return e.isAllow
        }).map(t => {
          return t.dictCode
        });
        this.fileTypeList = fileTypeList.filter(e => {
          return saleFileType.includes(e.value)
        });
      }).catch(err => {
        this.$message.error(err.message);
      });
    },
    // 客户人列表
    getCustomerInfoListFun() {
      listCustomerInfoContactApi().then(res => {
        this.customerInfoList = res.data || []
      }).catch(err => {
        this.$message.error(err.message);
      });
    },
    // 主体企业列表
    getSysCustomerInfoListFun() {
      getSupplyCompanyList().then(res => {
        this.sysCustomerInfoList = res.data || []
      }).catch(err => {
        this.$message.error(err.message);
      });
    },
    openRecordDialog() {
      this.dialogVisible1 = true;
      this.getRecRecord();
      this.getFileWithOrder();
      this.getStockRecordList();
      this.getDeliveryRecordList();
      this.getCheckRecordList()
    },
    getRecRecord() {
      saleOrderRecRecord({ salesOrderBId: this.editForm.bid }).then(res => {
        let arr = (res.data || []).map(e => {
          return e.salesCollectionProofList;
        });
        let arr1 = [];
        arr.forEach(e => {
          e.forEach(t => {
            arr1 = arr1.concat(t)
          })
        });
        this.payRecordList = arr1;
      }).catch(err => {
        this.$message.error(err.message)
      })
    },
    // 获取备货记录
    getStockRecordList() {
      stockRecord({ salesOrderBId: this.editForm.bid, workflowType: 1 }).then(res => {
        this.stockRecordList = (res.data || []).map(e => {
          return { ...e }
        })
      }).catch(err => {
        this.$message.error(err.message)
      })
    },
    // 获取发货记录记录
    getDeliveryRecordList() {
      stockRecord({ salesOrderBId: this.editForm.bid, workflowType: 2 }).then(res => {
        this.deliveryRecordList = (res.data || []).map(e => {
          return { ...e }
        })
      }).catch(err => {
        this.$message.error(err.message)
      })
    },
    // 获取发货记录记录
    getCheckRecordList() {
      stockRecord({ salesOrderBId: this.editForm.bid, workflowType: 3 }).then(res => {
        this.checkRecordList = (res.data || []).map(e => {
          return { ...e }
        })
      }).catch(err => {
        this.$message.error(err.message)
      })
    },
    getFileWithOrder() {
      let data = {
        salesOrderBId: this.$route.query.id,
        attachmentType: 5
      };
      listOrderRelatFilesApi(data).then(res => {
        this.relateRecordList = res.data || [];
      }).catch(err => {
        this.$message.error(err.message)
      })
    },
    // 客户下的联系人列表
    customerContactFun(val) {
      let api = this.editForm.salesOrderType ? listCustomerContact : getLinkList;
      let obj = this.editForm.salesOrderType ? { customerBId: val } : { supplierBId: val };
      api(obj).then(res => {
        this.modalList = this.editForm.salesOrderType ? res.data.list : res.data
      }).catch(err => {
        this.$message.error(err.message);
      });
    },
    // 查询获取币种
    getCurrencyCodeList(query) {
      if (query !== '') {
        this.loading2 = true;
        setTimeout(() => {
          this.loading2 = false;
          selectCurrencyCodeListApi(query).then(res => {
            this.currencyCodeList = res.data || []
          })
        }, 200);
      } else {
        this.currencyCodeList = [];
      }
    },
    getSaleOrderDetail() {
      saleOrderDetail({ orderBid: this.$route.query.id }).then(res => {
        this.editForm = Object.assign(this.editForm, res.data);
        this.controlTowerList = this.editForm.transitradeOrderCollectionList;
        this.orderSkuList = this.editForm.transitradeOrderProductsList;
        this.fileTypeCheck = this.editForm.choosedAttachment.split(',');
      }).catch(err => {
        this.$message.error(err.message)
      })
    },
    getAllNodeSaleOrder() {
      allNodeSaleOrder({ orderBid: this.$route.query.id }).then(res => {
        this.allNodeList = res.data.workflowProcessList.map(e => {
          e.currentCompletion = (e.currentCompletion || 0).toString();
          return { ...e }
        });
      }).catch(err => {
        this.$message.error(err.message)
      })
    },
    checkOrder() {
      this.loading2 = true;
      checkSaleOrder({ id: this.editForm.id }).then(res => {
        this.loading2 = false;
        this.$message.success('Order Confirm Success');
        this.closePage()
      }).catch(err => {
        this.loading2 = false;
        this.$message.error(err.message)
      })
    }
  }
}
</script>

<style lang="scss">
  @import '~@/styles/variables.scss';
  .editOrder {
    width: 90%;
    margin: 0 auto;
    border: 1px solid $border-light-color;
    .edit-title {
      position: relative;
      text-align: center;
      height: 50px;
      line-height: 50px;
      font-size: 20px;
      font-weight: bold;
      border-bottom: 1px solid $border-light-color;
    }
    .edit-form {
      margin-top: 20px;
    }
    .edit-form-width {
      width: 300px;
    }
    .row-item {
      margin-bottom: 20px;
    }
    .tableSet {
      text-align: center;
      width: 680px !important;
      thead {
        tr {
          th {
            padding: 3px;
            border-right: 1px solid $border-light-color;
            border-top: 1px solid $border-light-color;
            border-bottom: 1px solid $border-light-color;
          }
          th:first-child {
            border-left: 1px solid $border-light-color;
          }
        }
      }
      tr {
        td {
          padding: 3px;
          border-right: 1px solid $border-light-color;
          border-bottom: 1px solid $border-light-color;
        }
        td:first-child {
          border-left: 1px solid $border-light-color;
        }
      }
    }
    .table-top {
      line-height: 1.5rem;
      padding: 5px;
      width: 100%;
      display: flex;
      display: -webkit-flex;
      .top-title {
        width: 50%;
        text-align: left;
      }
      .top-btns {
        width: 50%;
        text-align: right;
      }
      button {
        margin: 0 10px;
      }
    }
    .table-goods {
      display: flex;
      display: -webkit-flex;
      .goods-img {
        width: 90px;
        height: 90px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .goods-text {
        margin-left: 10px;
        flex: 1;
        display: flex;
        display: -webkit-flex;
        flex-direction: column;
        justify-content: space-around;
        text-align: left;
        >div {
          font-size: 12px;
        }
      }
    }
    .file-record-item {
      margin: 20px 0;
      .file-record-label {
        line-height: 1.5rem;
      }
    }
    .order-record {
      text-decoration: underline;
      font-size: 16px;
      color: #1e6abc;
      cursor: pointer;
      margin: 20px;
    }
  }
</style>
