<template>
  <div>
    <appbar
      v-if="!isFullscreen"
      class="side-animation"
      :class="contentClass"
      :desktop="isDesktop"
    />
    <sidebar
      v-if="isDesktop"
      v-model="isSidebarOpened"
      class="disable-scrollbars"
    />
    <bottom-navigation v-else />
    <main
      class="content"
      :class="contentClass"
    >
      <transition name="fade" mode="out-in">
        <v-container
          v-if="!isFullscreen"
          :class="{'pl-6 pr-4': isDesktop}"
          fluid
        >
          <transition name="fade" mode="out-in">
            <router-view />
          </transition>
        </v-container>
        <transition name="fade" mode="out-in" v-else>
            <router-view />
        </transition>
      </transition>
    </main>
    <div class="bottom-navigation-ghost" v-if="!isDesktop && !isFullscreen"></div>
  </div>
</template>

<script>
import Sidebar from '@/components/app/TheSidebar'
import Appbar from '@/components/app/TheAppbar'
import BottomNavigation from '@/components/app/TheBottomNavigation'

export default {
  name: 'main',
  components: {
    Appbar,
    Sidebar,
    BottomNavigation
  },
  data: () => ({
    isSidebarOpened: true,
    sideHidden: false
  }),
  computed: {
    isDesktop () {
      return this.$vuetify.breakpoint.width > 767
    },
    isFullscreen () {
      if (this.$route.fullPath === '/map') return true
      else return false
    },
    contentClass () {
      if (this.isDesktop) {
        if (this.isSidebarOpened) return 'sidebar-opened'
        else return 'sidebar-closed'
      } else {
        return ''
      }
    }
  }
}
</script>
<style scoped>
  .content {
    width: 100%;
    transition: padding-left 0.1s ease-in;
  }
  .sidebar-opened {
    padding-left: 256px;
  }
  .bottom-navigation-ghost {
    margin-top: 56px;
  }
  .sidebar-closed {
    padding-left: 56px;
  }
</style>
