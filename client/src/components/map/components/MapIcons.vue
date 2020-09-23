<template>
  <div></div>
</template>

<script>

export default {
  name: "MglCenter",
  inject: ["mapbox", "map", "actions"],
  data: () => ({
    apiServerURL: process.env.VUE_APP_DB_API_URL || `http://localhost:8081`,
    images: [
      {
        id: 'gsm',
        url: 'gsm.png'
      },
      {
        id: 'umts',
        url: 'umts.png'
      },
      {
        id: 'lte',
        url: 'lte.png'
      },
      {
        id: 'sq',
        url: 'measure_point.png'
      },
    ]
  }),
  methods: {
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
  },
  async created () {
    const urls = this.images.map(image => {
      return {
        id: image.id,
        url: `${this.apiServerURL}/static/images/${image.url}`
      }
    })
    const result = await this.addImages(this.map, urls)
    console.log(result)
  },
};
</script>
