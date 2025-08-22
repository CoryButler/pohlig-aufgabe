<script setup lang="ts">
  import { useAppStore } from '@/stores/app';
  import { usePatientStore } from '@/stores/patient';
  import { perPageOptions } from '@/constants/app';
  import { getAge } from '@/utils/helper';
  import PatientDetails from '@/components/Patient/Details.vue';
  import PatientEditor from '@/components/Patient/Editor.vue';
  import PatientRemove from '@/components/Patient/Remove.vue';

  /* Store variables */
  const appStore = useAppStore();
  const { isAdmin, isMobile, txt, userLang } = storeToRefs(appStore);
  const patientStore = usePatientStore();
  const { isPending, patients, sexes } = storeToRefs(patientStore);
  const { readPatients } = patientStore;

  /* Private variables */
  const _searchTerm = ref<string>('');
  const _tempSearchTerm = ref<string>('');
  
  /* UI references */
  const detailsDialog = ref<HTMLElement>();
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
    { title: txt.value.fields.sex, key: 'sex' },
    { title: `${txt.value.fields.birthdate} (${txt.value.fields.age})`, key: 'birthdate' },
    { title: txt.value.fields.patientId, key: 'id' },
    { title: '', key: 'action', align: 'end', sortable: false }
  ]);

  function setSearchTerm(): void {
    _searchTerm.value = _tempSearchTerm.value;
  }

  /**
   * Open the patient details dialog.
   * 
   * @param {number} id The ID of the patient to be reviewed in detail.
   */
  function openDetailsDialog(id: number): void {
    if (detailsDialog.value && id > 0) {
      const dialog = <any>detailsDialog.value;
      dialog.open(id);
    }
  }

  /**
   * Open the edit patient dialog.
   * 
   * @param {number} id The ID of the patient to be modified. If the ID is invalid, a new patient is created.
   */
  function openEditDialog(id: number = 0): void {
    if (editDialog.value) {
      const dialog = <any>editDialog.value;
      dialog.open(id).then((confirm: boolean) => {
          if (confirm) {
              refreshTable();
          }
      });
    }
  }

  /**
   * Open the remove patient dialog.
   * 
   * @param {number} id The ID of the patient to be removed.
   */
  function openRemoveDialog(id: number): void {
    if (removeDialog.value) {
      const dialog = <any>removeDialog.value;
      dialog.open(id).then((confirm: boolean) => {
          if (confirm) {
              refreshTable();
          }
      });
    }
  }

  /**
   * Refresh the patients table in the UI.
   */
  async function refreshTable(): Promise<void> {
    await readPatients();
  }

  refreshTable();
</script>

<template>
  <v-container fluid class="fill-height justify-center pa-0 pb-16">
    <v-card 
      class="my-6"
      :class="isMobile ? 'mx-0' : 'mx-3'"
      :rounded="isMobile ? '0' : 'lg'">
      <v-toolbar>
          <v-icon 
              icon="mdi-account-multiple-outline"
              class="mx-3"
              color="primary"
              style="transform: scaleX(-1);" />
          <v-toolbar-title class="color-primary">
              {{ txt.headings.patientList }}
          </v-toolbar-title>
          <v-btn v-if="isAdmin"
              class="rounded-pill emboss"
              color="primary"
              elevation="4"
              prepend-icon="mdi-plus"
              variant="flat"
              @click.stop="openEditDialog()">
              {{ txt.buttons.newPatient }}
          </v-btn>
      </v-toolbar>
      <v-card-text
        class="d-flex pa-1 pb-0 ga-4"
        no-gutters
        style="background: rgb(var(--v-theme-surfaceLight));">
        <v-text-field
          :label="txt.fields.searchTerm"
          v-model="_tempSearchTerm"
          @keydown.enter.exact.prevent="setSearchTerm" />
        <v-btn
          class="color-primary emboss"
          prepend-icon="mdi-magnify"
          @click="setSearchTerm">
          {{ txt.buttons.search }}
        </v-btn>
      </v-card-text>
      <v-data-table
        :headers="headers"
        :items="patients.filter(p => _searchTerm === '' || p.firstName.toLowerCase().includes(_searchTerm.toLowerCase()) || p.lastName.toLowerCase().includes(_searchTerm.toLowerCase()))"
        :items-per-page-options="perPageOptions"
        :items-per-page-text="txt.dataTable.itemsPerPage"
        :loading="isPending"
        :page-text="txt.dataTable.pageText">
        <template v-slot:item.birthdate="{ item }">
          <div class="d-flex justify-space-between ga-3">
            <span>{{ new Date(item.birthdate).toLocaleDateString(userLang) }}</span>
            <span class="color-secondary">({{ getAge(item.birthdate) }}&nbsp;{{ txt.units.years }})</span>
          </div>
        </template>
        <template v-slot:item.sex="{ item }">
          {{ sexes.find(s => s.value === item.sex)?.title }}
        </template>
        <template v-slot:item.action="{ item }">
            <v-row
                class="ga-1 justify-end flex-nowrap"
                no-gutters>
                <v-tooltip
                    :text="txt.buttons.details">
                    <template v-slot:activator="{ props }">
                        <v-btn icon
                            class="emboss color-primary"
                            size="x-small"
                            v-bind="props"
                            @click.stop="openDetailsDialog(item.id)">
                            <v-icon
                                icon="mdi-account-details"
                                size="x-small" />
                        </v-btn>
                    </template>
                </v-tooltip>
                <v-tooltip v-if="isAdmin"
                    :text="txt.buttons.edit">
                    <template v-slot:activator="{ props }">
                        <v-btn icon
                            class="emboss color-warning"
                            size="x-small"
                            v-bind="props"
                            @click.stop="openEditDialog(item.id)">
                            <v-icon
                                icon="mdi-pencil"
                                size="x-small" />
                        </v-btn>
                    </template>
                </v-tooltip>
                <v-tooltip v-if="isAdmin"
                    :text="txt.buttons.delete">
                    <template v-slot:activator="{ props }">
                        <v-btn icon
                            class="emboss color-error"
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
    </v-card>
    <PatientDetails ref="detailsDialog" />
    <PatientEditor ref="editDialog" />
    <PatientRemove ref="removeDialog" />
  </v-container>
</template>