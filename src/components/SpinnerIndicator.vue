<template>
    <div class="load-wrapp">
        <div class="load-4">
          <div class="ring-1"></div>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'spinnerIndicator'
  }
</script>

<style>
.ring-1 {
    width: 6px;
    height: 6px;
    margin: 0 auto;
    padding: 6px;
    border: 4px dashed #cb0d66;
    border-radius: 100%;
  }

.load-4 .ring-1 {
    animation: loadingD 1.5s 0.3s cubic-bezier(0.17, 0.37, 0.43, 0.67) infinite;
}

@keyframes loadingD {
    0% {
      transform: rotate(0deg);
    }
    50% {
      transform: rotate(180deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>