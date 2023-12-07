import { reactive } from "vue";
import exercises from "../data/exercises.json";


export interface Workout {
    exercise: string;
    weight: number;


}import { api } from "./session";
import type { DataListEnvelope, DataEnvelope } from "./fetcher";

export interface Exercise {
    _id: string | string[],
    timestamp: string | string[],
    category: string,
    name: string | undefined,
    workout: string,
    description: string,
    sets: number | string,
    reps?: number | string,
    duration: string
}

export function addExercise(exercise: Exercise): Promise<DataEnvelope<Exercise>> {
    return api("exercises", "POST", exercise); 
}

export function updateExercise(id: string | string[], exercise: Exercise): Promise<DataEnvelope<Exercise>> {
    return api(`exercises/${id}`, "PATCH", exercise);
}

export function deleteExercise(id: string | string[]): Promise<DataEnvelope<Exercise>> {
    return api(`exercises/${id}`, "DELETE")
}

export function getExercises(): Promise<DataListEnvelope<Exercise>> { 
    return api('exercises', "GET"); 
}

export function getExercise(id: string | string[]): Promise<DataEnvelope<Exercise>>{
    return api(`exercises/${id}`, "GET");
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