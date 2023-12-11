<script setup lang="ts">
  import { ref } from "vue"
  import { getSession, useLogin } from '@/model/session'

  const session = getSession()
  const { login, logout } = useLogin()

  const doLogin1 = () => {
    login('atuny0@sohu.com', '9uQFF1Lh')
  }
  const doLogin2 = () => {
    login('hbingley1@plala.or.jp', 'CQutx25i8r') 
  }
  const doLogin3 = () => {
    login('rshawe2@51.la', 'OWsTbMUgFc')
  }

  const doLogout = () => {
    logout();
  }
  const isActive = ref(true);

</script>

<template>
  <div class="has-text-right" v-if="session.user">
    Welcome, {{ session.user.firstName }} {{ session.user.lastName }} <br>
    <small>
      {{ session.user.email }}
      <a class="button is-small is-light is-warning" @click.prevent="doLogout">
        <span class="icon">
          <i class="fas fa-sign-out-alt"></i>
        </span>
      </a>
    </small>
  </div>
  <div class="buttons" v-else>

    <div class="navbar-item has-dropdown is-hoverable">
    <a class="button is-light">
      Log in
    </a>
    <div class="navbar-dropdown">
          <a class="navbar-item" @click.prevent="doLogin1">
              Terry (Admin)
            </a>
            <a class="navbar-item" @click.prevent="doLogin2">
              Sheldon
            </a>
            <a class="navbar-item" @click.prevent="doLogin3">
              Terrill
            </a>
            <hr class="navbar-divider">
            <a class="navbar-item">
              Other Account
            </a>
          </div>
        </div>
        
    <a class="button is-primary">
      <strong>Sign up</strong>
    </a>
  </div>
</template>


<style scoped>

</style>