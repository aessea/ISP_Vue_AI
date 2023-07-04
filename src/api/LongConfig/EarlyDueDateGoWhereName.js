import request from '../../utils/request'
// 获取表格数据 分页获取
export function GetTableData(data) {
  return request({
    url: '/LongConfig/EarlyDueDateGoWhereName/get_table_data/',
    method: 'post',
    data
  })
}
// 添加数据
export function AddData(data) {
  return request({
    url: '/LongConfig/EarlyDueDateGoWhereName/add_data/',
    method: 'post',
    data
  })
}
// 修改数据
export function ModifyData(data) {
  return request({
    url: '/LongConfig/EarlyDueDateGoWhereName/modify_data/',
    method: 'post',
    data
  })
}
// 删除勾选的数据
export function DeleteData(data) {
  return request({
    url: '/LongConfig/EarlyDueDateGoWhereName/delete_data/',
    method: 'post',
    data
  })
}
// 删除一条数据
export function HandleDelete(data) {
  return request({
    url: '/LongConfig/EarlyDueDateGoWhereName/handle_delete/',
    method: 'post',
    data
  })
}
// 确认导入数据
export function ImportData(data) {
  return request({
    url: '/LongConfig/EarlyDueDateGoWhereName/import_data/',
    method: 'post',
    data
  })
}
// 确认导出数据
export function ExportData() {
  return request({
    url: '/LongConfig/EarlyDueDateGoWhereName/export_data/',
    method: 'get'
  })
}
