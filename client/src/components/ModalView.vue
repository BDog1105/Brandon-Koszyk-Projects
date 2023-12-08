<script setup lang="ts">

    const props = defineProps<{
        title?: string;
        isOpen: boolean;
    }>();

    const emit = defineEmits<{
        (e:'update'): void;
    }>();

</script>

<template>
    <div class="modal" :class="{ 'is-active': props.isOpen }">
        <div class="modal-background"></div>
        <div class="modal-card">
            <header class="modal-card-head">
                <slot name="header">
                    <div class="modal-card-title has-text-weight-bold">{{ props.title }}</div>
                    <button class="delete" @click="emit('update')"></button>
                </slot>
            </header>
            <section class="modal-card-body">
                <slot></slot>
            </section>
            <footer class="modal-card-foot">
                <slot name="footer">
                    <button class="button is-success">Save changes</button>
                    <button class="button" @click="emit('update')">Cancel</button>
                </slot>
            </footer>
        </div>
    </div>
</template>

<style scoped>

</style>