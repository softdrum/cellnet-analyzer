<template>
  <div style="height: 100vh; width: 100%;" class="elevation-0">
    <v-card class="map-controls" @click.prevent="openLayers">
      <div class="d-flex">
        <v-icon class="control-icon">
          mdi-layers
        </v-icon>
        Layers
      </div>
       <v-checkbox v-model="selected" label="John" value="John"></v-checkbox>
    <v-checkbox v-model="selected" label="Jacob" value="Jacob"></v-checkbox>
    </v-card>
    <div id="map" style="height: 100vh; width: 100ww;" class="map"></div>
  </div>
</template>

<script>
import gsm from '../assets/gsm.png'
import umts from '../assets/umts.png'
import lte from '../assets/lte.png'
import sq from '../assets/sq.png'
const map_icons = [
  {
    id: 'gsm',
    url: gsm
  },
  {
    id: 'umts',
    url: umts
  },
  {
    id: 'lte',
    url: lte
  },
  {
    id: 'sq',
    url: sq
  }
]
import Mapbox from 'mapbox-gl'
export default {
  components: {
  },
  data() {
    return {
      map: null,
      selected: [],
      measurements: [],
      measureMarker: null,
      mapCenterPosition: {lng: 30.3207309188291, lat: 59.922883996810725},
      data: [],
      visibleData: [],
      coordinates: [5.446910099999968,43.286126],
      accessToken: 'pk.eyJ1IjoiZHJld3plcmciLCJhIjoiY2thdHAyZHB6MHZtbjM3b2NpdmFhMzBjbiJ9.FitsZxcjiZzIx9_4VddY3g', // your access token. Needed if you using Mapbox maps
      mapStyle: 'mapbox://styles/drewzerg/ckbwf6ak2128w1imx72cyxk7v',
      unclusteredPoints: {
        "id": "unclustered-points",
        "type": "symbol",
        "source": "points",
        "filter": ["!has", "point_count"],
        "layout": {
          'icon-image': ['get', 'icon'],
        }
      },
    };
  },
  watch: {
    async position (val) {
      if (this.getDistanceFromLatLonInKm(this.mapCenterPosition, val) >= 5) {
        this.mapCenterPosition = val
        this.visibleData = await this.$store.dispatch('getGeoJSONSlice', {
          coordinates:this.mapCenterPosition,
          radius:1
        })
        console.log(this.visibleData);
        this.map.getSource('points').setData(this.visibleData)
      }
    }
  },
  computed: {
    position() {
      if (!this.map) return 'error'
      return this.map.getCenter()
    }
  },
  methods: {
    opendLayers () {
      this.opened = true;
    },
    addSource (map, id, cluster=false) {
      let source = {
        type: 'geojson',
        data: { type: 'FeatureCollection', features: [] }
      }
      if (cluster) {
        source.cluster = true
        source.clusterMaxZoom = 14
        source.clusterRadius = 40
      }
      map.addSource(id, source);
    },
    addImages(map, images) {
      const addImage = (map, id, url) => {
        return new Promise((resolve, reject) => {
          map.loadImage(url, (error, image) => {
            if(error) {
              reject(error);
              return;
            }
            map.addImage(id, image);
            resolve(image);
          });
        });
      }
      const promises = images.map( imageData => addImage(map, imageData.id, imageData.url) );
      return Promise.all(promises);
    },
    initMap (style, container, center) {
      return new Mapbox.Map({
        container: container, // container id
        style,
        center,
        zoom: 11 // starting zoom
      })
    },
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
      new Mapbox.Popup({offset: [0, -30], closeButton: true})
      .setLngLat(coordinates)
      .setHTML(html)
      .addTo(this.map);
    },
    getDistanceFromLatLonInKm(oldLatLong, newLatLong) {
      console.log(newLatLong);
      var R = 6371; // Radius of the earth in km
      var dLat = this.deg2rad(newLatLong.lat-oldLatLong.lat);  // deg2rad below
      var dLon = this.deg2rad(newLatLong.lng-oldLatLong.lng); 
      var a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(this.deg2rad(oldLatLong.lat)) * Math.cos(this.deg2rad(newLatLong.lat)) * 
        Math.sin(dLon/2) * Math.sin(dLon/2)
        ; 
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
      var d = R * c; // Distance in km
      return d;
    },
    deg2rad(deg) {
      return deg * (Math.PI/180)
    }
  },
  async mounted() {
    // We need to set mapbox-gl library here in order to use it in template
    const context = this
    Mapbox.accessToken = this.accessToken;
    this.map = this.initMap(this.mapStyle, 'map', [30.3528464357712, 59.91534534594871])
    this.map.on('load', () => {
      this.addImages(this.map, map_icons)
      .then(result => {
        console.log(result);
        this.addSource(this.map, 'points', true)
        this.addSource(this.map, 'measurements')

      this.map.addLayer({
      'id': 'clusters',
      'type': 'circle',
      'source': 'points',
      'filter': ['has', 'point_count'],
      'paint': {
        'circle-color': [
          'step',
          ['get', 'point_count'],
          '#51bbd6',
          2,
          '#f1f075',
          750,
          '#f28cb1'
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
      });
      this.map.addLayer({
        id: 'cluster-count',
        type: 'symbol',
        source: 'points',
        filter: ['has', 'point_count'],
        layout: {
        'text-field': '{point_count_abbreviated}',
        'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
        'text-size': 12
        }
      })
      this.map.addLayer({
        'id': 'unclustered-points',
        'type': 'symbol',
        'source': 'points',
        'filter': ['!', ['has', 'point_count']],
        'layout': {
        // get the icon name from the source's "icon" property
        // concatenate the name to get an icon from the style's sprite sheet
        'icon-image': ['get', 'icon'],
        // // get the title name from the source's "title" property
        // 'text-field': ['get', 'title'],
        // 'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
        // 'text-offset': [0, 0.6],
        // 'text-anchor': 'top'
        }
        });
      this.map.addLayer({
        'id': 'unclustered-measurements',
        'type': 'symbol',
        'source': 'measurements',
        'layout': {
        // get the icon name from the source's "icon" property
        // concatenate the name to get an icon from the style's sprite sheet
        'icon-image': 'sq',
        // // get the title name from the source's "title" property
        // 'text-field': ['get', 'title'],
        // 'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
        // 'text-offset': [0, 0.6],
        // 'text-anchor': 'top'
        }
        });
        this.map.addLayer(
          {
          'id': 'earthquakes-heat',
          'type': 'heatmap',
          'source': 'measurements',
          'maxzoom': 20,
          'paint': {
          // Increase the heatmap weight based on frequency and property magnitude
          'heatmap-weight': [
          'interpolate',
          ['linear'],
          ['get', 's_lvl'],
          0,
          0,
          6,
          1
          ],
          // Increase the heatmap color weight weight by zoom level
          // heatmap-intensity is a multiplier on top of heatmap-weight
          'heatmap-intensity': [
          'interpolate',
          ['linear'],
          ['zoom'],
          0,
          1,
          9,
          3
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
          0.2,
          'rgb(103,169,207)',
          0.4,
          'rgb(209,229,240)',
          0.6,
          'rgb(253,219,199)',
          0.8,
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
          40,
          60
          ],
          // Transition from heatmap to circle layer by zoom level
          // 'heatmap-opacity': [
          // 'interpolate',
          // ['linear'],
          // ['zoom'],
          // 7,
          // 1,
          // 9,
          // 9
          // ]
          }
          },
          'waterway-label'
          );
        this.map.on('mouseenter', 'clusters', function() {
          context.map.getCanvas().style.cursor = 'pointer';
        });
        this.map.on('mouseleave', 'clusters', function() {
          context.map.getCanvas().style.cursor = '';
        });
        this.map.on('click', function(e) {
          if (context.measureMarker) context.measureMarker.remove();
          var el = document.createElement('div');
          el.className = 'marker';
          
          context.measureMarker = new Mapbox.Marker(el)
            .setLngLat([e.lngLat.lng, e.lngLat.lat])
            .addTo(context.map);

          context.$socket.client.emit('getSignalQuality', (response) => {
            
            if (response.status === 'SUCCESS') context.$success(response.data)
            else {
              context.$error(response.data)
              context.measurements.push({
              type: 'Feature',
              geometry: {
                type: 'Point',
                coordinates: [e.lngLat.lng, e.lngLat.lat]
              },
              properties: {
                s_lvl: Math.random()*100,
                ber: 34,
              }
            })
            context.map.getSource('measurements').setData({
              type: 'FeatureCollection',
              features: context.measurements
            })
            setTimeout(() => {
              context.measureMarker.remove();
            }, 500);
            }
          });
        })
        // When a click event occurs on a feature in the places layer, open a popup at the
        // location of the feature, with description HTML from its properties.
        this.map.on('click', 'unclustered-points', function(e) {
          const coordinates = e.features[0].geometry.coordinates.slice();
          const properties = e.features[0].properties
          context.addPopup(e, coordinates, properties)
        });
        
        // Change the cursor to a pointer when the mouse is over the places layer.
        this.map.on('mouseenter', 'unclustered-points', function() {
          context.map.getCanvas().style.cursor = 'pointer';
        });
        
        // Change it back to a pointer when it leaves.
        this.map.on('mouseleave', 'unclustered-points', function() {
          context.map.getCanvas().style.cursor = '';
        });
      })
    })
    
    this.visibleData = await this.$store.dispatch('getGeoJSONSlice', {
          coordinates:this.mapCenterPosition,
          radius:1
        })
    this.map.getSource('points').setData(this.visibleData)
  }
};
</script>

