<template>
  <div class="text-center">
    <v-dialog
      v-model="value"
      persistent
      max-width="600px"
    >
      <template
        v-if="button"
        v-slot:activator="{ on, attrs }"
      >
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
          <slot name="title"/>
        </v-card-title>

        <v-card-text>
          <slot />
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <slot name="actions"/>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  export default {
    name: 'DialogAccept',
    props: {
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
