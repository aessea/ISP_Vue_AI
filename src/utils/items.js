// 常用变量

// 所有线体
const LineOptions = [
  { value: 'V1', label: 'V1' }, // label为显示值，value为真实值
  { value: 'V2', label: 'V2' },
  { value: 'V3', label: 'V3' },
  { value: 'V4', label: 'V4' },
  { value: 'V5', label: 'V5' },
  { value: 'V6', label: 'V6' },
  { value: 'V7', label: 'V7' },
  { value: 'V8', label: 'V8' },
  { value: 'V9', label: 'V9' }
]
// 制程
const ProcessOptions = [
  { value: 'S', label: 'S' },
  { value: 'P-S', label: 'P-S' },
  { value: 'B-AD', label: 'B-AD' }
]
// 用户权限
const PermissionOptions = [
  { value: 'admin', label: '超级管理员' },
  { value: 'senioradmin', label: '高级管理员' },
  { value: 'common', label: '普通管理员' },
  { value: 'program', label: '程序员' }
]
const lineOptions = [
  'V1', 'V2', 'V3', 'V4', 'V6'
]

const lineTypeOptions = [
  { label: 'AI线', value: 1 },
  { label: '点胶线', value: 2 }
]

const lineSizeTypeOptions = [
  { label: '小工单线', value: 1 },
  { label: '中小工单线', value: 2 },
  { label: '中工单线', value: 3 },
  { label: '中大工单线', value: 4 },
  { label: '大工单线', value: 5 },
  { label: '未知', value: 0 }
]

const lockedList = ['锁定', '新增锁定', '新上锁定', '插入锁定']
const unLockedList = ['未锁定', '新上排程', '未上排程']
export { LineOptions, ProcessOptions, PermissionOptions, lineOptions, lockedList, unLockedList, lineTypeOptions, lineSizeTypeOptions }
