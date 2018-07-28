<template>
  <aside id="reset-modal" class="modal">
    <div class="modal-close" @click="close"></div>
    <div class="modal-content">
      <h2>reset counter</h2>
      <p>set counter to <span>0</span></p>
      <div id="reset-modal-options">
        <div id="reset-modal-cancel" @click="close">cancel</div>
        <div id="reset-modal-confirm" @click="confirm">reset</div>
      </div>
    </div>
  </aside>
</template>

<script>
export default {
  data: () => ({
    pageTitle: 'Reset counter'
  }),

  methods: {
    confirm() {
      this.$store.dispatch('counter/countReset')
        .then(() => {
          this.close();
        });
    },

    close() {
      this.$router.back();
    }
  }
}
</script>

<style>

</style>
