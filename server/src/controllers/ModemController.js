// const port = require('./port')()
module.exports = {
  async getData (req, res) {
    try {    
      res.send({
          data: Math.floor((Math.random(100)* 100))
      })
    } catch (error) {
      console.log(`Error ${error}`);
      res.status(400).send({
          error: 'Can not get data'
      })
    }
  }
}
