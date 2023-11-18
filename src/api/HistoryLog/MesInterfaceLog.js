import request from '../../utils/request'
// 获取表格数据分页获取
export function GetTableData(data) {
  return request({
    url: '/HistoryLog/MesInterfaceLog/get_table_data/',
    method: 'post',
    data
  })
}
export function ExportData(data) {
  return request({
    url: '/HistoryLog/MesInterfaceLog/export_data/',
    method: 'post',
    data
  })
}
export function SearchData(data) {
  return request({
    url: '/HistoryLog/MesInterfaceLog/search_data/',
    method: 'post',
    data
  })
}
