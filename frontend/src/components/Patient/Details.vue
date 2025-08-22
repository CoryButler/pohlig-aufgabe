<script setup lang="ts">
    import { useAppStore } from '@/stores/app';
    import { usePatientStore, type Patient } from '@/stores/patient';
    import DatePicker from '@/components/DatePicker.vue';
    import { getAge } from '@/utils/helper';

    /* Store variables */
    const appStore = useAppStore();
    const { isMobile, txt, userLang } = storeToRefs(appStore);
    const patientStore = usePatientStore();
    const { isPending, patient, sexes } = storeToRefs(patientStore);
    const { readPatientById } = patientStore;

    const state = reactive({
        resolve: (val: boolean) => {},
        reject: (val: boolean) => {}
    });

    /* Private variables */
    const _dialog = ref<boolean>(false);
    const _patient = ref<Patient>({} as Patient);

    /* UI references */
    const datePicker = ref<HTMLElement>();
    const form = ref<HTMLFormElement>();

    /**
     * Open the patient editor.
     *
     * @param {number} id The ID of the patient to be edited.
     */
    async function open(id: number): Promise<boolean> {
        await readPatientById(id);

        _patient.value = { ...patient.value };
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
        open
    });
</script>

<template>
    <v-dialog
        v-model="_dialog"
        class="w-sm-100 w-md-66 w-lg-50"
        :fullscreen="isMobile"
        persistent
        @keydown.esc="close">
        <template v-slot:default="{ isActive }">
            <v-card
                v-bind="isActive"
                :disabled="isPending">
                <v-toolbar>
                    <v-icon 
                        icon="mdi-account-details"
                        class="mx-3" />
                        {{ txt.headings.patientDetails }}
                    <v-spacer />
                    <v-col cols="3" class="mt-2">
                        <v-text-field v-if="_patient.id > 0"
                            :label="txt.fields.patientId"
                            v-model="_patient.id"/>
                    </v-col>
                    <v-btn 
                        icon="mdi-close"
                        style="background: transparent;"
                        @click="close" />
                </v-toolbar>
                <v-card-text>
                    <v-progress-linear indeterminate color="primary" :style="isPending ? 'opacity: 1' : 'opacity: 0'"/>
                    <v-form ref="form"
                        validate-on="submit">
                        <v-row no-gutters>
                            <v-col :cols="isMobile ? 12 : 6"
                                class="px-2">
                                <v-text-field
                                    :label="txt.fields.firstName"
                                    v-model="_patient.firstName"
                                    readonly />
                            </v-col>
                            <v-col :cols="isMobile ? 12 : 6"
                                class="px-2">
                                <v-text-field
                                    :label="txt.fields.lastName"
                                    v-model="_patient.lastName"
                                    readonly />
                            </v-col>
                        </v-row>
                        <v-row no-gutters>
                            <v-col :cols="8"
                                class="px-2">
                                <v-text-field
                                    :label="txt.fields.birthdate"
                                    persistent-placeholder
                                    readonly>
                                    <span class="d-flex justify-space-between ga-3">
                                        <span>{{ new Date(_patient.birthdate).toLocaleDateString(userLang) }}</span>
                                        <span class="color-secondary">({{ getAge(_patient.birthdate) }}&nbsp;{{ txt.units.years }})</span>
                                    </span>
                                </v-text-field>
                            </v-col>
                            <v-col :cols="4"
                                class="px-2">
                                <v-select
                                    :label="txt.fields.sex"
                                    v-model="_patient.sex"
                                    :items="sexes"
                                    readonly />
                            </v-col>
                        </v-row>
                        <v-row no-gutters>
                            <v-col :cols="isMobile ? 12 : 6"
                                class="px-2">
                                <v-text-field
                                    :label="txt.fields.phone"
                                    v-model="_patient.phone"
                                    readonly />
                            </v-col>
                            <v-col :cols="isMobile ? 12 : 6"
                                class="px-2">
                                <v-text-field
                                    :label="txt.fields.email"
                                    v-model="_patient.email"
                                    readonly />
                            </v-col>
                        </v-row>
                        <v-row no-gutters>
                            <v-col cols=" 12"
                                class="px-2">
                                <v-text-field
                                    :label="txt.fields.address"
                                    v-model="_patient.address"
                                    readonly />
                            </v-col>
                        </v-row>
                        <v-row no-gutters>
                            <v-col cols="4"
                                class="px-2">
                                <v-text-field
                                    :label="txt.fields.state"
                                    v-model="_patient.state"
                                    readonly />
                            </v-col>
                            <v-col cols="4"
                                class="px-2">
                                <v-text-field
                                    :label="txt.fields.zip"
                                    v-model="_patient.zip"
                                    readonly />
                            </v-col>
                            <v-col cols="4"
                                class="px-2">
                                <v-text-field
                                    :label="txt.fields.country"
                                    v-model="_patient.country"
                                    readonly />
                            </v-col>
                        </v-row>
                        <v-row no-gutters>
                            <v-col cols="6"
                                class="px-2">
                                <v-text-field
                                    :label="txt.fields.insurance"
                                    v-model="_patient.insurance"
                                    readonly/>
                            </v-col>
                            <v-col cols="6"
                                class="px-2">
                                <v-text-field
                                    :label="txt.fields.pharmacy"
                                    v-model="_patient.pharmacy"
                                    readonly />
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
                        variant="flat"
                        @click.stop="close">
                        {{ txt.buttons.close }}
                    </v-btn>
                </v-card-actions>
            </v-card>
        </template>
    </v-dialog>
    <DatePicker ref="datePicker" />
</template>