import request from '../../utils/request'
// 修改数据
export function DoImportSchedule(data) {
  return request({
    url: '/Control/AnalysisControl/do_import_schedule/',
    method: 'post',
    data
  })
}
