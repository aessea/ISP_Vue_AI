<template>
  <div class="main-box">
    <el-card>
      <el-row>
        <el-col :span="20">
          <el-select v-model="levelValue" :placeholder="$t('HistoryRunPage.SelectLevel')" clearable>
            <el-option
              v-for="item in levelOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <el-button
            type="primary"
            icon="el-icon-search"
            style="margin-left: 10px;"
            @click="searchData"
          >
            {{ $t('PublicBtn.Search') }}
          </el-button>
          <el-button type="danger" icon="el-icon-delete" style="margin-left: 10px;" @click="filterDataDialog">
            {{ $t('PublicText.BtnDeleteHisLog') }}
          </el-button>
        </el-col>
        <el-col :span="4">
          <div style="float: right;">
            <el-tooltip class="item" effect="dark" :content="$t('TablePage.BtnRefreshTable')" placement="top">
              <el-button
                size="small"
                icon="el-icon-refresh"
                circle
                @click="refreshTableData"
              />
            </el-tooltip>
            <el-tooltip class="item" effect="dark" :content="$t('TablePage.BtnViewInstruction')" placement="top">
              <el-button
                size="small"
                icon="el-icon-warning-outline"
                circle
                @click="helpTips"
              />
            </el-tooltip>
          </div>
        </el-col>
      </el-row>
      <el-table
        v-loading="loading"
        :data="table_data"
        style="width: 100%;margin-top: 16px;"
        :header-cell-style="{background:'#eef1f6',color:'#606266', padding: '3px'}"
        max-height="1000px"
        :cell-style="setCellColor"
      >
        <el-table-column
          prop="msg"
          label="MESSAGE"
        />
        <el-table-column
          prop="trace"
          label="TRACEBACK"
        />
        <el-table-column
          prop="level"
          label="LEVEL"
          width="100"
        >
          <template slot-scope="scope">
            <el-tag v-if="scope.row.level === 30" size="small" type="warning">Warning</el-tag>
            <el-tag v-else-if="scope.row.level === 40" size="small" type="danger">Error</el-tag>
            <el-tag v-else size="small" type="info">Info</el-tag>
          </template>
        </el-table-column>
        <!-- <el-table-column
          prop="logger_name"
          label="LOGGER NAME"
          width="160"
        /> -->
        <el-table-column
          prop="create_datetime"
          label="DATETIME"
          width="230"
          sortable
        />
      </el-table>
      <el-pagination
        background
        :hide-on-single-page="true"
        :page-size="pageSize"
        :current-page="currentPage"
        layout="total, prev, pager, next, jumper"
        :total="total_num"
        style="margin-top: 16px;"
        @current-change="handlePageChange"
      />
    </el-card>

    <el-dialog
      v-el-drag-dialog
      :title="$t('PublicText.BtnDeleteHisLog')"
      :visible.sync="filterDialogVisible"
      width="45%"
      @dragDialog="handleDrag"
    >
      <el-row>
        <el-form>
          <el-row :gutter="20" type="flex" justify="start" align="top" tag="div">
            <el-col :span="12" :offset="0" :push="0" :pull="0" tag="div">
              <el-form-item :label="$t('HistoryOperaPage.TextDeleteMonthAgo')">
                <el-input-number v-model="save_months" :placeholder="$t('FileDataPage.TextInputMonth')" clearable />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleFilterClose">{{ $t('PublicBtn.Close') }}</el-button>
        <el-button type="danger" @click="filterData">{{ this.$t('PublicBtn.ConfirmDelete') }}</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import elDragDialog from '@/directive/el-drag-dialog'
import { GetTableData, SearchData, DeleteHistoryLog } from '@/api/HistoryLog/HistoryRun'
export default {
  name: 'HistoryRun',
  directives: { elDragDialog },
  data() {
    return {
      loading: true, // 表格加载动画
      table_data: [], // 表格数据
      // 分页相关
      total_num: 0,
      pageSize: 20,
      currentPage: 1,
      // 搜索类型
      levelOptions: [{
        value: 'Warning',
        label: 'Warning'
      }, {
        value: 'Error',
        label: 'Error'
      }],
      levelValue: '', // 搜索level
      isSearch: false,
      // 过滤数据相关
      filterDialogVisible: false,
      save_months: 1
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'buttons'
    ])
  },
  created() {
    this.getTableData(this.currentPage, this.pageSize)
  },
  methods: {
    handleDrag() {
      // // this.$refs.select.blur()
    },
    setCellColor({ row, column, rowIndex, columnIndex }) {
      if (row.level === 30 && columnIndex === 0) {
        return 'color: #E6A23C;font-weight: bold;'
      } else if (row.level === 40 && columnIndex === 0) {
        return 'color: #F56C6C;font-weight: bold;'
      }
      return ''
    },
    // 分页
    handlePageChange(val) {
      this.currentPage = val
      this.getTableData(val, this.pageSize, this.isSearch) // 翻页
    },
    // 分页展示表格数据
    getTableData(currentPage, pageSize, isSearch) {
      this.loading = true
      if (isSearch === true) {
        const data = {
          'current_page': currentPage,
          'page_size': pageSize,
          'level_value': this.levelValue
        }
        SearchData(data).then(res => {
          if (res.code === 20000) {
            this.table_data = res.table_data
            this.total_num = res.total_num
            this.loading = false
          }
        })
      } else {
        const data = {
          'current_page': currentPage,
          'page_size': pageSize
        }
        GetTableData(data).then(res => {
          if (res.code === 20000) {
            this.table_data = res.table_data
            this.total_num = res.total_num
            this.loading = false
          }
        })
      }
    },
    // 搜索 搜索结果怎么分页TODO
    searchData() {
      if (this.levelValue === '') {
        this.$message({
          type: 'warning',
          message: this.$t('HistoryRunPage.SelectLevel')
        })
        return
      }
      this.isSearch = true
      this.getTableData(1, this.pageSize, true)
    },
    // 刷新表格
    refreshTableData() {
      this.currentPage = 1
      this.isSearch = false
      this.levelValue = ''
      this.getTableData(1, this.pageSize, false)
    },
    // 帮助
    helpTips() {

    },
    // 按日期过滤表格数据
    filterDataDialog() {
      this.filterDialogVisible = true
    },
    handleFilterClose() {
      this.filterDialogVisible = false
    },
    filterData() {
      this.$confirm(this.$t('HistoryOperaPage.DeleteHisLog1') + this.save_months + this.$t('HistoryOperaPage.DeleteHisLog2'), this.$t('PublicText.TitleTip'), {
        confirmButtonText: this.$t('TablePage.BtnConfirmDelete'),
        cancelButtonText: this.$t('PublicBtn.Cancel'),
        confirmButtonClass: 'btnDanger',
        type: 'warning'
      }).then(() => {
        if (this.save_months === undefined) {
          this.$alert(this.$t('PublicText.DeleteFailed'), this.$t('PublicText.TitleTip'), {
            confirmButtonText: this.$t('PublicBtn.Confirm'),
            type: 'error'
          })
          return
        }
        const save_months = this.save_months
        const data = {
          save_months
        }
        DeleteHistoryLog(data).then(res => {
          if (res.code === 20000) {
            this.$alert(res.message, this.$t('PublicText.TitleTip'), {
              confirmButtonText: this.$t('PublicBtn.Confirm'),
              type: res.message_type
            })
            this.refreshTableData()
            setTimeout(() => {
              this.filterDialogVisible = false
            }, 1000)
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: this.$t('PublicText.TextCancel')
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../../assets/css/HistoryLog/HistoryRun.scss';
</style>
<style>
.btnDanger{
  background-color: #F56C6C !important;
  border-color: #F56C6C !important;
}
.btnDanger:hover{
  background-color: #f04747 !important;
  border-color: #f04747 !important;
}
.el-pagination {
    text-align: center;
}
.el-table .warning-row {
  color: #E6A23C;
}
.el-table .error-row {
  color: #F56C6C;
}
</style>
