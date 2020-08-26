<template>
  <div>
    <MglGeojsonLayer
      :sourceId="sourceId"
      :source="source"
      :layerId="heatmapLayer.id"
      :layer="heatmapLayer"
    />
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
    this.heatmapLayer = {
      'id': `heatmap${this.sourceId}`,
      'type': 'heatmap',
      'maxzoom': 20,
      'paint': {
        // Increase the heatmap weight based on frequency and property magnitude
        'heatmap-weight': [
          'interpolate',
          ['linear'],
          ['get', 'test'],
          1,
          5,
          6,
          10
        ],
        // Increase the heatmap color weight weight by zoom level
        // heatmap-intensity is a multiplier on top of heatmap-weight
        'heatmap-intensity': [
          'interpolate',
          ['linear'],
          ['zoom'],
          5,
          1,
          9,
          2
        ],
        // Color ramp for heatmap.  Domain is 0 (low) to 1 (high).
        // Begin color ramp at 0-stop with a 0-transparancy color
        // to create a blur-like effect.
        'heatmap-color': [
          'interpolate',
          ['linear'],
          ['heatmap-density'],
          0,
          'rgba(33,102,172,0)',
          0.1,
          'rgb(103,169,207)',
          0.3,
          'rgb(209,229,240)',
          0.5,
          'rgb(253,219,199)',
          0.6,
          'rgb(239,138,98)',
          1,
          'rgb(178,24,43)'
        ],
        // Adjust the heatmap radius by zoom level
        'heatmap-radius': [
          'interpolate',
          ['linear'],
          ['zoom'],
          10,
          20,
          20,
          20
        ],
        // Transition from heatmap to circle layer by zoom level
        'heatmap-opacity': [
          'interpolate',
          ['linear'],
          ['zoom'],
            7,
            1,
            9,
            10
        ]
      }
    }
    this.dataPoints = {
      'id': `point${this.sourceId}`,
      'type': 'circle',
      'maxzoom': 14,
      'paint': {
      // Size circle radius by earthquake magnitude and zoom level
      // 'circle-radius': [
      //   'interpolate',
      //   ['linear'],
      //   ['zoom'],
      //   7,
      //   ['interpolate', ['linear'], ['get', 'test'], 1, 1, 6, 4],
      //   16,
      //   ['interpolate', ['linear'], ['get', 'test'], 1, 5, 6, 50]
      // ],
      'circle-radius': 5,
      // Color circle by earthquake magnitude
      'circle-color': [
        'interpolate',
        ['linear'],
        ['get', 'test'],
        0,
        'rgba(33,102,172,0)',
        20,
        'rgb(103,169,207)',
        30,
        'rgb(209,229,240)',
        40,
        'rgb(253,219,199)',
        50,
        'rgb(239,138,98)',
        100,
        'rgb(178,24,43)'
      ],
      'circle-stroke-color': 'white',
      'circle-stroke-width': 1,
      // Transition from heatmap to circle layer by zoom level
      // 'circle-opacity': [
      //   'interpolate',
      //   ['linear'],
      //   ['zoom'],
      //   0,
      //   8,
      //   12,
      //   14
      //   ]
      }
    },
    this.$emit('sourceCreated', {
      id: this.sourceId,
      layers: [`heatmap${this.sourceId}`, `point${this.sourceId}`]
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
