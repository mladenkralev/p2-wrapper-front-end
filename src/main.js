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
import VueLodash from 'vue-lodash'
import VModal from 'vue-js-modal'

const options = { name: 'lodash' } // customize the way you want to call it

Vue.use(VueLodash, options) // options is optional
Vue.use(VModal)
Vue.use(BootstrapVue);
Vue.use(VueApexCharts)
Vue.use(VueAxios, axios)
Vue.component('apexchart', VueApexCharts)
Vue.use(Vuetify)

//Custom components
import CustomFab from './components/CustomFab.vue'
Vue.component("custom-fab" , CustomFab)

import InstallableUnitsTable from './components/InstallableUnitsTable.vue'
Vue.component("installable-units-table" , InstallableUnitsTable)

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
