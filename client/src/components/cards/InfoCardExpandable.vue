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
      <div v-if="desktop || !this.infoTitles.length">
        <v-icon class="icon" :class="{loading: !this.infoTitles.length}" >icon-basestation</v-icon>
      </div>
      <div
        v-for="(item, i) of infoTitles.slice(0,4)"
        :key="i">
        <div class="text-uppercase mb-1 text--secondary title-1">{{ item }}:</div>
        <div :class="{'text-green': item === 'status'}" class="subtitle--1" style="font-size: 1.37rem">{{ info[item] }}</div>
      </div>
    </div>
    <div class="card-body">
      <div class="card-content inner-shadow">
        <div
          v-for="n in 1"
          :key="n"
          class="d-flex align-center justify-space-around py-5 px-6"
        >
          <div
            v-for="(item, i) of infoTitles.slice(5,9)"
            :key="i">
            <div class="text-uppercase mb-2 text--secondary title-2">{{ item }}:</div>
            <div lass="subtitle--2">{{ info[item] }}</div>
          </div>
        </div>
        
      </div>
      <div class="card-body-bottom"></div>
    </div>
  </v-card>
</template>

<script>
export default {
  name: 'InfoCardExpandable',
  props: {
    info: Object
  },
  data: () => ({
    isCollapsed: true,
    desktop: true
  }),
  computed: {
    infoTitles () {
      // return []
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

<style lang="scss" scoped>
  .card-header {
    cursor: pointer;
    height: 100%;
  }
  .text-green {
    color: #40B64C;
  }
  .card-header:hover {
    background: rgba(255, 255, 255, 0.01);
    border-radius: inherit;
  }
  .card-body {
    max-height: 25em;
    overflow: hidden;
    transition: max-height 0.4s ease-in-out;
  }
  .card-body-bottom {
    height: 20px;
    border-radius: 0 0 5px 5px;
  }
  .inner-shadow {
    box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.15);
  }
  .closed .card-body {
    max-height: 0 !important;
    padding-bottom: 0px;
  }
  .icon {
    font-size: 4.5rem;
    color: #141926;
  }
  .title-1 {
    font-size: 0.8rem !important;;
  }
  .subtitle--1 {
    font-size: 1.37rem !important;
  }
  .title-2 {
    font-size: 0.75rem !important;;
  }
  .subtitle--2 {
    font-size: 1rem !important;;
  }
</style>
