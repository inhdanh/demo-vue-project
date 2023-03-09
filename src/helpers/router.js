import { createRouter, createWebHistory } from 'vue-router'
import { USER } from '../constants'

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../components/HomePage.vue')
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../components/HomePage.vue')
    },
    {
      path: '/purchase-order',
      name: 'purchaseOrder',
      component: () => import('../components/PurchaseOrderPage.vue')
    },
    {
      path: '/purchase-order/:id',
      name: 'purchaseOrderDetail',
      component: () => import('../components/PurchaseOrderDetail.vue')
    },
    {
      path: '/purchase-order/add',
      name: 'createPurchaseOrder',
      component: () => import('../components/PurchaseOrderDetail.vue')
    },
    {
      path: '/payment-request',
      name: 'paymentRequest',
      component: () => import('../components/PaymentRequestPage.vue')
    },
    {
      path: '/setting',
      name: 'setting',
      component: () => import('../components/SettingPage.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../components/LoginPage.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  // chuyển đến trang login nếu chưa được login
  const publicPages = ['/login', '/register']
  const authRequired = !publicPages.includes(to.path)
  const loggedIn = localStorage.getItem(USER)

  if (authRequired && !loggedIn) {
    return next('/login')
  }

  next()
})
