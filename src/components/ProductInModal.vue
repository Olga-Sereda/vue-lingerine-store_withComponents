<template> 
    <main class="content container" v-if="productLoading"><Spinner/></main>  
    <main class="content container content__modal" v-else>

          <section class="item">
            <div class="item__pics pics">
              <div class="pics__wrapper">
                <img width="370" height="370" :src="activeImg" :alt="product.title">
              </div>
              <ul class="pics__list pics__list-modal">
                <li class="pics__item" v-for="image in product.colors" :key="image.color.id">
                  <a href="" class="pics__link pics__link--current">
                    <img width="98" height="98" :src="image.gallery.find(el => el.file).file.url"  alt="Название товара">
                  </a>
                </li>
              </ul>
            </div>
      
            <div class="item__info">
              <span class="item__code">Артикул: {{ product.id }}</span>
              <h2 class="item__title">
                {{ product.title }}
              </h2>
              <div class="item__form">
                <form class="form" action="#" method="POST" @submit.prevent="addToCart">
                  <div class="item__row item__row--center">
                    <ProductAmount :product-amount.sync="productAmount"/>
                    
                    <b class="item__price">
                      {{ product.price }} ₽
                    </b>
                  </div>
      
                  <div class="item__row">
                    <fieldset class="form__block">
                      <legend class="form__legend">Цвет</legend>
                      <ul class="colors colors--black">
                        <li class="colors__item" v-for="color in product.colors" :key="color.color.id">
                          <label class="colors__label" :for="product.id + color.color.id">
                            <input class="colors__radio sr-only" :id="product.id + color.color.id" type="radio" name="color-item" :value="color.color.id" v-model="currentColorId" >
                            <span class="colors__value" :style="{'background-color': color.color.code}">
                            </span>
                          </label>
                        </li>
                      </ul>
                    </fieldset>
      
      
                    <fieldset class="form__block">
                      <legend class="form__legend">Размер</legend>
                      <label class="form__label form__label--small form__label--select" :for="product.id">
                        <select class="form__select" type="text" name="category" :id="product.id" v-model="currentSizeId">
                          <option :value="size.id" v-for="size in product.sizes" :key="size.id">{{ size.title }}</option>
                        </select>
                      </label>
                    </fieldset>
                  </div>
                  
                  <button class="item__button button button--primery" type="submit" :disabled="productAddSending">
                    <div v-if="productAdded">Товар добавлен в корзину</div>
                    <div v-else-if="productAddSending">Добавляем товар в корзину...</div>
                    <div v-else>В корзину</div>
                  </button>
                </form>
                
              </div>
            </div>
      
          </section>
        </main>
      
  </template>
  
  <script>
  import axios from 'axios';
  import ProductAmount from '@/components/ProductAmount.vue';
  import { mapActions } from 'vuex';
  import Spinner from '@/components/Spinner.vue';
  
  export default {
    data() {
      return {
        productData: null,
        productAmount: 1,
        currentColorId: '',
        currentSizeId: '',
  
        productAdded: false,
        productAddSending: false,
  
        productLoading: false
      }
    },
    props: {
        productModalId: { type: [Number, String], required: true }
    },
    components: {ProductAmount, Spinner},
    computed: {
      product() {
        return this.productData ? this.productData : []
      },
      activeImg() {
        console.log(this.product.sizes.find(el => el.id).id)
        console.log(this.product?.colors?.[0].color.id)
        if (this.currentColorId && this.product.colors) {
          return this.product.colors.find(item => item.color.id === this.currentColorId)?.gallery.find(el => el.file)?.file.url
        } else
        return this.product.colors?.find(item => item.gallery)?.gallery.find(el => el.file)?.file.url
      }
    },
    methods: {
      loadProduct() {
        this.productLoading = true
        clearTimeout(this.loadProductsTimer);
        this.loadProductsTimer = setTimeout(() => {
          axios.get('https://vue-moire.skillbox.cc/api/products/' + this.productModalId)
              .then(response => this.productData = response.data)
              .then(() => this.productLoading = false)
        }, 1500)
      },
      ...mapActions(['addProductToCart']),
      addToCart() {
        this.productAdded = false;
        this.productAddSending = true
  
        this.addProductToCart({
          productId: this.product.id, 
          colorId: this.currentColorId ? this.currentColorId : this.product.colors[0].color.id, 
          sizeId: this.currentSizeId ? this.currentSizeId : this.product.sizes[0].id, 
          amount: this.productAmount
        })
          .then(() => {
            this.productAdded = true;
            this.productAddSending = false;
          })
      }
    },
    created() {
      this.loadProduct()
    },
    beforeRouteUpdate() {
      this.loadProduct()
    }
  }
  </script>

<style>
.content__modal {
  padding-bottom: 30px;
  max-width: 900px;
  max-height: 750px;
}

.pics__list-modal {
  grid-template-columns: repeat(4,1fr);
}
</style>