<template>
  <div>
    <div class="d-flex py-3 align-center mb-3">
      <v-btn style="background: transparent" class="mr-3" to="/database">
        <v-icon>mdi-arrow-left</v-icon>
        Back
      </v-btn>
      {{ files.length }} files are available
    </div>
    <dialog-create-file @save="saveFile" v-model="dialog" :loading="loading" :file="selectedFile" />
    <v-row>
      <v-col
        v-for="(file, i) in files"
        :key="i"
        cols="12"
        xl="3"
        lg="2"
        sm="2"
        xs="6"
      >
        <div
          @contextmenu.prevent="show($event, file)"
          class="heatmap-file d-flex align-center flex-column"
        >
          <v-card :color="iconColor" class="box mb-2" hover>
            <div class="scaleonhover d-flex align-center justify-center">
              HMP
            </div>
          </v-card>
          <span class="filename text-center">{{ file.name }}</span>
        </div>
        <v-menu v-model="showMenu" :absolute="true"
          :position-x="x"
          :position-y="y"
        >
            <!-- slot content goes here -->
          <v-card class="d-flex flex-column">
            <v-btn @click="deleteFile">
              <v-icon small>mdi-delete</v-icon>
              Delete
            </v-btn>
             <v-btn @click="editFile">
              <v-icon>mdi-pencil</v-icon>
              Rename
            </v-btn>
          </v-card>
        </v-menu>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import databaseService from '@/services/databaseService'
import DialogCreateFile from '@/components/dialogs/DialogCreateFile'
export default {
  name: 'Database',
  components: {
    DialogCreateFile
  },
  data: () => ({
    x: 0,
    y: 0,
    dialog: false,
    loading: false,
    result: [],
    delay: 700,
    clicks: 0,
    longpressed: false,
    showMenu: false,
    timer: null,
    selectedFile: {dataType: ''},
    files: [],
  }),
  computed: {
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
    try {
      const l = (await databaseService.findLatestDocument('Basestation', ''))
      console.log(l);
      const latest = (await databaseService.findLatestDocument('MeasureFile', '?dataType=heatmap'))
      console.log(latest);
      const dataType = this.$route.params.directory
      this.files = (await databaseService.readCollection('MeasureFile', `?dataType=${dataType}`)).data
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    open () {
      alert()
    },
    editFile () {
      this.dialog = true
    },
    async saveFile (id, update) {
      try {
        this.loading = true
        if (update.name !== this.selectedFile.name) {
          await databaseService.updateDocument('MeasureFile', id, update)
          this.files = (await databaseService.readCollection('MeasureFile', '?dataType=heatmap')).data
        }
      } catch (error) {
        console.log(error);
      }
      this.loading = false
      this.dialog = false
    },
    async deleteFile(file) {
      try {
        await databaseService.deleteDocument('MeasureData', file.dataId)
        await databaseService.deleteDocument('MeasureFile', file._id)
        this.files = (await databaseService.readCollection('MeasureFile', '?dataType=heatmap')).data
      } catch (error) {
        console.log(error);
      }
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
    showInfo () {
      console.log('object');
    },
    onClick () {
      console.log('clicked')
      if (!this.longpressed) {
        this.showMenu = false
      }
    },
    onLongPressStart () {
      this.longpressed = true
    },
    onLongPressStop (id) {
      this.fileSelected = id
    }
  },
}
</script>
<style scoped>
.heatmap-file {
  width: 100%;
  height: 100%;
  background: none;
  box-shadow: none;
  border-radius: 0px;
  overflow: hidden;
}
.box {
  overflow: hidden;
  height: 128px;
  width: 128px;
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
  .scaleonhover:hover { transform: scale(1.1);}
  .scaleonhover:active { transform: scale(1); }
</style>
