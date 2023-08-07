// 每日配置
import Layout from '@/layout'

const SchedulePanelRouter = {
  path: '/control',
  component: Layout,
  redirect: '/control/schedulepanel',
  alwaysShow: true,
  name: 'Control',
  meta: {
    title: '控制面板',
    icon: 'component',
    roles: ['SchedulePanel', 'ParamsConfig', 'AnalysisControl']
  },
  children: [
    {
      path: 'schedulepanel',
      component: () => import('@/views/Control/SchedulePanel'),
      name: 'SchedulePanel',
      meta: {
        title: 'AI点胶排程',
        roles: ['SchedulePanel']
      }
    },
    {
      path: 'paramsconfig',
      component: () => import('@/views/Control/ParamsConfig'),
      name: 'ParamsConfig',
      meta: {
        title: '排程配置表',
        roles: ['ParamsConfig']
      }
    },
    {
      path: 'analysiscontrol',
      component: () => import('@/views/Control/AnalysisControl'),
      name: 'AnalysisControl',
      meta: {
        title: '分析推送面板',
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
    // }
  ]
}

export default SchedulePanelRouter
