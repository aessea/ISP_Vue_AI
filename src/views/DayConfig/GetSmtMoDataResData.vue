<template>
  <div id="main-box">
    <el-card>
      <el-row>
        <el-col :span="16">
          <div>
            <el-button v-if="buttons.includes('GetSmtMoDataResData/add')" type="primary" @click="addDataDialog">
              <i class="el-icon-plus" />{{ $t('TablePage.BtnAppend') }}
            </el-button>
            <el-button v-if="buttons.includes('GetSmtMoDataResData/delete')" type="danger" @click="deleteData">
              <i class="el-icon-delete" />{{ $t('TablePage.BtnDelete') }}
            </el-button>
            <el-button v-if="buttons.includes('GetSmtMoDataResData/delete')" type="danger" @click="deleteAllData">
              <i class="el-icon-delete" />{{ $t('TablePage.BtnDeleteAllData') }}
            </el-button>
            <el-button v-if="buttons.includes('GetSmtMoDataResData/import')" @click="importDataDialog">
              <i class="el-icon-upload2" />{{ $t('TablePage.BtnImport') }}
            </el-button>
            <el-button v-if="buttons.includes('GetSmtMoDataResData/export')" @click="exportDataDialog">
              <i class="el-icon-download" />{{ $t('TablePage.BtnExport') }}
            </el-button>
            <el-input
              v-model="serialNo_value"
              :placeholder="$t('PublicText.TextSearchSerial')"
              prefix-icon="el-icon-search"
              style="width: 200px;margin-left: 10px;"
              clearable
            />
            <el-button
              type="primary"
              icon="el-icon-search"
              style="margin-left: 10px;"
              @click="searchBy_serialNo"
            >
              {{ $t('title.Search') }}
            </el-button>
          </div>
        </el-col>
        <el-col :span="8">
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
      <div class="table-box">
        <el-tabs v-model="activeName" type="card">
          <el-tab-pane :label="$t('FileKeyWord.MainWord')" name="AI">
            <el-table
              id="mytable"
              v-loading="loading"
              :data="table_data_ai"
              :header-cell-style="{background:'#eef1f6',color:'#606266', padding: '5px'}"
              :cell-style="{padding: '3px'}"

              stripe
              @selection-change="handleSelectionChange"
            >
              <el-table-column type="selection" width="55" />
              <el-table-column prop="apsId" label="apsId" width="100" fixed />
              <el-table-column prop="packageName" :label="lang_dict.packageName" width="180" />
              <el-table-column prop="jonNo" :label="lang_dict.jonNo" width="100" />
              <el-table-column prop="modelName" :label="lang_dict.modelName" width="180" />
              <el-table-column prop="process" :label="lang_dict.process" width="100" />
              <el-table-column prop="serialNo" :label="lang_dict.serialNo" width="140" />
              <el-table-column prop="totalCount" :label="lang_dict.totalCount" width="100" />
              <el-table-column prop="moStat" :label="lang_dict.moStat" width="100">
                <template slot-scope="scope">
                  <el-tag v-if="scope.row.moStat === '4'" size="small" type="success">{{ $t('PublicText.CompleteJob') }}</el-tag>
                  <el-tag v-else size="small">{{ $t('PublicText.NotCompleteJob') }}</el-tag>
                </template>
              </el-table-column>
              <el-table-column prop="xmAiGoFor" :label="lang_dict.xmAiGoFor" width="100" />
              <el-table-column prop="plCode" :label="lang_dict.plCode" width="100" />
              <el-table-column prop="pbdate" :label="lang_dict.pbdate" width="170" />
              <el-table-column prop="pedate" :label="lang_dict.pedate" width="170" />
              <el-table-column prop="create_user" :label="lang_dict.create_user" width="110" />
              <el-table-column prop="create_time" :label="lang_dict.create_time" width="180" />
              <el-table-column prop="schedule_mode" :label="lang_dict.schedule_mode" width="180" />
              <el-table-column prop="groupID" :label="lang_dict.groupID" width="180" />

              <el-table-column width="110" fixed="right" :label="$t('TablePage.TitleOperate')">
                <template slot-scope="scope">
                  <el-button
                    v-if="buttons.includes('GetSmtMoDataResData/modify')"
                    type="primary"
                    size="mini"
                    icon="el-icon-edit"
                    circle
                    @click="handleModify(scope.$index, scope.row)"
                  />
                  <el-button
                    v-if="buttons.includes('GetSmtMoDataResData/delete')"
                    type="danger"
                    size="mini"
                    icon="el-icon-delete"
                    circle
                    @click="handleDelete(scope.$index, scope.row)"
                  />
                </template>
              </el-table-column>
            </el-table>
            <el-pagination
              background
              :hide-on-single-page="false"
              :page-size="pageSize"
              :current-page="currentPage"
              layout="total, prev, pager, next, jumper"
              :total="total_num_ai"
              style="margin-top: 16px;"
              @current-change="handlePageChange_AI"
            />
          </el-tab-pane>
          <el-tab-pane :label="$t('FileKeyWord.SolderPaste')" name="solderPaste">
            <el-table
              id="mytable"
              v-loading="loading"
              :data="table_data_xigao"
              :header-cell-style="{background:'#eef1f6',color:'#606266', padding: '5px'}"
              :cell-style="{padding: '3px'}"

              stripe
              @selection-change="handleSelectionChange"
            >
              <el-table-column type="selection" width="55" />
              <el-table-column prop="apsId" label="apsId" width="100" fixed />
              <el-table-column prop="packageName" :label="lang_dict.packageName" width="180" />
              <el-table-column prop="jonNo" :label="lang_dict.jonNo" width="100" />
              <el-table-column prop="modelName" :label="lang_dict.modelName" width="180" />
              <el-table-column prop="process" :label="lang_dict.process" width="100" />
              <el-table-column prop="serialNo" :label="lang_dict.serialNo" width="140" />
              <el-table-column prop="totalCount" :label="lang_dict.totalCount" width="100" />
              <el-table-column prop="moStat" :label="lang_dict.moStat" width="100">
                <template slot-scope="scope">
                  <el-tag v-if="scope.row.moStat === '4'" size="small" type="success">{{ $t('PublicText.CompleteJob') }}</el-tag>
                  <el-tag v-else size="small">{{ $t('PublicText.NotCompleteJob') }}</el-tag>
                </template>
              </el-table-column>
              <el-table-column prop="xmAiGoFor" :label="lang_dict.xmAiGoFor" width="100" />
              <el-table-column prop="plCode" :label="lang_dict.plCode" width="100" />
              <el-table-column prop="pbdate" :label="lang_dict.pbdate" width="170" />
              <el-table-column prop="pedate" :label="lang_dict.pedate" width="170" />
              <el-table-column prop="create_user" :label="lang_dict.create_user" width="110" />
              <el-table-column prop="create_time" :label="lang_dict.create_time" width="180" />
              <el-table-column prop="schedule_mode" :label="lang_dict.schedule_mode" width="180" />
              <el-table-column prop="groupID" :label="lang_dict.groupID" width="180" />
              <el-table-column width="110" fixed="right" :label="$t('TablePage.TitleOperate')">
                <template slot-scope="scope">
                  <el-button
                    v-if="buttons.includes('GetSmtMoDataResData/modify')"
                    type="primary"
                    size="mini"
                    icon="el-icon-edit"
                    circle
                    @click="handleModify(scope.$index, scope.row)"
                  />
                  <el-button
                    v-if="buttons.includes('GetSmtMoDataResData/delete')"
                    type="danger"
                    size="mini"
                    icon="el-icon-delete"
                    circle
                    @click="handleDelete(scope.$index, scope.row)"
                  />
                </template>
              </el-table-column>
            </el-table>
            <el-pagination
              background
              :hide-on-single-page="true"
              :page-size="pageSize"
              :current-page="currentPage"
              layout="total, prev, pager, next, jumper"
              :total="total_num_xigao"
              style="margin-top: 16px;"
              @current-change="handlePageChange_XiGao"
            />
          </el-tab-pane>
        </el-tabs>

      </div>
    </el-card>
    <el-dialog
      v-el-drag-dialog
      :title="dialogTitle"
      :visible.sync="dataDialogVisible"
      width="60%"
      :before-close="handleFormClose"
      @dragDialog="handleDrag"
    >
      <el-form ref="$form" :model="model" label-position="left" size="small">
        <el-row :gutter="20" type="flex" justify="start" align="top" tag="div">
          <el-col :span="8" :offset="0" :push="0" :pull="0" tag="div">
            <el-form-item :rules="rules.apsId" prop="apsId" :label="lang_dict.apsId">
              <el-input v-model="model.apsId" :placeholder="$t('Placeholder.Enter')" clearable />
            </el-form-item>
          </el-col>
          <el-col :span="8" :offset="0" :push="0" :pull="0" tag="div">
            <el-form-item :rules="rules.jonNo" prop="jonNo" :label="lang_dict.jonNo">
              <el-input v-model="model.jonNo" :placeholder="$t('Placeholder.Enter')" clearable />
            </el-form-item>
          </el-col>
          <el-col :span="8" :offset="0" :push="0" :pull="0" tag="div">
            <el-form-item :rules="rules.packageName" prop="packageName" :label="lang_dict.packageName">
              <el-input v-model="model.packageName" :placeholder="$t('Placeholder.Enter')" clearable />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" type="flex" justify="start" align="top" tag="div">
          <el-col :span="8" :offset="0" :push="0" :pull="0" tag="div">
            <el-form-item :rules="rules.process" prop="process" :label="lang_dict.process">
              <el-input v-model="model.process" :placeholder="$t('Placeholder.Enter')" clearable />
            </el-form-item>
          </el-col>
          <el-col :span="8" :offset="0" :push="0" :pull="0" tag="div">
            <el-form-item :rules="rules.serialNo" prop="serialNo" :label="lang_dict.serialNo">
              <el-input v-model="model.serialNo" :placeholder="$t('Placeholder.Enter')" clearable />
            </el-form-item>
          </el-col>
          <el-col :span="8" :offset="0" :push="0" :pull="0" tag="div">
            <el-form-item :rules="rules.totalCount" prop="totalCount" :label="lang_dict.totalCount">
              <el-input v-model="model.totalCount" :placeholder="$t('Placeholder.Enter')" clearable />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" type="flex" justify="start" align="top" tag="div">
          <el-col :span="8" :offset="0" :push="0" :pull="0" tag="div">
            <el-form-item :rules="rules.modelName" prop="modelName" :label="lang_dict.modelName">
              <el-input v-model="model.modelName" :placeholder="$t('Placeholder.Enter')" clearable />
            </el-form-item>
          </el-col>
          <el-col :span="8" :offset="0" :push="0" :pull="0" tag="div">
            <el-form-item :rules="rules.moStat" prop="moStat" :label="lang_dict.moStat">
              <el-select v-model="model.moStat" :placeholder="$t('Placeholder.Select')" :style="{width: '100%'}">
                <el-option v-for="(item) in moStatOptions" :key="item.value" :label="item.label" :value="item.value" :disabled="!!item.disabled" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8" :offset="0" :push="0" :pull="0" tag="div">
            <el-form-item :rules="rules.xmAiGoFor" prop="xmAiGoFor" :label="lang_dict.xmAiGoFor">
              <el-input v-model="model.xmAiGoFor" :placeholder="$t('Placeholder.Enter')" clearable />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" type="flex" justify="start" align="top" tag="div">
          <el-col :span="8" :offset="0" :push="0" :pull="0" tag="div">
            <el-form-item :rules="rules.pbdate" prop="pbdate" :label="lang_dict.pbdate">
              <el-date-picker v-model="model.pbdate" :placeholder="$t('Placeholder.Select')" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" :style="{width: '100%'}" />
            </el-form-item>
          </el-col>
          <el-col :span="8" :offset="0" :push="0" :pull="0" tag="div">
            <el-form-item :rules="rules.pedate" prop="pedate" :label="lang_dict.pedate">
              <el-date-picker v-model="model.pedate" :placeholder="$t('Placeholder.Select')" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" :style="{width: '100%'}" />
            </el-form-item>
          </el-col>
          <el-col :span="8" :offset="0" :push="0" :pull="0" tag="div">
            <el-form-item :rules="rules.plCode" prop="plCode" :label="lang_dict.plCode">
              <el-input v-model="model.plCode" :placeholder="$t('Placeholder.Enter')" clearable />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" type="flex" justify="start" align="top" tag="div">
          <el-col :span="8" :offset="0" :push="0" :pull="0" tag="div">
            <el-form-item :rules="rules.create_user" prop="create_user" :label="lang_dict.create_user">
              <el-input v-model="model.create_user" placeholder="Auto" disabled />
            </el-form-item>
          </el-col>
          <el-col :span="8" :offset="0" :push="0" :pull="0" tag="div">
            <el-form-item :rules="rules.create_time" prop="create_time" :label="lang_dict.create_time">
              <el-input v-model="model.create_time" placeholder="Auto" disabled />
            </el-form-item>
          </el-col>
          <el-col :span="8" :offset="0" :push="0" :pull="0" tag="div">
            <el-form-item :rules="rules.schedule_mode" prop="schedule_mode" :label="lang_dict.schedule_mode">
              <el-input v-model="model.schedule_mode" placeholder="Auto" disabled />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" type="flex" justify="start" align="top" tag="div">
          <el-col :span="8" :offset="0" :push="0" :pull="0" tag="div">
            <el-form-item :rules="rules.groupID" prop="groupID" :label="lang_dict.groupID">
              <el-input v-model="model.groupID" placeholder="Auto" disabled />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleFormClose">{{ $t('PublicBtn.Close') }}</el-button>
        <el-button v-if="dialogBtnType === true" type="primary" @click="addData">{{ $t('TablePage.BtnAppend') }}</el-button>
        <el-button v-else-if="dialogBtnType === false" type="primary" @click="modifyData">{{ $t('TablePage.BtnModify') }}</el-button>
      </span>
    </el-dialog>

    <el-dialog
      v-el-drag-dialog
      :title="$t('TablePage.TitleFormDescription')"
      :visible.sync="helpDialogVisible"
      width="60%"
      @dragDialog="handleDrag"
    >
      <span>{{ $t('TablePage.MsgIllustrate') }}</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="helpDialogVisible = false">{{ $t('PublicBtn.Close') }}</el-button>
      </span>
    </el-dialog>

    <el-dialog
      v-el-drag-dialog
      :title="$t('TablePage.TitleImportData')"
      :visible.sync="importDialogVisible"
      width="60%"
      :before-close="handleImportClose"
      @dragDialog="handleDrag"
    >
      <el-row>
        <el-col :span="8">
          <el-radio-group v-model="importMode" style="margin-top: 26px;">
            <el-radio label="append">{{ $t('TablePage.BtnAppendData') }}</el-radio>
            <el-radio label="replace">{{ $t('TablePage.BtnReplaceData') }}</el-radio>
          </el-radio-group>
        </el-col>
        <el-col :span="16">
          <div style="display: flex;margin-top: 16px;margin-bottom: 16px;">
            <el-upload
              ref="upload"
              name="file"
              class="upload-demo"
              accept=".xlsx"
              action=""
              :on-change="handleChange"
              :auto-upload="false"
              :show-file-list="true"
              :file-list="uploadFileList"
            >
              <el-button slot="trigger" type="primary" style="margin-left: 10px;">
                <i class="el-icon-upload" />
                {{ this.$t('TablePage.BtnUploadFile') }}
              </el-button>
            </el-upload>
          </div>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleImportClose">{{ $t('PublicBtn.Close') }}</el-button>
        <el-button type="primary" @click="confirmImport">{{ $t('TablePage.BtnConfirmImport') }}</el-button>
      </span>
    </el-dialog>

    <el-dialog
      v-el-drag-dialog
      :title="$t('TablePage.TitleExportData')"
      :visible.sync="exportDialogVisible"
      :before-close="handleExportClose"
      width="45%"
      @dragDialog="handleDrag"
    >
      <el-row>
        <span>{{ $t('PublicBtn.ConfirmModify') }}</span>
        <el-radio-group v-model="exportRadio">
          <el-radio label="xlsx">.xlsx</el-radio>
        </el-radio-group>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleExportClose">{{ $t('PublicBtn.Close') }}</el-button>
        <el-button type="primary" @click="exportData">{{ $t('TablePage.BtnConfirmExport') }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import XLSX from 'xlsx'
import { mapGetters } from 'vuex'
// import { Loading } from 'element-ui'
import elDragDialog from '@/directive/el-drag-dialog'
import { GetTableData, GetAIData, GetXiGaoData, AddData, ModifyData, DeleteData, HandleDelete, ExportData, ImportData, DeleteAllData, SearchData, GetLangDict } from '@/api/DayConfig/GetSmtMoDataResData'
export default {
  name: 'GetSmtMoDataResData',
  directives: { elDragDialog },
  data() {
    return {
      loading: true, // 表格加载动画
      importLoading: {
        text: this.$t('PublicText.ImportLoadiing'),
        background: 'rgba(0, 0, 0, 0.5)'
      }, // 导入动画
      loadingInstance: null,
      activeName: 'AI',
      table_data_ai: [], // 表格AI数据
      table_data_xigao: [], // 表格锡膏数据
      dialogTitle: '', // 表单dialog标题
      dataDialogVisible: false, // 表单dialog显示
      dialogBtnType: true, // 表单dialog按钮 true为添加按钮 false为保存按钮
      helpDialogVisible: false, // 帮助提示dialog
      scopeIndex: '', // 表格行数index
      scopeRow: '', // 表格行数据
      importDialogVisible: false, // 导入数据dialog
      exportDialogVisible: false, // 导出dialog
      importType: false, // false为替换数据 true为添加数据
      uploadFileName: '', // 上传的文件名
      uploadFileList: [], // 上传的文件列表
      uploadFile: null, // 上传的文件
      importMode: 'replace', // 导入方式选择:追加或替换（方便以后扩展）
      exportRadio: 'xlsx', // 导出格式选择（方便以后扩展）
      isClick: false, // 是否点击了保存或者提交
      // 表单相关数据
      forms: ['$form'],
      model: {
        id: null,
        apsId: null,
        jonNo: null,
        packageName: null,
        pbdate: null,
        pedate: null,
        plCode: null,
        process: null,
        serialNo: null,
        totalCount: null,
        backProcedure: null,
        modelName: null,
        moStat: null,
        xmAiGoFor: null,
        create_user: null,
        create_time: null,
        schedule_mode: null,
        groupID: null
      },
      // 修改前的表单内容，用于对比表单前后的变化（应用：关闭前提示修改未保存）
      modelOriginal: {
        id: null,
        apsId: null,
        jonNo: null,
        packageName: null,
        pbdate: null,
        pedate: null,
        plCode: null,
        process: null,
        serialNo: null,
        totalCount: null,
        backProcedure: null,
        modelName: null,
        moStat: null,
        xmAiGoFor: null,
        create_user: null,
        create_time: null,
        schedule_mode: null
      },
      rules: {
      },
      // 分页相关
      total_num: 0, // 总共有多少条数据(后端返回)
      total_num_ai: 0,
      total_num_xigao: 0,
      currentPage: 1, // 当前在第几页
      currentPage_ai: 1,
      currentPage_xigao: 1,
      pageSize: 20, // 每页多少条数据
      dataTableSelections: [], // 表格选中的数据
      moStatOptions: [
        { value: '4', label: this.$t('PublicText.CompleteJob') },
        { value: '0', label: this.$t('PublicText.NotCompleteJob') }
      ],
      // 搜索相关
      serialNo_value: '',
      lang_dict: {}
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'buttons'
    ])
  },
  created() {
    GetLangDict().then(res => {
      this.lang_dict = res.lang_dict
    })
    this.getTableData(this.currentPage, this.pageSize)
  },
  mounted() {
    // this.getTableData(this.currentPage, this.pageSize)
  },
  methods: {
    // dialog可拖拽
    handleDrag() {
      // this.$refs.select.blur()
    },
    // AI分页
    handlePageChange_AI(val) {
      this.currentPage_ai = val
      const data = { 'current_page': this.currentPage_ai, 'page_size': this.pageSize }
      this.currentPage_ai = val
      GetAIData(data).then(res => {
        if (res.code === 20000) {
          // this.table_data = res.table_data
          this.table_data_ai = res.table_data_ai
          this.total_num_ai = res.total_num_ai
          this.loading = false
        }
      })
    },
    // 锡膏分页
    handlePageChange_XiGao(val) {
      this.currentPage_xigao = val
      const data = { 'current_page': this.currentPage_xigao, 'page_size': this.pageSize }
      this.currentPage_xigao = val
      GetAIData(data).then(res => {
        if (res.code === 20000) {
          // this.table_data = res.table_data
          this.table_data_xigao = res.table_data_xigao
          this.total_num_xigao = res.total_num_xigao
          this.loading = false
        }
      })
    },
    // 分页展示表格数据
    getTableData(currentPage, pageSize) {
      this.loading = true
      const data = { 'current_page': currentPage, 'page_size': pageSize }
      // 保留用于刷新界面和导出
      GetTableData(data).then(res => {
        if (res.code === 20000) {
          // this.table_data = res.table_data
          this.table_data_ai = res.table_data_ai
          this.table_data_xigao = res.table_data_xigao
          this.total_num_ai = res.total_num_ai
          this.total_num_xigao = res.total_num_xigao
          this.loading = false
        }
      })

      GetAIData(data).then(res => {
        if (res.code === 20000) {
          // this.table_data = res.table_data
          this.table_data_ai = res.table_data_ai
          this.total_num_ai = res.total_num_ai
          this.loading = false
        }
      })

      GetXiGaoData(data).then(res => {
        if (res.code === 20000) {
          this.table_data_xigao = res.table_data_xigao
          this.total_num_xigao = res.total_num_xigao
        }
      })
    },
    // 刷新表格数据
    refreshTableData(isAddData = false) {
      if (isAddData) { // 如果是导入/添加/点击刷新按钮，刷新时返回第一页
        this.currentPage = 1
        this.getTableData(1, this.pageSize)
      } else { // 否则只刷新当前页
        this.getTableData(this.currentPage, this.pageSize)
      }
    },
    deleteAllData() {
      this.$confirm(this.$t('TablePage.MsgDeleteDataAllData'), this.$t('PublicText.TextWarn'), {
        confirmButtonText: this.$t('PublicBtn.Confirm'),
        cancelButtonText: this.$t('PublicBtn.Cancel'),
        confirmButtonClass: 'btnDanger',
        type: 'warning'
      }).then(() => {
        DeleteAllData().then(res => {
          if (res.code === 20000) {
            this.$alert(res.message, this.$t('PublicText.TitleTip'), {
              confirmButtonText: this.$t('PublicBtn.Confirm'),
              type: 'success'
            })
            this.refreshTableData() // 刷新表格数据
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: this.$t('PublicText.TextCancel')
        })
      })
    },
    // 添加数据
    addDataDialog() {
      this.dialogTitle = this.$t('TablePage.TitleAppendData')
      this.dialogBtnType = true
      this.dataDialogVisible = true
      this.isClick = false
    },
    // 添加数据
    addData() {
      this.isClick = true
      const data = this.model
      data['user_name'] = this.name
      this.$refs['$form'].validate((valid) => {
        if (valid) {
          AddData(data).then(res => {
            if (res.code === 20000) {
              this.$notify({
                title: this.$t('PublicText.TitleTip'),
                message: this.$t('TablePage.MsgAppendSuccess'),
                type: 'success'
              })
              setTimeout(() => {
                this.closeFormDialog()
              }, 1000)
              this.refreshTableData(true)
            }
          })
        } else {
          this.$message({
            type: 'error',
            message: this.$t('TablePage.MsgAppendError')
          })
        }
      })
    },
    // 获取表格勾选数据
    handleSelectionChange(val) {
      this.dataTableSelections = val
    },
    // 删除所有表格勾选的数据
    deleteData() {
      const dataLength = this.dataTableSelections.length
      if (dataLength === 0) {
        this.$message({
          type: 'warning',
          message: this.$t('TablePage.MsgSelectWarn')
        })
        return
      }
      const idList = []
      for (let i = 0; i < dataLength; i++) {
        idList.push(this.dataTableSelections[i].id)
      }
      this.$confirm(this.$t('TablePage.MsgDeleteMultiDataWarn1') + dataLength + this.$t('TablePage.MsgDeleteMultiDataWarn2'), this.$t('PublicText.TitleTip'), {
        confirmButtonText: this.$t('PublicBtn.Confirm'),
        cancelButtonText: this.$t('PublicBtn.Cancel'),
        confirmButtonClass: 'btnDanger',
        type: 'warning'
      }).then(() => {
        const data = { 'id_list': idList, 'user_name': this.name }
        DeleteData(data).then(res => {
          if (res.code === 20000) {
            this.$notify({
              title: this.$t('PublicText.TitleTip'),
              message: this.$t('TablePage.MsgDeleteMultiDataWarn3') + dataLength + this.$t('TablePage.MsgDeleteMultiDataWarn4'),
              type: 'success'
            })
            this.refreshTableData() // 刷新表格数据
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: this.$t('PublicText.TextCancel')
        })
      })
    },
    // 修改数据
    handleModify(index, row) {
      // 修改dialog
      this.dialogTitle = this.$t('TablePage.TitleModifyData')
      this.dialogBtnType = false
      this.scopeIndex = index
      this.scopeRow = row
      // 显示表单数据
      for (const key in this.model) {
        this.model[key] = row[key]
      }
      // 保存原来的表单数据，用于对比变化
      for (const key in this.modelOriginal) {
        this.modelOriginal[key] = this.model[key]
      }
      // 显示dialog
      this.dataDialogVisible = true
      this.isClick = false
    },
    // 编辑数据发送到后端保存
    modifyData() {
      if (!this.checkFormChange()) {
        this.$message({
          type: 'info',
          message: this.$t('TablePage.MsgModifyInfo')
        })
        return
      }
      this.isClick = true
      const data = this.model
      data['user_name'] = this.name
      this.$refs['$form'].validate((valid) => {
        if (valid) {
          ModifyData(data).then(res => {
            if (res.code === 20000) {
              this.$notify({
                title: res.message,
                message: this.$t('TablePage.MsgModifySuccess'),
                type: 'success'
              })
              this.refreshTableData()
            }
          })
        } else {
          this.$message({
            type: 'error',
            message: this.$t('TablePage.MsgModifyError')
          })
        }
      })
    },
    // 检测表单数据是否发生变化，用于提示
    checkFormChange() {
      let isChange = false
      for (const key in this.model) {
        if (this.model[key] !== this.modelOriginal[key]) {
          isChange = true
          break
        }
      }
      return isChange
    },
    // 表单dialog关闭前提示
    handleFormClose() {
      if (this.checkFormChange() && !this.isClick) {
        this.$confirm(this.$t('TablePage.MsgModifyCloseWarn'), this.$t('PublicText.TitleTip'), {
          confirmButtonText: this.$t('PublicBtn.Confirm'),
          cancelButtonText: this.$t('PublicBtn.Cancel'),
          type: 'warning'
        }).then(() => {
          this.closeFormDialog()
        }).catch(() => {

        })
      } else {
        this.closeFormDialog()
      }
    },
    // 关闭表单dialog的一些操作
    closeFormDialog() {
      this.dataDialogVisible = false
      for (const key in this.model) {
        this.model[key] = null
        this.modelOriginal[key] = null
      }
      this.$refs['$form'].clearValidate() // 清除表单验证的文字提示信息
    },
    // 表格中删除数据
    handleDelete(index, row) {
      this.$confirm(this.$t('TablePage.MsgDeleteWarn'), this.$t('PublicText.TitleTip'), {
        confirmButtonText: this.$t('PublicBtn.Confirm'),
        cancelButtonText: this.$t('PublicBtn.Cancel'),
        confirmButtonClass: 'btnDanger',
        type: 'warning'
      }).then(() => {
        const data = {}
        data['id'] = row.id
        data['user_name'] = this.name
        HandleDelete(data).then(res => {
          if (res.code === 20000) {
            this.$notify({
              title: this.$t('PublicText.TitleTip'),
              message: this.$t('TablePage.MsgDeleteSuccess'),
              type: 'success'
            })
            this.refreshTableData()
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: this.$t('PublicText.TextCancel')
        })
      })
    },
    // Excel导入到数据库
    importDataDialog() {
      this.importDialogVisible = true
    },
    // 确认导入
    confirmImport() {
      if (this.importMode === 'replace') {
        this.$confirm(this.$t('TablePage.MsgImportReplace'), this.$t('PublicText.TitleTip'), {
          confirmButtonText: this.$t('PublicBtn.Confirm'),
          cancelButtonText: this.$t('PublicBtn.Cancel'),
          confirmButtonClass: 'btnDanger',
          type: 'warning'
        }).then(() => {
          this.importData()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: this.$t('PublicBtn.MsgUnimport')
          })
        })
      } else {
        this.importData()
      }
    },
    // 导入数据
    importData() {
      // this.loadingInstance = Loading.service(this.importLoading)
      const form = new FormData()
      form.append('file', this.uploadFile)
      form.append('file_name', this.uploadFileName)
      form.append('user_name', this.name)
      form.append('import_mode', this.importMode)
      ImportData(form).then(res => {
        if (res.code === 20000) {
          if (res.data_count >= 0) {
            this.$alert(this.$t('TablePage.MsgExportData1') + res.data_count + this.$t('TablePage.MsgExportData2'), res.message, {
              confirmButtonText: this.$t('PublicBtn.Confirm'),
              type: 'success'
            })
            setTimeout(() => {
              this.handleImportClose()
            }, 1000)
            this.refreshTableData(true)
          } else {
            this.$alert(res.message, this.$t('PublicText.TextError'), {
              confirmButtonText: this.$t('PublicBtn.Confirm'),
              type: 'error'
            })
          }
        }
      }).catch(err => {
        this.loadingInstance.close() // 清除动画
        this.$alert(err, this.$t('PublicText.TextError'), {
          confirmButtonText: this.$t('PublicBtn.Confirm'),
          type: 'error'
        })
      })
    },
    // 导入数据窗口关闭
    handleImportClose() {
      this.importDialogVisible = false
      // 清理已上传文件
      this.$refs.upload.clearFiles()
      this.uploadFileName = ''
      this.uploadFile = null
    },
    // 获取上传文件
    handleChange(file, fileList) {
      const fileName = file.name.replace(/\.xlsx$/, '')
      let regex, TextFileTypeError2
      if (sessionStorage.getItem('lang') === 'zh') {
        regex = /^(0[1-9]|1[0-2])(0[1-9]|[12][0-9]|3[01])(AI|点胶)(正排|预排).*$/
        TextFileTypeError2 = '（正确文件名示例：0901AI预排）'
      } else {
        regex = /^(0[1-9]|1[0-2])(0[1-9]|[12][0-9]|3[01])_(AI|DJ)_(Preliminary|Regular).*$/
        TextFileTypeError2 = '(Example of correct file name: 0901_DJBoard_Regular.xlsx)'
      }
      if (!regex.test(fileName)) {
        const tip = this.$t('SchedulePanelPage.TextFileTypeError1') + `<br/>` + TextFileTypeError2
        this.$alert(tip, this.$t('PublicText.TextError'), {
          confirmButtonText: this.$t('PublicBtn.Confirm'),
          dangerouslyUseHTMLString: true,
          type: 'error'
        })
        return
      }
      if (fileList.length > 0) {
        this.uploadFileList = [fileList[fileList.length - 1]] // 选择最后一次选择文件
        this.uploadFileName = this.uploadFileList[0].name // 更新文件名
        this.uploadFile = this.uploadFileList[0].raw // 更新文件
      }
    },
    // 数据库导出到Excel
    exportDataDialog() {
      this.exportDialogVisible = true
    },
    // 确认导出
    exportData() {
      ExportData().then(res => {
        if (res.code === 20000) {
          const dataCount = res.data_count
          const sheetData = res.table_data
          const fields = res.fields
          const tableName = res.table_name
          const fields_display = res.fields_display
          const newData = [fields_display, ...sheetData]
          const sheet = XLSX.utils.json_to_sheet(newData, { header: fields, skipHeader: true })
          const wb = XLSX.utils.book_new()
          XLSX.utils.book_append_sheet(wb, sheet, tableName)
          XLSX.writeFile(wb, tableName + '.xlsx')
          this.$notify({
            title: this.$t('TablePage.MsgExportSuccess'),
            message: this.$t('TablePage.MsgExportData1') + dataCount + this.$t('TablePage.MsgExportData2'),
            type: 'success'
          })
          // 1秒后自动关闭窗口
          setTimeout(() => {
            this.handleExportClose() // 导出后自动关闭窗口
          }, 1000)
        }
      })
    },
    // 导入数据窗口关闭
    handleExportClose() {
      this.exportDialogVisible = false
    },
    // 帮助提示按钮
    helpTips() {
      this.helpDialogVisible = true
    },
    // 按序列号搜索
    searchBy_serialNo() {
      if (this.serialNo_value === '') {
        this.$message({
          type: 'warning',
          message: this.$t('PublicText.SelectOneKeyWord')
        })
        return
      }
      SearchData({ 'serialNo': this.serialNo_value }).then(res => {
        this.table_data_ai = res.table_data
        this.table_data_xigao = res.table_data
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  @import '../../assets/css/common/TablePage';
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

.upload-demo {
  display: flex;
 }
.el-list-enter-active,
.el-list-leave-active {
  transition: none;
}
.el-list-enter,
.el-list-leave-active {
  opacity: 0;
}
.el-upload-list {
  height: 40px;
 }

.el-table .warning-row {
  color: #E6A23C;
}

</style>
