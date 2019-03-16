<template>
    <div class="question">
        <div tabindex="-1" class="card-panel" @click="flipQuestion">
            <p class="current_question right">{{ index+1 }} / {{ topic.questions.length }}</p>
            <h4 class="indigo-text center">Question:</h4>
            <h4 class="center">{{ topic.questions[index].question }}</h4>
            <p class="pink-text center">Click the card to flip</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Question',
    props: ['topic', 'index'],
    methods: {
        flipQuestion() {
            this.$emit('questionFlipped')
        }
    }
}
</script>
