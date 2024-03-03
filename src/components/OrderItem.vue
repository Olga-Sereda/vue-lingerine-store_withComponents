<template>
    <li class="cart__order">
        <h3>{{ item.product.title }}</h3>
        <b>{{ (item.quantity * item.price) | numberFormat }} ₽</b>
        <span>Артикул: {{ item.product.id }}</span>
    </li>
</template>

<script>
import numberFormat from '../helpers/numberFormat';

export default {
    props: ['item'],
    filters: {numberFormat},
    computed: {
      amount: {
        get() {
          return this.item.quantity
        },
        set(value) {
          this.$store.dispatch('updateCartProductAmount', {basketItemId: this.item.basketItemId, amount: value})
        }
      }
    }
}
</script>