import Vue from 'vue'
import Router from 'vue-router'

import AppView from '@/components/app-view'
import Home from '@/pages/home'

Vue.use(Router)

const page = name => () => import('@/pages/' + name)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '',
      component: AppView,
      children: [
        {path: '/', name: 'home', component: Home},
        {path: '/button', name: 'c-button', component: page('c-button')},
        {path: '/switch', name: 'c-switch', component: page('c-switch')},
        {path: '/checkbox', name: 'c-checkbox', component: page('c-checkbox')},
        {path: '/alert', name: 'c-alert', component: page('c-alert')},
        {path: '/input', name: 'c-input', component: page('c-input')},
        {path: '/keyboard', name: 'c-keyboard', component: page('c-keyboard')},
        {path: '/loading', name: 'c-loading', component: page('c-loading')},
        {path: '/data-table', name: 'p-data-table', component: page('table')},
        {path: '/dropdown', name: 'c-dropdown', component: page('c-dropdown')},
        {path: '/navbar', name: 'c-navbar', component: page('c-navbar')},
        {path: '/container', name: 'c-container', component: page('c-container')},
        {path: '/demo', name: 'demo', component: page('demo')},
        {path: '/404', name: '404', component: page('404')},
        {path: '/500', name: '500', component: page('500')},
        {path: '/about', name: 'about', component: page('about')},
        {path: '/gis-master-map', name: 'gis-master-map', component: page('gis-master-map')},
        {path: '/gis-info-form', name: 'gis-info-form', component: page('gis-info-form')},
        {path: '/gis-population-density', name: 'gis-population-density', component: page('gis-population-density')},
        {path: '/gis-information-map', name: 'gis-information-map', component: page('gis-information-map')},
        {path: '/dev-master-map', name: 'dev-master-map', component: page('dev-master-map')},
        {path: '/dev-translate', name: 'dev-translate', component: page('dev-translate')},
        {path: '/dev-search', name: 'dev-search', component: page('dev-search')},
        {path: '/Leaflet', name: 'Leaflet', component: page('Leaflet')},
        {path: '/Random', name: 'Random', component: page('Random')}
      ]
    },
    {path: '/login', name: 'login', component: page('login')},
    {path: '/cnode', name: 'cnode', component: page('cnode')},
    // pages
    {path: '/home-login', name: 'p-login', component: page('home-login')},
    {path: '/register', name: 'p-register', component: page('register')},
    {path: '/keyboard', name: 'p-keyboard', component: page('c-keyboard')},
    {path: '*', redirect: {name: '404'}}
  ]
})
