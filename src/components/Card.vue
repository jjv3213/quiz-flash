<template>
  <div class="card hoverable">
    <div class="card-content center">
      <i class="material-icons delete" @click="deleteTopic(topic.id)">delete</i>
      <h2 class="card-title indigo-text truncate">{{ topic.title }}</h2>
      <p>{{ topic.questions.length }} Questions</p>
    </div>
    <div class="card-action center">
      <div class="option-buttons">
        <router-link
          :to="{ name: 'Quiz', params: {topic_slug: topic.slug} }"
          class="white-text btn green"
        >
          <i class="material-icons left">play_arrow</i>
          Start
        </router-link>
        <router-link
          :to="{ name: 'Edit', params: {topic_slug: topic.slug} }"
          class="white-text btn indigo"
        >
          <i class="material-icons left">edit</i>
          Edit
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import db from "@/firebase/init";

export default {
  name: "Card",
  props: ["topic"],
  methods: {
    deleteTopic(id) {
      this.$emit("topicDeleted", id);
    }
  }
};
</script>

<style lang="scss">
.card {
  .option-buttons {
    display: grid;
    grid-row-gap: 10px;
  }

  i {
    margin: 0;
  }

  .card-title {
    margin-top: 0;
    padding-bottom: 5px;
    font-size: 35px;
    overflow-wrap: break-word;
  }

  .delete {
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
    color: #aaa;
    font-size: 1.4em;
  }
}
</style>
