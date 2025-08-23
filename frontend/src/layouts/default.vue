<script setup lang="ts">
    import AppHeader from '../components/App/Header.vue';
    import AppFooter from '../components/App/Footer.vue';
    import AppSnackBar from '../components/App/Snackbar.vue';
</script>

<template>
    <AppHeader />
    <v-main>
        <router-view />
    </v-main>
    <AppFooter />
    <AppSnackBar />
</template>