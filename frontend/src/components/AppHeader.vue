<script setup lang="ts">
    import { useDisplay } from 'vuetify';
    import { useAppStore } from '@/stores/app';

    /* Store variables */
    const { brandIcon, isMenu, isMobile, siteName, tagLine, txt } = storeToRefs(useAppStore());

    /* Private variables */
    const _display = useDisplay();
    
    isMobile.value = computed(() => { return _display.mobile.value; });

    onMounted(() => {    })
</script>

<template>
    <v-app-bar>
        <template v-slot:prepend>
            <v-expand-x-transition>
                <div v-show="isMobile">
                    <v-app-bar-nav-icon
                        color="primary"
                        style="background: transparent; "
                        @click="isMenu = !isMenu" />
                </div>
            </v-expand-x-transition>
        </template>
        <v-app-bar-title :class="isMobile ? 'ml-0' : 'ml-3'">
            <div>
                <p class="brand-font color-primary mb-n1 d-flex align-end">
                    <v-icon :icon="brandIcon" color="primary" />
                    {{ siteName }}
                </p>
                <p class="text-caption color-secondary font-italic">{{ tagLine }}</p>
            </div>
        </v-app-bar-title>
        <div class="d-flex align-center">
            <v-icon
                icon="mdi-account-circle-outline"
                class="pr-3 mb-auto"
                color="secondary"
                style="background: transparent" />
            <div class="text-end">
                <p>Klaudia Müller</p>
                <p class="text-caption">
                    <span class="color-primary">
                        {{ txt.labels.patientServices }}
                    </span>
                </p>
            </div>
        </div>
        <AppSettings />
    </v-app-bar>
</template>