import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },

  {
    path: '/example',
    component: Layout,
    redirect: '/example/table1',
    name: 'Example',
    meta: { title: '用户信息', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'table1',
        name: 'Table1',
        component: () => import('@/views/info/stuinfo'),
        meta: { title: '学生信息', icon: 'table' }
      },
      {
        path: 'table2',
        name: 'Table2',
        component: () => import('@/views/info/staffinfo'),
        meta: { title: '职工信息', icon: 'table' }
      },
      {
        path: 'table3',
        name: 'Table3',
        component: () => import('@/views/info/workerinfo'),
        meta: { title: '维修人员信息', icon: 'table' }
      },
      // {
      //   path: 'tree',
      //   name: 'Tree',
      //   component: () => import('@/views/tree/index'),
      //   meta: { title: 'Tree', icon: 'tree' }
      // }
    ]
  },

  {
    path: '/form',
    component: Layout,
    redirect: '/form/form1',
    name: 'Form',
    meta: { title: '内容发布', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'form1',
        name: 'Form',
        component: () => import('@/views/content/news'),
        meta: { title: '新闻资讯', icon: 'form' }
      },
      {
        path: 'form2',
        name: 'Form',
        component: () => import('@/views/content/notice'),
        meta: { title: '通知公告', icon: 'form' }
      },
      
    ]
  },

  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/table',
    name: 'Nested',
    meta: {
      title: '维修任务管理',
      icon: 'nested'
    },
        children: [
      {
        path: 'table1',
        name: 'Table',
        component: () => import('@/views/mission/report'),
        meta: { title: '待处理', icon: 'table' }
      },
      {
        path: 'table2',
        name: 'Table',
        component: () => import('@/views/mission/inprogress'),
        meta: { title: '维修中', icon: 'table' }
      },
      {
        path: 'table3',
        name: 'Table',
        component: () => import('@/views/mission/completed'),
        meta: { title: '已完成', icon: 'table' }
      },
    ]
  },
  {
    path: '/nested2',
    component: Layout,
    redirect: '/nested/table',
    name: 'Nested',
    meta: {
      title: '意见反馈管理',
      icon: 'nested'
    },
      children: [
      {
        path: 'table1',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: { title: '未处理', icon: 'table' }
      },
      {
        path: 'table2',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: { title: '已完成', icon: 'table' }
      },
    ]
  },



  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
