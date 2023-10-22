<script setup lang="ts">
  import { getSession, useLogin } from '@/model/session'

  const session = getSession()
  const { login, logout } = useLogin()

  const doLogin = () => {
    login('hbingley1@plala.or.jp', 'CQutx25i8r')
  }

  const doLogin1 = () => {
    login('shaq@nba.com', 'Magic')
  }

  const doLogin2 = () => {
    login('quandale@dingle', 'rehehehehe')
  }

  const doLogout = () => {
    logout();
  }

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
    <div class ="navbar-item has-dropdown is-hoverable">
    <a class="button is-light"> 
      Log in
    </a>
      <div class="navbar-dropdown">
          <a class="navbar-item" @click.prevent="doLogin"> Sheldon </a>
          <a class="navbar-item" @click.prevent="doLogin1"> Shaq </a>
          <a class="navbar-item" @click.prevent="doLogin2"> Quandale </a>
          <hr class="navbar-divider" data="">
         <a class="navbar-item" data = ""> Other Account </a>
      </div>
    </div>

    <a class="button is-primary">
      <strong>Sign up</strong>
    </a>
  </div>
                                        
                                    

</template>



<style scoped>

</style>