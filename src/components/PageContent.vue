<template>
  <div class="page-content">
    <slot></slot>
  </div>
</template>

<script>
import router from '../route'
import store from '../store'

export default {
  
}

router.afterEach((to, from) => {
  document.title = to.meta.title + ' | Teller';
});
</script>

<style lang="scss">

</style>
