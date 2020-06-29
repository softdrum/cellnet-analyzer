module.exports = (modem) => {
  return {
    async getSignalQuality () {
      const signalQuality = await modem.getSignalQuality()
      return signalQuality
    },
    async getGeoLocation () {
      const geoLocation = await modem.getGPSCoordinates()
      return geoLocation
    },
    async getBasestationInfo () {
      const basestationInfo = await modem.getBasestationInfo()
      return basestationInfo
    },
    async getAvailableOperators () {
      let availableOperators = await modem.getAvailableOperators()
      return availableOperators
    },
    setModemBusyMode (value) {
      modem.setBusyMode(value)
    },
    setModemLogMode (value) {
      modem.setLogMode(value)
    },
    isModemInLogMode () {
      return modem.getLogMode()
    },
  }
}
