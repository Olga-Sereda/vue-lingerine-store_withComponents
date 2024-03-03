<template>
    <li class="catalog__item" :product="product">
        <router-link class="catalog__pic" :to="{name: 'product', params: {id: product.id}}" >
          <img :src="changeImg" :alt="product.title">
        </router-link>

        <h3 class="catalog__title">
          <a href="#">
            {{ product.title }}
          </a>
        </h3>

        <span class="catalog__price">
          {{ product.price }} ₽
        </span>

        <div class="cart-box">
          <ul class="colors colors--black">
          <li class="colors__item" v-for="color in product.colors" :key="color.color.id">
            <label class="colors__label">
              <input class="colors__radio sr-only" type="radio" name="color-1" :value="color.color.id" v-model="productColorId">
              <span class="colors__value" :style="{'background-color': color.color.code}">
              </span>
            </label>
          </li>
        </ul>

        <button class="addToCart-btn" @click.prevent="showPopup(product.id)">
          <svg width="30" height="23" viewBox="0 0 76 58" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M69.035 38.4249H40.2306C39.7526 38.4257 39.2886 38.2639 38.9148 37.9661C38.541 37.6683 38.2795 37.2522 38.1734 36.7862L33.3233 15.6558C33.2524 15.3471 33.2519 15.0264 33.3221 14.7175C33.3922 14.4087 33.5311 14.1196 33.7284 13.8719C33.9256 13.6241 34.1763 13.424 34.4616 13.2865C34.7469 13.149 35.0595 13.0776 35.3762 13.0776H73.8893C74.2064 13.077 74.5195 13.1479 74.8054 13.2851C75.0912 13.4224 75.3423 13.6224 75.5401 13.8702C75.7379 14.1181 75.8771 14.4074 75.9475 14.7165C76.0178 15.0257 76.0175 15.3467 75.9465 15.6558L71.0879 36.7862C70.982 37.2515 70.7212 37.6671 70.3482 37.9648C69.9752 38.2625 69.5122 38.4247 69.035 38.4249ZM41.9072 34.2123H67.3584L71.2438 17.2945H38.0204L41.9072 34.2123Z" fill="#949494"/>
            <path d="M44.3519 57.2414C42.7555 57.2414 41.195 56.768 39.8677 55.8811C38.5404 54.9942 37.5058 53.7336 36.8949 52.2588C36.284 50.7839 36.1242 49.161 36.4356 47.5954C36.7471 46.0297 37.5158 44.5915 38.6446 43.4627C39.7734 42.3339 41.2116 41.5652 42.7773 41.2537C44.3429 40.9423 45.9658 41.1021 47.4407 41.713C48.9155 42.3239 50.1761 43.3585 51.063 44.6858C51.9499 46.0131 52.4233 47.5736 52.4233 49.17C52.421 51.31 51.5699 53.3617 50.0567 54.8748C48.5436 56.388 46.4919 57.2391 44.3519 57.2414ZM44.3519 45.3126C43.5886 45.3126 42.8425 45.539 42.2079 45.9631C41.5733 46.3871 41.0788 46.9899 40.7867 47.695C40.4947 48.4002 40.4184 49.1762 40.5674 49.9247C40.7164 50.6733 41.084 51.3608 41.6238 51.9004C42.1636 52.44 42.8513 52.8074 43.6 52.9562C44.3486 53.1049 45.1245 53.0283 45.8296 52.736C46.5346 52.4437 47.1372 51.9489 47.561 51.3142C47.9849 50.6794 48.2109 49.9332 48.2106 49.17C48.2095 48.1471 47.8026 47.1664 47.0791 46.4432C46.3557 45.72 45.3748 45.3134 44.3519 45.3126Z" fill="#949494"/>
            <path d="M64.9122 57.2414C63.3159 57.2414 61.7554 56.768 60.428 55.8811C59.1007 54.9942 58.0662 53.7336 57.4553 52.2588C56.8444 50.7839 56.6845 49.161 56.996 47.5954C57.3074 46.0297 58.0761 44.5915 59.2049 43.4627C60.3337 42.3339 61.7719 41.5652 63.3376 41.2537C64.9033 40.9423 66.5262 41.1021 68.001 41.713C69.4759 42.3239 70.7364 43.3585 71.6233 44.6858C72.5102 46.0131 72.9836 47.5736 72.9836 49.17C72.9814 51.31 72.1303 53.3617 70.6171 54.8748C69.1039 56.388 67.0522 57.2391 64.9122 57.2414ZM64.9122 45.3126C64.149 45.3126 63.4029 45.539 62.7683 45.9631C62.1337 46.3871 61.6391 46.9899 61.3471 47.695C61.0551 48.4002 60.9787 49.1762 61.1277 49.9247C61.2767 50.6733 61.6444 51.3608 62.1842 51.9004C62.724 52.44 63.4117 52.8074 64.1603 52.9562C64.9089 53.1049 65.6848 53.0283 66.3899 52.736C67.095 52.4437 67.6975 51.9489 68.1214 51.3142C68.5452 50.6794 68.7713 49.9332 68.771 49.17C68.7699 48.1471 68.3629 47.1664 67.6395 46.4432C66.916 45.72 65.9352 45.3134 64.9122 45.3126Z" fill="#949494"/>
            <path d="M35.3762 17.2905C34.9341 17.2904 34.5032 17.1513 34.1446 16.8927C33.7859 16.6341 33.5178 16.2692 33.3781 15.8498L29.7678 5.00509H23.1063C22.5477 5.00509 22.0119 4.78318 21.6169 4.38817C21.2219 3.99316 21 3.45741 21 2.89879C21 2.34016 21.2219 1.80441 21.6169 1.4094C22.0119 1.01439 22.5477 0.79248 23.1063 0.79248H31.2928C31.7349 0.792521 32.1658 0.931689 32.5245 1.19027C32.8831 1.44884 33.1513 1.81372 33.291 2.23319L37.3814 14.5186C37.4869 14.8352 37.5156 15.1723 37.4652 15.5021C37.4148 15.832 37.2868 16.1452 37.0917 16.4159C36.8966 16.6866 36.6399 16.907 36.3429 17.0591C36.0459 17.2111 35.7169 17.2904 35.3833 17.2905H35.3762Z" fill="#949494"/>
            <rect y="27" width="26" height="4" rx="2" fill="#949494"/>
            <rect x="11" y="42" width="26" height="4" rx="2" transform="rotate(-90 11 42)" fill="#949494"/>
            </svg>                      
        </button>
        </div>

        <BaseModal v-if="infoModalVisible" @closeModal="closeInfoModal" @addProductToCart="addToCart">
          <ProductInModal :product-modal-id="currentProductId" />
        </BaseModal>
      </li>
</template>

<script>
import { mapActions } from 'vuex';
import BaseModal from './BaseModal.vue';
import ProductAmount from './ProductAmount.vue';
import ProductInModal from './ProductInModal.vue';

export default {
  props: ['product'],
  data() {
    return {
      productData: null,
      productColorId: '',
      productAmount: 1,
      currentSizeId: 1,
      productLoading: false,
      currentProductId: null,

      productAdded: false
    }
  },
  components: {BaseModal, ProductAmount, ProductInModal},
  computed: {
    infoModalVisible: {
      get() {
        return this.currentProductId
      },
      set(isOpen) {
        if (!isOpen) {
          this.currentProductId = null
        }
      }
    },
    changeImg() {
      return this.product.colors.find(el => el.color.id === this.productColorId).gallery.find(el => el.file).file.url
    }
  },
  methods: {
    ...mapActions(['addProductToCart']),
    addToCart() {
      this.productAdded = false;

      this.addProductToCart({
        productId: this.product.id, 
        colorId: this.currentColorId ? this.currentColorId : this.product.colors[0].color.id, 
        sizeId: this.currentSizeId ? this.currentSizeId : this.product.sizes[0].id, 
        amount: this.productAmount
      })
      .then(() => {
          this.productAdded = true;
        })
    },
    showPopup(productId) {
      this.currentProductId = productId
    },
    closeInfoModal() {
      this.infoModalVisible = false
    }
  },
  created() {
    this.productColorId = this.product.colors[0].color.id
  }
}
</script>


<style>
.addToCart-btn {
  background-color: transparent;
  border: none;
  cursor: pointer;
}

.cart-box {
  display: flex;
  justify-content: space-between;
}

.title__modal {
  max-width: 300px;
}

.modal__list {
  grid-template-columns: repeat(4,1fr);
}
</style>