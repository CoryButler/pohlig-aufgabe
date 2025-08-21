<script setup lang="ts">
    import { useAppStore } from '@/stores/app';
    import { usePatientStore } from '@/stores/patient';
    import type { Patient } from '@/stores/types';

    /* Store variables */
    const appStore = useAppStore();
    const { isMobile, txt, userLang } = storeToRefs(appStore);
    const patientStore = usePatientStore();
    const { isPending, patient } = storeToRefs(patientStore);
    const { createPatient, updatePatient } = patientStore;

    const state = reactive({
        resolve: (val: boolean) => {},
        reject: (val: boolean) => {}
    });

    /* Private variables */
    const _dialog = ref<boolean>(false);
    const _errorMsg = ref<string>('');
    const _noteLimit = 100;
    const _today = ref<Date>(new Date());
    const _patient = ref<Patient>({} as Patient);

    /* UI references */
    const datePicker = ref<HTMLElement>();
    const form = ref<HTMLFormElement>();

    /**
     * Open the patient editor.
     */
    async function open(): Promise<any> {
        _patient.value = { ...patient.value };

        _errorMsg.value = '';
        _today.value = new Date();
        
        _dialog.value = true;
        
        return new Promise<any>((resolve, reject) => {
            state.resolve = resolve;
            state.reject = reject;
        });
    }

    /**
     * Open the date picker dialog.
     */
     function openDatePicker(): void {
        if (datePicker.value) {
            const dialog = <any>datePicker.value;
            dialog.open(_today.value)
                .then(async (confirm: boolean) => {
                if (confirm) {
                    _patient.value.birthdate = dialog.date.value;
                }
            })
        }
    }

    /**
     * Save the changes made to the request.
     */
    async function save(): Promise<void> {
        _errorMsg.value = '';
        if (!form.value) return;

        const { valid } = await form.value.validate();
        if (!valid) return;

        let success: boolean = false;

        if (_patient.value.id === undefined) {
            success = await createPatient(_patient.value)
        }
        else {
            success = await updatePatient(_patient.value)
        }
        
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
        class="w-sm-100 w-md-66 w-lg-50"
        :scrollable="isMobile"
        @keydown.esc="close">
        <template v-slot:default="{ isActive }">
            <v-card :disabled="isPending" v-bind="isActive">
                <v-toolbar>
                    <v-icon 
                        icon="mdi-email-outline"
                        class="mx-3" />
                        {{ _patient.id <= 0 ? txt.headings.newPatient : txt.headings.editPatient }}
                </v-toolbar>
                <v-card-text>
                    <v-progress-linear indeterminate color="primary" :style="isPending ? 'opacity: 1' : 'opacity: 0'"/>
                    <v-form ref="form"
                        validate-on="submit">
                        <v-row no-gutters
                            class="ga-6">
                            <v-col>
                                <v-text-field
                                    :label="txt.fields.firstName"
                                    v-model="_patient.firstName"
                                    hide-details
                                    @keydown.enter.exact.prevent="save" />
                            </v-col>
                            <v-col>
                                <v-text-field
                                    :label="txt.fields.lastName"
                                    v-model="_patient.lastName"
                                    hide-details
                                    @keydown.enter.exact.prevent="save" />
                            </v-col>
                        </v-row>
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-spacer />
                    <v-btn
                        color="primary"
                        :disabled="isPending"
                        :elevation="!isPending ? 4 : 0"
                        @click.stop="save">
                        {{ txt.buttons.ok }}
                    </v-btn>
                    <v-btn
                        :disabled="isPending"
                        color="secondary"
                        @click.stop="close">
                        {{ txt.buttons.cancel }}
                    </v-btn>
                </v-card-actions>
            </v-card>
        </template>
    </v-dialog>
</template>