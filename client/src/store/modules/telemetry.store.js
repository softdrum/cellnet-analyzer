export default {
  state: {
    connected: false,
    cpuTemperature: -1,
    cpuUsage: -1,
    memoryFree: -1,
    memoryUsage: -1,
    diskSpace: null,
    batteryInfo: null
  },
  mutations: {
    SET_CPU_TEMPERATURE (state, value) {
      state.cpuTemperature = Math.round(value)
    },
    SET_CPU_USAGE (state, value) {
      state.cpuUsage = Math.round(value)
    },
    SET_MEMORY_FREE (state, value) {
      state.memoryFree = Math.round(value)
    },
    SET_MEMORY_USAGE (state, value) {
      state.memoryUsage = Math.round(value)
    },
    SET_DISK_SPACE (state, value) {
      state.diskSpace = value
    },
    SET_BATTERY_INFO (state, value) {
      state.batteryInfo = value
    }
  },
  actions: {
    socket_hardwareInfo ({ commit }, data) {
      commit('SET_CPU_TEMPERATURE', data.cpu.cpuTemp)
      commit('SET_CPU_USAGE', data.cpu.cpuUsage)
      commit('SET_MEMORY_FREE', data.ram.freemem)
      commit('SET_MEMORY_USAGE', data.ram.freememPercent)
      commit('SET_DISK_SPACE', data.disk)
      commit('SET_BATTERY_INFO', data.battery)
    },
  },
  getters: {
    batteryCapacity: state => {
      if (state.batteryInfo) return state.batteryInfo.capacity
      else return -1
    },
    batteryVoltage: state => {
      if (state.batteryInfo) return state.batteryInfo.voltage
      else return -1
    },
    freeDiskSpace: state => {
      if (!state.diskSpace) return -1
      return (state.diskSpace.free / 1000**3).toFixed(1)
    },
    diskSpaceInfo: state => {
      if (state.diskSpace) {
        let used = ((state.diskSpace.size - state.diskSpace.free) / 1000**3).toFixed(1)
        let size = (state.diskSpace.size / 1000**3).toFixed(1)
        return {
          used,
          size
        }
      } else {
        return null
      }
    }
  },
}
