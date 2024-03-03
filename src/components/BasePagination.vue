<template>
  <div class="pagination-pages">
    <label class="form__label form__label--select pages__label">
    <select class="form__select" type="text" name="category" v-model.number="currentPerPage" @change="changePerPage(currentPerPage)">
      <!-- <option value="0">Количество товаров</option> -->
      <option :value="item.count" v-for="item in perPages" :key="item.count">{{ item.count }}</option>
    </select>
  </label>  
  <ul class="catalog__pagination pagination">
    <li class="pagination__item">
      <a class="pagination__link pagination__link--arrow" @click.prevent="minusPage()" :class="{'pagination__link--disabled': page === 1}" aria-label="Предыдущая страница">
        <svg width="8" height="14" fill="currentColor">
          <use xlink:href="#icon-arrow-left"></use>
        </svg>
      </a>
    </li>
    <li class="pagination__item" v-for="pageNumber in pages" :key="pageNumber" @click.prevent="paginate(pageNumber)">
      <a href="#" class="pagination__link" :class="{'pagination__link--current': pageNumber === page}" >
        {{ pageNumber }}
      </a>
    </li>
    <li class="pagination__item">
      <a class="pagination__link pagination__link--arrow" href="#" @click.prevent="plusPage()" :class="{'pagination__link--disabled': page === pages}" aria-label="Следующая страница">
        <svg width="8" height="14" fill="currentColor">
          <use xlink:href="#icon-arrow-right"></use>
        </svg>
      </a>
    </li>
  </ul>
  </div>
  
</template>

<script>
import perPages from '@/data/perPages'

export default {
  data() {
    return {
      currentPerPage: 6
    }
  },
  model: {
      prop: 'page',
      event: 'paginate'
  },
  props: ['page', 'count', 'perPage'],
  computed: {
      pages() {
          return Math.ceil(this.count / this.perPage)
      },
      perPages() {
        return perPages;
      }
  },
  watch: {
    currentPerPage(value) {
      this.perPage = value
    }
  },
  methods: {
    changePerPage() {
      this.$emit('update:perPage', this.currentPerPage)
    },
      paginate(page) {
          this.$emit('paginate', page);
      },
      plusPage() {
        if (this.page < this.pages)
        this.$emit('paginate', this.page + 1);
      },
      minusPage() {
        if (this.page > 1)
        this.$emit('paginate', this.page - 1);
      }
  }
}
</script>

<style>
.pagination-pages {
  position: relative;
  display: flex;
  align-items: center;
}

.pages__label {
  position: absolute;
  right: 0;
  margin-top: 25px;
}
</style>
