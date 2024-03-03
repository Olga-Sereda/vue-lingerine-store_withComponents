<template>
    <main class="content container">
        <div class="content__top">
          <ul class="breadcrumbs">
            <li class="breadcrumbs__item">
              <router-link class="breadcrumbs__link" :to="{name: 'main'}">
                Каталог
              </router-link>
            </li>
            <li class="breadcrumbs__item">
              <router-link class="breadcrumbs__link" :to="{name: 'cart'}">
                Корзина
              </router-link>
            </li>
            <li class="breadcrumbs__item">
              <a class="breadcrumbs__link">
                Оформление заказа
              </a>
            </li>
          </ul>
    
          <h1 class="content__title">
            Заказ оформлен <span>№ {{ customerOrderInfo.id }}</span>
          </h1>
        </div>
    
        <section class="cart">
          <form class="cart__form form" action="#" method="POST">
            <div class="cart__field">
              <p class="cart__message">
                Благодарим за&nbsp;выбор нашего магазина. На&nbsp;Вашу почту придет письмо с&nbsp;деталями заказа. 
                Наши менеджеры свяжутся с&nbsp;Вами в&nbsp;течение часа для уточнения деталей доставки.
              </p>
    
              <ul class="dictionary">
                <li class="dictionary__item">
                  <span class="dictionary__key">
                    Получатель
                  </span>
                  <span class="dictionary__value">
                    {{ customerOrderInfo.name }}
                  </span>
                </li>
                <li class="dictionary__item">
                  <span class="dictionary__key">
                    Адрес доставки
                  </span>
                  <span class="dictionary__value">
                    {{ customerOrderInfo.address }}
                  </span>
                </li>
                <li class="dictionary__item">
                  <span class="dictionary__key">
                    Телефон
                  </span>
                  <span class="dictionary__value">
                    {{ customerOrderInfo.phone }}
                  </span>
                </li>
                <li class="dictionary__item">
                  <span class="dictionary__key">
                    Email
                  </span>
                  <span class="dictionary__value">
                    {{ customerOrderInfo.email }}
                  </span>
                </li>
                <li class="dictionary__item">
                  <span class="dictionary__key">
                    Способ оплаты
                  </span>
                  <span class="dictionary__value">
                    {{ customerOrderInfo.paymentType }}
                  </span>
                </li>
              </ul>
            </div>
    
            <div class="cart__block">
              <ul class="cart__orders">
                <li class="cart__order" v-for="product in customerOrderInfo.basket.items" :key="product.id">
                  <h3>{{ product.product.title }}</h3>
                  <b>{{ (product.product.price * product.quantity) | numberFormat }} ₽</b>
                  <span>Артикул: {{ product.product.id }}</span>
                </li>
              </ul>
              
              <div class="cart__total">
                <p>Доставка: <b>{{ customerOrderInfo.deliveryType.price }} ₽</b></p>
                <p>Итого: <b>{{ productsCount }}</b> на сумму <b>{{ customerOrderInfo.totalPrice | numberFormat }} ₽</b></p>
              </div>
            </div>
          </form>
        </section>
      </main>
</template>

<script>
import { mapGetters } from 'vuex';
import numberFormat from '@/helpers/numberFormat';

export default {
  filters: {numberFormat},
  computed: {
    ...mapGetters({productsCount: 'orderPageCount'}),
    customerOrderInfo() {
      return this.$store.state.orderInfo
    }
  },
    created() {
        this.$store.dispatch('loadOrderInfo', this.$route.params.orderId) 
    }
}
</script>