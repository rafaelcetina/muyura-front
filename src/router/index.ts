import Vue from 'vue';
import VueRouter,{ RouteConfig  } from 'vue-router'
// @ts-ignore
import VueRouteMiddleware from 'vue-route-middleware'
// @ts-ignore
import AuthMiddleware from '@/router/middleware/auth';
// @ts-ignore
import RedirectMiddleware from '@/router/middleware/redirect';
import Full from '@/containers/Full.vue';
import Dashboard from '@/views/Dashboard.vue'
import Peliculas from '@/views/Peliculas.vue'
import Turnos from '@/views/Turnos.vue'
import Admins from '@/views/Admins.vue'
import Perfil from '@/views/Perfil.vue'
import FullLogin from '@/containers/FullLogin.vue'
import Login from '@/views/auth/Login.vue'

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
    {
        path: '/',
        name: 'FullLogin',
        redirect: '/login',
        component: FullLogin,
        meta: {
            middleware: [ RedirectMiddleware ]
        },
        children: [
            {
                path: 'login',
                name: 'LoginForm',
                component: Login,
            }
        ]
    },
    {
        path: '/admin',
        name: 'Full',
        redirect: '/admin/dashboard',
        component: Full,
        children: [
            {
                path: 'dashboard',
                name: 'Dashboard',
                component: Dashboard,
                meta: {
                    middleware: [ AuthMiddleware ]
                }
            },
            {
                path: 'peliculas',
                name: 'Peliculas',
                component: Peliculas,
                meta: {
                    middleware: [ AuthMiddleware ]
                }
            },
            {
                path: 'turnos',
                name: 'Turnos',
                component: Turnos,
                meta: {
                    middleware: [ AuthMiddleware ]
                }
            },
            {
                path: 'admins',
                name: 'Admins',
                component: Admins,
                meta: {
                    middleware: [ AuthMiddleware ]
                }
            },
            {
                path: 'perfil',
                name: 'Perfil',
                component: Perfil,
                meta: {
                    middleware: [ AuthMiddleware ]
                }
            },
        ]
    },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(VueRouteMiddleware());

export default router
