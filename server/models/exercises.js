const data = require('../data/exercises.json');

function getExercises(){
    return data.exercises;
}

function getExercisebyName(exercise) {
    return data.exercises.find(exercises => exercises.exercise === exercise);
}


function addExercise(exercise) {
    exercises.id = data.exercises.length + 1;
    data.exercises.push(exercise);
}


function updateExercise(exercises) {
    const index = data.workouts.findIndex(s => s.id === exercise.id);
    data.workouts[index] = workout;
}


function deleteExercise(exercise) {
    const index = data.exercises.findIndex(s => s.exercise === exercise);
    data.exercises.splice(index, 1);
}


module.exports = {
    getExercises,
    getExercisebyName,
    addExercise,
    updateExercise,
    deleteExercise
    
    
};