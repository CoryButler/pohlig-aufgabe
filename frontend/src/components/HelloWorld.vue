<script setup lang="ts">
  import { useAppStore } from '@/stores/app';
  import { usePatientStore } from '@/stores/patient';
  import PatientEditor from '@/components/Patient/Editor.vue';
  import PatientRemove from '@/components/Patient/Remove.vue';

  /* Store variables */
  const appStore = useAppStore();
  const { siteName, tagLine, txt, userLang } = storeToRefs(appStore);
  const patientStore = usePatientStore();
  const { isPending, patient, patients } = storeToRefs(patientStore);
  const { readPatients, readPatientById } = patientStore;
  
  /* UI references */
  const editDialog = ref<HTMLElement>();
  const removeDialog = ref<HTMLElement>();

  /* Table headers */
  type Header = {
    title: string;
    key: string;
    align?: string;
    sortable?: boolean;
  };
  const headers = computed<Array<Header>>(() => [
    { title: txt.value.fields.firstName, key: 'firstName' },
    { title: txt.value.fields.lastName, key: 'lastName' },
    { title: txt.value.fields.birthdate, key: 'birthdate' },
    { title: txt.value.fields.sex, key: 'sex' },
    { title: '', key: 'action', align: 'end', sortable: false }
  ]);

  /**
   * Open the edit patient dialog.
   * 
   * @param {number} id The id of the patient to be modified. If null, a new patient is created.
   */
  async function openEditDialog(id: number): Promise<void> {
    if (editDialog.value) {
      await readPatientById(id);
      const dialog = <any>editDialog.value;
      dialog.open().then(async (confirm: boolean) => {
          if (confirm) {
              refreshTable();
          }
      });
    }
  }

  /**
   * Open the remove patient dialog.
   * 
   * @param {number} id The id of the patient to be removed.
   */
  async function openRemoveDialog(id: number): Promise<void> {
    if (removeDialog.value) {
      await readPatientById(id);
      const dialog = <any>removeDialog.value;
      dialog.open().then(async (confirm: boolean) => {
          if (confirm) {
              refreshTable();
          }
      });
    }
  }

  /**
   * Refresh the patients table in the UI
   */
  function refreshTable(): void {
    readPatients();
  }

  refreshTable();
</script>

<template>
  <v-container class="fill-height" max-width="900">
    <div>
      <v-img
        class="mb-4"
        height="150"
        src="@/assets/logo.png" />

      <div class="mb-8 text-center">
        <p class="font-weight-light">{{ tagLine }}</p>
        <h1>{{ siteName }}</h1>
      </div>

      {{ patient }}
      <v-data-table
        :loading="isPending"
        :headers="headers"
        :items="patients">
        <template v-slot:item.birthdate="{ item }">
          {{ new Date(item.birthdate).toLocaleDateString(userLang) }}
        </template>
            <template v-slot:item.action="{ item }">
                <v-row
                    class="ga-1 justify-end"
                    no-gutters>
                    <v-tooltip
                        :text="txt.buttons.edit">
                        <template v-slot:activator="{ props }">
                            <v-btn icon
                                class="emboss"
                                size="x-small"
                                v-bind="props"
                                @click.stop="openEditDialog(item.id)">
                                <v-icon
                                    icon="mdi-pencil"
                                    size="x-small" />
                            </v-btn>
                        </template>
                    </v-tooltip>
                    <v-tooltip
                        :text="txt.buttons.delete">
                        <template v-slot:activator="{ props }">
                            <v-btn icon
                                class="emboss"
                                size="x-small"
                                v-bind="props"
                                @click.stop="openRemoveDialog(item.id)">
                                <v-icon
                                    icon="mdi-trash-can"
                                    size="x-small" />
                            </v-btn>
                        </template>
                    </v-tooltip>
                </v-row>
            </template>
      </v-data-table>
    </div>
    <PatientEditor ref="editDialog" />
    <PatientRemove ref="removeDialog" />
  </v-container>
</template>