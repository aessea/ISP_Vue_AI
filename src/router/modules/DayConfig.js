// 每日配置
import Layout from '@/layout'

const DayConfigRouter = {
  path: '/dayconfig',
  component: Layout,
  redirect: '/dayconfig/blocktimedata',
  alwaysShow: true,
  name: 'DayConfig',
  meta: {
    title: 'DayConfig',
    icon: 'el-icon-setting',
    roles: ['BlockTimeData', 'PackHoliday', 'ProgramData', 'ProductionReportData', 'NoProgramData',
      'NetworkBoard', 'TestProgramData', 'ProductProgramData', 'PackagingLineHoliday', 'DJHoliday', 'GetSmtMoDataResData']
  },
  children: [
    {
      path: 'blocktimetata',
      component: () => import('@/views/DayConfig/BlockTimeData'),
      name: 'BlockTimeData',
      meta: {
        title: 'BlockTimeData',
        roles: ['BlockTimeData']
      }
    },
    {
      path: 'getsmtmodataresdata',
      component: () => import('@/views/DayConfig/GetSmtMoDataResData'),
      name: 'GetSmtMoDataResData',
      meta: {
        title: 'GetSmtMoDataResData',
        roles: ['GetSmtMoDataResData']
      }
    },
    {
      path: 'gettrydata',
      component: () => import('@/views/DayConfig/GetTryData'),
      name: 'GetTryData',
      meta: {
        title: 'GetTryData',
        roles: ['GetTryData']
      }
    },
    {
      path: 'packaginglineHoliday',
      component: () => import('@/views/DayConfig/PackagingLineHoliday'),
      name: 'PackagingLineHoliday',
      meta: {
        title: 'PackagingLineHoliday',
        roles: ['PackagingLineHoliday']
      }
    },
    {
      path: 'packholiday',
      component: () => import('@/views/DayConfig/PackHoliday'),
      name: 'PackHoliday',
      meta: {
        title: 'PackHoliday',
        roles: ['PackHoliday']
      }
    },
    {
      path: 'djholiday',
      component: () => import('@/views/DayConfig/DJHoliday'),
      name: 'DJHoliday',
      meta: {
        title: 'DJHoliday',
        roles: ['DJHoliday']
      }
    },
    {
      path: 'programdata',
      component: () => import('@/views/DayConfig/ProgramData'),
      name: 'ProgramData',
      meta: {
        title: 'ProgramData',
        roles: ['ProgramData']
      }
    },
    {
      path: 'productionreportdata',
      component: () => import('@/views/DayConfig/ProductionReportData'),
      name: 'ProductionReportData',
      meta: {
        title: 'ProductionReportData',
        roles: ['ProductionReportData']
      }
    },
    {
      path: 'noprogramdata',
      component: () => import('@/views/DayConfig/NoProgramData'),
      name: 'NoProgramData',
      meta: {
        title: 'NoProgramData',
        roles: ['NoProgramData']
      }
    },
    {
      path: 'networkboard',
      component: () => import('@/views/DayConfig/NetworkBoard'),
      name: 'NetworkBoard',
      meta: {
        title: 'NetworkBoard',
        roles: ['NetworkBoard']
      }
    },
    {
      path: 'testprogramdata',
      component: () => import('@/views/DayConfig/TestProgramData'),
      name: 'TestProgramData',
      meta: {
        title: 'TestProgramData',
        roles: ['TestProgramData']
      }
    },
    {
      path: 'productprogramdata',
      component: () => import('@/views/DayConfig/ProductProgramData'),
      name: 'ProductProgramData',
      meta: {
        title: 'ProductProgramData',
        roles: ['ProductProgramData']
      }
    },
    {
      path: 'aimatchjobrule',
      component: () => import('@/views/DayConfig/AiMatchJobRule'),
      name: 'AiMatchJobRule',
      meta: {
        title: 'AiMatchJobRule',
        roles: ['AiMatchJobRule']
      }
    }
  ]
}

export default DayConfigRouter
