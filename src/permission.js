import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()
  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  const hasToken = getToken()

  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' });
      NProgress.done()
    } else {
      const hasGetUserInfo = store.getters.userInfo;
      if (hasGetUserInfo) {
        if (('/' + to.params.path) === from.path) {
          next()
        } else {
          let fullPath = store.state.permission.fullRoutes;
          let hasPath = fullPath.filter(e => {
            return to.path === e.path
          });
          if (hasPath.length) {
            next()
          } else {
            NProgress.done()
            Message.warning(store.getters.language === 'zh' ? '暂无权限' : 'No Permission');
            next(false)
          }
        }
      } else {
        try {
          store.dispatch('getPaymentList', 'default settlement tool');
          store.dispatch('getTransport', 'transportation method');
          // get user info
          await store.dispatch('getInfo');

          const accessRoutes = await store.dispatch('getAsyncRoutes');
          router.addRoutes([...accessRoutes, { path: '*', redirect: '/404', hidden: true }]);
          next({ ...to, replace: true })
          // next(false)
        } catch (error) {
          // remove token and go to login page to re-login
          await store.dispatch('resetToken');
          Message.error(error || 'Has Error');
          next(`/login?redirect=${to.path}`);
          NProgress.done()
        }
      }
      // next()
    }
  } else {
    /* has no token*/

    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      // next()
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
