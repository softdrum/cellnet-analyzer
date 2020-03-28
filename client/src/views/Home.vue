<template>
  <div>
    <img alt="Vue logo" src="../assets/logo.png">
    <Sidebar />
    <Navbar />
  </div>
</template>

<script>
// @ is an alias to /src
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
// import ContentCard from '../components/ContentCard'

export default {
  name: 'Home',
  components: {
    Sidebar,
    Navbar,
    // ContentCard
  }
}
</script>
