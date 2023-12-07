<script setup lang="ts">
    import { useSession } from '@/model/session';
    import { useRoute } from 'vue-router';
    import ThreeColumnLayout from '../components/ThreeColumnLayout.vue'
    import { getExercises, deleteExercise, type Exercise } from '@/model/exercises';
    import { ref, computed } from 'vue';
    import userDatabase from '../../data/database.json'
    import PersonalBoard from '../components/PersonalBoard.vue';
    import ScoreBoard from '../components/ScoreBoard.vue'

    const route = useRoute();
    const name = computed(() => route.params.name);
    const session = useSession();
    const exercises = ref<Exercise[]>([]);
    
    const fetchExercises = () => {
        getExercises().then((data) => {
            exercises.value = data.data.reverse();
        })
        setTimeout(fetchExercises, 1000);
    }

    fetchExercises();

    const deleteItem = (id: string | string[]) => {
        deleteExercise(id).then((data) => {
            console.log(data);
        });
    }

    const updateItem = () => {
        console.log("Update Item");
    }

    function userImg(name: string | undefined) {
        for(let i = 0; i < userDatabase.users.length; i++){
            if(userDatabase.users[i].name == name){
                return userDatabase.users[i].photo;
            }
        }

        return "https://i.pinimg.com/1200x/47/77/ae/4777ae0906dd0113ad0bb00d61125d1b.jpg"
    }

</script>

<template>
    <ThreeColumnLayout>
        <template #right-column-left>
            <h1 class="title" v-show="!name">Your Exercise Activity</h1>
            <div v-for="(exercise, index) in (name === 'feed' ? exercises : exercises.filter((elem) => elem.name == session.user?.name))" :key="index" class="post">
                <article class="media">
                    <figure class="media-left">
                        <p class="image is-64x64">
                            <img :src="userImg(exercise.name)">
                        </p>    
                    </figure>
                    
                    <div class="media-content">
                        <div class="content">
                            <strong class="title is-4">{{ exercise.workout }}</strong> <small>{{ exercise.timestamp }}</small>
                            <p class="subtitle is-6">{{ exercise.name?.split(' ')[0] }}</p>
                            <p>{{ exercise.description }}</p>
                            <div class="column is-flex is-centered is-justify-content-space-around" >
                                <div>
                                    <div class="heading ">Sets</div>
                                    <div class="title is-4" style="margin: 0px">{{ exercise.sets }}</div>
                                </div>
                                <div v-show="exercise.category === 'weight'">
                                    <div class="heading">Reps</div>
                                    <div class="title is-4" style="margin: 0px">{{ exercise.reps }}</div>
                                </div>
                                <div>
                                    <div class="heading">Duration</div>
                                    <div class="title is-4" style="margin: 0px">{{ exercise.duration }}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <nav class="level is-mobile">
                        <div class="level-left">
                            <a class="level-item" v-show="exercise.name === session.user?.name" @click="() => updateItem()">
                                <span class="icon is-small"><i class="fa-solid fa-pen-to-square"></i></span>
                            </a>
                            <a class="level-item" @click="() => deleteItem(exercise._id)">
                                <span class="icon is-small"><i class="fa-solid fa-trash"></i></span>
                            </a>
                        </div>
                    </nav>
                </article>
            </div>
        </template>
        <template #right-column-right>
            <div v-if="name === 'feed'">
                <ScoreBoard/>
            </div>
            <div v-else>
                <PersonalBoard/>
            </div>
        </template>
    </ThreeColumnLayout>
</template>

<style scoped>

.post {
    padding-top: 2em;
    padding-bottom: 2em;
    border-bottom: 1px solid #dbdbdb;
}

</style>