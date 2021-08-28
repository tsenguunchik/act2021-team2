import "modern-normalize/modern-normalize.css";
import Vue from "vue";
// import Vuetify from 'vuetify'
import ElementUI from "element-ui";
// import "vuetify/dist/vuetify.min.css";
import "element-ui/lib/theme-chalk/index.css";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import firebase from "firebase";
import Loading from "./components/Loading";
import VueScrollTo from "vue-scrollto";
import VueDisqus from "vue-disqus";

// Vue.use(Vuetify);
Vue.use(ElementUI);
Vue.use(VueScrollTo);
Vue.use(VueDisqus);

Vue.component("Loading", Loading);

Vue.config.productionTip = false;

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCg278TuG-YBjbOxDyoP6SZ_rJj0VehUQY",
  authDomain: "guide-sign.firebaseapp.com",
  projectId: "guide-sign",
  storageBucket: "guide-sign.appspot.com",
  messagingSenderId: "1045823408219",
  appId: "1:1045823408219:web:34c1af7a26c79bc5b9d77e",
  measurementId: "G-DHMNEF6SGX",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

let app = null;
firebase.auth().onAuthStateChanged(user => {
  // console.log(user);
  store.dispatch("fetchUser", user);

  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App),
    }).$mount("#app");
  }
});
