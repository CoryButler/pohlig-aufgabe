<script setup lang="ts">
    import { useAppStore } from '@/stores/app';
    import { usePatientStore, type Patient } from '@/stores/patient';
    import DatePicker from '@/components/DatePicker.vue';
    import { useFormRules } from '@/composables/useFormRules';
    import { getAge, numbersOnly } from '@/utils/helper';

    /* Store variables */
    const appStore = useAppStore();
    const { isMobile, txt, userLang } = storeToRefs(appStore);
    const patientStore = usePatientStore();
    const { isPending, patient, sexes } = storeToRefs(patientStore);
    const { createPatient, readPatientById, updatePatient } = patientStore;
    const { emailValid, positiveFloat, required } = useFormRules();

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
     * Open the date picker dialog.
     */
    function openDatePicker(): void {
        if (datePicker.value) {
            const dialog = <any>datePicker.value;
            dialog.open(_patient.value.birthdate)
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
        if (!form.value) return;

        const { valid } = await form.value.validate();
        if (!valid) return;

        let success: boolean = false;

        if (_patient.value.id <= 0) {
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
        :fullscreen="isMobile"
        persistent
        @keydown.esc="close">
        <template v-slot:default="{ isActive }">
            <v-card
                v-bind="isActive"
                :disabled="isPending">
                <v-toolbar :color=" _patient.id <= 0 ? 'primary' : 'warning'">
                    <v-icon 
                        :icon="_patient.id <= 0 ? 'mdi-account-plus' : 'mdi-account-edit'"
                        class="mx-3" />
                        {{ _patient.id <= 0 ? txt.headings.newPatient : txt.headings.editPatient }}
                    <v-spacer />
                    <v-col cols="3" class="mt-2">
                        <v-text-field v-if="_patient.id > 0"
                            :label="txt.fields.patientId"
                            v-model="_patient.id"
                            readonly />
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
                                    :rules="[required]"
                                    @keydown.enter.exact.prevent="save" />
                            </v-col>
                            <v-col :cols="isMobile ? 12 : 6"
                                class="px-2">
                                <v-text-field
                                    :label="txt.fields.lastName"
                                    v-model="_patient.lastName"
                                    :rules="[required]"
                                    @keydown.enter.exact.prevent="save" />
                            </v-col>
                        </v-row>
                        <v-row no-gutters>
                            <v-col :cols="8"
                                class="px-2">
                                <v-text-field
                                    :label="txt.fields.birthdate"
                                    persistent-placeholder
                                    readonly
                                    @click.stop="() => openDatePicker()"
                                    @keydown.enter.exact.prevent="() => openDatePicker()">
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
                                    :rules="[required]"
                                    @keydown.enter.exact.prevent="save" />
                            </v-col>
                        </v-row>
                        <div class="d-flex align-center mb-4">
                            <v-divider />
                            <p class="mx-3 color-secondary">{{ txt.labels.optional }}</p>
                            <v-divider />
                        </div>
                        <v-row no-gutters>
                            <v-col :cols="isMobile ? 12 : 6"
                                class="px-2">
                                <v-text-field
                                    :label="txt.fields.phone"
                                    v-model="_patient.phone"
                                    @keydown="(evt: any) => numbersOnly(evt)"
                                    @keydown.enter.exact.prevent="save" />
                            </v-col>
                            <v-col :cols="isMobile ? 12 : 6"
                                class="px-2">
                                <v-text-field
                                    :label="txt.fields.email"
                                    v-model="_patient.email"
                                    :rules="[emailValid]"
                                    @keydown.enter.exact.prevent="save" />
                            </v-col>
                        </v-row>
                        <v-row no-gutters>
                            <v-col cols=" 12"
                                class="px-2">
                                <v-text-field
                                    :label="txt.fields.address"
                                    v-model="_patient.address"
                                    @keydown.enter.exact.prevent="save" />
                            </v-col>
                        </v-row>
                        <v-row no-gutters>
                            <v-col cols="4"
                                class="px-2">
                                <v-text-field
                                    :label="txt.fields.state"
                                    v-model="_patient.state"
                                    @keydown.enter.exact.prevent="save" />
                            </v-col>
                            <v-col cols="4"
                                class="px-2">
                                <v-text-field
                                    :label="txt.fields.zip"
                                    v-model="_patient.zip"
                                    @keydown="(evt: any) => numbersOnly(evt)"
                                    @keydown.enter.exact.prevent="save" />
                            </v-col>
                            <v-col cols="4"
                                class="px-2">
                                <v-text-field
                                    :label="txt.fields.country"
                                    v-model="_patient.country"
                                    @keydown.enter.exact.prevent="save" />
                            </v-col>
                        </v-row>
                        <v-row no-gutters>
                            <v-col cols="6"
                                class="px-2">
                                <v-text-field
                                    :label="txt.fields.insurance"
                                    v-model="_patient.insurance"
                                    @keydown.enter.exact.prevent="save" />
                            </v-col>
                            <v-col cols="6"
                                class="px-2">
                                <v-text-field
                                    :label="txt.fields.pharmacy"
                                    v-model="_patient.pharmacy"
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
                        variant="flat"
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
    <DatePicker ref="datePicker" />
</template>