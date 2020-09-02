<template>
  <div>
    <MglGeojsonLayer
      :sourceId="sourceId"
      :source="source"
      :layerId="dataPoints.id"
      :layer="dataPoints"
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
      default: true
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
    this.dataPoints = {
      'id': `point${this.sourceId}`,
      'type': 'circle',
      'paint': {
        // Size circle radius by earthquake magnitude and zoom level
        'circle-radius': {
          'base': 1.75,
          'stops': [
          [12, 2],
          [14, 5],
          [18, 20],
          [20, 100],
          [22, 150]
          ]
        },
        'circle-blur': 0.1,
        // Color circle by earthquake magnitude
        'circle-color': [
          'interpolate',
          ['linear'],
          ['get', 's_lvl'],
          -100,
          'rgba(244,67,54,0.8)',
          -90,
          'rgba(255,193,7,0.8)',
          -70,
          'rgba(76,175,80,0.7)',
       ],
      }
    }
    let context = this
    this.map.on('click', `point${this.sourceId}`, function(e) {
      const coordinates = e.features[0].geometry.coordinates.slice();
      const properties = e.features[0].properties
      context.addPopup(e, coordinates, properties)
    });
    this.$emit('sourceCreated', {
      id: this.sourceId,
      layers: [`point${this.sourceId}`]
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
