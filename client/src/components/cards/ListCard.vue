<template>
  <v-card :loading="loading" @click="$emit('update')">
    <div class="px-4 py-5 card-on-hover">
      <div class="title-text px-3">{{ title }}</div>
      <v-list dense style="background: transparent">
        <v-list-item
          v-for="(elem, idx) in data"
          :key="idx"
        > 
          <v-list-item-content class="text--secondary">
            {{ elem.operator }} {{ elem.code }}
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </div>
  </v-card>
</template>

<script>
export default {
  name: 'ListCard',
  props: {
    title: {
      type: String,
      default: ''
    },
    data: {
      type: Array,
      default: () => ([])
    },
    loading: {
      type: Boolean,
      default: false
    }
  }
}
</script>
<style scoped>
  .card-on-hover {
    min-height: 250px;
    cursor: pointer;
  }
  .card-on-hover:hover {
    background: rgba(255, 255, 255, 0.01);
  }
</style>
