import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './assets/css/style.css';
import VueSocketIO from 'vue-socket.io';

Vue.config.productionTip = false;

let connectionOptions =  {
  "force new connection" : true,
  "reconnectionAttempts": "Infinity", //avoid having user reconnect manually in order to prevent dead clients after a server restart
  "timeout" : 10000, //before connect_error and connect_timeout are emitted.
  "transports" : ["websocket"]
};

Vue.use(new VueSocketIO({
  debug: true,
  connection: 'http://localhost:8081/',
  vuex: {
    store,
    actionPrefix: 'SOCKET_',
    mutationPrefix: ''
  },
  options: connectionOptions
}));

new Vue({
  // el: '#app',
  router,
  store,
  // template: '<App/>',
  components: { App },
  render: h => h(App)
}).$mount('#app');
