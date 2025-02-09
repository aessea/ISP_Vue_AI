// 每日配置
import Layout from '@/layout'

const SchedulePanelRouter = {
  path: '/control',
  component: Layout,
  redirect: '/control/schedulepanel',
  alwaysShow: true,
  name: 'Control',
  meta: {
    title: 'Control',
    icon: 'component',
    roles: ['SchedulePanel', 'ParamsConfig', 'AnalysisControl', 'OutsourceControl']
  },
  children: [
    {
      path: 'schedulepanel',
      component: () => import('@/views/Control/SchedulePanel'),
      name: 'SchedulePanel',
      meta: {
        title: 'SchedulePanel',
        roles: ['SchedulePanel']
      }
    },
    // {
    //   path: 'configmain',
    //   component: () => import('@/views/Control/ConfigMain'),
    //   name: 'ConfigMain',
    //   meta: {
    //     title: 'AI排程配置',
    //     roles: ['admin', 'common']
    //   }
    // },
    // {
    //   path: 'configsmall',
    //   component: () => import('@/views/Control/ConfigSmall'),
    //   name: 'ConfigSmall',
    //   meta: {
    //     title: '点胶排程配置',
    //     roles: ['admin', 'common']
    //   }
    // },
    {
      path: 'paramsconfig',
      component: () => import('@/views/Control/ParamsConfig'),
      name: 'ParamsConfig',
      meta: {
        title: 'ParamsConfig',
        roles: ['ParamsConfig']
      }
    },
    {
      path: 'analysiscontrol',
      component: () => import('@/views/Control/AnalysisControl'),
      name: 'AnalysisControl',
      meta: {
        title: 'AnalysisControl',
        roles: ['AnalysisControl']
      }
    }
    // {
    //   path: 'onlinetable',
    //   component: () => import('@/views/Control/OnlineTable'),
    //   name: 'OnlineTable',
    //   meta: {
    //     title: '在线表格',
    //     roles: ['admin', 'common', 'senioradmin']
    //   }
    // },
    // {
    //   path: 'outsourcecontrol',
    //   component: () => import('@/views/Control/OutsourceControl'),
    //   name: 'OutsourceControl',
    //   meta: {
    //     title: '外包控制面板',
    //     roles: ['OutsourceControl']
    //   }
    // }
  ]
}

export default SchedulePanelRouter
