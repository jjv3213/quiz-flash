<template>
  <div class="login container">
    <form class="card-panel" @submit.prevent="login">
      <h3 class="center indigo-text">Login</h3>
      <div class="field">
        <label for="email">Email</label>
        <input id="email" type="email" v-model="email">
      </div>
      <div class="field">
        <label for="password">Password</label>
        <input id="password" type="password" v-model="password">
      </div>
      <p v-if="feedback" class="red-text center">{{ feedback }}</p>
      <div class="field center">
        <button class="btn indigo">Login</button>
      </div>
    </form>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'Login',
  data(){
    return{
      email: null,
      password: null,
      feedback: null
    }
  },
  methods: {
    login(){
      if(this.email && this.password){
        this.feedback = null
        firebase.auth().signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          this.$router.push({ name: 'Home' })
        }).catch(err => {
          this.feedback = err.message
        })
      } else {
        this.feedback = 'Please fill in both fields'
      }
    }
  }
}
</script>

<style lang="scss">
.login{
  max-width: 400px;
  margin-top: 60px;

  .field {
    margin-bottom: 16px;
  }
}
</style>

