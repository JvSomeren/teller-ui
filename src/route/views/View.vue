<template>
  <page-content>
    <section id="view" :style="viewStyle"
              @click="onColorCycle">
      <div class="message">{{ message }}</div>

      <router-link exact to="count" id="goto-counter">go to count</router-link>

      <div id="counter-container">
        <div id="counter" v-if="count !== null">{{ count }}</div>
        <div id="counter" class="loader-container" v-else><div class="lds-ellipsis">
          <div
            v-for="n in 4"
            :key="n"
            :style="{ background: viewStyle.color }"></div>
        </div></div>
      </div>

      <div id="default-color"
            @click.stop="onDefaultColors">
        {{ defaultColorText }}
      </div>

      <div id="cycle-colors"
            @click.stop="onCycleColors">
        cycle: {{ cycleText }}
      </div>
    </section>
  </page-content>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data: () => ({
    palette: 0,
    numberOfPalettes: 10,
    cycleColors: true,
    defaultColorText: 'default',
    viewStyle: {
      backgroundImage: "linear-gradient(to left, #1976D2 50%, #303F9F 50%)",
      color: "#3F51B5"
    }
  }),
  computed: {
    cycleText: function() {
      return this.cycleColors ? 'enabled' : 'disabled';
    },

    ...mapState('counter', [
      'isLoading',
      'count',
      'message',
    ]),
  },
  mounted() {
    this.$nextTick(function() {
      // check for default color palette
      // if set update the correct local variables
      var cookie;
      if(cookie = this.checkCookie('palette')) {
        this.palette = parseInt(cookie, 10);
        this.setColorPalette(this.palette);
      } else {
        this.palette = 0;
        this.setColorPalette(this.palette);
        this.setCookie("palette", this.palette, 31);
      }

      if(cookie = this.checkCookie('cycle')) {
        if(cookie == 'true')
          this.cycleColors = true;
        else
          this.cycleColors = false;
      } else {
        this.setCookie("cycle", true, 31);
      }
    });
  },
  methods: {
    setCookiePalette() {
      var currentPalette = this.palette;
      this.setCookie('palette', currentPalette, 31);
    },

    setCookie(cname, cvalue, exdays) {
      var d = new Date();
      d.setTime(d.getTime() + (exdays*24*60*60*1000));
      var expires = "expires="+ d.toUTCString();
      document.cookie = cname + "=" + cvalue + "; " + expires;
    },

    getCookie(cname) {
      var name = cname + "=";
      var ca = document.cookie.split(';');
      for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') {
          c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
          return c.substring(name.length,c.length);
        }
      }
      return "";
    },

    checkCookie(cname) {
      var cookie = this.getCookie(cname);
      if (cookie != "") {
        return cookie;
      } else {
        return false;
      }
    },

    onCycleColors() {
      this.cycleColors = !this.cycleColors;

      this.setCookie('cycle', this.cycleColors, 31);
    },

    onDefaultColors() {
      this.setCookiePalette();
      this.defaultColorText = 'default';
    },

    onColorCycle() {
      if(this.cycleColors) {
        this.palette = (this.palette+1) % this.numberOfPalettes;
        this.setColorPalette(this.palette);

        if(this.palette == this.getCookie('palette')) {
          this.defaultColorText = 'default';
        } else if(this.defaultColorText != 'set default') {
          this.defaultColorText = 'set default';
        }
      }
    },

    setColorPalette(color) {
      var _this = this,
          metaThemeColor = document.querySelector("meta[name=theme-color]");

      switch(color) {
        // indigo
        case 0:
          setTimeout(function() {
            _this.viewStyle.backgroundImage = "linear-gradient(to left, #1976D2 50%, #303F9F 50%)";
          }, 400);
          this.viewStyle.backgroundPosition = "0 0";
          this.viewStyle.color = "#3F51B5";
          metaThemeColor.setAttribute('content', '#303F9F');
          break;
        // blue
        case 1:
          setTimeout(function() {
            _this.viewStyle.backgroundImage = "linear-gradient(to left, #1976D2 50%, #388E3C 50%)";
          }, 400);
          this.viewStyle.backgroundPosition = "-100% 0";
          this.viewStyle.color = "#2196F3";
          metaThemeColor.setAttribute('content', '#1976D2');
          break;
        // green
        case 2:
          setTimeout(function() {
            _this.viewStyle.backgroundImage = "linear-gradient(to left, #AFB42B 50%, #388E3C 50%)";
          }, 400);
          this.viewStyle.backgroundPosition = "0 0";
          this.viewStyle.color = "#4CAF50";
          metaThemeColor.setAttribute('content', '#388E3C');
          break;
        // lime
        case 3:
          setTimeout(function() {
            _this.viewStyle.backgroundImage = "linear-gradient(to left, #AFB42B 50%, #FFA000 50%)";
          }, 400);
          this.viewStyle.backgroundPosition = "-100% 0";
          this.viewStyle.color = "#CDDC39";
          metaThemeColor.setAttribute('content', '#AFB42B');
          break;
        // amber
        case 4:
          setTimeout(function() {
            _this.viewStyle.backgroundImage = "linear-gradient(to left, #E64A19 50%, #FFA000 50%)";
          }, 400);
          this.viewStyle.backgroundPosition = "0 0";
          this.viewStyle.color = "#FFC107";
          metaThemeColor.setAttribute('content', '#FFA000');
          break;
        // deep orange
        case 5:
          setTimeout(function() {
            _this.viewStyle.backgroundImage = "linear-gradient(to left, #E64A19 50%, #455A64 50%)";
          }, 400);
          this.viewStyle.backgroundPosition = "-100% 0";
          this.viewStyle.color = "#FF5722";
          metaThemeColor.setAttribute('content', '#E64A19');
          break;
        // blue grey
        case 6:
          setTimeout(function() {
            _this.viewStyle.backgroundImage = "linear-gradient(to left, #D32F2F 50%, #455A64 50%)";
          }, 400);
          this.viewStyle.backgroundPosition = "0 0";
          this.viewStyle.color = "#607D8B";
          metaThemeColor.setAttribute('content', '#455A64');
          break;
        // red
        case 7:
          setTimeout(function() {
            _this.viewStyle.backgroundImage = "linear-gradient(to left, #D32F2F 50%, #C2185B 50%)";
          }, 400);
          this.viewStyle.backgroundPosition = "-100% 0";
          this.viewStyle.color = "#F44336";
          metaThemeColor.setAttribute('content', '#D32F2F');
          break;
        // pink
        case 8:
          setTimeout(function() {
            _this.viewStyle.backgroundImage = "linear-gradient(to left, #7B1FA2 50%, #C2185B 50%)";
          }, 400);
          this.viewStyle.backgroundPosition = "0 0";
          this.viewStyle.color = "#E91E63";
          metaThemeColor.setAttribute('content', '#C2185B');
          break;
        // purple
        case 9:
          setTimeout(function() {
            _this.viewStyle.backgroundImage = "linear-gradient(to left, #7B1FA2 50%, #303F9F 50%)";
          }, 400);
          this.viewStyle.backgroundPosition = "-100% 0";
          this.viewStyle.color = "#9C27B0";
          metaThemeColor.setAttribute('content', '#7B1FA2');
          break;
        // indigo
        default:
          setTimeout(function() {
            _this.viewStyle.backgroundImage = "linear-gradient(to left, #1976D2 50%, #303F9F 50%)";
          }, 400);
          this.viewStyle.backgroundPosition = "0 0";
          this.viewStyle.color = "#3F51B5";
          metaThemeColor.setAttribute('content', '#303F9F');
          break;
      }
    },
  }
}
</script>

<style lang="scss">
/**
  * Extending styles
  */
.button {
  padding: 0.5rem 1rem;
  position: fixed;
  bottom: 0;
  font-weight: bold;
  text-transform: uppercase;
  cursor: pointer;
  transition: all ease 0.2s;

  &:hover {
    background: rgba(0, 0, 0, 0.1);
  }
}

/**
  * Styling
  */
#view {
  height: 100%;
  width: 100%;
  position: absolute;

  background-size: 200% 100%;

  -webkit-transition: background-position ease 0.4s, color ease 0.2s;
  -moz-transition: background-position ease 0.4s, color ease 0.2s;
  transition: background-position ease 0.4s, color ease 0.2s;

  will-change: background-position, color;

  #goto-counter {
    padding: 0.5rem 1rem;
    position: fixed;
    top: 0;
    right: 0;
    font-weight: bold;
    text-transform: uppercase;
    text-decoration: none;
    cursor: pointer;
    transition: all ease 0.2s;
    color: inherit;

    &:hover {
      background: rgba(0, 0, 0, 0.1);
    }

    &:visited {
      color: inherit;
    }
  }

  .message {
    position: fixed;
    top: 25%;
    left: 50%;
    text-align: center;
    font-weight: bold;
    text-transform: uppercase;
    color: inherit;
    transform: translate(-50%, -50%);
  }
  
  #counter-container {
    padding: 0.5rem 2rem;
    position: fixed;
    top: 50%;
    left: 50%;
    display: inline-block;
    z-index: 1;
    transform: translate(-50%, -50%);

    #counter {
      position: relative;
      font-weight: bold;
      cursor: default;
    }
  }
}

#default-color {
  left: 0;

  @extend .button;
}

#cycle-colors {
  right: 0;

  @extend .button;
}

/**
  * Font styling
  **/
@media screen and (max-width: 600px) {
  #goto-counter,
  #default-color,
  #cycle-colors,
  .message {
    font-size: 1rem;
  }

  #counter {
    font-size: 5.5rem;
  }
}

@media screen and (min-width: 600px) and (max-width: 992px) {
  #goto-counter,
  #default-color,
  #cycle-colors,
  .message {
    font-size: 1.3rem;;
  }

  #counter {
    font-size: 8rem;
  }
}

@media screen and (min-width: 992px) and (max-width: 1280px) {
  #goto-counter,
  #default-color,
  #cycle-colors,
  .message {
    font-size: 2rem;
  }

  #counter {
    font-size: 8rem;
  }
}

@media screen and (min-width: 1280px) {
  #goto-counter,
  #default-color,
  #cycle-colors,
  .message {
    font-size: 2rem;
  }

  #counter {
    font-size: 12rem;
  }
}
</style>
