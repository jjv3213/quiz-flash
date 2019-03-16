<template>
    <div class="edit container" v-if="topic">
        <h4 class="center-align indigo-text">Edit {{ topic.title }}</h4>
        <form @submit.prevent="editTopic">
            <div class="row">
                <div class="field title col s12">
                    <label for="title">Topic title:</label>
                    <input type="text" name="title" v-model="topic.title">
                </div>
            </div>
            <div v-for="(q, index) in topic.questions" :key="index" class="field">
                <div class="row">
                    <div class="col s6">
                        <label for="question">Question:</label>
                        <textarea id="question" class="materialize-textarea" v-model="topic.questions[index].question"></textarea>
                    </div>
                    <div class="col s6">
                        <label for="add-answer">Answer:</label>
                        <textarea id="add-answer" class="materialize-textarea" v-model="topic.questions[index].answer"></textarea>
                    </div>
                </div>
                <i class="material-icons delete" @click="deleteQA(q)">delete</i>
            </div>
            <div class="row">
                <div class="field add-question col s6">
                    <label for="add-question">Question:</label>
                    <textarea id="add-question" class="materialize-textarea" v-model="another.question"></textarea>
                </div>
                <div class="field add-answer col s6">
                    <label for="add-answer">Answer:</label>
                    <textarea id="add-answer" class="materialize-textarea" v-model="another.answer"></textarea>
                </div>
            </div>
            <div class="field center-align">
                <p v-if="feedback" class="red-text">{{ feedback }}</p>
                <span class="btn pink addBtn" @click="addQA">Add Question</span>
                <button class="btn indigo">Update</button>
            </div>
        </form>
    </div>
</template>

<script>
import firebase from 'firebase'
import db from '@/firebase/init'
import slugify from 'slugify'

export default {
    name: 'Edit',
    data() {
        return {
            topic: null,
            another: {
                question: null,
                answer: null
            },
            feedback: null
        }
    },
    methods: {
        addQA() {
            if(this.another.question && this.another.answer) {
                this.topic.questions.push({
                    question: this.another.question,
                    answer: this.another.answer
                })
                this.another.question = null
                this.another.answer = null
                this.feedback = null
            } else {
                this.feedback = 'You must enter a question and an answer'
            }
        },
        deleteQA(q) {
            this.topic.questions = this.topic.questions.filter(question => {
                return question != q;
            })
        },
        editTopic() {
            if(this.topic.title) {
                this.feedback = null
                // create a slug
                this.topic.slug = slugify(this.topic.title, {
                    replacement: '-',
                    remove: /[$*_+~.()'"!\-:@]/g,
                    lower: true
                })

                let user = firebase.auth().currentUser
                db.collection('users').where('user_id', '==', user.uid).get()
                .then(snapshot => {
                    snapshot.forEach((doc) => {
                        db.collection('users').doc(doc.id).collection('topics').doc(this.topic.id).update({
                            title: this.topic.title,
                            slug: this.topic.slug,
                            questions: this.topic.questions
                        })
                    })
                }).then(() => {
                    this.$router.push({ name: 'Home' })
                }).catch(err => {
                    console.log(err)
                }) 
            } else {
                this.feedback = 'You must enter a topic title'
            }
        }
    },
    created() {
        let user = firebase.auth().currentUser
        let refUser = db.collection('users').where('user_id', '==', user.uid)
        refUser.get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                let refTopics = db.collection('users').doc(doc.id).collection('topics').where('slug', '==', this.$route.params.topic_slug)
                refTopics.get()
                .then(snapshot => {
                snapshot.forEach(doc => {
                    this.topic = doc.data()
                    this.topic.id = doc.id
                })
                })
            })
        })     
    }
}
</script>

<style lang="scss">
    .edit {
        margin-top: 60px;
        padding: 20px;
        max-width: 700px;

        .addBtn {
            margin-right: 10px;
        }

        .field {
            margin: 20px auto;
            position: relative;
        }

        .delete {
            position: absolute;
            right: -15px;
            bottom: 35px;
            color: #aaa;
            font-size: 1.4em;
            cursor: pointer;
        }
    }
</style>