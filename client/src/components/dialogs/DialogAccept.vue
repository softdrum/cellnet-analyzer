<template>
  <div class="text-center">
    <v-dialog
      v-model="value"
      persistent
      width="500"
    >
      <template v-if="button" v-slot:activator="{ on, attrs }">
        <v-btn
          color="red lighten-2"
          dark
          v-bind="attrs"
          v-on="on"
        >
          Click Me
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="headline">
          {{ title }}
        </v-card-title>

        <v-card-text>
          {{ text }}
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions v-if="acceptText+declineText+cancelText !== ''">
          <v-spacer></v-spacer>
          <v-btn
            v-if="acceptText"
            color="primary"
            text
            @click="onClick('accept')"
          >
            {{ acceptText }}
          </v-btn>
          <v-btn
            v-if="declineText"
            color="primary"
            text
            @click="onClick('decline')"
          >
            {{ declineText }}
          </v-btn>
          <v-btn
            v-if="cancelText"
            color="primary"
            text
            @click="$emit('close')"
          >
            {{ cancelText }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  export default {
    props: {
      title: String,
      text: String,
      value: {
        type: Boolean,
        default: false
      },
      button: {
        type: Boolean,
        default: false
      },
      acceptText: {
        type: String,
        default: ''
      },
      declineText: {
        type: String,
        default: ''
      },
      cancelText: {
        type: String,
        default: ''
      }
    },
    methods: {
      onClick (eventName) {
        this.$emit(eventName)
      }
    },
  }
</script>
