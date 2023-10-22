<script setup lang="ts">
import { isReactive, ref } from "vue"
import users from '@/data/users.json';
</script>


<template>
    <div class="container" v-for="(user,index) in users" :key ="index">
        <div data-v-6173b8aa="">
            <nav class="breadcrumb" aria-label="breadcrumbs" data-v-6173b8aa="">
                <ul data="">
                    <li data=""><a href="#" data="">My Exercise</a></li>
                    <li data=""><a href="#" data="">Admin</a></li>
                    <li class="is-active" data-v-6173b8aa=""><a href="#" aria-current="page" data="">Users</a>
                    </li>
                </ul>
            </nav>
            <div data=""><button class="button is-primary" data=""><span class="icon"
                        data=""><i class="fas fa-plus" data=""></i></span><span data="">Add
                        User</span></button></div>
            <table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth" data="">

            <tr data="">
                <th data=""></th>
                <th data="">First Name</th>
                <th data="">Last Name</th>
                <th data="">Emails</th>
                <th data="">Handle</th>
                <th data="">Is Admin</th>
                <th data=""></th>
            </tr>

            <tr data="">
                <td data=""><p class="image is-64x64" alt="avatar" data=""><img
                    :src="user[0].image">
                </p></td>
                <td data="">{{user[0].firstName}}</td>
                <td data="">{{user[0].lastName}}</td>
                <td data="">[
                    {{user[0].email}}
                    ]</td>
                <td data="">{{user[0].username}}</td>
                <td data="">{{user[0].isAdmin}}</td>
                <td data=""><button class="button" data=""><i class="fas fa-edit"
                            data=""></i></button><button class="button" data=""><i
                            class="fas fa-trash" data=""></i></button></td>
            </tr>

            <tr data="">
                <td data=""><p class="image is-64x64" alt="avatar" data=""><img
                    :src="user[1].image">
                </p></td>
                <td data="">{{user[1].firstName}}</td>
                <td data="">{{user[1].lastName}}</td>
                <td data="">[
                     {{user[1].email}}  
                    ]</td>
                <td data="">{{user[1].username}}</td>
                <td data="">{{user[1].isAdmin}}</td>
                <td data=""><button class="button" data=""><i class="fas fa-edit"
                            data-v-6173b8aa=""></i></button><button class="button" data=""><i
                            class="fas fa-trash" data=""></i></button></td>
            </tr>

            <tr data="">
                <td data=""><p class="image is-64x64" alt="avatar" data=""><img
                    :src="user[2].image">
                </p></td>
                <td data="">{{ user[2].firstName }}</td>
                <td data="">{{ user[2].lastName }}</td>
                <td data="">[
                    {{ user[2].email }}
                    ]</td>
                <td data="">{{ user[2].username }}</td>
                <td data="">{{user[2].isAdmin}}</td>
                <td data=""><button class="button" data=""><i class="fas fa-edit"
                            data-v-6173b8aa=""></i></button><button class="button" data=""><i
                            class="fas fa-trash" data=""></i></button></td>
            </tr>

        </table>
    </div>
</div>

</template>


<style scoped>

</style>