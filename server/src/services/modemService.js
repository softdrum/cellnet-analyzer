module.exports = (modem) => {
  return {
    async getSignalQuality () {
      try {
        let signalQuality = await modem.getSignalQuality()
        return {
          status: 'SUCCESS',
          data: signalQuality
        }
      } catch (error) {
        return {
          status: 'ERROR',
          data: error
        }
      }
    },
    async getBasestationInfo () {
      try {
        let basestationInfo = await modem.getBasestationInfo()
        return {
          status: 'SUCCESS',
          data: basestationInfo
        }
      } catch (error) {
        return {
          status: 'ERROR',
          data: error
        }
      }
    },
    async getAvailableOperators () {
      try {
        let availableOperators = await modem.getAvailableOperators()
        return {
          status: 'SUCCESS',
          data: availableOperators
        }
      } catch (error) {
        return {
          status: 'ERROR',
          data: error
        }
      }
    }
  }
}
