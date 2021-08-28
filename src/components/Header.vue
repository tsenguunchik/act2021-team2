<template>
  <header class="header">
    <v-app-bar
      color="deep-purple accent-4"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer">
          {{ appTitle }}
        </router-link>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <div class="logged-in" v-if="user.loggedIn">
        <router-link class="profile-wrapper" :to="`/user/${user.data.uid}`">
          <div class="name" v-if="user.data.displayName">
            {{ user.data.displayName }}
          </div>
          <v-avatar
            :color="$vuetify.breakpoint.smAndDown ? 'grey darken-3' : 'transparent'"
            size="32"
          ></v-avatar>

          <el-avatar
            size="large"
            :src="
              user.data.photoURL ||
                'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
            "
          />
        </router-link>
        <el-dropdown trigger="click" @command="dropDownClick">
          <i class="el-icon-more" />
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item class="link">
              <router-link to="/setting">Setting</router-link>
            </el-dropdown-item>
            <el-dropdown-item divided command="logout">Logout</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div v-else class="visiter">
        <router-link class="login" to="/login">LOGIN</router-link>
        <router-link class="signUp" to="/sign-up">SIGN UP</router-link>
      </div>

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      absolute
      bottom
      temporary
    >
      <v-list
        nav
        dense
      >
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item>
            <v-list-item-title>Foo</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>Bar</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>Fizz</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>Buzz</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <!-- <router-link to="/">
      <img src="../assets/amsa.png" class="logo">
    </router-link>
    <h1>Amsa Guide</h1>

    <div class="right" v-if="!user.loading">
      <div class="logged-in" v-if="user.loggedIn">
        <router-link class="profile-wrapper" :to="`/user/${user.data.uid}`">
          <div class="name" v-if="user.data.displayName">
            {{ user.data.displayName }}
          </div>
          <el-avatar
            size="large"
            :src="
              user.data.photoURL ||
                'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
            "
          />
        </router-link>
        <el-dropdown trigger="click" @command="dropDownClick">
          <i class="el-icon-more" />
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item class="link">
              <router-link to="/setting">Setting</router-link>
            </el-dropdown-item>
            <el-dropdown-item divided command="logout">Logout</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div v-else class="visiter">
        <router-link class="login" to="/login">LOGIN</router-link>
        <router-link class="signUp" to="/sign-up">SIGN UP</router-link>
      </div>
    </div> -->
  </header>
</template>

<script>
import firebase from "firebase";
import { mapGetters } from "vuex";
export default {
  data(){
    return {
      appTitle: 'Amsa Guide',
      drawer: false,
      group: null,
    }
  },
  watch: {
    group () {
      this.drawer = false
    },
  },
  computed: {
    ...mapGetters({
      user: "user",
    }),
  },
  methods: {
    dropDownClick(command) {
      if (command === "logout") {
        this.logout();
      }
    },
    logout() {
      console.log("logout");
      firebase
        .auth()
        .signOut()
        .then(() => {
          // Sign-out successful.
          this.$router.push("/");
        })
        .catch(error => {
          // An error happened.
          alert("Error when logout: ", error.message);
        });
    },
  },
};
</script>