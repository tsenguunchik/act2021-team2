<template>
  <div class="home">
    <Header />
    <img alt="404" 
     src="https://illustatus.herokuapp.com/?title=Oops,%20Page%20not%20found&fill=%234f86ed"/>    
    <footer>
      <p>2021 ® All Rights Reserved. Made with ❤</p>
    </footer>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from "../components/Header";
import firebase from "firebase";
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters({
      user: "user",
    }),
  },
  name: "Home",
  components: {
    Header,
  },
  data() {
    return {
      defaultPhotoURL:
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      users: [],
    };
  },
  mounted() {
    let db = firebase.firestore();
    let ref = db.collection("aboutMe");
    ref
      .where("role", "==", "mentor")
      .get()
      .then(querySnapshot => {
        this.users = querySnapshot.docs.map(doc => ({
          uid: doc.id,
          friendList: [],
          ...doc.data(),
        }));
      })
      .catch(error => {
        console.log("Error getting documents: ", error);
      });
  },
};
</script>

<style lang="scss" scoped>
.hero {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  // height: 800px;
  padding: 100px 10px;
  overflow: hidden;
}
.hero-img {
  width: 100%;
  //max-width: 800px;
  height: auto;
  object-fit: cover;
  //border: 10px solid #fff;
  //transform: rotate(7deg);
  flex: 0 1 auto;
  margin: 0 50px;
}
.headline {
  flex: 0 0 auto;
  margin: 20px 50px 50px;
  font-size: 30px;
  color: #000;
  //font-family: Waiting for the Sunrise;
  font-weight: bold;
  text-align: center;
  text-shadow: 2px 2px #fdfcfc;
  div {
    ///transform: rotate(-8deg);
    &:not(:last-child) {
      margin-bottom: 18px;
    }
  }
}

section {
  padding: 30px 50px;
}
.users {
  background: rgba(255, 255, 255, 0.5);
  text-align: center;
  padding-bottom: 60px;
  h3 {
    font-size: 26px;
  }
  .user-card {
    display: inline-flex;
    align-items: center;
    text-align: left;
    // border-left: 6px solid #f78b7c;
    width: 300px;
    padding: 10px 10px;
    background: #fff;
    color: #888;
    margin: 10px;
    border-radius: 4px;
    text-decoration: none;
    font-size: 16px;
    img {
      flex: 0 0 auto;
      width: 80px;
      height: 80px;
      border-radius: 50%;
      overflow: hidden;
      object-fit: cover;
      margin-right: 20px;
    }
    .name {
      color: #222;
      font-size: 22px;
      font-weight: bold;
      margin-bottom: 5px;
    }
  }
}

footer {
  background: #f1ccb8;
  text-align: center;
  bottom: 0;
  p {
    padding: 6px 0;
    line-height: 20px;
    margin: 0;
  }
}

.home {
  background-image: url('../../src/assets/bricks.png');
  background-repeat: no-repeat;
  background-attachment: fixed;
}
</style>
