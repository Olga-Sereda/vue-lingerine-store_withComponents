<template>
    <main class="content container">
        <div class="content__top">
    
          <div class="content__row">
            <h1 class="content__title">
              Каталог
            </h1>
            <span class="content__info">
              152 товара
            </span>
          </div>
        </div>
    
        <div class="content__catalog">
          <ProductFilter :price-from.sync="filterPriceFrom" :price-to.sync="FilterPriceTo" :category-id.sync="FilterCategoryId" :material.sync="FilterMaterials" :season.sync="FilterSeasons" />
          <section class="catalog">

          <div v-if="productsLoading">
            <Spinner/>
          </div>
          <div v-if="productsLoadingFailed">Произошла ошибка при загрузке товаров<button @click.prevent="loadProducts">Попробовать еще раз</button></div>
     
          <ProductList :products="products"/> 
    
          <BasePagination v-model="page" :count="countProducts" :per-page.sync="productsPerPage"/>
              
        </section>
          
        </div>
      </main>

</template>

<script>
import axios from 'axios';
import ProductList from '@/components/ProductList.vue';
import BasePagination from '@/components/BasePagination.vue';
import ProductFilter from '@/components/ProductFilter.vue';
import Spinner from '@/components/Spinner.vue'

export default {
  components: {ProductList, BasePagination, ProductFilter, Spinner},
  data() {
    return {
      filterPriceFrom: 0,
      FilterPriceTo: 0,
      FilterCategoryId: 0,
      FilterMaterials: [],
      FilterSeasons: [],

      ProductsData: null,
      page: 1,
      productsPerPage: 6,

      productsLoading: false,
      productsLoadingFailed: false
    }
  },
  computed: {
    products() {
      return this.ProductsData ? this.ProductsData.items : []
    },
    countProducts() {
      return this.ProductsData ? this.ProductsData.pagination.total : 0;
    }
  },
  methods: {
    loadProducts() {
      this.productsLoading = true;
      this.productsLoadingFailed = false;
      clearTimeout(this.loadProductsTimer);
      this.loadProductsTimer = setTimeout(() => {
      axios.get('https://vue-moire.skillbox.cc/api/products', {
            params: {
                page: this.page,
                limit: this.productsPerPage,
                categoryId: this.FilterCategoryId,
                minPrice: this.filterPriceFrom,
                maxPrice: this.FilterPriceTo,
                materialIds: this.FilterMaterials,
                seasonIds: this.FilterSeasons
              }
          })
            .then(response => this.ProductsData = response.data) 
            .catch(() => this.productsLoadingFailed = true)
            .then(() => this.productsLoading = false)
      }, 2000)
    }   
  },
  watch: {
    page() {
      this.loadProducts();
    },
    filterPriceFrom() {
      this.loadProducts();
    },
    FilterPriceTo() {
      this.loadProducts();
    },
    FilterCategoryId() {
      this.loadProducts();
    },
    FilterMaterials() {
      this.loadProducts();
    },
    FilterSeasons() {
      this.loadProducts();
    },
    productsPerPage() {
      this.loadProducts();
    }
  },
  created() {
    this.loadProducts();
  }
}
</script>