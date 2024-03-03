<template>
  <!-- <main class="content container" v-if="orderSending"><Spinner/></main> -->
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
    
          <div class="content__row">
            <h1 class="content__title">
              Оформление заказа
            </h1>
          </div>
        </div>
    
        <section class="cart">
          <div v-if="orderSending"><Spinner/></div>
          <form class="cart__form form" action="#" method="POST" @submit.prevent="order">
            <div class="cart__field">
              <div class="cart__data">
                <BaseFormText v-model="formData.name" title="ФИО" :error="formError.name" type="text" placeholder="Введите ваше полное имя"/>

                <BaseFormText v-model="formData.address" title="Адрес доставки" :error="formError.address" type="text" placeholder="Введите ваш адрес"/>

                <BaseFormText v-model="formData.phone" title="Телефон" :error="formError.phone" type="tel" placeholder="Введите ваш телефон"/>

                <BaseFormText v-model="formData.email" title="Email" :error="formError.email" type="email" placeholder="Введите ваш Email"/>
    
                <BaseFormTextarea v-model="formData.comment" title="Комментарий к заказу" :error="formError.comment" placeholder="Ваши пожелания" />
    
              </div>
    
              <div class="cart__options">
                <h3 class="cart__title">Доставка</h3>
                <ul class="cart__options options">
                  <li class="options__item" v-for="item in deliveryTypes" :key="item.id">
                    <label class="options__label">
                      <input class="options__radio sr-only" type="radio" name="delivery" :value="item.id" v-model.number="deliveryTypeId">
                      <span class="options__value">
                        {{ item.title }} <b>{{ item.price }} ₽</b>
                      </span>
                    </label>
                  </li>
                </ul>
    
                <h3 class="cart__title">Оплата</h3>
                <ul class="cart__options options">
                  <li class="options__item" v-for="payment in paymentTypes" :key="payment.id">
                    <label class="options__label">
                      <input class="options__radio sr-only" type="radio" name="pay" :value="payment.id" v-model="paymentTypeId">
                      <span class="options__value">
                        {{ payment.title }}
                      </span>
                    </label>
                  </li>
                </ul>
              </div>
            </div>
    
            <div class="cart__block">
              <ul class="cart__orders">
                <OrderItem v-for="item in products" :key="item.productId" :item="item"/>
              </ul>
              
              <div class="cart__total">
                <p>Доставка: <b> ₽</b></p>
                <p>Итого: <b>{{ $store.state.cartProducts.length }}</b> товара на сумму <b>{{ totalPrice | numberFormat }} ₽</b></p>
              </div>

              <button  class="cart__button button button--primery" type="submit">
                Оформить заказ
              </button>
            </div>
            <div class="cart__error form__error-block" v-if="formErrorMessage">
              <h4>Заявка не отправлена!</h4>
              <p>
                {{ formErrorMessage }}
              </p>
            </div>
          </form>
        </section>
      </main>
</template>

<script>
import BaseFormText from '@/components/BaseFormText.vue';
import BaseFormTextarea from '@/components/BaseFormTextarea..vue';
import OrderItem from '@/components/OrderItem.vue';
import axios from 'axios';
import { mapGetters } from 'vuex';
import { API_BASE_URL } from '@/config';
import numberFormat from '@/helpers/numberFormat';
import Spinner from '@/components/Spinner.vue';

export default {
    data() {
        return {
            formData: {},
            formError: {},
            formErrorMessage: '', //смс об ошибке, если в корзине пусто, 
            deliveryTypeId: '', //с пустым значением не работает запрос axios payments
            paymentTypeId: '',

            deliveryTypeData: null,
            paymentTypeData: null,

            orderSending: false
        }
    },
    components: {BaseFormText, BaseFormTextarea, OrderItem, Spinner},
    filters: {numberFormat},
    computed: {
      ...mapGetters({products: 'CartDatailProducts', totalPrice:  'CartTotalPrice'}),
      deliveryTypes() {
        return this.deliveryTypeData ? this.deliveryTypeData : []
      },
      paymentTypes() {
        return this.paymentTypeData ? this.paymentTypeData : []
      }
    },
    methods: {
      order() {
        this.formError = {};
        this.formErrorMessage = '';
        this.orderSending = true

        clearTimeout(this.loadProductsTimer);
        this.loadProductsTimer = setTimeout(() => {
          axios.post(API_BASE_URL + '/api/orders', {
            ...this.formData,
            deliveryTypeId: this.deliveryTypeId,
            paymentTypeId: this.paymentTypeId
          }, {
            params: {
              userAccessKey: this.$store.state.userAccessKey
            }
          })
          .then(response => {
            this.$store.commit('resetCart');
            this.$store.commit('updateOrderInfo', response.data)
            this.$router.push({name: 'OrderInfo', params: {orderId: response.data.id}})
          })
          .then(() => this.orderSending = false)
          .catch(error => {
            this.formError = error.response.data.error.request || {};
            this.formErrorMessage = error.response.data.error.message;
          })
        }, 2000)
        
      },
      loadDeliveryTypes() {
        axios.get(API_BASE_URL + '/api/deliveries')
              .then(response => {
                this.deliveryTypeData = response.data,
                this.deliveryTypeId = this.deliveryTypeData[0].id
              })
      },
      loadPayments() {
        axios.get(API_BASE_URL + '/api/payments', {
          params: {
            deliveryTypeId: this.deliveryTypeId
          }
        })
              .then(response => this.paymentTypeData = response.data)
      }
    },
    watch: {
      deliveryTypeId(value) {
        this.deliveryTypeId = value
        this.loadPayments();
      },
      paymentTypeId(value) {
        this.paymentTypeId = value
      }
    },
    created() {
      this.loadDeliveryTypes();
    }
}
</script>