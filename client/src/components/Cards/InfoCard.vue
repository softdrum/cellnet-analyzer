<template>
  <v-card class="px-8 py-5">
    <transition name="fade" mode="out-in">
      <div class="d-flex align-center justify-space-between"  v-if="data.length">
        <div>
          <div v-for="(item, i) in data" :key="i" class="mb-1 ">
            <div class="font-weight-regular" style="font-family: roboto;color: #404C5C; font-size: 1rem">{{ item.title }}</div>
            <div class="font-weight-regular" style="font-size: 32px;font-size: 1.3rem">{{ item.value }} {{ item.measure }}</div>
          </div>
        </div>
        <v-icon :class="{loading: !data.length}" :color="icon.color" style="font-size: 7rem;">{{icon.name}}</v-icon>
      </div>
      <div class="d-flex align-center justify-space-between" v-else>
        <div style="font-family: roboto;color: #404C5C; font-size: 1rem">Loading data...</div>
        <v-icon :class="{loading: !data.length}" style="font-size: 7rem;">{{icon.name}}</v-icon>
      </div>
    </transition>
  </v-card>
</template>
<script>
export default {
  props: {
    data: {
      type: Array,
      default: () => ([])
    },
    icon: Object
  },
  computed: {
  }
}
</script>
<style scoped>
  .loading {
    animation: mymove 5.5s infinite ease;
  }
  @keyframes mymove {
    0% {color: cyan;}
    50% {color: rgb(0, 83, 83);}
    100% {color: cyan;}
  }
</style>
