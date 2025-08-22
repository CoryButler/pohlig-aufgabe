<script setup lang="ts">
    import { useAppStore } from '@/stores/app';
    import { usePatientStore, type Patient } from '@/stores/patient';

    const state = reactive({
        resolve: (val: boolean) => {},
        reject: (val: boolean) => {}
    });

    /* Store variables */
    const { txt } = storeToRefs(useAppStore());
    const patientStore = usePatientStore();
    const { isPending, patient } = storeToRefs(patientStore);
    const { deletePatient, readPatientById } = patientStore;

    /* Private variables */
    const _dialog = ref<boolean>(false);
    const _errorMsg = ref<string>('');
    const _patient = ref<Patient>({} as Patient);

    /**
     * Open the remove patient dialog.
     * 
     * @param {number} id The ID of the patient to be removed.
     */
    async function open(id: number): Promise<boolean> {
        await readPatientById(id);
        
        _patient.value = { ...patient.value };
        _errorMsg.value = '';
        _dialog.value = true;

        return new Promise<boolean>((resolve, reject) => {
            state.resolve = resolve;
            state.reject = reject;
        });
    }

    /**
     * Remove the selected patient.
     */
    async function remove(): Promise<void> {
        const success = await deletePatient();

        if (!success) return;

        close(true);
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
        open
    });
</script>

<template>
    <v-dialog
        v-model="_dialog"
        persistent
        width="auto"
        @keydown.esc="close">
        <template v-slot:default="{ isActive }">
            <v-card
                v-bind="isActive"
                :disabled="isPending">
                <v-toolbar>
                    <v-icon 
                        icon="mdi-trash-can"
                        class="mx-3" />
                        {{ txt.headings.deletePatient }}
                    <v-spacer />
                    <v-btn 
                        icon="mdi-close"
                        style="background: transparent;"
                        @click="close" />
                </v-toolbar>
                <v-card-text>
                    <v-progress-linear indeterminate color="primary" :style="isPending ? 'opacity: 1' : 'opacity: 0'"/>
                    <p>{{ txt.messages.deletePatient }}</p>
                    <p class="color-primary mt-6 text-center text-h6">{{ _patient.firstName }} {{ _patient.lastName }}</p>
                    <p class="color-secondary text-center">{{ txt.fields.patientId}}: {{ _patient.id }}</p>
                </v-card-text>
                <v-card-actions>
                    <v-spacer />
                    <v-btn
                        color="error"
                        elevation="4"
                        variant="flat"
                        @click.stop="remove">
                        {{ txt.buttons.delete }}
                    </v-btn>
                    <v-btn
                        color="secondary"
                        @click.stop="close">
                        {{ txt.buttons.cancel }}
                    </v-btn>
                </v-card-actions>
            </v-card>
        </template>
    </v-dialog>
</template>