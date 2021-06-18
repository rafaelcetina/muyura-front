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
import Beneficiarios from '@/views/Beneficiarios.vue'
import Usuarios from '@/views/Usuarios.vue'
import Perfil from '@/views/Perfil.vue'
import FullLogin from '@/containers/FullLogin.vue'
import Login from '@/views/auth/Login.vue'
import Reportes from "@/views/Reportes.vue";

const Entregables = () => import(/* webpackChunkName: "entregables" */ "@/views/Catalogos/Entregables.vue")
const Pulseras = () => import(/* webpackChunkName: "pulseras" */ "@/views/Catalogos/Pulseras.vue")
const Sedes = () => import(/* webpackChunkName: "sedes" */ "@/views/Catalogos/Sedes.vue")
const Unidades = () => import(/* webpackChunkName: "unidades" */ "@/views/Catalogos/Unidades.vue")
const Regiones = () => import(/* webpackChunkName: "regiones" */ "@/views/Catalogos/Regiones.vue")
const Servicios = () => import(/* webpackChunkName: "servicios" */ "@/views/Catalogos/Servicios.vue")
const Estudios = () => import(/* webpackChunkName: "estudios" */ "@/views/Catalogos/Estudios.vue")
const Tabletas = () => import(/* webpackChunkName: "tabletas" */ "@/views/Catalogos/Tabletas.vue")
const Municipios = () => import(/* webpackChunkName: "municipios" */ "@/views/Catalogos/Municipios.vue")
const Localidades = () => import(/* webpackChunkName: "localidades" */ "@/views/Catalogos/Localidades.vue")

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
                name: 'dashboard',
                component: Dashboard,
                meta: {
                    middleware: [ AuthMiddleware ]
                }
            },
            {
                path: 'beneficiarios',
                name: 'beneficiarios',
                component: Beneficiarios,
                meta: {
                    middleware: [ AuthMiddleware ]
                }
            },
            {
                path: 'usuarios',
                name: 'usuarios',
                component: Usuarios,
                meta: {
                    middleware: [ AuthMiddleware ]
                }
            },
            {
                path: 'reportes',
                name: 'reportes',
                component: Reportes,
                meta: {
                    middleware: [ AuthMiddleware ]
                }
            },
            {
                path: 'perfil',
                name: 'perfil',
                component: Perfil,
                meta: {
                    middleware: [ AuthMiddleware ]
                }
            },
            {
                path: 'catalogos',
                redirect: 'catalogos/entregables',
                name: 'Catalogos',
                meta: {
                    middleware: [ AuthMiddleware ]
                },
                component: {
                    render(c) {
                        return c('router-view');
                    }
                },
                children: [
                    {
                        path: 'entregables',
                        name: 'entregables',
                        component: Entregables
                    },
                    {
                        path: 'pulseras',
                        name: 'pulseras',
                        component: Pulseras,
                    },

                    {
                        path: 'sedes',
                        name: 'sedes',
                        component: Sedes,
                    },
                    {
                        path: 'unidades',
                        name: 'unidades',
                        component: Unidades,
                    },
                    {
                        path: 'regiones',
                        name: 'regiones',
                        component: Regiones,
                    },
                    {
                        path: 'servicios',
                        name: 'servicios',
                        component: Servicios,
                    },
                    {
                        path: 'estudios',
                        name: 'estudios',
                        component: Estudios,
                    },
                    {
                        path: 'tabletas',
                        name: 'tabletas',
                        component: Tabletas,
                    },
                    {
                        path: 'municipios',
                        name: 'municipios',
                        component: Municipios,
                    },
                    {
                        path: 'localidades',
                        name: 'localidades',
                        component: Localidades,
                    },
                ]
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
