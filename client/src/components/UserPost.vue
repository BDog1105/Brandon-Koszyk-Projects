<script setup lang="ts">

import { getUsers, type User } from '@/model/users'
import { ref } from "vue";

const users = ref([] as User[])

getUsers().then((data) => {
  users.value = data
})

</script>

<template>
    <tr data="" v-for="user in users" :key="user._id">
                <td data=""><p class="image is-64x64" alt="avatar" data=""><img
                    :src="user.image">
                </p></td>
                <td data="">{{user.firstName}}</td>
                <td data="">{{user.lastName}}</td>
                <td data="">[
                    {{user.email}}
                    ]</td>
                <td data="">{{user.username}}</td>
                <td data="">{{user.role }}</td>
                <td data=""><button class="button" data=""><i class="fas fa-edit"
                            data=""></i></button><button class="button" data=""><i
                            class="fas fa-trash" data=""></i></button></td>
            </tr>

</template>

<style scoped>

</style>