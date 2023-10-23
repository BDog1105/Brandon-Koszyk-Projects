<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
import LoginBadge from './LoginBadge.vue';
import users from '@/data/users.json';
import { getSession, useLogin } from '@/model/session';
const isActive = ref(false);
const session = getSession();

</script>

<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a class="navbar-item" href="/">
        <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="28" height="28" />

      </a>

      <a role="button" class="navbar-burger" :class="{ 'is-active': isActive }" @click="isActive = !isActive" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="navbarBasicExample" class="navbar-menu" :class="{ 'is-active': isActive }">
      <div class="navbar-start">
        <RouterLink class="navbar-item" to="/activity" >My Activity</RouterLink>
        <RouterLink class="navbar-item" to="/friends-activity">Friends Activity</RouterLink>
        <RouterLink class="navbar-item" to="/people-search">People Search</RouterLink>
        
        <div class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link">
            Admin
          </a>

          <div class="navbar-dropdown">
            <a class="navbar-item">
              <RouterLink class = "navbar-item" to = "/admin"> Users </RouterLink>
            </a>
            
          </div>
        </div>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <LoginBadge />
        </div>
      </div>
    </div>
  </nav>
</template>


<style scoped>

.router-link-active {
  font-weight: bold;
  border-bottom: 2px solid #00d1b2;
}
</style>