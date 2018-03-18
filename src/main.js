// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Authentication from './Authentication'
import { MdDatepicker, MdApp, MdField, MdButton, MdContent, MdMenu, MdList, MdSpeedDial, MdCard, MdRipple, MdTooltip, MdDialog, MdDialogConfirm, MdSnackbar, MdProgress, MdSwitch, MdToolbar, MdSubheader, MdCheckbox } from 'vue-material/dist/components'
// import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
// import 'vue-material/dist/theme/default.css'
import './css/theme.scss'
import './css/style.css'
import _ from 'lodash'
import KandyJS from './kandy'
Vue.prototype.$kandyJS = KandyJS
Vue.prototype.$_ = _
Vue.config.productionTip = false
Vue.use(MdDatepicker)
Vue.use(MdApp)
Vue.use(MdField)
Vue.use(MdButton)
Vue.use(MdContent)
Vue.use(MdSpeedDial)
Vue.use(MdMenu)
Vue.use(MdList)
Vue.use(MdCard)
Vue.use(MdRipple)
Vue.use(MdTooltip)
Vue.use(MdDialog)
Vue.use(MdSnackbar)
Vue.use(MdProgress)
Vue.use(MdDialogConfirm)
Vue.use(MdSwitch)
Vue.use(MdToolbar)
Vue.use(MdSubheader)
Vue.use(MdCheckbox)
router.beforeEach((to, from, next) => {
  console.log(store.getters.loginData)
  if (to.path !== '/login') {
    if (Authentication.checkToken()) {
      console.log('There is a token, resume. (' + to.path + ')')
      next()
    } else {
      console.log('There is no token, redirect to login. (' + to.path + ')')
      // Authentication.closeSession()
      next('/login')
    }
  } else {
    console.log('Youre on the login page')
    next()
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
