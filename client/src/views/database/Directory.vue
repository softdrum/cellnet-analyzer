<template>
  <div>
    <v-card
      :loading="loading" 
      class="directory-card">
    <div
      class="d-flex align-center pa-5"
    >
      <v-btn
        otlined
        class="base mr-3"
        to="/database"
      >
        <v-icon left>icon-arrow-left</v-icon>
        Back
      </v-btn>
      {{ files.length }} files are available
    </div>
    <dialog-create-file
      v-model="dialog"
      :file="selectedFile"
      :loading="loading"
      @save="saveFile"
    />
    <v-divider></v-divider>
    <div
      v-if="this.files.length"
      class="pa-6 d-flex flex-wrap"
      :class="`justify-${justify}`"
    >
      <div
        v-for="file in files"
        :key="file._id"
        class="pa-3"
      >
        <div
          class="heatmap-file d-flex align-center flex-column"
          @contextmenu.prevent="show($event, file)"
          @click="open(file)"
        >
          <v-card
            hover
            class="box mb-2"
            :color="iconColor"
          >
            <div class="scaleonhover d-flex align-center justify-center disable-select">
              {{ dataType }}
            </div>
          </v-card>
          <span class="filename text-center">{{ file.name }}</span>
        </div>
        <v-menu
          v-model="showMenu"
          :absolute="true"
          :position-x="x"
          :position-y="y"
        >
          <v-card class="d-flex flex-column">
            <v-btn @click="deleteFile">
              Delete
            </v-btn>
            <v-btn @click="editFile">
              Rename
            </v-btn>
          </v-card>
        </v-menu>
      </div>
    </div>
    </v-card>
    <dialog-fullscreen
      v-model="fullscreenDialog"
      @close="onFullscreenClose"
    >
      <v-card class="background">
        <view-file-map
          v-if="dataType !== 'SGNL'"
          :data="fileData"
          :heatmap="dataType === 'HMP'"
        />
        <chart-group
          v-else
          :charts="charts"
          class="ma-1"
        />
      </v-card>
    </dialog-fullscreen>
  </div>
</template>

<script>
import databaseService from '@/services/databaseService'
import DialogCreateFile from '@/components/dialogs/DialogCreateFile'
import DialogFullscreen from '@/components/dialogs/DialogFullscreen'
import ViewFileMap from '@/components/map/ViewFileMap'
import ChartGroup from '@/components/ChartGroup'

export default {
  name: 'Database',
  components: {
    DialogCreateFile,
    DialogFullscreen,
    ViewFileMap,
    ChartGroup
  },
  data: () => ({
    charts: [
      {
        title: 'Signal level, dBm',
        refName: 'slvl',
        color: '#82B1FF',
        scale: [-120, 0],
        data: []
      },
      {
        title: 'Bit Error Rate',
        refName: 'ber',
        color: '#82B1FF',
        scale: [0, 100],
        data: []
      }
    ],
    x: 0,
    y: 0,
    dialog: false,
    result: [],
    fileData: [],
    delay: 700,
    clicks: 0,
    showMenu: false,
    timer: null,
    selectedFile: {dataType: ''},
    files: [],
    loading: false,
    fullscreenDialog: false,
    filesId: 0,
  }),
  computed: {
    dataType () {
      let directory = this.$route.params.directory
      if (directory === 'heatmap') return 'HMP'
      else if (directory === 'basestation') return 'BS'
      else return 'SGNL'
    },
    justify () {
      let isMobile = this.$vuetify.breakpoint.width < 767
      if (isMobile) return 'space-between'
      else return 'start'
    },
    iconColor () {
      switch (this.$route.params.directory) {
        case 'basestation': return 'primary'
        case 'signal': return 'blue'
        case 'heatmap': return 'red'
        default: return 'blue'
      }
    }
  },
  async mounted() {
    let dataType = this.$route.params.directory
    if (dataType === 'basestation') {
      this.fullscreenDialog = true
    } else {
      this.loading = true
      try {
        this.files = (await databaseService.readCollection('MeasureFile', `?dataType=${dataType}`)).data.slice()
      } catch (error) {
        console.log(error);
        this.$error('Can not load files')
      }
      this.loading = false
    }
  },
  methods: {
    onFullscreenClose () {
       for (let i=0; i < this.charts.length; ++i) {
              this.charts[i].data = []
            }
    },
    async open (file) {
      this.fileData = (await databaseService.readDocument('MeasureData', file.dataId)).data.data
      if (this.dataType === 'SGNL') {
        let dataLength = this.fileData.length
        let idx = 0
        let timer = setInterval(() => {
          if (idx < dataLength) {
            let elem = this.fileData[idx]
            this.charts[0].data.push({
              x: elem.properties.time,
              y: elem.properties.s_lvl
            })
            this.charts[1].data.push({
              x: elem.properties.time,
              y: elem.properties.ber
            })
            idx += 1;
          } else {
            clearInterval(timer)
            this.$success('interval clerared')
          }
        }, 1000);
      }
      this.fullscreenDialog = true
    },
    editFile () {
      this.dialog = true
    },
    async saveFile (id, update) {
      this.loading = true
      try {
        if (update.name !== this.selectedFile.name) {
          await databaseService.updateDocument('MeasureFile', id, update)
          let idx = this.files.findIndex(file => file.name === this.selectedFile.name);
          if (idx !== -1) {
            this.files[idx].name = update.name
          }
        }
      } catch (error) {
        this.$error('Can not change file name. Network error')
      }
      this.loading = false
      this.dialog = false
    },
    async deleteFile() {
      this.loading = true
      try {
        await databaseService.deleteDocument('MeasureData', this.selectedFile.dataId)
        await databaseService.deleteDocument('MeasureFile', this.selectedFile._id)
        this.files = this.files.filter(file => file._id !== this.selectedFile._id)
      } catch (error) {
        console.log(error);
      }
      this.loading = false
    },
    show (e, file) {
      this.dialog = false
      this.showMenu = false
      this.selectedFile = {...file}
      this.x = e.clientX
      this.y = e.clientY
      this.$nextTick(() => {
        this.showMenu = true
      })
    },
  },
}
</script>
<style scoped>
  .directory-card {
    width: 100%;
    min-height: 80vh
  }
  .heatmap-file {
    width: 128px;
    height: 100%;
    background: none;
    box-shadow: none;
    border-radius: 0px;
    overflow: hidden;
  }
  .box {
    overflow: hidden;
    height: 64px;
    width: 64px;
    border-radius: 10px;
  }
  .heatmap {
    background: red;
    border-radius: 10px;
    width: 128px;
    height: 128px;
    cursor: pointer;
    display: flex;
    justify-items: center;
    margin-bottom: 10px;
  }
  .filename {
    position: relative;
  }
  .scaleonhover {
    width: 100%;
    height: 100%;
    transition: all .2s ease-in-out;
  }
</style>
