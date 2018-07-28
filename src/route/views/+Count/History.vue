<template>
  <aside id="history-modal" class="modal">
    <div class="modal-close" @click="close"></div>
    <div class="modal-content">
      <h2>history</h2>
      <div id="history-modal-list">
        <!-- <div class="history-modal-item" 
              v-for="(his, index) in reverseHistory"
              @click="loadHistoryItem(his.oldValue)"
              :key="index">
          <span class="history-old">{{ his.oldValue }}</span>
          <i class="material-icons">arrow_forward</i>
          <span class="history-new">{{ his.newValue }}</span>
          <span class="history-badge" :class="'history-change-' + his.valueChangeStatus">{{ his.badge }}</span>
        </div> -->
      </div>
      <div id="history-instructions">click a row to load an old state</div>
      <div id="history-clear" @click="historyClear">clear</div>
    </div>
  </aside>
</template>

<script>
export default {
  data: () => ({
    pageTitle: 'History'
  }),

  methods: {
    historyClear() {

    },

    close() {
      this.$router.back();
    },

    /**
     * CLEAN UP THIS THRASH
     */

    loadHistoryItem(num) {
      var history = {
        oldValue: this.count,
        newValue: num,
        valueChange: 0,
        valueChangeStatus: 'load'
      };
      history.valueChange = history.newValue - history.oldValue;

      this.$socket.emit('history load', history);
    },

    clearHistory() {
      var metaThemeColor = document.querySelector('meta[name="theme-color"]');

      this.$socket.emit('history clear');

      this.historyModalStyle.opacity = 0;
      this.historyModalStyle.pointerEvents = 'none';

      metaThemeColor.setAttribute('content', '#4CAF50');

      this.$forceUpdate();
    },

    /**
     * Helper functions
     */
    setCounter() {
      var metaThemeColor = document.querySelector('meta[name="theme-color"]'),
          num = parseInt(this.newCount);

      if(this.isInt(num) && num >= 0 && num <= 9999) {
        var history = {
          oldValue: this.count,
          newValue: num,
          valueChange: 0,
          valueChangeStatus: 'set'
        };
        history.valueChange = history.newValue - history.oldValue;

        this.$socket.emit('count set', num);
        this.count = num;
      } else {
        console.log("Input is NaN");
      }

      this.setCounterModalStyle.opacity = 0;
      this.setCounterModalStyle.pointerEvents = 'none';

      metaThemeColor.setAttribute('content', '#4CAF50');

      this.$forceUpdate();
    },
  }
}
</script>

<style>

</style>
