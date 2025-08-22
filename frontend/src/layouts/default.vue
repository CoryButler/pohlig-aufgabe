<script setup lang="ts">
    import AppHeader from '../components/App/Header.vue';
    import AppFooter from '../components/App/Footer.vue';
</script>

<template>
    <AppHeader />
    <v-main>
        <router-view />
    </v-main>
    <AppFooter />
</template>