// load images
// update source
// add marker
// add layer
// add source
// 
module.exports = {
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
  clusterLayer ()
}
