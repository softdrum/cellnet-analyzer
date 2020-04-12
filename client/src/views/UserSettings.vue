<template>
  <div>
    <v-row>
      <v-col lg="3">
        <v-form>
          <v-text-field
            v-model="userName"
              :counter="10"
              label="User name"
            required
          ></v-text-field>
          <v-text-field
            :counter="10"
            label="Password"
            required
          ></v-text-field>
        </v-form>
        <div class="d-flex mt-3">
          <h1 class="align-self-center mr-5 body-2 font-weight-medium">Dartk theme</h1>
          <v-switch v-if="width > 700" @change="changeTheme" name="switch" v-model="switch1"></v-switch>
          <v-switch switch v-else inset @change="changeTheme" name="switch" v-model="switch1"></v-switch>
          <!-- <v-icon  style="font-size: 20px;">mdi-clock</v-icon> -->
        </div>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
  name: 'settings',
  data: () => ({
    switch1: null,
    userName: '',
    password: '',
    width: window.innerWidth
  }),
  mounted() {
    console.log(this.userName);
    this.switch1 = this.$vuetify.theme.dark
  },
  methods: {
    changeTheme() {
      this.$vuetify.theme.dark = this.switch1
      this.$store.dispatch('setTheme', this.switch1)
    }
  },
  computed: {
    ...mapGetters(['user'])
  }
}
</script>
