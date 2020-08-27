<template>
  <v-data-table
    :dense="false"
    v-model="selected"
    :loading="loading"
    :items="data"
    :headers="headers"
    show-select
    class="elevation-1"
  >
  <template v-slot:item.generation="{ item }">
    <v-chip dark>{{ item.generation }}</v-chip>
  </template>
  <template  v-slot:top>
    <v-toolbar flat>
      <v-toolbar-title>Таблица</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn @click="deleteItems()" v-if="selected.length" text>Удалить</v-btn>
      <v-btn @click="deleteItems(true)" v-if="selected.length" text>Удалить все<v-icon>mdi-delete</v-icon></v-btn>
    </v-toolbar>
  </template>
  </v-data-table>
</template>
<script>
  export default {
    props: {
      data: Array,
      headers: Array,
      loading: {
        type: Boolean,
        default: false
      }
    },
    data: () => ({
      selected: []
    }),
    methods: {
      getColor(operator) {
        switch (operator) {
          case 'Megafon': return 'green'
          case 'Beeline': return 'black'
          case 'TELE2': return 'primary'
          case 'MTS': return 'red'
        }
      },
      spliceItems(all) {
        if (all) {
          this.data = []
        } else {
          this.selected.forEach( item => {
            const index = this.data.indexOf(item)
            this.data.splice(index, 1)
          })
        }
      },
      async deleteItems (all=false) {
        const question = all ? 'все' : ''
        const sure = confirm(`Вы уверены, что хотите удалить ${question} записи`)
        if (sure) {
          let itemsToDelete
          if (all) {
            itemsToDelete = this.data.slice()
          } else {
            itemsToDelete = this.selected.slice()
          }
          try {
            await this.$store.dispatch('removeDataFromDatabase', {
              tableName: 'signal',
              selected: itemsToDelete
            })
            this.spliceItems(all)
          } catch (error) {
            console.log(error);
            this.$error('Ошибка удаления')
          }
        }
      },
    },
  }
</script>
