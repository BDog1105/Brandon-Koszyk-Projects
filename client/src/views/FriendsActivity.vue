<script setup lang="ts">
import { isReactive, ref } from "vue"
import AddWorkoutForm from "@/components/AddWorkoutForm.vue"
import users from '@/data/users.json';


const show1 = ref(true);
const show2 = ref(true);
const show3 = ref(true);
const isActive = ref(false);


</script>

<template>
    <div>
      <h1 class="title">Friends Activity</h1>
      <div class="columns">
        <div class="column is-half is-offset-one-quarter">
          <button @click="isActive = !isActive" class="button is-info is-fullwidth">Add Workout</button>
          <form v-if="isActive">
           <AddWorkoutForm :isActive= "!isActive"/>
           
          </form><br>
          


          <div v-if="show1" v-for="(user,index) in users" :key ="index">
            <article class="media box">
              <figure class="media-left">
                <p class="image is-64x64"><img
                    :src="user[0].image">
                </p>
              </figure>
              <div class="media-content">
              <div class="content">
                <p><strong>{{ user[0].firstName }} {{ user[0].lastName }}</strong> &nbsp;<small>{{ user[0].username }}</small> &nbsp; <small>24 min ago</small><br>
                  {{ user[0].workout.type }} - {
                  "lat": {{ user[0].workout.coordinates.lat }},
                  "lng": {{ user[0].workout.coordinates.lng }}
                  }
                <div class="columns">
                  <div class="column has-text-centered"
                    style="display: flex; justify-content: space-around; align-items: center;">
                    <div>
                      <div class="title" style="margin: 0px;"> {{ user[0].workout.distance }}</div>
                      <div class="heading">Distance</div>
                    </div>
                    <div>
                      <div class="title" style="margin: 0px;">{{ user[0].workout.duration }}</div>
                      <div class="heading">Duration</div>
                    </div>
                  </div>
                  <div class="column"><img
                      :src="user[0].workout.picture"
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
            <div class="media-right"><button @click="show1 = !show1" class="delete"></button></div>
          </article>
        </div>

        <div v-if="show2" v-for="(user,index) in users" :key ="index">
            <article class="media box">
              <figure class="media-left">
                <p class="image is-64x64"><img
                    :src="user[1].image">
                </p>
              </figure>
              <div class="media-content">
              <div class="content">
                <p><strong>{{ user[1].firstName }} {{ user[1].lastName }}</strong> &nbsp;<small>{{ user[1].username }}</small> &nbsp; <small>24 min ago</small><br>
                  {{ user[1].workout.type }} - {
                  "lat": {{ user[1].workout.coordinates.lat }},
                  "lng": {{ user[1].workout.coordinates.lng }}
                  }
                <div class="columns">
                  <div class="column has-text-centered"
                    style="display: flex; justify-content: space-around; align-items: center;">
                    <div>
                      <div class="title" style="margin: 0px;"> {{ user[1].workout.distance }}</div>
                      <div class="heading">Distance</div>
                    </div>
                    <div>
                      <div class="title" style="margin: 0px;">{{ user[1].workout.duration }}</div>
                      <div class="heading">Duration</div>
                    </div>
                  </div>
                  <div class="column"><img
                      :src="user[1].workout.picture"
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
            <div class="media-right"><button @click="show2 = !show2" class="delete"></button></div>
          </article>
        </div>

        <div v-if="show3" v-for="(user,index) in users" :key ="index">
            <article class="media box">
              <figure class="media-left">
                <p class="image is-64x64"><img
                    :src="user[2].image">
                </p>
              </figure>
              <div class="media-content">
              <div class="content">
                <p><strong>{{ user[2].firstName }} {{ user[2].lastName }}</strong> &nbsp;<small>{{ user[2].username }}</small> &nbsp; <small>24 min ago</small><br>
                  {{ user[2].workout.type }} - {
                  "lat": {{ user[2].workout.coordinates.lat }},
                  "lng": {{ user[2].workout.coordinates.lng }}
                  }
                <div class="columns">
                  <div class="column has-text-centered"
                    style="display: flex; justify-content: space-around; align-items: center;">
                    <div>
                      <div class="title" style="margin: 0px;"> {{ user[2].workout.distance }}</div>
                      <div class="heading">Distance</div>
                    </div>
                    <div>
                      <div class="title" style="margin: 0px;">{{ user[2].workout.duration }}</div>
                      <div class="heading">Duration</div>
                    </div>
                  </div>
                  <div class="column"><img
                      :src="user[2].workout.picture"
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
            <div class="media-right"><button @click="show3 = !show3" class="delete"></button></div>
          </article>
        </div>
        </div>
      </div>
    </div>
</template>

<style scoped>

</style>