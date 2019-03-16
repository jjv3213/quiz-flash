<template>
  <div class="signup container">
    <form class="card-panel" @submit.prevent="signup">
      <h3 class="center indigo-text">Signup</h3>
      <div class="field">
        <label for="email">Email</label>
        <input id="email" type="email" v-model="email">
      </div>
      <div class="field">
        <label for="password">Password</label>
        <input id="password" type="password" v-model="password">
      </div>
      <div class="field">
        <label for="name">Username</label>
        <input id="name" type="text" v-model="username">
      </div>
      <p v-if="feedback" class="red-text center">{{ feedback }}</p>
      <div class="field center">
        <button class="btn indigo">Signup</button>
      </div>
    </form>
  </div>
</template>

<script>
import db from '@/firebase/init'
import slugify from 'slugify'
import firebase from 'firebase'

export default {
  name: 'Signup',
  data(){
    return{
      email: null,
      password: null,
      username: null,
      feedback: null,
      slug: null
    }
  },
  methods: {
    signup(){
      if(this.username && this.email && this.password){
        this.feedback = null
        this.slug = slugify(this.username, {
          replacement: '-',
          remove: /[$*_+~.()'"!\-:@]/g,
          lower: true
        })
        let ref = db.collection('users').doc(this.slug)
        ref.get().then(doc => {
          if(doc.exists){
            this.feedback = 'This username already exists'
          } else {
          // this username does not yet exists in the db
            firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
            .then(cred => {
              ref.set({
                username: this.username,
                user_id: cred.user.uid
              })
            }).then(() => {
              this.$router.push({ name: 'Home' })
            })
            .catch(err => {
              this.feedback = err.message
            })
          }
        })
      } else {
        this.feedback = 'Please fill in all fields'
      }
    }
  }
}
</script>

<style lang="scss">
    .signup{
        max-width: 400px;
        margin-top: 60px;

        .field {
            margin-bottom: 16px;
        }
    }
</style>


