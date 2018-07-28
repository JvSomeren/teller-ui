<template>
  <aside id="admin-modal" class="modal">
    <div class="modal-close" @click="close"></div>
    <div class="modal-content">
      <h2>admin</h2>
      <div>
        <input type="text" id="message-input"
          placeholder="Message here"
          @keyup.13="messageSet"
          v-model="message">
        <div id="message-options">
          <div id="clear-message" @click="messageClear">clear message</div>
          <div id="confirm-message" @click="messageSet">set message</div>
        </div>
      </div>
    </div>

    <div class="logout" @click="logout"></div>
  </aside>
</template>

<script>
export default {
  data: () => ({
    pageTitle: 'Admin',
    message: ''
  }),
  created() {
    this.message = this.$store.state.counter.message;
  },
  methods: {
    messageSet() {
      this.$store.dispatch('counter/messageSet', this.message)
        .then(() => {
          this.close();
        });
    },

    messageClear() {
      this.$store.dispatch('counter/messageClear')
        .then(() => {
          this.close();
        });
    },

    logout() {
      this.$store.dispatch('auth/logout')
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
