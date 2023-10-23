<script setup lang="ts">
import { ref } from "vue"
import { getSession, useLogin } from '@/model/session'
const show1 = ref(true);
const session = getSession();

</script>

<template >
  <main class="columns is-multiline is-centered">
    <div class="column is-full">
      <h1 class="title">Home</h1>

    </div>

    <div class="container">
      <div class="columns">
        <div class="column is-hidden-touch is-one-quarter">
          
        </div>
      <div v-if="session.user" class="column">
        <div class="box has-text-success summary">
          <h2 class="title">Today</h2>
          <div class="columns is-multiline">
            <div class="column is-half">
              <h3 class="value">{{ session.user.workout.distance }}</h3>
              <caption class="caption">Distance</caption>
            </div>
            <div class="column is-half">
              <h3 class="value">{{ session.user.workout.duration }}</h3>
              <caption class="caption">Duration</caption>
            </div>
            <div class="column is-half">
              <h3 class="value">{{ session.user.workout.pace }} mph</h3>
              <caption class="caption">Avg Pace</caption>
            </div>
            <div class="column is-half">
              <h3 class="value">{{ session.user.workout.calories }}</h3>
              <caption class="caption">Calories</caption>
            </div>
          </div>
        </div>
        <div class="box has-text-success summary">
          <h2 class="title">This week</h2>
          <div class="columns is-multiline">
            <div class="column is-half">
              <h3 class="value">{{ session.user.workout.weekly.distance }}</h3>
              <caption class="caption">Distance</caption>
            </div>
            <div class="column is-half">
              <h3 class="value">{{ session.user.workout.weekly.duration }}</h3>
              <caption class="caption">Duration</caption>
            </div>
            <div class="column is-half">
              <h3 class="value">{{ session.user.workout.weekly.pace }} mph</h3>
              <caption class="caption">Avg Pace</caption>
            </div>
            <div class="column is-half">
              <h3 class="value">{{ session.user.workout.weekly.calories }}</h3>
              <caption class="caption">Calories</caption>
            </div>
          </div>
        </div>
        <div class="box has-text-success summary">
          <h2 class="title">All time</h2>
          <div class="columns is-multiline">
            <div class="column is-half">
              <h3 class="value">{{ session.user.workout.alltime.distance }}</h3>
              <caption class="caption">Distance</caption>
            </div>
            <div class="column is-half">
              <h3 class="value">{{ session.user.workout.alltime.duration }}</h3>
              <caption class="caption">Duration</caption>
            </div>
            <div class="column is-half">
              <h3 class="value">{{ session.user.workout.alltime.pace }} mph</h3>
              <caption class="caption">Avg Pace</caption>
            </div>
            <div class="column is-half">
              <h3 class="value">{{ session.user.workout.alltime.calories }}</h3>
              <caption class="caption">Calories</caption>
            </div>
          </div>
        </div>
      </div>
      <div class="column is-one-quarter">
        
      </div>
    </div>
  </div>

</main></template>