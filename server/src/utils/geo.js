function deg2rad(deg) {
  return deg * (Math.PI/180)
}
module.exports = {
  getDistanceFromLatLonInKm(oldLatLong, newLatLong) {
    
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
  },
}
