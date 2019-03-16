<template>
  <div class="home">
    <div class="container">
      <div class="row">
        <div v-for="(topic, index) in topics" :key="index" class="col s12 m4">
          <Card :topic="topic" @topicDeleted="deleteTopic"/>
        </div>
      </div>
      <div class="fixed-action-btn">
        <router-link :to="{ name: 'Create' }" class="btn-floating btn-large pink">
          <i class="large material-icons">add</i>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Card from '@/components/Card'
import firebase from 'firebase'
import db from '@/firebase/init'

export default {
  name: 'Home',
  data() {
    return {
      topics: []
    }
  },
  methods: {
    deleteTopic(id) {
        // delete doc from firestore
        let user = firebase.auth().currentUser
        db.collection('users').where('user_id', '==', user.uid).get()
        .then(snapshot => {
            snapshot.forEach((doc) => {
                db.collection('users').doc(doc.id).collection('topics').doc(id).delete()
            })
        }).then(() => {
              this.topics = this.topics.filter(topic => {
                return topic.id != id
            })
         })
    }
},
  components: {
    Card
  },
  created() {
    let user = firebase.auth().currentUser
    let ref = db.collection('users')
    
    // current user
    ref.where('user_id', '==', user.uid).get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        db.collection('users').doc(doc.id).collection('topics').get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            let topic = doc.data()
            topic.id = doc.id
            this.topics.push(topic)
          })
        })
      })
    })
  }
}
</script>

<style lang="scss">
  .home {
    .row {
      margin-top: 30px;
    }
  }
</style>
