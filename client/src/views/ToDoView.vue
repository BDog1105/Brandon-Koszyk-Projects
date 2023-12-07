<script setup lang="ts">
    import ThreeColumnLayout from '../components/ThreeColumnLayout.vue';
    import { ref, type Ref } from 'vue';
    const currentTab = ref("All");
    const newTask = ref('');
    const tabs = ref([
        { name: 'Current', icon: 'fas fa-spinner' },
        { name: 'Completed', icon: 'fas fa-check' },
        { name: 'All', icon: 'fas fa-list' },
        { name: 'Overdue', icon: 'fas fa-exclamation-triangle' }
    ])
    const items = ref([
        { name: 'Finish creating todo list', completed: false}
    ])

    function isValidAddItem(item: { completed: boolean; }) {
        if(currentTab.value == 'Current' && !item.completed) return true;
        if(currentTab.value == 'Completed' && item.completed) return true;
        if(currentTab.value == 'All') return true;
        return false;
    }
    function addTask() {
        items.value.push({name: newTask.value, completed: false});
        newTask.value= '';
    }
</script>

<template>
    <ThreeColumnLayout>
        <template #right-column-left>
            <div class="panel">
                <div class="tabs is-boxed">
                    <ul>
                        <li v-for="tab in tabs" :class="{'is-active': currentTab == tab.name}" @click="currentTab = tab.name">
                            <a>
                                <span class="icon is-small"><i :class = "tab.icon"></i></span>
                                <span>{{tab.name}}</span>
                                <span class="tag icon is-danger" v-show="tab.name == 'Current'">{{items.filter(item => !item.completed).length}}</span>
                                <span class="tag icon is-success" v-show="tab.name == 'Completed'">{{items.filter(item => item.completed).length}}</span>
                            </a>
                        </li>
                    </ul>
                </div>
                <div class="control has-icons-left">
                    <input type="text" class="input" placeholder="New Task" v-model="newTask" @keypress.enter="addTask()">
                    <span class="icon is-small is-left">
                        <i class="fas fa-calendar-plus"></i>
                    </span>
                </div>
                <a v-for="item in items" class="panel-block" v-show="isValidAddItem(item)">
                    <input type="checkbox" v-model="item.completed"/>
                    {{ item.name }}
                </a>
            </div> 
        </template>
    </ThreeColumnLayout>
</template>