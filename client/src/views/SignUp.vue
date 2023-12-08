<script setup lang = "ts">
    import router from '@/router';
    import { ref, type Ref } from 'vue';
    import { createUser } from '@/model/session';

    const name: Ref<HTMLInputElement | undefined> = ref(undefined);
    const email: Ref<HTMLInputElement | undefined> = ref(undefined);
    const password: Ref<HTMLInputElement | undefined> = ref(undefined);

    const signup = async (nameRef: string, emailRef: string, passwordRef: string) => {
        const response = await createUser(nameRef, emailRef, passwordRef)
            .catch(error => { 
                console.log(error);
                return;
            });

            router.push('/exercise/feed'); 
    }


</script>

<template>


        <form @submit.prevent="() => signup(name?.value as string, email?.value as string, password?.value as string)" class="box">
            <div class="column">
                <label for="" class="label">Name</label>
                <div class="control has-icons-left">
                    <input type="name" placeholder="Name" class="input" required ref="name">
                    <span class="icon is-small is-left">
                        <i class="fa-solid fa-diamond"></i>
                    </span>
                </div>
            </div>
            <div class="column">
                <label for="" class="label">Email</label>
                <div class="control has-icons-left">
                    <input type="email" placeholder="Enter your email" class="input" required ref="email">
                    <span class="icon is-small is-left">
                        <i class="fa fa-envelope"></i>
                    </span>
                </div>
            </div>
            <div class="column">
                <label for="" class="label">Password</label>
                <div class="control has-icons-left">
                    <input type="password" placeholder="Enter your password" class="input" required ref="password">
                    <span class="icon is-small is-left">
                        <i class="fa fa-lock"></i>
                    </span>
                </div>
                <a class="is-size-7 has-text-primary">forgot your password?</a>
            </div>
            <div class="column">
                <button class="button is-primary is-fullwidth" type="submit">Create Account</button>
            </div>
            <div class="has-text-centered">
                <p class="is-size-7"> Already have an account? <a class="has-text-primary" @click="() => router.push('/')">Log in</a>
                </p>
            </div>
        </form>

</template>

<style scoped>
    .box {
        width: 70vh;
        margin: 0 auto;
        margin-top: 2em;
    }

</style>