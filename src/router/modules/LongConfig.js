// 长期配置
import Layout from '@/layout'

const LongConfigRouter = {
  path: '/longconfig',
  component: Layout,
  redirect: '/longconfig/ledctata',
  alwaysShow: true,
  name: 'LongConfig',
  meta: {
    title: '长期配置',
    icon: 'el-icon-setting',
    roles: ['MP1AddLineData', 'NotMP1AddLineData', 'ExchangeLineData', 'LineData', 'CapacityChangeData', 'OptimizedMachineData',
      'ProcessData', 'EarlyDueDateBoard8', 'ChangeLineData', 'PairedSMTMachineData', 'CorrespondenceData', 'KeyBoardSpecialModel',
      'DispensingBeforeAIMachine', 'InterfaceConfig', 'EarlyDueDateGoWhereName', 'BoardAdvanceDate', 'DyeLineData',
      'ProcessSequenceMap', 'CustomerData']
  },
  children: [
    // {
    //   path: 'ledctata',
    //   component: () => import('@/views/LongConfig/LEDCTData'),
    //   name: 'LEDCTData',
    //   meta: {
    //     title: 'LED经验数据',
    //     roles: ['admin', 'common']
    //   }
    // },
    {
      path: 'mp1addlinedata',
      component: () => import('@/views/LongConfig/MP1AddLineData'),
      name: 'MP1AddLineData',
      meta: {
        title: 'MP1补线表',
        roles: ['MP1AddLineData']
      }
    },
    {
      path: 'notmp1addlinedata',
      component: () => import('@/views/LongConfig/NotMP1AddLineData'),
      name: 'NotMP1AddLineData',
      meta: {
        title: '非MP1补线表',
        roles: ['NotMP1AddLineData']
      }
    },
    {
      path: 'exchangelinedata',
      component: () => import('@/views/LongConfig/ExchangeLineData'),
      name: 'ExchangeLineData',
      meta: {
        title: '交换线别表',
        roles: ['ExchangeLineData']
      }
    },
    {
      path: 'linedata',
      component: () => import('@/views/LongConfig/LineData'),
      name: 'LineData',
      meta: {
        title: '产线配置表',
        roles: ['LineData']
      }
    },
    {
      path: 'capacitychangedata',
      component: () => import('@/views/LongConfig/CapacityChangeData'),
      name: 'CapacityChangeData',
      meta: {
        title: '产能变化表',
        roles: ['CapacityChangeData']
      }
    },
    {
      path: 'optimizedmachinedata',
      component: () => import('@/views/LongConfig/OptimizedMachineData'),
      name: 'OptimizedMachineData',
      meta: {
        title: '优化机种表',
        roles: ['OptimizedMachineData']
      }
    },
    // {
    //   path: 'setupdata',
    //   component: () => import('@/views/LongConfig/SetUpData'),
    //   name: 'SetUpData',
    //   meta: {
    //     title: '切换表',
    //     roles: ['admin']
    //   }
    // },
    {
      path: 'processdata',
      component: () => import('@/views/LongConfig/ProcessData'),
      name: 'ProcessData',
      meta: {
        title: '制程配置表',
        roles: ['ProcessData']
      }
    },
    // {
    //   path: 'keyBoardlinedata',
    //   component: () => import('@/views/LongConfig/KeyBoardLineData'),
    //   name: 'KeyBoardLineData',
    //   meta: {
    //     title: '按键板表',
    //     roles: ['admin', 'common']
    //   }
    // },
    {
      path: 'earlyduedateboard8',
      component: () => import('@/views/LongConfig/EarlyDueDateBoard8'),
      name: 'EarlyDueDateBoard8',
      meta: {
        title: '提早交期机种表',
        roles: ['EarlyDueDateBoard8']
      }
    },
    {
      path: 'changelinedata',
      component: () => import('@/views/LongConfig/ChangeLineData'),
      name: 'ChangeLineData',
      meta: {
        title: '线体变化表',
        roles: ['ChangeLineData']
      }
    },
    {
      path: 'pairedsmtmachinedata',
      component: () => import('@/views/LongConfig/PairedSMTMachineData'),
      name: 'PairedSMTMachineData',
      meta: {
        title: '配套板表',
        roles: ['PairedSMTMachineData']
      }
    },
    {
      path: 'correspondencedata',
      component: () => import('@/views/LongConfig/CorrespondenceData'),
      name: 'CorrespondenceData',
      meta: {
        title: 'AI点胶对应关系表',
        roles: ['CorrespondenceData']
      }
    },
    {
      path: 'keyboardspecialmodel',
      component: () => import('@/views/LongConfig/KeyBoardSpecialModel'),
      name: 'KeyBoardSpecialModel',
      meta: {
        title: '只烧录不打板特殊机种表',
        roles: ['KeyBoardSpecialModel']
      }
    },
    {
      path: 'dispensingbeforeaimachine',
      component: () => import('@/views/LongConfig/DispensingBeforeAIMachine'),
      name: 'DispensingBeforeAIMachine',
      meta: {
        title: '先点胶后AI特殊机种表',
        roles: ['DispensingBeforeAIMachine']
      }
    },
    {
      path: 'interfaceconfig',
      component: () => import('@/views/LongConfig/InterfaceConfig'),
      name: 'InterfaceConfig',
      meta: {
        title: '对接MES接口配置表',
        roles: ['InterfaceConfig']
      }
    },
    {
      path: 'earlyduedategowherename',
      component: () => import('@/views/LongConfig/EarlyDueDateGoWhereName'),
      name: 'EarlyDueDateGoWhereName',
      meta: {
        title: '去向列提前天数表',
        roles: ['EarlyDueDateGoWhereName']
      }
    },
    {
      path: 'boardadvancedate',
      component: () => import('@/views/LongConfig/BoardAdvanceDate'),
      name: 'BoardAdvanceDate',
      meta: {
        title: '后工序提早交期表',
        roles: ['BoardAdvanceDate', 'senioradmin']
      }
    },
    {
      path: 'dyelinedata',
      component: () => import('@/views/LongConfig/DyeLineData'),
      name: 'DyeLineData',
      meta: {
        title: '染色线体及阈值表',
        roles: ['DyeLineData']
      }
    },
    {
      path: 'processsequencmap',
      component: () => import('@/views/LongConfig/ProcessSequenceMap'),
      name: 'ProcessSequenceMap',
      meta: {
        title: '先后加工顺序对照表',
        roles: ['ProcessSequenceMap']
      }
    },
    {
      path: 'customerdata',
      component: () => import('@/views/LongConfig/CustomerData'),
      name: 'CustomerData',
      meta: {
        title: '客户识别表',
        roles: ['CustomerData']
      }
    }
  ]
}

export default LongConfigRouter
