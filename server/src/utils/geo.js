function deg2rad(deg) {
  /** Converts degrees into radians */
  return deg * (Math.PI/180)
}
function getDistanceFromLatLonInKm(oldLatLong, newLatLong) {
  /** Computes the distance between two coordinates */
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(newLatLong.lat-oldLatLong.lat);  // deg2rad below
  const dLon = deg2rad(newLatLong.lng-oldLatLong.lng); 

  let a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(oldLatLong.lat)) * Math.cos(deg2rad(newLatLong.lat)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  const d = R * c; // Distance in km
  return d;
}
module.exports = {
  filterFeatures (features, coordinates, radius) {
    /** Filters elements and return new array with elements
     * which are in a certain radius from the central coordinate 
     */
    return features
      .filter(elem => getDistanceFromLatLonInKm(coordinates, {lat: elem.geometry.coordinates[1], lng: elem.geometry.coordinates[0]}) <= radius)
  }
}
