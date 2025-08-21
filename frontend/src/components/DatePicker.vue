<script setup lang="ts">
    import { useAppStore } from '@/stores/app';
    
    const state = reactive({
        resolve: (val: boolean) => {},
        reject: (val: boolean) => {}
    });

    /* Store variables */
    const { isMobile, txt, userLang } = storeToRefs(useAppStore());
    
    /* Private variables */
    const _date = ref<Date>(new Date());
    const _dialog = ref<boolean>(false);
    const _max = ref<Date>(new Date());

    /* Public variables */
    const date = computed(() => _date);

    /**
     * Open the date picker dialog.
     * 
     * @param {Date} date The default date.
     */
    async function open(date: Date): Promise<any> {
        _date.value = new Date(date);
        _max.value = new Date();
        
        _dialog.value = true;
        
        return new Promise<any>((resolve, reject) => {
            state.resolve = resolve;
            state.reject = reject;
        });
    }

    /**
     * Close the dialog and return the confirmation status.
     * 
     * @param {boolean} confirm The dialog's confirmation status.
     */
    function close(confirm: boolean = false): void {
        state.resolve(confirm);
        _dialog.value = false;
    }

    /* Exposed methods and variables */
    defineExpose({
        date,
        open
    });
</script>

<template>
    <v-dialog
        v-model="_dialog"
        class="w-sm-100 w-md-66 w-lg-50"
        persistent
        :scrollable="isMobile"
        @keydown.esc="close">
        <template v-slot:default="{ isActive }">
            <v-card
                v-bind="isActive"
                class="mx-auto"
                :class="isMobile ? '' : ' mb-3'"
                density="compact"
                :style="isMobile ? '' : 'width: fit-content;'"
                :rounded="isMobile ? '0' : 'lg'">
                <v-toolbar />
                <v-card-text class="py-0 px-0">
                    <v-date-picker
                        v-model="_date"
                        bg-color="transparent"
                        color="primary"
                        class="mt-n13"
                        :class="isMobile ? 'mx-auto' : ''"
                        hide-header
                        :max="_max.toISOString()"
                        show-adjacent-months />
                </v-card-text>
                <v-card-actions>
                    <v-spacer />
                    <v-btn
                        color="primary"
                        elevation="4"
                        @click.stop="close(true)">
                        {{ txt.buttons.ok }}
                    </v-btn>
                    <v-btn
                        color="secondary"
                        @click.stop="close(false)">
                        {{ txt.buttons.cancel }}
                    </v-btn>
                </v-card-actions>
            </v-card>
        </template>
    </v-dialog>
</template>