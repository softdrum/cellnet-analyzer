const mcache = require('../utils/memory.cache').mcache
const CACHE_DURATION = 60000;

module.exports = (modem) => {
  const modemService = require('../services/modem.service')(modem)

  return {
    changeNetworkMode (mode, callback) {
      /**
       * Changes modem network mode
       */
      modemService.setModemBusyMode(true)
      modemService.changeMode(mode)
        .then(response => {
          console.log(response)
          callback({status: 'SUCCESS', payload: response})
        })
        .catch(error => {
          callback({status: 'ERROR', payload: error})
        })
        .finally(() => {
          modemService.setModemBusyMode(false)
        })
    },
    async getMeasureData (callback) {
      /** Collects measure data */
      modemService.setModemBusyMode(true)
      try {
        const signalQuality = await modemService.getSignalQuality()
        const bsInfo = await modemService.getBasestationInfo()
        callback({status: 'SUCCESS', payload: {
          ...signalQuality,
          ...bsInfo
        }})
      } catch (error) {
        callback({status: 'ERROR', payload: error})
      }
      modemService.setModemBusyMode(false)
    },
    getSignalQuality (callback) {
      /** Collects signal quality data */
      modemService.setModemBusyMode(true)
      modemService.getSignalQuality()
      .then(response => {
        callback({status: 'SUCCESS', payload: response})
      })
      .catch(error => {
        console.log(error);
        callback({status: 'ERROR', payload: error})
      })
      .finally(() => {
        modemService.setModemBusyMode(false)
      })
    },
    getAvailableOperators (callback) {
      /**
       * Getting currently available mobile operators
       */
      console.log('getting operators');
      modemService.setModemBusyMode(true)
      const cachedData = mcache.get('operators')
      if (cachedData) {
        modemService.setModemBusyMode(false)
        callback({status: 'SUCCESS', payload: cachedData})
      } else {
        modemService.getAvailableOperators()
        .then(response => {
          mcache.put('operators', response, CACHE_DURATION)
          callback({status: 'SUCCESS', payload: response})
        })
        .catch(error => {
          callback({status: 'ERROR', payload: error})
        })
        .finally(() => {
          modemService.setModemBusyMode(false)
        })
      }
    },
    getGeoLocation (callback) {
      /**
       * Getting gps coordinates
       */
      modemService.setModemBusyMode(true)
      modemService.getGeoLocation()
      .then(response => {
        callback({status: 'SUCCESS', payload: response})
      })
      .catch(error => {
        callback({status: 'ERROR', payload: error})
      })
      .finally(() => {
        modemService.setModemBusyMode(false)
      })
    },
  }

}
