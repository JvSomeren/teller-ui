<template>
  <aside id="counter-set-modal" class="modal">
    <div class="modal-close" @click="close"></div>
    <div class="modal-content">
      <h2>set counter</h2>
      <div>
        <input type="number" id="counter-input" max="9999" min="0"
          @keyup.13="countSet"
          v-model="count"
          v-select>
        <i class="material-icons" @click="countSet">send</i>
      </div>
    </div>
  </aside>
</template>

<script>
import { select } from '../../../helpers'

export default {
  data: () => ({
    pageTitle: 'Set counter',
    count: 0
  }),
  created() {
    this.count = this.$store.state.counter.count;
  },
  methods: {
    countSet() {
      this.$store.dispatch('counter/countSet', this.count)
        .then(() => {
          this.close();
        });
    },

    close() {
      this.$router.back();
    }
  },
  directives: {
    select
  }
}
</script>

<style>

</style>
