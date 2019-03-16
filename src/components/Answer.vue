<template>
  <div class="answer">
    <div tabindex="-1" class="card-panel" @click="flipAnswer">
      <h4 class="indigo-text center">Answer:</h4>
      <h4 class="center">{{ topic.questions[index].answer }}</h4>
      <p class="pink-text center">Click the card to flip</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Answer",
  props: ["topic", "index"],
  methods: {
    flipAnswer() {
      this.$emit("answerFlipped");
    }
  }
};
</script>