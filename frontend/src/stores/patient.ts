import { ref, computed } from "vue";
import { acceptHMRUpdate, defineStore } from "pinia";
import { useAppStore } from "./app";

export interface Patient {
    id: number,
    birthdate: Date,
    firstName: string,
    lastName: string,
    sex: string | undefined
}

export const usePatientStore = defineStore("patientStore", () => {
    /* Store variables */
    const appStore = useAppStore();
    const { txt } = storeToRefs(appStore);

    /* Private variables */
    const _isPending = ref<boolean>(false);
    const _patient = ref<Patient>({} as Patient);
    const _patients = ref<Array<Patient>>([]);
    const _emptyPatient = ref<Patient>({
        id: 0,
        birthdate: new Date(),
        firstName: '',
        lastName: '',
        sex: undefined
    });

    /* Public variables */
    const isPending = computed<boolean>(() => _isPending.value);
    const patient = computed<Patient>(() => _patient.value);
    const patients = computed<Array<Patient>>(() => _patients.value);
    const sexes = computed(() => {
        return [
            { title: txt.value.sexes.male, value: 'm' },
            { title: txt.value.sexes.female, value: 'f' }
        ];
    });

    function setEmptyPatient(): void {
        _patient.value = { ..._emptyPatient.value };
    }

    /** 
     * Read all patients via backend API
     */
    async function readPatients(): Promise<void> {
        try {
            _isPending.value = true;
            const response = await fetch(`http://localhost:5000/patients`);

            if (!response.ok) throw new Error('Failed to read patients');

            const data = await response.json();
            _patients.value = [ ...data ];
        } catch (error) {
            console.error('Error fetching patients:', error);
            _patients.value = [];
        }
        finally {
            _isPending.value = false;
        }
    }

    /**
     * Read single patient via backend API
     * 
     * @param {number} id The id of the patient to be read.
     */
    async function readPatientById(id: number): Promise<void> {
        // If ID is not valid, set empty patient.
        if (id <= 0) {
            setEmptyPatient();
            return;
        }

        try {
            _isPending.value = true;
            const response = await fetch(`http://localhost:5000/patients/${id}`);

            if (!response.ok) throw new Error();

            const data = await response.json();
            _patient.value = { ...data };
        }
        catch {
            console.error('Error fetching patient with ID:', id);
            setEmptyPatient();
        }
        finally {
            _isPending.value = false;
        }
    }

    /**
     * Create a new patient via backend API
     * 
     * @param {Patient} tempPatient The patient data to be saved.
     * @return {boolean} Success status
     */
    async function createPatient(tempPatient: Patient): Promise<boolean> {
        let success: boolean = false;
        try {
            _isPending.value = true;
            const response = await fetch(`http://localhost:5000/patients`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(tempPatient)
            });

            if (!response.ok) throw new Error();

            const data = await response.json();
            _patient.value = { ...data };
            success = true;
        }
        catch {
            console.error('Error creating patient:', tempPatient);
        }
        finally {
            _isPending.value = false;
            return success;
        }
    }

    /**
     * Update an existing patient via backend API
     * 
     * @param {Patient} tempPatient The patient data to be saved.
     * @return {boolean} Success status
     */
    async function updatePatient(tempPatient: Patient): Promise<boolean> {
        let success: boolean = false;
        try {
            _isPending.value = true;
            const response = await fetch(`http://localhost:5000/patients/${tempPatient.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(tempPatient)
            });

            if (!response.ok) throw new Error();

            const data = await response.json();
            _patient.value = { ...data };
            success = true;
        }
        catch {
            console.error('Error updating patient:', tempPatient);
        }
        finally {
            _isPending.value = false;
            return success;
        }
    }

    // Delete a patient via backend API
    async function deletePatient(): Promise<boolean> {
        let success: boolean = false;
        try {
            _isPending.value = true;
            const response = await fetch(`http://localhost:5000/patients/${_patient.value.id}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' }
            });

            if (!response.ok) throw new Error();

            const data = await response.json();
            _patient.value = { ...data };
            success = true;
        } catch {
            console.error('Error deleting patient:', _patient.value);
        }
        finally {
            _isPending.value = false;
            return success;
        }
    }

    return {
        isPending, patient, patients, sexes,
        createPatient, readPatients, readPatientById, updatePatient, deletePatient
    };
});

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(usePatientStore, import.meta.hot))
}