<template>
  <v-card
    class="mx-auto"
    :class="{closed: isCollapsed}"
    v-resize="onResize"
  >
    <div
      @click="activateAccordion"
      class="d-flex align-center justify-space-around py-5 px-6 card-header"
    >
      <div v-if="desktop">
        <v-icon :class="{loading: !this.infoTitles.length}" style="font-size: 4.1rem; color: #141926;">mdi-antenna</v-icon>
      </div>
      <div
        v-for="(item, i) of infoTitles.slice(0,4)"
        :key="i">
        <div class="text-uppercase mb-2" style="font-size: 0.8rem; color: #616D83;">{{ item }}:</div>
        <div :style="{color: item === 'status' ? '#40B64C':'white'}" style="font-size: 1.37rem">{{ info[item] }}</div>
      </div>
    </div>
    <div class="card-body">
      <div class="card-content">
        <div
          v-for="n in 1"
          :key="n"
          class="d-flex align-center justify-space-around py-5 px-6"
        >
          <div
            v-for="(item, i) of infoTitles.slice(5,9)"
            :key="i">
            <div class="text-uppercase mb-2" style="font-size: 0.75rem; color: #616D83;">{{ item }}:</div>
            <div :style="{color: item === 'status' ? '#40B64C':'white'}" style="font-size: 1rem">{{ info[item] }}</div>
          </div>
        </div>
        
      </div>
      <div class="card-body-bottom"></div>
    </div>
  </v-card>
</template>
<script>
export default {
  props: {
    info: Object
  },
  data: () => ({
    isCollapsed: true,
    desktop: true
  }),
  computed: {
    infoTitles () {
      if (!this.info) return []
      return Object.keys(this.info)
    }
  },
  methods: {
    activateAccordion () {
      this.isCollapsed = !this.isCollapsed
    },
    onResize () {
      this.desktop = window.innerWidth > 500 ? true : false
    }
  }
}
</script>

<style scoped>
  .card {}
  .card-header {
    cursor: pointer;
    height: 100%;
  }
  .card-header:hover {
    background: #212c3d;
    border-radius: inherit;
  }
  .card-body {
    max-height: 25em;
    overflow: hidden;
    transition: max-height 0.4s ease-in-out;
  }
  .card-body-bottom {
    height: 20px;
    background: #1d2534;
    border-radius: 0 0 5px 5px;
  }
  .card-content {
    background: #161C2B;
    box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.15);
  }
  .closed .card-body {
    max-height: 0 !important;
    padding-bottom: 0px;
  }
.loading {
   animation: mymove 1.5s infinite ease;
}

@keyframes mymove {
  0% {color: cyan;}
  50% {color: #141926;}
  100% {color: cyan;}
}
</style>
