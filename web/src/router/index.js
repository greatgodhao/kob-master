import store from '@/store/index'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    redirect: "/pk/",
    meta: {
      requestAuth: true,
    }
  },
  {
    path: '/pk/',
    name: 'pk_index',
    component: () => import('../views/pk/PkIndexView.vue'),
    meta: {
      requestAuth: true,
    }
  },
  {
    path: '/record/',
    name: 'record_index',
    component: () => import('../views/record/RecordIndexView.vue'),
    meta: {
      requestAuth: true,
    }
  },
  {
    path: "/record/:recordId/",
    name: "record_content",
    component: () => import('../views/record/RecordContentView.vue'),
    meta: {
      requestAuth: true,
    }
  },
  {
    path: '/ranklist/',
    name: 'ranklist_index',
    component: () => import('../views/ranklist/RankListIndexView.vue'),
    meta: {
      requestAuth: true,
    }
  },
  {
    path: '/user/bot/',
    name: 'user_bot_index',
    component: () => import('../views/user/bot/UserBotIndexView.vue'),
    meta: {
      requestAuth: true,
    }
  },
  {
    path: '/user/account/login/',
    name: 'user_account_login',
    component: () => import('../views/user/account/UserAccountLoginView.vue'),
    meta: {
      requestAuth: false,
    }
  },
  {
    path: '/user/account/register/',
    name: 'user_account_register',
    component: () => import('../views/user/account/UserAccountRegisterView.vue'),
    meta: {
      requestAuth: false,
    }
  },
  {
    path: '/404/',
    name: '404',
    component: () => import('../views/error/NotFoundView.vue'),
    meta: {
      requestAuth: false,
    }
  },
  {
    path: '/:catch(.*)',
    redirect: "/404",
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if(to.meta.requestAuth && !store.state.user.is_login) {
    next({name: "user_account_login"});
  } else {
    next();
  }
})

export default router
