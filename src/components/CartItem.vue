<template>
    <li class="cart__item product" >
        <div class="product__pic">
          <img :src="item.color.gallery.find(el => el.file).file.url" width="120" height="120" alt="Название товара">
        </div>
        <h3 class="product__title">
          {{ item.product.title }}
        </h3>
        <p class="product__info product__info--color">
          Цвет: 
          <span>
            <i :style="{'background-color': item.color.color.code}"></i>
            {{ item.color.color.title }}
          </span>
            Размер: 
          <span>
            {{ item.size.title }}
          </span>
        </p>
        <span class="product__code">
          Артикул: {{ item.product.id }}
        </span>

        <div class="product__counter form__counter">
          <button type="button" aria-label="Убрать один товар" @click.prevent="productMinus">
            <svg width="10" height="10" fill="currentColor">
              <use xlink:href="#icon-minus"></use>
            </svg>
          </button>

          <input type="text" v-model.number="amount" name="count">

          <button type="button" aria-label="Добавить один товар" @click.prevent="productPlus">
            <svg width="10" height="10" fill="currentColor">
              <use xlink:href="#icon-plus"></use>
            </svg>
          </button>
        </div>

        <b class="product__price">
          {{ item.price * item.quantity}} ₽
        </b>

        <button class="product__del button-del" type="button" aria-label="Удалить товар из корзины" @click.prevent="deleteProduct(item.basketItemId)">
          <svg width="20" height="20" fill="currentColor" >
            <use xlink:href="#icon-close"></use>
          </svg>
        </button>
    </li>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    props: ['item'],
    computed: {
      amount: {
        get() {
          return this.item.quantity
        },
        set(value) {
          this.$store.dispatch('updateCartProductAmount', {basketItemId: this.item.id, quantity: value})
        }
      }
    },
    methods: {
      ...mapActions(['deleteCartProduct']),
      deleteProduct() {
        this.deleteCartProduct({basketItemId: this.item.id})
      },
      productPlus() {
      this.amount = this.amount + 1;
      },
      productMinus() {
        if (this.amount > 1)
        this.amount = this.amount - 1;
      }
    }
}
</script>