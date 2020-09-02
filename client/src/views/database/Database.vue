<template>
  <div>
    <v-row>
      <v-col
        v-for="(dir, i) in directives"
        :key="i"
        cols="12"
        xl="3"
        lg="4"
        sm="12"
        xs="12"
      >
        <v-card
          class="mx-auto scaleonhover"
          :to="dir.to"
          hover
        >
          <v-list-item three-line>
            <v-list-item-content>
              <div class="overline mb-4">last updated 5 minutes ago</div>
              <v-list-item-title class="headline mb-1">{{ dir.title }}</v-list-item-title>

              <v-list-item-subtitle>{{ dir.subtitle }}</v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-avatar
              tile
              size="80"
            >
              <v-icon
                :color="dir.color"
                style="font-size: 70px"
              >
                {{ dir.icon }}
              </v-icon>
            </v-list-item-avatar>
          </v-list-item>

          <v-card-actions>
          </v-card-actions>
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
        icon: 'icon-basestation',
        color: 'blue',
        to: '/database/basestation'
      },
      {
        title: 'Signals',
        subtitle: 'Analize signal data',
        icon: 'mdi-current-ac',
        color: 'green',
        to: '/database/signal'
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
