<template>
  <v-row>
    <v-col
      :cols="12"
      :lg="6"
      :md="6"
      :sm="12"
    >
      <chart-card :title="'Signal level'">
        <realtime-chart
          v-model="s_lvl"
          refName="slvl"
          color="#82B1FF"
        />
      </chart-card>
    </v-col>
    <v-col
      :cols="12"
      :lg="6"
      :md="6"
      :sm="12"
    >
      <chart-card :title="'Bit Error Rate'">
        <realtime-chart
          v-model="ber"
          :scaleY="[0, 100]"
          refName="ber"
          color="#82B1FF"
        />
      </chart-card>
    </v-col>
    <v-col
      :cols="12"
      :md="6"
      :sm="12"
    >
      <info-card-expandable :info="bsInfo" />
    </v-col>
    <v-col
      :cols="12"
      :lg="3"
      :md="6"
      :sm="6"
    >
      <info-card-single v-model="diskSpaceCard"/>

    </v-col>
    <v-col
      :cols="12"
      :lg="3"
      :md="6"
      :sm="6"
    >
      <info-card-single v-model="cpuTemperatureCard"/>
    </v-col>
    <v-col
      :cols="12"
      :lg="3"
      :md="6"
      :sm="6"
    >
      <list-card
        :data="operators"
        :title="'Available operators'"
        :loading="loadingOps"
        @update="updateOperators"
      />
    </v-col>
  </v-row>
</template>

<script>
import InfoCardSingle from '../components/cards/InfoCardSingle'
import ChartCard from '../components/cards/ChartCard'
import InfoCardExpandable from '../components/cards/InfoCardExpandable'
import RealtimeChart from '../components/charts/RealtimeChart'
import ListCard from '../components/cards/ListCard'
import { mapState, mapGetters } from 'vuex'
import themes from '@/styles/colors.js'

export default {
  name: 'Dashboard',
  components: {
    InfoCardSingle,
    ChartCard,
    RealtimeChart,
    InfoCardExpandable,
    ListCard
  },
  data: () => ({
    signalLevelData: [],
    bitErrorRateData: [],
    s_lvl: null,
    ber: null,
    diskSpace: {title: 'No data', icon: {name: 'icon-drive'}},
    cpuTemp: {title: 'No data', icon: {name: 'icon-thermometer',}},
    operators: [],
    loadingOps: false
  }),
  computed: {
    ...mapState({
      signalLevel: state => state.modem.signalLevel,
      bitErrorRate: state => state.modem.bitErrorRate,
      bsInfo: state => state.modem.basestationInfo,
      cpuTemperature: state => state.telemetry.cpuTemperature
    }),
    ...mapGetters([
      'freeDiskSpace'
    ]),
    iconColor () {
      if (this.$vuetify.theme.dark) return themes.dark['primary']
      else return themes.light['accent']
    },
    diskSpaceCard () {
      return {
        title: 'Free space',
        value: `${this.freeDiskSpace}`,
        measure: 'GB',
        icon: {
          name: 'icon-drive',
          color: this.iconColor
        }
      }
    },
    cpuTemperatureCard () {
      const temp = Math.round(this.cpuTemperature)
      return {
        title: 'CPU temp.',
        value: `${temp}`,
        measure: '°C',
        icon: {
          name: 'icon-thermometer',
          color: '#FF3E01'
        }
      }
    }
  },
  sockets: {
    modem_info (data) {
      this.s_lvl = {
        x: data.timestamp,
        y: data.sq.s_lvl
      }
      this.ber = {
        x: data.timestamp,
        y: data.sq.ber
      }
    },
  },
  methods: {
    resetData(){
      let slvlDataLength = this.signalLevelData.length
      let berDataLength = this.bitErrorRateData.length
      this.signalLevelData = this.signalLevelData.slice(slvlDataLength - 10, slvlDataLength);
      this.bitErrorRateData = this.bitErrorRateData.slice(berDataLength - 10, berDataLength);
    },
    async updateOperators () {
      this.loadingOps = true;
      try {
        let response = await this.$store.dispatch('getAvailableOperators');
        this.operators = response.data;
      } catch (error) {
        this.$error('Failed to get available operators list')
        console.log(error);
      }
      this.loadingOps = false;
    }
  }
}
</script>
<style scoped>
  .ani {
    transition: all 0.3s ease;
  }
</style>
