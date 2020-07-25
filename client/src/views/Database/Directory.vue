<template>
  <div>
    <v-row>
      <v-col
        v-for="dir in directives"
        :key="dir"
        cols="12"
        xl="3"
        lg="2"
        sm="4"
        xs="6"
      >
        <v-card class="heatmap-file d-flex align-center flex-column">
          <div class="box">
            <div class="heatmap scaleonhover">
          </div>
          </div>
          <span class="filename">heatmap_23_08_20</span>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'Database',
  components: {
  },
  data: () => ({
    directives: [
      {
        title: 'Basestations',
        subtitle: 'Explore local BS data',
        icon: 'mdi-antenna',
        color: 'blue',
        to: '/database/basestations'
      },
      {
        title: 'Signals',
        subtitle: 'Analize signal data',
        icon: 'mdi-current-ac',
        color: 'green',
        to: '/database/signals'
      },
      {
        title: 'Heatmap',
        subtitle: 'Saved heatmap data',
        icon: 'mdi-map',
        color: 'orange',
        to: "/database/heatmap"
      }
    ]
  })
}
</script>
<style scoped>
.heatmap-file {
  width: 100%;
  height: 100%;
  background: none;
  box-shadow: none;
  border-radius: 0px;
  overflow: hidden;
}
.box {
  width: 128px;
  height: 128px;
  overflow: hidden;
  border-radius: 10px;
}
  .heatmap {
    background-image: url('../../assets/heatmap.png');
    width: 128px;
    height: 128px;
    cursor: pointer;
    display: flex;
    justify-items: center;
    margin-bottom: 10px;
  }
  .filename {
    position: relative;
  }
  .scaleonhover {
    transition: all .2s ease-in-out;
  }
  .scaleonhover:hover { transform: scale(1.1);}
  .scaleonhover:active { transform: scale(1); }
</style>
