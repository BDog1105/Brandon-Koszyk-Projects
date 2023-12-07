<script setup lang="ts">

    /*
    <template>
        <ThreeColumnLayout>
            <template #left-column>
            <!-- Add your left column (sidebar) content here -->
            </template>
            <template #right-column-left>
            <!-- Add your right column inner left content here -->
            </template>
            <template #right-column-right>
            <!-- Add your right column inner right content here -->
            </template>
        </ThreeColumnLayout>
    </template>
    */

</script>

<template>
    <div class="section mx-5">
        <slot name="column">
        <div class="columns is-8 is-variable">
            <div class="column is-one-fifth"> <!--COLUMN SIDEBAR-->
                <slot name="left-column"></slot>
            </div>
            <div class="column is-four-fifths"> <!--COLUMN BODY-->
                <slot name="right-column">
                    <div class="columns"> 
                        <div class="column"> <!--Inner Left-->
                            <slot name="right-column-left"></slot>
                        </div>
                        <div class="column is-one-third"> <!--Inner Right-->
                            <slot name="right-column-right"></slot>
                        </div>
                    </div>
                </slot>
            </div>
        </div>
        </slot>
    </div>
</template>


  