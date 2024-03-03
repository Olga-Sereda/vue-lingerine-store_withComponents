<template>
    <div class="modal">
        <div class="modal__content">
            <slot/>
            <button class="product__del button-del close__btn" type="button" @click.prevent="closeModal">
              <svg width="20" height="20" fill="currentColor" >
                <use xlink:href="#icon-close"></use>
              </svg>
            </button>
        </div>
        <div>
          
        </div>
    </div>
</template>

<script>

export default {
  methods: {
    closeModal() {
      this.$emit('closeModal')
    }
  }
}
</script>

<style>
.modal {
  display: flex;
    position: fixed;
    z-index: 4;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    align-items: center;
    justify-content: center;
    background-color: rgba(0,0,0,0.5);
    overflow-y: auto;
  }
  
.modal__content {
  display: flex;
  padding: 35px 30px;
  position: relative;
  z-index: 4;
  min-width: 450px;
  min-height: 200px;
  overflow: auto;
  background-color: #fff;
}

.close__btn {
  position: absolute;
  right: 15px;
  top: 15px;
}

</style>