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
    login('quadale@dingle', 'rehehehehe')
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
    <a class="button is-primary">
      <strong>Sign up</strong>
    </a>
    <div class="dropdown is-active" data-v-1f0da592="">
                                        <div class="dropdown-trigger">
                                            <button class="button" aria-haspopup="true" aria-controls="dropdown-menu">
                                                <span data-v-1f0da592="">Log in</span>
                                                <span class="icon is-small" data-v-1f0da592="">
                                                    <i class="fas fa-angle-down" aria-hidden="true" data-v-1f0da592=""></i>
                                                </span>
                                            </button>
                                        </div>
                                        <div class="dropdown-menu" id="dropdown-menu" role="menu">
                                            <div class="dropdown-content">
                                                <a class="dropdown-item" data-v-1f0da592=""> Moshe </a>
                                                <a class="dropdown-item" data-v-1f0da592=""> Kamala Harris </a>
                                                <a class="dropdown-item" data-v-1f0da592=""> John Smith </a>
                                                <hr class="dropdown-divider" data-v-1f0da592="">
                                                <a href="/login" class="router-link-active router-link-exact-active dropdown-item is-disabled" data-v-1f0da592="" aria-current="page"> Other Account </a>
                                            </div>
                                        </div>
                                    </div>
  </div>
</template>



<style scoped>

</style>