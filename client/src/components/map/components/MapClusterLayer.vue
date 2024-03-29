<template>
  <div>
    <MglGeojsonLayer
      :sourceId="sourceId"
      :source="source"
      :layerId="clustered.id"
      :layer="clustered"
    />
    <MglGeojsonLayer
      :sourceId="sourceId"
      :source="source"
      :layerId="clusteredCount.id"
      :layer="clusteredCount"
    />
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
  name: "ClusterLayer",
  inject: ["mapbox", "map", "actions"],
  props: {
    sourceData: Array,
    sourceId: String,
    heatmap: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    source () {
      return {
        type: 'geojson',
        data: { type: 'FeatureCollection', features: this.sourceData },
        cluster: true,
        clusterMaxZoom: 14,
        clusterRadius: 40,
      }
    }
  },
  components: {
    MglGeojsonLayer
  },
  data: () => ({
  }),
  created () {
    this.clustered = {
      'id': `clustered${this.sourceId}`,
      'type': 'circle',
      'filter': ['has', 'point_count'],
      'paint': {
        'circle-color': [
          'step',
          ['get', 'point_count'],
          '#82B1FF',
          10,
          '#2196F3',
          100,
          '#FFC107',
          1000,
          '#4CAF50'
          ],
          'circle-radius': [
          'step',
          ['get', 'point_count'],
          20,
          100,
          30,
          750,
          40
          ]
      }
    }
    this.clusteredCount = {
      'id': `clustered${this.sourceId}Count`,
      'type': 'symbol',
      'filter': ['has', 'point_count'],
      'layout': {
        'text-field': '{point_count_abbreviated}',
        'text-font': ['Open Sans Bold'],
        'text-size': 12
      }
    }
    if (this.heatmap) {
      this.unclustered = {
        'id': `unclustered${this.sourceId}`,
        'filter': ['!', ['has', 'point_count']],
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
    } else {
      this.unclustered = {
        'id': `unclustered${this.sourceId}`,
        'type': 'symbol',
        'filter': ['!', ['has', 'point_count']],
        'layout': {
          'icon-image': ['get', 'icon'],
        }
      }
    }
    const me = this
    this.map.on('click', `unclustered${this.sourceId}`, function(e) {
      const coordinates = e.features[0].geometry.coordinates.slice();
      const properties = e.features[0].properties
      me.addPopup(e, coordinates, properties)
    });
    this.map.on('click', `clustered${this.sourceId}`, function(e) {
      var features = me.map.queryRenderedFeatures(e.point, {
        layers: [`clustered${me.sourceId}`]
      });
      var clusterId = features[0].properties.cluster_id;
      me.map.getSource(me.sourceId).getClusterExpansionZoom(
        clusterId,
        function(err, zoom) {
          if (err) return;
          me.map.easeTo({
          center: features[0].geometry.coordinates,
          zoom: zoom
        })
      }
      )
    })
    this.$emit('source-created', {
      id: this.sourceId,
      layers: [
        `clustered${this.sourceId}`,
        `clustered${this.sourceId}Count`,
        `unclustered${this.sourceId}`
      ]
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
