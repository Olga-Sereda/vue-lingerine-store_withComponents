<template>
<router-link class="header__cart" :to="{name: 'cart'}" aria-label="Корзина с товарами"> 
    <svg width="19" height="24">
        <use xlink:href="#icon-cart"></use>
    </svg>
    <div v-if="$store.state.addToCartLoading" class="cart__animate"><SpinnerIndicator/></div>
    <span v-else class="header__count animate-item" aria-label="Количество товаров">{{ $store.state.cartProducts.length }}</span>
</router-link> 
</template>

<script>
import SpinnerIndicator from '@/components/SpinnerIndicator.vue';

export default {
    components: {SpinnerIndicator}
}
</script>

<style>
.cart__animate {
    position: absolute;
    right: 0;
    bottom: -5px;
}
</style>