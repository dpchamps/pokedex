//Vue, Vue Plugins, and App Entry Point
import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';

//Import Libraries for adding to the Vue prototype
import keydown from './assets/eventListeners/keydown';
import axios from 'axios';

//cherry pick lodash, we're already pushing what's acceptable for space
var _ = {
    'debounce' : require('lodash/debounce'),
    'extend'   : require('lodash/extend'),
    'throttle' : require('lodash/throttle')
};

import errorHandle from './assets/scripts/error';
import log from './assets/scripts/log'

Vue.prototype.$lodash = _;
Vue.prototype.axios = axios;
Vue.prototype.eventObject = {
    keydown : keydown
};
Vue.prototype.errorHandle = errorHandle(_);
window.log = log(3);
//Import Style via a style loader
require('./assets/scripts/style-loader.js');

//...Mixins
Vue.mixin({
  created(){
      this.transEndEvt = this.whichTransitionEnd();
  },
  methods: {
      pad: require('./mixins/pad'),
      whichTransitionEnd: require('./mixins/transitionEnd')
  }
});


window.Pokedex = {};
Pokedex.dispatch = new Vue();
Pokedex.apiUrls = {
    pokemon: 'https://pokeapi.co/api/v2/pokemon/',
    pokedex: 'https://pokeapi.co/api/v2/pokedex/'
};

Pokedex.app = new Vue({
  el: '#app',
  render: h => h(App)
});


