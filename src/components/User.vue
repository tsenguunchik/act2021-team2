<template>
  <div class="user-component">
    <div class="menu">
      <div class="menu-top">
        <div class="profile-wrapper">
          <img :src="data.photoURL || defaultPhotoURL" alt="avatar" />
        </div>
      </div>
      <!-- <div class="menu-item-after menu-item-top-after" /> -->
      <div class="menu-bottom">
        <div class="menu-item-before menu-about-me" />
        <button class="menu-item menu-about-me" @click="scrollTo('#about-me')">
          About Me
        </button>
        <div class="menu-item-after menu-about-me" />
        <div class="menu-item-before menu-event-list" />
        <button
          class="menu-item menu-event-list"
          @click="scrollTo('#event-list')"
        >
          Event List
        </button>
        <div class="menu-item-after menu-event-list" />
        <div class="menu-item-before menu-my-classes" />
        <button
          class="menu-item menu-my-classes"
          @click="scrollTo('#my-classes')"
        >
          Specialties
        </button>
        <!-- <div class="menu-item-after menu-my-classes" /> -->
        <!-- <div class="menu-item-before menu-future-goals" /> -->
        <!-- <button
          class="menu-item menu-future-goals"
          @click="scrollTo('#future-goals')"
        >
          Schedule
        </button> -->
        <!-- <div class="menu-item-after menu-future-goals" /> -->
        <!-- <div class="menu-item-before menu-comments" /> -->
        <!-- <button class="menu-item menu-comments" @click="scrollTo('#comments')">
          Comments
        </button> -->
        <!-- <div class="menu-item-after menu-comments" /> -->
        <!-- <div class="menu-item-bottom-block" /> -->
      </div>
    </div>
    <div id="content" class="content">
      <div class="toolbar">
        <el-button
          v-if="loggedIn && isSelf"
          type="primary"
          round
          @click="() => $router.push('/setting')"
        >
          Edit profile
        </el-button>
        <el-button
          v-if="
            loggedIn &&
              !isSelf &&
              (!currentUserData.eventList ||
                !currentUserData.eventList.includes(uid))
          "
          type="primary"
          round
          @click="dialogEventVisible = true"
          >+ New Event</el-button
        >
        <el-button
          v-if="
            loggedIn &&
              !isSelf &&
              currentUserData.eventList &&
              currentUserData.eventList.includes(uid)
          "
          type="info"
          plain
          round
          @click="onUnfriend"
        >
          Un-friend
        </el-button>
      </div>
      <div id="about-me" class="content-aboutMe">
        <div class="aboutMe-upDown">
          <div class="aboutMe-down">
            <!-- <div class="down-left">
              <div class="img-wrapper">
                <img
                  v-if="data.aboutMeImgUrl"
                  :src="data.aboutMeImgUrl"
                  alt="profile image"
                />
                <img v-else src="../assets/keropi2.jpg" alt="profile image" />
              </div>
            </div> -->
            <div class="down-right" v-if="data">
              <h2>Hi, I'm {{ data.displayName ? data.displayName : "..." }}</h2>
              <div v-if="data.aboutMe">{{ data.aboutMe }}</div>
              <div v-else>I'm too lazy to write something about myself...</div>
            </div>
          </div>
        </div>
      </div>
      <div id="event-list" class="section content-eventList">
        <div class="eventList-upDown">
          <div class="eventList-up">
            <h2>Event Lists</h2>
          </div>
          <div class="eventList-down">
            <el-row :gutter="20">
              <el-col :span="6" v-for="(o, index) in eventData" :key="o" :offset="index > 0 ? 1 : 0">
                <el-card :body-style="{ padding: '4px' }">
                  <div slot="header" class="clearfix">
                    <span>Event name</span>
                  </div>
                  <div style="padding: 14px;">
                    <p>When: {{o.date}}</p>
                    <p>Created: {{o.createdBy}}</p>
                    <div class="bottom clearfix">
                      <!-- <time class="time">{{ currentDate }}</time> -->
                      <el-button type="text" class="button">Approve</el-button>
                      <el-button type="text" class="button">Deny</el-button>
                    </div>
                  </div>
                </el-card>
                <br>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
      <div id="my-classes" class="section content-myClass">
        <div class="myClass-upDown">
          <div class="myclass-up">
            <h2>Skills</h2>
          </div>
          <div
            class="myclass-down"
            v-if="data.skills && data.skills.length"
          >
            <div class="class-tag" v-for="(c, i) in data.skills" :key="i">
              {{ c }}
            </div>
          </div>
        </div>
      </div>
      <div id="future-goals" class="section content-futureGoal">
        <div class="futureGoal-upDown">
          <div class="futrueGoal-up">
            <h2>Schedule</h2>
          </div>
          <div
            class="futureGoal-down"
            v-if="data.futureGoals && data.futureGoals.length"
          >
            <div v-for="(c, i) in data.futureGoals" :key="i">
              <div class="futureGoal-list">
                {{ c }}
              </div>
              <br />
            </div>
          </div>
        </div>
      </div>
      <!-- <div id="comments" class="section content-comments">
        <div class="comments-upDown">
          <div class="comments-up">
            <h2>Comments</h2>
          </div>
          <div class="comments-down">
            <vue-disqus
              :key="uid"
              shortname="bb-all-about-me"
              :identifier="uid"
              :url="currentURL"
            />
          </div>
        </div>
      </div> -->

      <!-- <div v-for="i in [...Array(100)]" :key="i">content</div> -->
      <footer>
        <p>2021 ® All Rights Reserved. Made with ❤</p>
      </footer>

      <el-dialog title="Shipping address" :visible.sync="dialogEventVisible">
        <el-form :model="form">
          <el-form-item label="Promotion name" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="Zones" :label-width="formLabelWidth">
            <el-select v-model="form.region" placeholder="Please select a zone">
              <el-option label="Zone No.1" value="shanghai"></el-option>
              <el-option label="Zone No.2" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">Cancel</el-button>
          <el-button type="primary" @click="dialogFormVisible = false">Confirm</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  props: {
    data: Object,
    loggedIn: Boolean,
    isSelf: Boolean,
    uid: String,
    currentUser: Object,
    currentUserData: Object,
  },
  data() {
    return {
      defaultPhotoURL:
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      eventData: {
        Gb7EwpDbTzXJJnmiSLNN0Y8C8tm2: {
          date: "2021/08/28",
          time: "13:00",
          createdBy: "Altangerel",
          displayName: "test4"
        },
        JtR7FxoFGMhURvIio5qHPn1mhLk1: {
          date: "2021/08/29",
          time: "15:00",
          createdBy: "Jamsrandorj",
          displayName: "test4"
        },
        JtR7FxoFGMhURvIio5qHP1mhLk1: {
          date: "2021/08/29",
          time: "15:00",
          createdBy: "Oyungerel",
          displayName: "test4"
        },
        JtR7FxoFGMURvIio5qHPn1mhLk1: {
          date: "2021/08/29",
          time: "15:00",
          createdBy: "Tuguldur",
          displayName: "test4"
        },
        JtRFxoFGMhURvIio5qHPn1mhLk1: {
          date: "2021/08/29",
          time: "15:00",
          createdBy: "Chimedregzen",
          displayName: "test4"
        },
      },
      dialogEventVisible: false,
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
    };
  },
  computed: {
    currentURL() {
      return window.location.href;
    },
  },
  watch: {
    "data.eventList": {
      handler() {
        this.fetcheventList();
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    scrollTo(selector) {
      this.$scrollTo(document.querySelector(selector), 300, {
        container: document.querySelector("#content"),
        offset: -40,
      });
    },
    onAddFriend() {
      if (!this.loggedIn) return;

      let db = firebase.firestore();
      db.collection("aboutMe")
        .doc(this.currentUser.uid)
        .update({
          eventList: firebase.firestore.FieldValue.arrayUnion(this.uid),
        })
        .then(() => {
          // console.log("add friend success");
          this.$store.dispatch("fetchUserData");
        })
        .catch(() => {
          // console.error("Error when add friend: " + err.message);
        });
    },
    onNewEvent() {},
    onUnfriend() {
      if (!this.loggedIn) return;

      let db = firebase.firestore();
      db.collection("aboutMe")
        .doc(this.currentUser.uid)
        .update({
          eventList: firebase.firestore.FieldValue.arrayRemove(this.uid),
        })
        .then(() => {
          // console.log("un-friend success");
          this.$store.dispatch("fetchUserData");
        })
        .catch(() => {
          // console.error("Error when un-friend: " + err.message);
        });
    },
    fetcheventList() {
      // if (!this.data.eventList) return;

      // let db = firebase.firestore();
      // this.data.eventList.forEach(uid => {
      //   let docRef = db.collection("aboutMe").doc(uid);
      //   docRef.get().then(doc => {
      //     if (doc.exists) {
      //       this.$set(this.friendData, uid, doc.data());
      //     }
      //   });
      // });
      console.log(this.friendData);
    },
  },
};
</script>

<style lang="scss" scoped>
.user-component {
  display: flex;
  height: calc(100vh - 64px);
  color: #333333;
}
.menu {
  width: 240px;
  overflow-x: hidden;
  overflow-y: auto;
  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
  }
  /* Hide scrollbar for IE and Edge */
  -ms-overflow-style: none;

  .menu-top {
    padding: 20px;
    text-align: left;
    background: #fff;
    border-bottom-right-radius: 50px;
    .profile-wrapper {
      border-radius: 50%;
      width: 120px;
      height: 120px;
      overflow: hidden;
      margin: 0 auto;
      img {
        width: 120px;
        height: 120px;
        object-fit: cover;
      }
    }
  }
  .menu-bottom {
    display: flex;
    flex-direction: column;
    $dark: 5%;
    .menu-about-me {
      background: lighten(#f55066, $dark);
    }
    .menu-event-list {
      background: lighten(#f78b7c, $dark);
    }
    .menu-my-classes {
      background: lighten(#fcae69, $dark);
    }
    .menu-future-goals {
      background: lighten(#bace5c, $dark);
    }
    .menu-comments {
      background: lighten(#c7c1c1, $dark);
    }
    .menu-item {
      height: 60px;
      // background: none;
      color: #333;
      border: none;
      font-weight: bold;
      padding: 0;
      cursor: pointer;
      outline: inherit;
      transition: all 0.3s;
      border-top-left-radius: 50px;
      border-bottom-right-radius: 50px;
      overflow: hidden;
      &:hover {
        // opacity: ;
      }
    }
  }
  .menu-item-before,
  .menu-item-after {
    position: relative;
    &:before {
      content: "";
      position: absolute;
      background: inherit;
    }
  }
  .menu-item-before {
    &:before {
      top: -50px;
      right: 0;
      width: 50px;
      height: 50px;
      z-index: -1;
    }
  }
  .menu-item-after {
    &:before {
      bottom: -50px;
      left: 0;
      width: 50px;
      height: 50px;
      z-index: -1;
    }
  }
  .menu-item-top-after {
    background: #fca9d0;
  }
  .menu-item-bottom-block {
    border-top-left-radius: 50px;
    background: #ffbaba;
    height: 50px;
    overflow: hidden;
  }
}
.content {
  flex: 1;
  overflow-x: hidden;
  overflow-y: auto;
  // word-break: break-word;
  .toolbar {
    min-height: 70px;
    padding: 5px 40px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    > * {
      margin: 10px;
    }
  }
  .section {
    background: rgba(255, 227, 243, 0.5);
    padding: 0.5rem 2.5rem 1.5rem 2.5rem;
    margin: 50px;
    border-radius: 5px;
    // line-height: 1.5;
    h2 {
      font-size: 22px;
      // font-family: "Carter One", cursive;
      // font-family: "Leckerli One", cursive;
      // font-family: "McLaren", cursive;
    }
  }

  .content-aboutMe {
    padding: 0rem 2.5rem 0.5rem 2.5rem;
    .aboutMe-down {
      display: flex;
      padding: 0 70px;
      align-items: center;
    }
    .down-left {
      flex: 1 0 35%;
      .img-wrapper {
        border: 5px solid #f55066;
        transform: translate(-5px, 5px);
        position: relative;
        padding-top: 133%;
      }
      img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        border: 5px solid #fff;
        transform: translate(10px, -10px);
      }
    }
    .down-right {
      flex: 1 0 65%;
      overflow: auto;
      &::-webkit-scrollbar {
        background: transparent;
      }
      align-items: center;
      margin: 15px 0 15px 25px;
      white-space: pre-wrap;
      padding: 20px 30px;
      background: rgba(255, 255, 255, 0.5);
      color: #000;
      border-radius: 3px;
      min-height: 200px;
      max-height: 300px;
      line-height: 1.5;
      //font-family: "Kalam", cursive;
      font-size: 20px;
      h2 {
        margin: 0 0 14px;
        font-size: 36px;
        color: #0B4EDD;
        //font-family: "Gaegu", cursive;
      }
    }
  }

  .content-eventList {
    border-left: 9px solid #f78b7c;
    .friend-tag {
      display: inline-flex;
      align-items: center;
      border-left: 6px solid #f78b7c;
      padding: 10px 30px;
      background: #ffbaba;
      color: #000;
      margin: 10px;
      border-radius: 4px;
      font-size: 20px;
      text-decoration: none;
      img {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        overflow: hidden;
        object-fit: cover;
        margin-right: 20px;
      }
    }
  }

  .content-myClass {
    // border-top: 9px solid orange;
    border-left: 9px solid #fcae69;
    .myclass-down {
      .class-tag {
        border-left: 6px solid #fcae69;
        padding: 10px 30px;
        display: inline-block;
        background: #ffbaba;
        color: #000;
        margin: 10px;
        border-radius: 4px;
        //font-family: "Boogaloo", cursive;
        font-size: 20px;
      }
    }
  }

  .content-futureGoal {
    border-left: 9px solid #bace5c;
    .futureGoal-list {
      border-left: 6px solid #bace5c;
      padding: 10px 30px;
      display: inline-block;
      background: #ffbaba;
      color: #000;
      margin: 10px;
      border-radius: 4px;
    }
  }

  .content-comments {
    border-left: 9px solid #c7c1c1;
    //  #d2bcd5;
  }

  footer {
    background: #f1ccb8;
    text-align: center;
    p {
      padding: 6px 0;
      line-height: 20px;
      margin: 0;
    }
  }
}
</style>
