<template>
  <page-content>
    <section id="teller">
      <router-link append to="admin" id="admin-container"><span>admin</span></router-link>
      <router-link exact to="view" id="goto-view">go to view</router-link>

      <div id="increase-container" @click="countIncrease"></div>

      <div id="options-container">
        <div id="counter-container" @click.stop="$router.push('/count/set')">
          <div id="counter" v-if="count !== null"><span>{{ count }}</span></div>
          <div id="counter" class="loader-container" v-else><div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div></div>
        </div>
      </div>

      <div id="decrease-container" @click="countDecrease"></div>

      <router-link append to="reset" id="reset-container"><span>reset</span></router-link>
      <router-link append to="history" id="history-container"><span>history</span></router-link>

      <!-- Modal containers -->
      <router-view></router-view>
    </section>
  </page-content>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { AuthGuard } from '../guards'

export default {
  computed: {
    ...mapState('counter', [
      'count',
      'message',
      'history',
    ])
  },
  beforeRouteUpdate(to, from, next) {
    AuthGuard(to, from, next);
  },
  methods: {
    ...mapActions('counter', [
      'countIncrease',
      'countDecrease'
    ]),
  }
}
</script>

<style lang="scss">

</style>
