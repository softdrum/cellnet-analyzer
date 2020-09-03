const mcache = require('memory-cache');

module.exports = {
  /**
   * Cashes response data
   * @param {*} duration 
   */
  cache (duration) {
    return (req, res, next) => {
      let key = '__express__' + req.originalUrl || req.url
      let cachedBody = mcache.get(key)
      if (cachedBody) {
        res.send(JSON.parse(cachedBody))
        return
      } else {
        res.sendResponse = res.send
        res.send = (body) => {
          mcache.put(key, body, duration * 1000);
          res.sendResponse(body)
        }
        next()
      }
    }
  },
  mcache
}
