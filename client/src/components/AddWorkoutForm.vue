<script setup lang="ts">
    import Modal from '../components/Modal.vue';
    import { ref } from 'vue';
    import { useSession } from '@/model/session';
    import { addExercise, type Exercise } from '../model/exercises';

    const props = defineProps<{
        isOpen: boolean
    }>()

    const emit = defineEmits<{
        (e:'update'): void;
    }>();

    const session = useSession();
    const exercise = ref<Exercise>({} as Exercise);
    const tag = ref('' as string);

    const addWorkout = () => {
        exercise.value.name = session.user?.name;
        addExercise(exercise.value)
            .then(data => {
                console.log(data);
            });

        exercise.value.category = '';
        exercise.value.workout = '';
        exercise.value.description = '';
        exercise.value.sets = '';
        exercise.value.reps = '';
        exercise.value.duration = '';

        emit('update');
    }
    
</script>

<template>
    <Modal :title="'Add a Workout'" :is-open="props.isOpen" @update="() => emit('update')">
        <template #default>
            <div class="form">

                <div class="column">
                    <Autocomplete/>
                </div>

                <div class="column">
                    <label class="label">Select a Category:</label>
                    <div class="control has-icons-left">
                        <div class="select">
                            <select required v-model="exercise.category" placeholder="Choose one">
                                <option value="" selected disabled>Choose one</option>
                                <option>cardio</option>
                                <option>weight</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div class="column">
                    <label for="" class="label">Workout</label>
                    <div class="control has-icons-left">
                        <input type="workout" placeholder="Workout" class="input" required v-model="exercise.workout">
                    </div>
                </div>

                <div class="column">
                    <label for="" class="label">Description</label>
                    <div class="control has-icons-left">
                        <textarea 
                            class="textarea"
                            placeholder="Description" 
                            v-model="exercise.description"
                            required>
                        </textarea>
                    </div>
                </div>

                <div class="column">
                    <label for="" class="label">Sets</label>
                    <div class="control has-icons-left">
                        <input type="sets" placeholder="Sets" class="input" required v-model="exercise.sets">
                    </div>
                </div>


                <div class="column">
                    <label for="" class="label">Reps</label>
                    <div class="control has-icons-left">
                        <input type="reps" placeholder="Reps" class="input" required v-model="exercise.reps">
                    </div>
                </div>


                <div class="column">
                    <label for="" class="label">Duration (per rep)</label>
                    <div class="control has-icons-left">
                        <input type="duration" placeholder="mm:ss" class="input" required v-model="exercise.duration">
                    </div>
                </div>
            </div>
        </template>
        <template #footer>
            <button class="button is-link is-fullwidth" @click="() => addWorkout()">Add Workout</button>
        </template>
    </Modal>
</template>

<style scoped>
    /* add-btn is in main.css */
</style>