<script setup lang="ts">
    import { useSession } from '@/model/session';
    import { useRoute } from 'vue-router';
    import { getExercises, deleteExercise, type Exercise } from '@/model/exercises';
    import { ref, computed } from 'vue';
    import userDatabase from '../../data/database.json'
   

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
