<template>
    <div>
        <p v-if="this.$store.state.auth.userLoggedIn">Залогинен</p>
        {{this.$store.state.auth.user}}
        <router-view />
    </div>
</template>
