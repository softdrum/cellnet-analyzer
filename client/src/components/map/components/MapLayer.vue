<template>
  <div>
    <MglGeojsonLayer
      :sourceId="sourceId"
      :source="source"
      :layerId="unclustered.id"
      :layer="unclustered"
    />
  </div>
</template>

<script>
import { MglGeojsonLayer } from "vue-mapbox";
export default {
  name: "Layer",
  inject: ["mapbox", "map", "actions"],
  props: {
    sourceData: Array,
    sourceId: String,
    popUpEnabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    source () {
      return {
        type: 'geojson',
        data: { type: 'FeatureCollection', features: this.sourceData },
        cluster: false,
      }
    }
  },
  components: {
    MglGeojsonLayer
  },
  data: () => ({
  }),
  created () {
    this.unclustered = {
      'id': `unclustered${this.sourceId}`,
      'type': 'symbol',
      'filter': ['!', ['has', 'point_count']],
      'layout': {
        'icon-image': ['get', 'icon'],
      }
    }
    if (this.popUpEnabled) {
      const me = this
      this.map.on('click', `unclustered${this.sourceId}`, function(e) {
        const coordinates = e.features[0].geometry.coordinates.slice();
        const properties = e.features[0].properties
        me.addPopup(e, coordinates, properties)
      });
    }
    this.$emit('sourceCreated', {
      id: this.sourceId,
      layers: [`unclustered${this.sourceId}`]
    })
  },
  methods: {
    addPopup (e, coordinates, properties) {
      let html = '';
      Object.keys(properties).forEach(prop => {
        if (prop === 'createdAt' || prop === 'updatedAt') {
          html += `<span style="color: black;"><strong>${prop}:</strong> ${Date(properties[prop])}</span><br/>`
        } else {
          html += `<span style="color: black;"><strong>${prop}:</strong> ${properties[prop]}</span><br/>`
        }
      })
      // Ensure that if the map is zoomed out such that multiple
      // copies of the feature are visible, the popup appears
      // over the copy being pointed to.
      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
      coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }
      new this.mapbox.Popup({offset: [0, -30], closeButton: true})
      .setLngLat(coordinates)
      .setHTML(html)
      .addTo(this.map);
    },
  }
};
</script>
