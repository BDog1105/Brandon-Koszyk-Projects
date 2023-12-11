<script setup lang="ts">

import { getWorkouts, type workout, saveWorkoutsToLocalStorage, workouts, deleteAWorkout } from '@/model/workouts'
import { defineProps } from "vue";
import { computed } from "vue";
import { useToast } from "vue-toastification";

getWorkouts().then((data) => {
  workouts.value = data
})

const toast = useToast();
const props = defineProps({
    firstName: String,
});



const displayWorkouts = computed(() => {
  if (props.firstName){
  return workouts.value.filter(workout => workout.firstName === props.firstName);
  } else {
    return workouts.value;
  }
})


</script>


<template>

    <div v-for="workout in displayWorkouts" :key="workout._id">
    <article class="media box">
      <figure class="media-left">
        <p class="image is-64x64"><img
             :src= "workout.image">
        </p>
      </figure>
      <div class="media-content">
      <div class="content">
        <p ><strong> {{ workout.firstName }} {{ workout.lastName }} </strong> &nbsp;
            
            <small> {{ workout.userName }} </small> &nbsp; <small>{{ workout.date }}</small><br>
          {{workout.title}} - {{ workout.location }}
        <div class="columns">
          <div class="column has-text-centered"
            style="display: flex; justify-content: space-around; align-items: center;">
            <div>
              <div class="title" style="margin: 0px;"> {{ workout.distance }}</div>
              <div class="heading">Distance</div>
            </div>
            <div>
              <div class="title" style="margin: 0px;">{{ workout.duration }}</div>
              <div class="heading">Duration</div>
            </div>
          </div>
          <div class="column"><img
              :src= "workout.picture"
              style="max-height: 100%;"></div>
        </div>
        </p>
      </div>
      <nav class="level is-mobile">
        <div class="level-left"><a class="level-item"><span class="icon is-small"><i
                class="fas fa-reply"></i></span></a><a class="level-item"><span class="icon is-small"><i
                class="fas fa-retweet"></i></span></a><a class="level-item"><span class="icon is-small"><i
                class="fas fa-heart"></i></span></a></div>
      </nav>
    </div>
    <div class="media-right"><button @click="" class="delete"></button></div>
  </article>
</div>

</template>


<style scoped>

</style>

../model/workouts