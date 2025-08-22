<script setup lang="ts">
    import { useDisplay } from 'vuetify';
    import { useAppStore } from '@/stores/app';

    /* Store variables */
    const { brandIcon, isMobile, txt } = storeToRefs(useAppStore());

    /* Private variables */
    const _display = useDisplay();
    
    isMobile.value = computed(() => { return _display.mobile.value; });

    onMounted(() => {    })
</script>

<template>
    <v-app-bar
        class="px-3">
        <v-app-bar-title>
            <div class="d-flex align-center">
                <v-icon
                    :icon="brandIcon"
                    class="mr-1"
                    color="primary"
                    size="x-large" />
                <div>
                    <p class="brand-font color-primary mb-n1">
                        {{ txt.labels.siteName }}
                    </p>
                    <p class="text-caption color-secondary font-italic">
                        {{ txt.labels.tagLine }}
                    </p>
                </div>
            </div>
        </v-app-bar-title>
        <div class="d-flex align-center">
            <v-icon
                icon="mdi-account-circle-outline"
                class="pr-3 mb-auto"
                color="secondary"
                style="background: transparent" />
            <div class="text-end">
                <p class="text-body-2">Klaudia Müller</p>
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