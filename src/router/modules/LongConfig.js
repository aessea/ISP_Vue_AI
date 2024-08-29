// 长期配置
import Layout from '@/layout'

const LongConfigRouter = {
  path: '/longconfig',
  component: Layout,
  redirect: '/longconfig/ledctata',
  alwaysShow: true,
  name: 'LongConfig',
  meta: {
    title: 'LongConfig',
    icon: 'el-icon-setting',
    roles: [
      'MP1AddLineData', 'NotMP1AddLineData', 'ExchangeLineData', 'LineData', 'CapacityChangeData', 'OptimizedMachineData',
      'ProcessData', 'EarlyDueDateBoard8', 'ChangeLineData', 'PairedSMTMachineData', 'CorrespondenceData', 'KeyBoardSpecialModel',
      'DispensingBeforeAIMachine', 'EarlyDueDateGoWhereName', 'BoardAdvanceDate', 'DyeLineData', 'ProcessSequenceMap',
      'CustomerData', 'DelayPackingLine', 'ForceLineData', 'ContinuousData', 'GroupAloneData'
    ]
  },
  children: [
    {
      path: 'delaypackingline',
      component: () => import('@/views/LongConfig/DelayPackingLine'),
      name: 'DelayPackingLine',
      meta: {
        title: 'DelayPackingLine',
        roles: ['DelayPackingLine']
      }
    },
    {
      path: 'mp1addlinedata',
      component: () => import('@/views/LongConfig/MP1AddLineData'),
      name: 'MP1AddLineData',
      meta: {
        title: 'MP1AddLineData',
        roles: ['MP1AddLineData']
      }
    },
    {
      path: 'notmp1addlinedata',
      component: () => import('@/views/LongConfig/NotMP1AddLineData'),
      name: 'NotMP1AddLineData',
      meta: {
        title: 'NotMP1AddLineData',
        roles: ['NotMP1AddLineData']
      }
    },
    {
      path: 'exchangelinedata',
      component: () => import('@/views/LongConfig/ExchangeLineData'),
      name: 'ExchangeLineData',
      meta: {
        title: 'ExchangeLineData',
        roles: ['ExchangeLineData']
      }
    },
    {
      path: 'linedata',
      component: () => import('@/views/LongConfig/LineData'),
      name: 'LineData',
      meta: {
        title: 'LineData',
        roles: ['LineData']
      }
    },
    {
      path: 'capacitychangedata',
      component: () => import('@/views/LongConfig/CapacityChangeData'),
      name: 'CapacityChangeData',
      meta: {
        title: 'CapacityChangeData',
        roles: ['CapacityChangeData']
      }
    },
    {
      path: 'optimizedmachinedata',
      component: () => import('@/views/LongConfig/OptimizedMachineData'),
      name: 'OptimizedMachineData',
      meta: {
        title: 'OptimizedMachineData',
        roles: ['OptimizedMachineData']
      }
    },
    {
      path: 'processdata',
      component: () => import('@/views/LongConfig/ProcessData'),
      name: 'ProcessData',
      meta: {
        title: 'ProcessData',
        roles: ['ProcessData']
      }
    },
    {
      path: 'earlyduedateboard8',
      component: () => import('@/views/LongConfig/EarlyDueDateBoard8'),
      name: 'EarlyDueDateBoard8',
      meta: {
        title: 'EarlyDueDateBoard8',
        roles: ['EarlyDueDateBoard8']
      }
    },
    {
      path: 'changelinedata',
      component: () => import('@/views/LongConfig/ChangeLineData'),
      name: 'ChangeLineData',
      meta: {
        title: 'ChangeLineData',
        roles: ['ChangeLineData']
      }
    },
    {
      path: 'pairedsmtmachinedata',
      component: () => import('@/views/LongConfig/PairedSMTMachineData'),
      name: 'PairedSMTMachineData',
      meta: {
        title: 'PairedSMTMachineData',
        roles: ['PairedSMTMachineData']
      }
    },
    {
      path: 'correspondencedata',
      component: () => import('@/views/LongConfig/CorrespondenceData'),
      name: 'CorrespondenceData',
      meta: {
        title: 'CorrespondenceData',
        roles: ['CorrespondenceData']
      }
    },
    {
      path: 'keyboardspecialmodel',
      component: () => import('@/views/LongConfig/KeyBoardSpecialModel'),
      name: 'KeyBoardSpecialModel',
      meta: {
        title: 'KeyBoardSpecialModel',
        roles: ['KeyBoardSpecialModel']
      }
    },
    {
      path: 'dispensingbeforeaimachine',
      component: () => import('@/views/LongConfig/DispensingBeforeAIMachine'),
      name: 'DispensingBeforeAIMachine',
      meta: {
        title: 'DispensingBeforeAIMachine',
        roles: ['DispensingBeforeAIMachine']
      }
    },
    {
      path: 'earlyduedategowherename',
      component: () => import('@/views/LongConfig/EarlyDueDateGoWhereName'),
      name: 'EarlyDueDateGoWhereName',
      meta: {
        title: 'EarlyDueDateGoWhereName',
        roles: ['EarlyDueDateGoWhereName']
      }
    },
    {
      path: 'boardadvancedate',
      component: () => import('@/views/LongConfig/BoardAdvanceDate'),
      name: 'BoardAdvanceDate',
      meta: {
        title: 'BoardAdvanceDate',
        roles: ['BoardAdvanceDate']
      }
    },
    {
      path: 'dyelinedata',
      component: () => import('@/views/LongConfig/DyeLineData'),
      name: 'DyeLineData',
      meta: {
        title: 'DyeLineData',
        roles: ['DyeLineData']
      }
    },
    {
      path: 'customerdata',
      component: () => import('@/views/LongConfig/CustomerData'),
      name: 'CustomerData',
      meta: {
        title: 'CustomerData',
        roles: ['CustomerData']
      }
    },
    {
      path: 'forcelinedata',
      component: () => import('@/views/LongConfig/ForceLineData'),
      name: 'ForceLineData',
      meta: {
        title: 'ForceLineData',
        roles: ['ForceLineData']
      }
    },
    {
      path: 'continuousdata',
      component: () => import('@/views/LongConfig/ContinuousData'),
      name: 'ContinuousData',
      meta: {
        title: 'ContinuousData',
        roles: ['ContinuousData']
      }
    },
    {
      path: 'groupalonedata',
      component: () => import('@/views/LongConfig/GroupAloneData'),
      name: 'GroupAloneData',
      meta: {
        title: 'GroupAloneData',
        roles: ['GroupAloneData']
      }
    }
  ]
}

export default LongConfigRouter
