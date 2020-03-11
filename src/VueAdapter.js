import Vue from 'vue';
import Router from 'vue-router';
import Vuex, { Store } from 'vuex';

Vue.config.productionTip = false;
Vue.use(Router);
Vue.use(Vuex);

import ViewAdapter from "./ViewAdapter";

const hasProp = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
const assign = (obj, props) => {
  for (let prop in props) {
    if(hasProp(props, prop) && props[prop]) {
      obj[prop] = props[prop]
    }
  }
}

class VueAdapter extends ViewAdapter {
  constructor() {
    super();
    this.router = new Router({ base: process.env.BASE_URL || "", mode: "history" })
    this.modules = {};
    this.getters = {};
    this.Vue = Vue;
    this._rendered = false;
  }
  addRoutes(_routes) {
    let routes = Array.isArray(_routes) ? _routes : [_routes]
    this.router.addRoutes(routes)
  }
  addModules(_modules) {
    if (typeof _modules === 'object') assign(this.modules, _modules)
  }
  addGetters(_getters) {
    if (typeof _getters === 'object') assign(this.getters, _getters)
  }
  render(el) {
    if (this._rendered) return;
    this.store = new Store({
      modules: this.modules,
      getters: this.getters
    });
    new Vue({
      router: this.router,
      store: this.store,
      render: h => {
        return h('div', h('router-view'))
      }
    }).$mount(el);
    this._rendered = true;
  }
}

export default VueAdapter;
