<template>
    <aside class="filter">
        <form class="filter__form form" action="#" method="get" @submit.prevent="submit">
          <fieldset class="form__block">
            <legend class="form__legend">Цена</legend>
            <label class="form__label form__label--price">
              <input class="form__input" type="text" name="min-price" v-model.number="productPriceFrom">
              <span class="form__value">От</span>
            </label>
            <label class="form__label form__label--price">
              <input class="form__input" type="text" name="max-price" v-model.number="productPriceTo">
              <span class="form__value">До</span>
            </label>
          </fieldset>

          <fieldset class="form__block">
            <legend class="form__legend">Категория</legend>
            <label class="form__label form__label--select">
              <select class="form__select" type="text" name="category" v-model.number="currentCategoryId">
                <option value="0">Все категории</option>
                <option :value="category.id" v-for="category in categories" :key="category.id">{{ category.title }}</option>
              </select>
            </label>
          </fieldset>

          <fieldset class="form__block">
            <legend class="form__legend">Материал</legend>
            <ul class="check-list">          
              <li class="check-list__item" v-for="material in materials" :key="material.id">
                <label class="check-list__label">
                  <input class="check-list__check sr-only" type="checkbox" name="material" :value="material.id" v-model.number="currentMaterialsIds">
                  <span class="check-list__desc">
                    {{ material.title }} 
                    <span>({{ material.productsCount }})</span>
                  </span>
                </label>
              </li>
            </ul>
          </fieldset>

          <fieldset class="form__block">
            <legend class="form__legend">Коллекция</legend>
            <ul class="check-list">
              <li class="check-list__item" v-for="season in seasons" :key="season.id">
                <label class="check-list__label">
                  <input class="check-list__check sr-only" type="checkbox" name="collection" :value="season.id" v-model.number="currentSeasonsIds">
                  <span class="check-list__desc">
                    {{ season.title }} 
                    <span>({{ season.productsCount }})</span>
                  </span>
                </label>
              </li>
            </ul>
          </fieldset>

          <button class="filter__submit button button--primery" type="submit">
            Применить
          </button>
          <button class="filter__reset button button--second" v-if="resetButton" type="button" @click.prevent="reset">
            Сбросить
          </button>
        </form>
      </aside>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            productPriceFrom: 0,
            productPriceTo: 0,
            currentCategoryId: 0,
            currentMaterialsIds: [],
            currentSeasonsIds: [],

            categoriesData: null,
            materialsData: null,
            seasonsData: null,

            resetButton: false
        }
    },
    props: ['priceFrom', 'priceTo', 'categoryId', 'material', 'season'],
    computed: {
      categories() {
        return this.categoriesData ? this.categoriesData.items : []
      },
      materials() {
        return this.materialsData ? this.materialsData.items : []
      },
      seasons() {
        return this.seasonsData ? this.seasonsData.items : []
      }
    },
    watch: {
      priceFrom(value) {
        this.productPriceFrom = value;
      },
      priceTo(value) {
        this.productPriceTo = value;
      },
      categoryId(value) {
        this.currentCategoryId = value;
      },
      material(value) {
        this.currentMaterialsIds = value;
      },
      season(value) {
        this.currentSeasonsIds = value
      }
    },
    methods: {
      submit() {
        this.$emit('update:priceFrom', this.productPriceFrom),
        this.$emit('update:priceTo', this.productPriceTo),
        this.$emit('update:categoryId', this.currentCategoryId),
        this.$emit('update:material', this.currentMaterialsIds),
        this.$emit('update:season', this.currentSeasonsIds),
        this.resetButton = true
      },
      reset() {
        this.$emit('update:priceFrom', 0),
        this.$emit('update:priceTo', 0),
        this.$emit('update:categoryId', 0),
        this.$emit('update:material', []),
        this.$emit('update:season', []),
        this.resetButton = false
      },
      loadCategories() {
        axios.get('https://vue-moire.skillbox.cc/api/productCategories')
             .then(response => this.categoriesData = response.data)
      },
      loadMaterials() {
        axios.get('https://vue-moire.skillbox.cc/api/materials')
              .then(response => this.materialsData = response.data)
      },
      loadSeasons() {
        axios.get('https://vue-moire.skillbox.cc/api/seasons')
              .then(response => this.seasonsData = response.data)
      }
    },
    created() {
      this.loadCategories();
      this.loadMaterials();
      this.loadSeasons();
    }
}
</script>