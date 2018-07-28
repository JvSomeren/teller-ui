<template>
  <page-content>
    <section id="teller">
      <aside id="login-container" class="modal">
        <router-link exact to="/view" id="goto-view">go to view</router-link>
        <div class="modal-content">
          <h2>please login</h2>
          <div id="login-container-button-container">
            <div id="login-container-button" @click="login">login</div>
          </div>
        </div>
      </aside>
    </section>
  </page-content>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions('auth', [
      'login'
    ])
  }
}
</script>

<style lang="scss">

</style>
