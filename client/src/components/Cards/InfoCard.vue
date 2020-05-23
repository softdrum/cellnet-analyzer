<template>
  <v-hover style="height: 100%;">
    <template v-slot:default="{ hover }">
      <v-card
        class="mx-auto"
      >
        <div class="d-flex align-center justify-space-around py-5 px-6"
        style="height: 100%;"
        >
          <div>
            <v-icon style="font-size: 67px; color: #141926;">mdi-antenna</v-icon>
          </div>
          <div
            v-for="(item, i) of infoTitles"
            :key="i">
            <div class="text-uppercase mb-2" style="font-size: 13px; color: #616D83;">{{ item }}:</div>
            <div :style="{color: item === 'status' ? '#40B64C':'white'}" style="font-size: 22px">{{ info[item] }}</div>
          </div>
        </div>

        <v-fade-transition>
          <v-overlay
            v-if="hover"
            absolute
            color="#3D5564"
          >
            <v-btn>See more info</v-btn>
          </v-overlay>
        </v-fade-transition>
      </v-card>
    </template>
  </v-hover>
</template>
<script>
export default {
  props: {
    info: Object
  },
  computed: {
    infoTitles () {
      if (!this.info) return []
      return Object.keys(this.info).slice(0,4)
    }
  }
}
</script>
