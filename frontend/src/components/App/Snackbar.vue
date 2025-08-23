<script setup lang="ts">
    import { storeToRefs } from 'pinia';
    import { useAppStore } from '@/stores/app';
    import { useSnackbarStore } from '@/stores/snackbar';

    const appStore = useAppStore();
    const { isMobile, txt } = storeToRefs(appStore);

    const snackbarsStore = useSnackbarStore();
    const { snackbar, snackbarShow } = storeToRefs(snackbarsStore);
</script>

<template>
    <v-snackbar
        v-model="snackbarShow"
        :color="snackbar.color"
        :timeout="snackbar.timeout"
        transition="fade-transition"
        variant="flat">
        <div class="d-flex align-center justify-space-between">
            <div class="d-flex align-center justify-start">
                <v-icon
                    :icon="snackbar.icon"
                    :size="isMobile ? 'small' : 'large'" />
                <span  class="ml-2 text-subtitle-1">
                    {{ snackbar.text }}
                </span>
            </div>
            <v-btn
                variant="plain"
                @click="snackbarShow = false"
                class="mr-0">
                {{ txt.buttons.close }}
            </v-btn>
        </div>
    </v-snackbar>
</template>