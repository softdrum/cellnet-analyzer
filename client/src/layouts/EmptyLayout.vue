<template>
    <div class="trans">
      <transition name="fade" mode="out-in">
        <router-view />
      </transition>
    </div>
</template>
<script>
export default {
}
</script>
<style scoped>
.trans {
  transition: all 0.2s ease-in;
}
</style>
