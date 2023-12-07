<script setup lang="ts">
    import ThreeColumnLayout from '../components/ThreeColumnLayout.vue';
    import { ref } from 'vue';
    import { getProducts, type Product } from '../model/products'
    
    const products = ref<Product[]>([]);
    getProducts().then((data) => {
        products.value = data.data.reverse();
    })

    let isModalActive = ref(false);
    let productModal = {
        thumbnail: '',
        title: '',
        description: '',
        price: 0

    };

    function toggleModal(title: string, price: number, description: string, thumbnail: string) {
        productModal = {
            thumbnail: thumbnail,
            title: title,
            description: description,
            price: price
        }
        isModalActive.value = !isModalActive.value;
    }
</script>

<template>
    <ThreeColumnLayout>
        <template #right-column-left>
            <div class="product-list">
                <div class="product box" v-for="product in products" :key="product.id">
                    <a @click="toggleModal(product.title, product.price, product.description, product.thumbnail)">
                        <img :src="product.thumbnail" alt="product-image" style="border-radius: 15px;" />
                        <h1 class = 'title is-5 '>{{ product.title }}</h1>
                        <p class = 'subtitle is-6'>{{ product.description }}</p>
                    </a>
                    <div class="modal" :class="{'is-active': isModalActive}"> 
                        <div class="modal-background"></div>
                        <div class="modal-content">
                            <div class="box">
                                <img :src="productModal?.thumbnail" alt="product-image" />
                                <h1 class = 'title is-4 '>{{ productModal.title }}</h1>
                                <p class = 'subtitle is-6'>{{ productModal.description }}</p>
                                <p class = 'subtitle is-6 has-text-weight-bold'>${{ productModal.price }}.00</p>
                            </div>
                        </div>
                    <button class="modal-close is-large" @click="isModalActive=false" aria-label="close"></button>
                    </div>
                </div>
            </div>
        </template>
    </ThreeColumnLayout>
</template>

<style scoped>

    .product-list > .box {
        width: 265px;
        max-height: 530px;
    }

    .modal-content > .box {
        margin: 0 auto;
        width: 300px;
        height: fit-content;
    }

    .product-list {
        display: flex;
        flex-wrap: wrap;     
        gap: 25px;
        justify-content: center;   
    }

</style>