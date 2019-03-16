<template>
    <div class="quiz container" v-if="topic">
        <h1 class="center indigo-text">{{ topic.title }} Quiz</h1>
        <hr>
        <transition name="flip" mode="out-in"> 
            <component
            v-if="topic.questions.length >= 1" 
            :is="mode" 
            :topic="topic" 
            :index="index" 
            @questionFlipped="mode='Answer'" @answerFlipped="mode='Question'">
            </component>
        </transition>
        <a class="btn green left"
        @click="prevQuestion"><i class="material-icons">keyboard_arrow_left</i></a>
        <a class="btn green right"
        @click="nextQuestion"><i class="material-icons">keyboard_arrow_right</i></a>
    </div>
</template>

<script>
import firebase from 'firebase'
import db from '@/firebase/init'
import Question from '@/components/Question'
import Answer from '@/components/Answer'

export default {
    name: 'Quiz',
    data() {
        return {
            topic: null,
            index: 0,
            mode:'Question',
        }
    },
    components: {
        Question,
        Answer
    },
    methods: {
        prevQuestion() {
            if(this.index > 0) {
                this.index -= 1
                this.mode = 'Question'
            }
        },
        nextQuestion() {
            if(this.index < (this.topic.questions.length - 1)) {
                this.index += 1
                this.mode = 'Question'
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
                })
                })
            })
        })
    }
}
</script>

<style lang="scss">
    .quiz {
        max-width: 600px;

        .card-panel {
            margin-top: 40px;
        }
    }

    .flip-enter-active {
        animation: flip-in 0.3s ease-out forwards;
    }

    .flip-leave-active {
        animation: flip-out 0.3s ease-out forwards;
    }

    @keyframes flip-out {
        from {
            transform: rotateY(0deg);
        }

        to {
            transform: rotateY(90deg);
        }
    }

    @keyframes flip-in {
        from {
            transform: rotateY(90deg);
        }

        to {
            transform: rotateY(0deg);
        }
    }
</style>
