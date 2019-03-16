<template>
  <div class="navbar navbar-fixed">
    <nav class="indigo darken-2">
      <div class="container">
        <router-link :to="{ name: 'Home' }" class="brand-logo left">QuizFlash!</router-link>
        <ul class="right">
          <li v-if="!user">
            <router-link :to="{ name: 'Signup' }">Signup</router-link>
          </li>
          <li v-if="!user">
            <router-link :to="{ name: 'Login' }">Login</router-link>
          </li>
          <li v-if="user">
            <a>{{ this.username }}</a>
          </li>
          <li v-if="user">
            <a @click="logout">Logout</a>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
import firebase from "firebase";
import db from "@/firebase/init";

export default {
  name: "Navbar",
  data() {
    return {
      user: null,
      username: null
    };
  },
  created() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.user = user;
      } else {
        this.user = null;
      }
    });

    // get username
    let user = firebase.auth().currentUser;
    let ref = db.collection("users");
    ref
      .where("user_id", "==", user.uid)
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          this.username = doc.data().username;
        });
      });
  },
  methods: {
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.push({ name: "Login" });
        });
    }
  }
};
</script>

<style lang="scss">
</style>
