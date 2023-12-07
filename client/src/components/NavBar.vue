<script setup lang="ts">
    //import Router Link
    import { RouterLink } from 'vue-router';
    import { ref, type Ref } from 'vue';
    import { useSession, useLogout } from '@/model/session';
    import router from '@/router';
    import LoginModal from './LoginModal.vue';
    import ExerciseForm from './ExerciseForm.vue';

    const session = useSession();
    let mode = ref<string | undefined>(undefined); //sign-in, sign-up, or undefined
    let isMenuActive = ref(false);
    let isModalActive = ref(false);
    let openExercise = ref(false);

    const onUpdateModal = () => {
        isModalActive.value = !isModalActive.value
        mode.value = undefined;
    }

    const onUpdateMode = (m: string | undefined) => {
        mode.value = m;
    }
   
    
    function toggleMenu() {
      isMenuActive.value = !isMenuActive.value;
    }

    const updateOpenExercise = () => {
        openExercise.value = !openExercise.value;
    }
    
</script>

<template>


<nav class="navbar is-spaced is-link" v-if="session.user === null">
    <div class="navbar-brand">
        <a class="navbar-item logo" href="/">
            <img src='../assets/eLogger-logo.png' style="margin-right: 0.3em;">
            <div class="subtitle is-5 has-text-white">ELOGGER</div>
        </a>
        <a class="navbar-burger" data-target="navMenu" :class="{'is-active': isMenuActive}" @click="toggleMenu">
          <span></span>
          <span></span>
          <span></span>
        </a>
    </div>
    <div class="navbar-menu menu" :class="{'is-active': isMenuActive}" id="navMenu">    
        <div class="navbar-start">
        </div>
        <!--show if the user hasn't logged in yet-->
        <div class="navbar-end">
            <RouterLink to="/" class="navbar-item">Home</RouterLink>
            <RouterLink to="/services" class="navbar-item">Services</RouterLink>
            <RouterLink to="/about" class="navbar-item">About</RouterLink>
            <RouterLink to="/contact" class="navbar-item">Contact</RouterLink>
            <div class="navbar-item">
            <div class="buttons">
                <a class="button is-danger is-rounded" v-show="isMenuActive != true" @click="isModalActive=true, mode='sign-up'">
                <strong>Sign up</strong>
                </a>
                <a class="button is-light is-rounded" @click="isModalActive=true, mode='sign-in'">
                    Log in
                </a>
            </div>
            </div>
        </div>
    </div>
</nav>

<nav class="sidebar" v-else>
    <div class="m-3">
        <a class="navbar-item" to="/stats" style="height: 100px;" >
            <img src='../assets/eLogger-logo-black.png' class="logo-sidebar-img">
            <div class="logo-sidebar dynamic-disappear subtitle is-6"><span style="margin-left: 15px">eLogger</span></div>
        </a>
        <RouterLink to="/exercise/feed" class="navbar-item mb-3">
            <span class="icon-text is-large">
                <span class="icon">
                    <i class="fa-solid fa-house fa-xl"></i>
                </span>
                <span class="navbar-text dynamic-disappear">Home</span>
            </span>
        </RouterLink>
        <RouterLink to="/stats" class="navbar-item mb-3">
            <span class="icon-text is-large">
                <span class="icon">
                    <i class="fa fa-line-chart fa-xl"></i>
                </span>
                <span class="navbar-text dynamic-disappear">Statistics</span>
            </span>
        </RouterLink>
        <RouterLink to="/exercise" class="navbar-item mb-3">
            <span class="icon-text is-large">
                <span class="icon">
                    <i class="fa-solid fa-dumbbell fa-xl"></i>
                </span>
                <span class="navbar-text dynamic-disappear">Exercise</span>
            </span>
        </RouterLink>
        <RouterLink to="/list" class="navbar-item mb-3">
            <span class="icon-text is-large">
                <span class="icon">
                    <i class="fa-solid fa-list-check fa-xl"></i>
                </span>
                <span class="navbar-text dynamic-disappear">Habits</span>
            </span>
        </RouterLink>

        <RouterLink to="/products" class="navbar-item mb-3">
            <span class="icon-text is-large">
                <span class="icon">
                    <i class="fa-solid fa-cart-shopping fa-xl"></i>
                </span>
                <span class="navbar-text dynamic-disappear">Logger Shop</span>
            </span>
        </RouterLink>

        <a class="navbar-item mb-3" @click="updateOpenExercise" >
            <span class="icon-text is-large">
                <span class="icon">
                    <i class="fa-solid fa-plus fa-xl" ></i>
                </span>
                <span class="navbar-text dynamic-disappear">Create</span>
            </span>
        </a>       

        <div class="navbar-item has-dropdown is-hoverable mb-3" v-show="session.user ? session.user.role == 'admin' : false">
            <RouterLink to="/admin" class="navbar-link">
                <span class="icon-text is-large">
                    <span class="icon">
                        <i class="fa-solid fa-lock fa-xl"></i>
                    </span>
                    <span class="navbar-text dynamic-disappear">Admin</span>
                </span>
            </RouterLink>
            <div class="navbar-dropdown is-boxed dynamic-disappear">
                <RouterLink to='/admin/products' class="navbar-item">
                    <span class="icon-text is-large">
                        <span class="icon">
                            <i class="fa-brands fa-product-hunt fa-xl"></i>
                        </span>
                        <strong class="navbar-text">Products List</strong>
                    </span>
                </RouterLink>
            </div>
        </div>
        

        <div class="navbar-item has-dropdown is-hoverable" v-if="session.user">
            <a class="navbar-link">
                <span class="icon-text is-large">
                    <span class="icon">
                        <img :src="session.user.photo" class="image is-20x20 profile" alt="profile picture"/>
                    </span>
                    <span class="navbar-text dynamic-disappear" >{{ session.user.name?.split(' ')[0] }}</span>
                </span>
            </a>
            <div class="navbar-dropdown is-boxed dynamic-disappear">
                <a class="navbar-item">
                    <span class="icon-text is-large">
                        <span class="icon">
                            <i class="fa-solid fa-user"></i>
                        </span>
                        <strong class="navbar-text ">My Profile</strong>
                    </span>
                </a>
                <a class="navbar-item is-danger" @click="session.user = null, router.push('/');">
                    <span class="icon-text is-large">
                        <span class="icon">
                            <i class="fa-solid fa-right-from-bracket"></i>
                        </span>
                    <span class="navbar-text" >Sign out</span>
                    </span>
                </a>
            </div>
        </div>
    </div>
</nav>

<ExerciseForm :is-open="openExercise" @update="updateOpenExercise" />
<LoginModal :is-modal-active="isModalActive" :mode="mode" @updateModal="onUpdateModal" @updateMode="onUpdateMode"/>

</template>

<style scoped>

.dynamic-disappear {
    display: block;
}

.navbar-brand {
    padding-bottom: 0.5em;
}

.logo {
    position: absolute;
    transform: scale(1.5);
    margin-left: 3em;
    margin-top: 0.5em;
}

.logo-sidebar-img {
    display: none;
}

.logo-sidebar {
    font-family: "Courier New", Courier, monospace;
    font-weight: bold;
    transform: scale(2.0);  
    margin-left: 0.6em;
}

.menu {
    padding-left: 2em;
}

.nav-border {
    border-bottom: 1px solid #d7d6d6;
    box-shadow: 0 4px 2px -2px rgba(0, 0, 0, 0.1);
}

.profile {
    transform: scale(1.3);
    border-radius: 30px;
}

.sidebar {
    background-color: #ffffffff;
    border-right: 1px solid #E4E4E4;
    height: 100vh;
    width: 19vw;
    position: fixed;
    z-index: 3;
}

.navbar-text {
    margin-left: 0.9em;
}

@media (max-width: 1025px) {

    .dynamic-disappear {
        display: none;
    }

    .sidebar {
        width: 75px;
    }

    .logo-sidebar-img {
        transform: scale(1.5);
        margin-top: 2em;
        display: block;
    }
}

</style>