module.exports = (modem) => {
  return {
    changeNetworkMode (mode, callback) {
      if (modem.isBusy) callback({msg: 'modem is busy'})
      else {
        modem.isBusy = true
        modem.changeNetMode(mode)
        .then(response => {
          console.log(response)
          callback({msg: 'success'})
        })
        .catch(error => {
          callback({msg: error})
        })
        .finally(() => {
          modem.isBusy = false
        })
      }
    },
    setLogMode (mode, callback) {
      modem.setLogMode(mode)
      callback({msg: modem.logMode})
    }
  }

}
