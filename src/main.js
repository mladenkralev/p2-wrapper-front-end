import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'vuetify/dist/vuetify.min.css' 
import VueApexCharts from 'vue-apexcharts'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Vuetify from 'vuetify'

import VModal from 'vue-js-modal'
Vue.use(VModal)

Vue.use(BootstrapVue);
Vue.use(VueApexCharts)
Vue.use(VueAxios, axios)
Vue.component('apexchart', VueApexCharts)
Vue.use(Vuetify)

import CustomFab from './components/CustomFab.vue'
Vue.component("custom-fab" , CustomFab)

import RepositoryTable from './components/RepositoryTable.vue'
Vue.component("repository-table" , RepositoryTable)

import Sidebar from './components/Sidebar.vue'
Vue.component("sidebar" , Sidebar)

import RepositoriesView from './components/RepositoriesView.vue'
Vue.component("repositories-view" , RepositoriesView)

import ProfilesView from './components/ProfilesView.vue'
Vue.component("profiles-view" , ProfilesView)

new Vue({
  el: '#app',
  render: h => h(App)
})
