

module.exports = (modem) => {

  const modemService = require('../services/modemService')(modem)

  return {
    changeNetworkMode (mode, callback) {
      modemService.setModemBusyMode(true)
      modem.changeNetMode(mode)
        .then(response => {
          console.log(response)
          callback({status: 'SUCCESS', data: response})
        })
        .catch(error => {
          callback({status: 'ERROR', data: error})
        })
        .finally(() => {
          modemService.setModemBusyMode(false)
        })
    },
    getSignalQuality (callback) {
      modemService.setModemBusyMode(true)
      modemService.getSignalQuality()
      .then(response => {
        callback({status: 'SUCCESS', data: response})
      })
      .catch(error => {
        callback({status: 'ERROR', data: error})
      })
      .finally(() => {
        modemService.setModemBusyMode(false)
      })
    },
    getGeoLocation (callback) {
      modemService.setModemBusyMode(true)
      modemService.getGeoLocation()
      .then(response => {
        callback({status: 'SUCCESS', data: response})
      })
      .catch(error => {
        callback({status: 'ERROR', data: error})
      })
      .finally(() => {
        modemService.setModemBusyMode(false)
      })
    },
    setLogMode (mode, callback) {
      if (!modem.getModemConnectionStatus()) callback({status: 'ERROR', data: 'modem is not connected'})
      else {
        modemService.setModemLogMode(mode)
        callback({status: 'SUCCESS', data: modemService.isModemInLogMode()})
      }
    }
  }

}
