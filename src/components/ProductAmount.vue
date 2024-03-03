<template>
    <div class="form__counter">
        <button type="button" aria-label="Убрать один товар" @click.prevent="productMinus">
        <svg width="12" height="12" fill="currentColor">
            <use xlink:href="#icon-minus"></use>
        </svg>
      </button>

      <input type="text" v-model.number="productAmount" name="count">

      <button type="button" aria-label="Добавить один товар" @click.prevent="productPlus">
        <svg width="12" height="12" fill="currentColor">
          <use xlink:href="#icon-plus"></use>
        </svg>
      </button>
    </div>
    

</template>

<script>
export default {
    props:['productAmount'],
    methods: {
        productMinus() {
            if (this.productAmount > 1)
            this.$emit('update:productAmount', this.productAmount - 1)
        },
        productPlus() {
            this.$emit('update:productAmount', this.productAmount + 1)
        }
    }
}
</script>