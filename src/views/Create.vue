<template>
    <div class="create container">
        <h4 class="center-align indigo-text">Create New Topic</h4>
        <form @submit.prevent="addTopic">
            <div class="row">
                <div class="field title col s12">
                    <label for="title">Topic title:</label>
                    <input type="text" name="title" v-model="title">
                </div>
            </div>
            <div v-for="(q, index) in questions" :key="index" class="field">
                <div class="row">
                    <div class="col s6">
                        <label for="question">Question:</label>
                        <textarea id="question" class="materialize-textarea" v-model="questions[index].question" ></textarea>
                    </div>
                    <div class="col s6">
                        <label for="answer">Answer:</label>
                        <textarea id="answer" class="materialize-textarea" v-model="questions[index].answer"></textarea>
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
                <button class="btn green">Finish</button>
            </div>
        </form>
    </div>
</template>

<script>
import firebase from 'firebase'
import db from '@/firebase/init'
import slugify from 'slugify'

export default {
    name: 'Create',
    data() {
        return {
            title: null,
            another: {
                question: null,
                answer: null
            },
            questions: [],
            feedback: null,
            slug: null
        }
    },
    methods: {
        addQA() {
            if(this.another.question && this.another.answer) {
                this.questions.push({
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
            this.questions = this.questions.filter(question => {
                return question != q;
            })
        },
        addTopic() {
            // get current user
            let user = firebase.auth().currentUser

            if(this.title) {
                this.feedback = null
                // create a slug
                this.slug = slugify(this.title, {
                    replacement: '-',
                    remove: /[$*_+~.()'"!\-:@]/g,
                    lower: true
                })

                // find user record and update data
                db.collection('users').where('user_id', '==', user.uid).get()
                .then(snapshot => {
                    snapshot.forEach((doc) => {
                        db.collection('users').doc(doc.id).collection('topics').add({
                            title: this.title,
                            slug: this.slug,
                            questions: this.questions
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
    }
}
</script>

<style lang="scss">
    .create {
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
