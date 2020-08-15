const basestationService = require('../services/basestation.service')

module.exports = {
  async getBasestations (req, res) {
    try {
      const coordinates = {lng: req.query.lng, lat: req.query.lat}
      const radius = parseInt(req.query.radius)
      const basestations = await basestationService.getBasestationsAround(coordinates, radius)
      console.log('sending bs', basestations.length);
      res.json(basestations)
    } catch (error) {
      console.log(error);
      res.status(400).send(error)
    }
  },
}
