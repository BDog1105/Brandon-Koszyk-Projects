<script setup lang="ts">

    import { useLogin, createUser } from '@/model/session';
    import router from '@/router';
    import { ref, type Ref } from 'vue';

    const name: Ref<HTMLInputElement | undefined> = ref(undefined);
    const email: Ref<HTMLInputElement | undefined> = ref(undefined);
    const password: Ref<HTMLInputElement | undefined> = ref(undefined);
        
    let isInvalidForm = ref(false);

    const props = defineProps<{
        isModalActive: boolean,
        mode: string | undefined
    }>();

    const emit = defineEmits<{
        (e:'updateModal'): void;
        (e:'updateMode', value: string | undefined): void;
    }>();


    const signIn = (bool: boolean) => { //handles the UI 
        if(bool){
            emit('updateModal');
            router.push('/exercise/feed'); 
        }
    }

    async function checkLogin(emailRef: string | undefined, passwordRef: string | undefined) {
        const response = await useLogin(emailRef, passwordRef)
            .catch(error => {
                isInvalidForm.value = true;  
                return;
            });
        if(response) {
            signIn(true); //update the UI
        }
    }

    const signup = async (nameRef: string, emailRef: string, passwordRef: string) => {
        const response = await createUser(nameRef, emailRef, passwordRef)
            .catch(error => { 
                console.log(error);
                return;
            });

        signIn(true); //update the UI 
    }

    const handleMode = (nameRef: string, emailRef: string, passwordRef: string) => {
        switch(props.mode) {
            case "sign-in":
                checkLogin(emailRef, passwordRef);
                break;
            case "sign-up":
                signup(nameRef, emailRef, passwordRef);
                break;
            default:
        }

        
    }

</script>

<template>
    <!--Login screen-->
    <div class="modal" :class="{ 'is-active': props.isModalActive }" id="signup"> 
        <div class="modal-background"></div>
        <div class="modal-content">
            <form @submit.prevent="() => handleMode(name?.value as string, email?.value as string, password?.value as string)" class="box">

                <div class="column field" v-if="props.mode==='sign-up'">
                    <label for="" class="label">Name</label>
                    <div class="control has-icons-left">
                        <input type="name" placeholder="Name" class="input" required ref="name">
                        <span class="icon is-small is-left">
                            <i class="fa-solid fa-diamond"></i>
                        </span>
                    </div>
                </div>

                <div class="column field">
                    <label for="" class="label">Email</label>
                    <div class="control has-icons-left">
                        <input type="email" placeholder="Enter your email" class="input" :class="{'is-danger': isInvalidForm}" required ref="email">
                        <span class="icon is-small is-left">
                            <i class="fa fa-envelope"></i>
                        </span>
                    </div>
                </div>
                <div class="column field">
                    <label for="" class="label">Password</label>
                    <div class="control has-icons-left">
                        <input type="password" placeholder="Enter your password" class="input" :class="{'is-danger': isInvalidForm}" required ref="password">
                        <span class="icon is-small is-left">
                            <i class="fa fa-lock"></i>
                        </span>
                    </div>
                    <a class="is-size-7 has-text-primary" v-show="props.mode!=='sign-up'">forgot your password?</a>
                </div>
                <div class="column">
                    <div class="icon-text" v-show="isInvalidForm == true">
                        <span class="icon">
                            <i class='fa fa-warning is-large' style="color:red"></i>
                        </span>
                        <span class="has-text-danger is-size-7">Invalid Email or Password</span>
                    </div>
                    <button class="button is-primary is-fullwidth" type="submit" v-if="props.mode==='sign-in'">Sign In</button>
                    <button class="button is-warning is-fullwidth" type="submit" v-else>Create Account</button>
                </div>
                <div class="has-text-centered">
                    <p class="is-size-7" v-if="props.mode==='sign-in'"> Don't have an account? <a class="has-text-primary" @click="emit('updateMode', 'sign-up')">Sign up</a></p>
                    <p class="is-size-7" v-else>Already have an account? <a class="has-text-primary" @click="emit('updateMode', 'sign-in')">Log in</a></p>
                </div>
            </form>
        </div>

        <button class="modal-close is-large" @click="emit('updateModal')" aria-label="close"></button>
        <button class="js-modal-trigger is-warning" data-target="signup">
            Signup
        </button>
    </div>

</template>