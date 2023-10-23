<script setup lang="ts">
//import { useLogin } from '@/model/session'


//const username = (<HTMLInputElement>document.getElementById('email')).value
//const password = (<HTMLInputElement>document.getElementById('password')).value
//const  {login} = useLogin();
//const doLogin = () => {
//   login(username, password);
//  }

</script>

<template>
  <div class="hero-body">
    <div class="column is-half is-offset-one-quarter">
      <div class="box">
        <div class="field">
          <p class="control has-icons-left has-icons-right">
            <input class="input" id = "email" type="email" placeholder="Email" />
            <span class="icon is-small is-left">
              <i class="fas fa-envelope"></i>
            </span>
            <span class="icon is-small is-right">
              <i class="fas fa-check"></i>
            </span>
          </p>
        </div>
        <div class="field">
          <p class="control has-icons-left">
            <input class="input" id = "password" type="password" placeholder="Password" />
            <span class="icon is-small is-left">
              <i class="fas fa-lock"></i>
            </span>
          </p>
        </div>
        <div class="field">
          <p class="control">
            <button class="button is-success">Login</button>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>