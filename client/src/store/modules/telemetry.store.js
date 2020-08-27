export default {
  state: {
    connected: false,
    cpuTemperature: 0,
    cpuUsage: 0,
    memoryFree: 0,
    memoryUsage: 0,
    diskSpace: null,
    batteryLevel: 0
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
    SET_BATTERY_LEVEL (state, value) {
      state.batteryLevel = Math.round(value)
    }
  },
  actions: {
    socket_cpuInfo ({ commit }, data) {
      commit('SET_CPU_TEMPERATURE', data.cpuTemp)
      commit('SET_CPU_USAGE', data.cpuUsage)
    },
    socket_freememPercentage ({ commit }, data) {
      commit('SET_MEMORY_FREE', data.freemem)
      commit('SET_MEMORY_USAGE', data.freememPercent)
    },
    socket_diskSpace ({ commit }, data) {
      commit('SET_DISK_SPACE', data)
    },
    socket_batteryLevel ({ commit }, data) {
      commit('SET_BATTERY_LEVEL', data)
    },
  },
  getters: {
    freeDiskSpace: state => {
      if (!state.diskSpace) return 0
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
        return {
          used: 0,
          size: 0
        }
      }
    }
  },
}