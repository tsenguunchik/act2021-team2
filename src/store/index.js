import Vue from "vue";
import Vuex from "vuex";
import firebase from "firebase";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      loading: true,
      loggedIn: false,
      data: null,
    },
    userData: null,
    eventData: [],
  },
  getters: {
    user(state) {
      return state.user;
    },
    userData(state) {
      return state.userData;
    },
  },
  mutations: {
    SET_LOGGED_IN(state, value) {
      state.user.loggedIn = value;
      state.user.loading = false;
    },
    SET_USER(state, data) {
      state.user.data = data;
    },
    SET_USER_DATA(state, data) {
      state.userData = data;
    },
    SET_EVENT_DATA(state, data) {
      state.eventData = data;
    },
  },
  actions: {
    fetchUser({ commit, dispatch }, user) {
      commit("SET_LOGGED_IN", user !== null);
      if (user) {
        commit("SET_USER", {
          displayName: user.displayName,
          photoURL: user.photoURL,
          email: user.email,
          uid: user.uid,
        });
        dispatch("fetchUserData");
      } else {
        commit("SET_USER", null);
        commit("SET_USER_DATA", null);
      }
    },
    fetchUserData({ commit, state }) {
      if (!state.user.data || !state.user.data.uid) return;

      let db = firebase.firestore();
      let docRef = db.collection("aboutMe").doc(state.user.data.uid);
      let event = db.collection("aboutMe");
      docRef.get().then(doc => {
        if (doc.exists) {
          commit("SET_USER_DATA", doc.data());
        }
      });
      event.get().then(doc => {
        if (doc.exists) {
          console.log(doc.data());
          commit("SET_EVENT_DATA", doc.data());
        }
      });
    },
    fetchEventData({ commit }) {
      let db = firebase.firestore();
      let event = db.collection("aboutMe");
      event.get().then(doc => {
        if (doc.exists) {
          console.log(doc.data());
          commit("SET_EVENT_DATA", doc.data());
        }
      });
    },
  },
  modules: {},
});
