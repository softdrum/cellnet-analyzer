<template>
  <div></div>
</template>

<script>
export default {
  name: "BoundsDragHandler",
  inject: ["map"],
  props: {
    radius: Number,
  },
  data: () => ({
    mapCenterPosition: null
  }),
  created () {
    this.mapCenterPosition = this.map.getCenter()
    this.map.on('drag', this.onDrag)
  },
  methods: {
    onDrag () {
      const center = this.map.getCenter()
      if (this.getDistanceFromLatLonInKm(this.mapCenterPosition, center) >= this.radius) {
        this.mapCenterPosition = center
        this.$emit('changed', this.mapCenterPosition)
      }
    },
    getDistanceFromLatLonInKm(oldLatLong, newLatLong) {
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
  }
};
</script>
