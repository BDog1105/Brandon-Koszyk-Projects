import { reactive } from "vue";
import exercises from "../data/exercises.json";


export interface Workout {
    exercise: string;
    weight: number;


}

export function returnExercises() {
    return exercises;
}

export function useExercises() {
    const state = reactive({
        exercises: exercises
    });

    return state;
}