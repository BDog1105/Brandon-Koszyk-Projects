
<script setup lang="ts">
    import { ref } from 'vue';
    import type { User } from '../model/session';
    import { searchUsers } from '../model/session';

    const search = ref('' as string | undefined);
    let results = ref<User[]>([]);

    const selectFriend = (result: User) => {
      search.value = result.name;
    }

    const update = async () => {
      if (search.value && search.value.length > 1) {
        await searchUsers(search.value)
          .then(data => {
            console.log("Data is: ", data);
            results.value = data.data;
            console.log("Results is: ", results);
          });
      } else {
        results.value = [];
      }
    }

</script>

<template>

    <div class="field has-addons">
        <div class="control">
          <input type="search" placeholder="" class="input" @input="update" required v-model="search">
        </div>
        <div class="control">
            <div class="dropdown is-active">
                <div class="dropdown-trigger">
                    <button class="button" aria-haspopup="true" aria-controls="dropdown-menu">
                        <span>Friends</span>
                        <span class="icon is-small">
                            <i class="fas fa-angle-down" aria-hidden="true"></i>
                        </span>
                    </button>
                </div>
                <div class="dropdown-menu is-active" id="dropdown-menu" role="menu">
                    <div class="dropdown-content" v-if="results.length > 0">
                      <a class="dropdown-item" v-for="result in results" @click="selectFriend(result)">
                            {{ result.name }}
                      </a>
                    </div>
                </div>
            </div>
        </div>
    </div>



</template>

<style scoped>

</style>