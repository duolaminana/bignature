<template>
  <div class="app-container roleManagement">
    <div class="search-box">
      <el-form label-width="120px" inline size="small">
        <el-form-item :label="$t('system.dictionary.valueLabelName')">
          <el-input v-model.trim="postData.valueLabel" clearable :placeholder="$t('system.dictionary.valueLabelName')" style="width: 200px"/>
        </el-form-item>
        <el-form-item :label="$t('system.dictionary.dictValue')">
          <el-input v-model.trim="postData.dictValue" clearable :placeholder="$t('system.dictionary.dictValue')" style="width: 200px"/>
        </el-form-item>
        <el-form-item :label="$t('system.dictionary.valueStatus')">
          <el-select v-model="postData.valueStatus" clearable :placeholder="$t('system.dictionary.valueStatus')" style="width: 200px">
            <el-option v-for="(item, index) in dictList2" :label="language === 'zh' ? item.labelZh :item.label" :value="item.id" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="export" @click="searchData">{{$t('common.search')}}</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="topBtns">
      <el-button type="primary" size="small" @click="openDialog('add')">{{$t('common.add')}}</el-button>
      <el-button type="primary" size="small" @click="deleteBatchMethod()">{{$t('common.delete')}}</el-button>
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="loading。。。"
      border
      fit
      size="small"
      :header-cell-style="{background: '#a7bfee'}" @selection-change="getSelect">
      <el-table-column
        align="center"
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column :label="$t('system.dictionary.valueLabel')" prop="valueLabel" show-overflow-tooltip/>
      <!--<el-table-column :label="$t('system.dictionary.valueLabelEn')" prop="valueLabelEn" show-overflow-tooltip/>-->
      <el-table-column align="center" :label="$t('system.dictionary.dictValue')" width="120" prop="dictValue" show-overflow-tooltip/>
      <el-table-column align="center" :label="$t('system.dictionary.dictLanguage')" width="120" prop="dictLanguage" show-overflow-tooltip/>
      <el-table-column align="center" :label="$t('system.dictionary.dictSequence')" width="100" prop="dictSequence" show-overflow-tooltip/>
      <el-table-column :label="$t('system.dictionary.valueRemark')" prop="valueRemark" show-overflow-tooltip/>
      <el-table-column align="center" :label="$t('system.dictionary.valueStatus')" width="80" prop="valueStatus">
        <template slot-scope="scope">
          <el-tag :type="scope.row.valueStatus === 1 ? 'primary' : 'danger' " size="mini">
            {{ scope.row.valueStatus === 1 ? $t('common.table.inUse') : $t('common.table.disabled') }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('common.table.updateTime')" width="150" prop="updateTime">
        <template slot-scope="scope">
          {{scope.row.updateTime | timeFmt}}
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('common.table.actions')" width="100" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" @click="openDialog('edit', row)">{{$t('common.table.edit')}}</el-button>
        </template>
      </el-table-column>
    </el-table>

    <Pagination :total="postData.total" :page.sync="postData.pageIndex" :limit.sync="postData.pageSize"
                @pagination="getDataList"></Pagination>
    <el-dialog :visible.sync="dialogVisible" :title="dialogType==='add'?$t('system.dictionary.addDictValue'):$t('system.dictionary.editDictValue')" center width="600px">
      <el-form :model="entity" ref="ruleForm" v-if="dialogVisible" label-width="160px" label-position="left" size="small" :rules="entityDataRules">
        <el-form-item :label="$t('system.dictionary.valueLabel')" prop="valueLabel">
          <el-input v-model="entity.valueLabel" clearable :placeholder="$t('system.dictionary.valueLabel')" style="width: 350px"/>
        </el-form-item>
        <!--<el-form-item :label="$t('system.dictionary.valueLabelEn')" prop="valueLabelEn">-->
          <!--<el-input v-model="entity.valueLabelEn" clearable :placeholder="$t('system.dictionary.valueLabelEn')" style="width: 350px"/>-->
        <!--</el-form-item>-->
        <el-form-item :label="$t('system.dictionary.dictValue')" prop="dictValue">
          <el-input v-model="entity.dictValue" clearable :placeholder="$t('system.dictionary.dictValue')" style="width: 350px"/>
        </el-form-item>
        <el-form-item :label="$t('system.dictionary.dictLanguage')" prop="dictLanguage">
          <el-select v-model="entity.dictLanguage" clearable :placeholder="$t('system.dictionary.dictLanguage')" style="width: 350px">
            <el-option v-for="(item, index) in dictLanguageList" :label="item.label" :value="item.value" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('system.dictionary.dictName')">
          <el-input v-model="dictName" style="width: 350px" disabled/>
        </el-form-item>
        <el-form-item :label="$t('system.dictionary.dictSequence')" prop="dictSequence">
          <el-input-number :min="0" :step="1" :precision="0" controls-position="right" v-model="entity.dictSequence" clearable style="width: 350px" />
        </el-form-item>
        <el-form-item :label="$t('system.dictionary.valueStatus')" prop="valueStatus">
          <el-select v-model="entity.valueStatus" clearable :placeholder="$t('system.dictionary.valueStatus')" style="width: 350px">
            <el-option v-for="(item, index) in dictList" :label="isZh?item.labelZh:item.label" :value="item.id" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('system.dictionary.valueRemark')">
          <el-input type="textarea" v-model="entity.valueRemark" :autosize="{ minRows: 4, maxRows: 6}" clearable :placeholder="$t('system.dictionary.valueRemark')" style="width: 350px"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" size="small" :loading="addLoading" @click="addMethod('ruleForm')">{{$t('common.buttonText.confirm')}}</el-button>
        <el-button type="danger" size="small" @click="closOPenDialog">{{$t('common.buttonText.cancel')}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import {
  sysDictionaryValuePageph,
  sysDictionaryValueAdd,
  sysDictionaryValueUpdateById,
  sysDictionaryValueDeleteById,
  sysDictionaryValueDeleteByIds
} from '@/api/system'
import treeMenu from '@/mixin/treeMenu'
import { deepClone, parseTime } from '@/utils/index'
export default {
  components: {
    Pagination
  },
  mixins: [treeMenu],
  data() {
    return {
      listLoading: true,
      addLoading: false,
      dialogVisible: false,
      selectList: [],
      bid: "",
      dictName: '',
      dialogType: '',
      indent: 20,
      entity: {},
      rowData: {},
      postData: {
        pageIndex: 1,
        pageSize: 10,
        total: 0,
        dictBid: ''
      },
      dictList2: [
        {
          labelZh: '全部',
          label: 'All',
          id: ''
        },
        {
          labelZh: '使用中',
          label: 'Enabled',
          id: 1
        },
        {
          labelZh: '已禁用',
          label: 'Disabled',
          id: 0
        }
      ],
      dictList: [
        {
          labelZh: '使用中',
          label: 'Enabled',
          id: 1
        },
        {
          labelZh: '已禁用',
          label: 'Disabled',
          id: 0
        }
      ],
      dictLanguageList: [
        {
          label: 'CN',
          value: 'CN'
        },
        {
          label: 'EN',
          value: 'EN'
        }
      ],
      list: [],
      departmentList: [],
      entityDataRules: {
        valueLabel: [
          { required: true, message: this.$t('system.dictionary.valueLabelHint'), trigger: 'blur' }
        ],
        // valueLabelEn: [
        //   { required: true, message: this.$t('system.dictionary.valueLabelEnHint'), trigger: 'blur' }
        // ],
        dictLanguage: [
          { required: true, message: this.$t('system.dictionary.dictLanguage'), trigger: 'blur' }
        ],
        dictValue: [
          { required: true, message: this.$t('system.dictionary.dictValueHint'), trigger: 'blur' }
        ],
        dictSequence: [
          { required: true, message: this.$t('system.dictionary.dictSequenceHint'), trigger: 'blur' }
        ],
        valueStatus: [
          { required: true, message: this.$t('system.dictionary.dictStatusHint'), trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    isZh() {
      this.entityDataRules = {
        valueLabel: [
          { required: true, message: this.$t('system.dictionary.valueLabelHint'), trigger: 'blur' }
        ],
        // valueLabelEn: [
        //   { required: true, message: this.$t('system.dictionary.valueLabelEnHint'), trigger: 'blur' }
        // ],
        dictLanguage: [
          { required: true, message: this.$t('system.dictionary.dictLanguage'), trigger: 'blur' }
        ],
        dictValue: [
          { required: true, message: this.$t('system.dictionary.dictValueHint'), trigger: 'blur' }
        ],
        dictSequence: [
          { required: true, message: this.$t('system.dictionary.dictSequenceHint'), trigger: 'blur' }
        ],
        valueStatus: [
          { required: true, message: this.$t('system.dictionary.dictStatusHint'), trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.bid = this.$route.query.bid;
    this.dictName = this.$route.query.dictName;
    this.getDataList();
  },
  methods: {
    // 搜索
    searchData() {
      this.postData.pageIndex = 1;
      this.getDataList()
    },
    // 获取数据列表
    getDataList() {
      this.postData.dictBid = this.bid;
      let obj = {};
      for (let key in this.postData) {
        if (this.postData[key] !== '') {
          obj[key] = this.postData[key]
        }
      }
      sysDictionaryValuePageph(obj).then(res => {
        this.list = res.data.list || [];
        this.postData.total = res.data.total;
        this.listLoading = false;
      }).catch(err => {
        this.listLoading = false;
        this.$message.error(err.message)
      });
    },
    // 编辑和新增模块
    openDialog(type, row) {
      this.dialogType = type;
      if (type === 'edit') {
        this.entity = deepClone(row);
      } else {
        this.entity = {};
        this.entity.valueStatus = 1;
        this.entity.dictSequence = 1;
        this.entity.dictBId = this.bid;
      }
      this.dialogVisible = true;
    },
    closOPenDialog() {
      this.dialogVisible = false;
    },
    // 勾选触发 selects为选择的数据数组
    getSelect(selects) {
      this.selectList = selects;
    },
    // 具体添加方法
    addMethod(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.entity.id) {
            sysDictionaryValueUpdateById(this.entity).then(res => {
              this.$message.success(this.$t("system.userManage.updata"));
              this.postData.pageIndex = 1;
              this.dialogVisible = false;
              this.getDataList();
              this.closOPenDialog()
            }).catch(err => {
              this.$message.error(err.message)
            });
          } else {
            sysDictionaryValueAdd(this.entity).then(res => {
              this.$message.success('Save Success');
              this.postData.pageIndex = 1;
              this.dialogVisible = false;
              this.getDataList();
              this.closOPenDialog()
            }).catch(err => {
              this.$message.error(err.message)
            });
          }
        } else {
          this.$message.error(this.$t('common.tip.isdataFill'));
        }
      });
    },
    deleteBatchMethod() {
      if (!this.selectList.length) {
        return this.$message(this.$t('query.formMessage.PleaseSelectData'));
      }
      this.$confirm(this.$t('query.formMessage.isDelete'), this.$t('system.userManage.hint'), {
        confirmButtonClass: 'el-button-confirmClass',
        cancelButtonClass: 'el-button-cancelClass',
        confirmButtonText: this.$t('common.buttonText.confirm'),
        cancelButtonText: this.$t('common.buttonText.cancel'),
        type: 'warning',
        center: true
      }).then(() => {
        this.deleteIdsForm = this.selectList.map(e => {
          return e.id;
        }).join(",");
        let formData = new FormData();
        formData.append('ids', this.deleteIdsForm)
        sysDictionaryValueDeleteByIds(formData).then(res => {
          if (res.status === 200) {
            this.$message.success(this.$t('common.tip.deleteTip'));
          }
          this.getDataList();
        }).catch(err => {
          this.$message.error(err.message);
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: 'Cancelled operation'
        });
      });
    },
    deleteMethod(row) {
      this.$confirm(this.$t('query.formMessage.isDelete'), this.$t('system.userManage.hint'), {
        confirmButtonClass: 'el-button-confirmClass',
        cancelButtonClass: 'el-button-cancelClass',
        confirmButtonText: this.$t('common.buttonText.confirm'),
        cancelButtonText: this.$t('common.buttonText.cancel'),
        type: 'warning',
        center: true
      }).then(() => {
        let obj = { id: row.id };
        sysDictionaryValueDeleteById(obj).then(res => {
          this.searchData();
          this.$message.success('Delete Success!');
        }).catch(err => {
          this.$message.error(err.message)
        });
      }).catch(() => {
        this.$message({
          type: "info",
          message: this.$t("system.userManage.cancel")
        });
      });
    }
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      };
      return statusMap[status]
    },
    timeFmt(val) {
      if (val) {
        return parseTime(val)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/variables.scss';

.roleManagement {
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

  .dialogClass {
    .el-dialog {
      width: 500px;
    }
  }
}
</style>
