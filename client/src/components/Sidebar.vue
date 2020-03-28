<template>
  <div class="sidebar">
    <button @click.prevent="$emit('sideClick')">
      =
    </button>
    <ul>
      <li>Xueta</li>
      <li>Xueta</li>
      <li>Xueta</li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'sidebar'
}
</script>
<style>
  .sidebar {
    position: fixed;
    width: 64px;
    height: 100vh;
    background: #222;
    transition: 0.3s ease;
  }
</style>
