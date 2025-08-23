import { ref } from "vue";
import { acceptHMRUpdate, defineStore } from "pinia";

interface Snackbar {
    type: string
    text: string
    color?: string
    icon?: string
    timeout?: number
}

export const stati: { [key: string]: string } = Object.freeze({
    ERROR: 'error',
    INFO: 'info',
    SUCCESS: 'success',
    WARNING: 'warning'
});

export const useSnackbarStore = defineStore('snackbarStore', () => {
    const snackbar = ref({} as Snackbar);
    const snackbarShow = ref<boolean>(false);
    const snackbarTimeout = ref<number>(3000);

    function setSnackbar(temp: Snackbar): void {
        snackbarShow.value = true;
        snackbar.value.type = temp.type || stati.SUCCESS;
        snackbar.value.color = snackbar.value.type;
        snackbar.value.text = temp.text || '';
        snackbar.value.timeout = temp.timeout || snackbarTimeout.value;

        switch (snackbar.value.type) {
            case stati.ERROR:
                snackbar.value.icon = 'mdi-close-circle';
                break;
            case stati.INFO:
                snackbar.value.icon = 'mdi-information';
                break;
            case stati.WARNING:
                snackbar.value.icon = 'mdi-alert-circle';
                break;
            case stati.SUCCESS:
            default:
                snackbar.value.icon = 'mdi-check-circle';
                break;
        }
    }

    return {
        snackbar, snackbarShow, snackbarTimeout,
        setSnackbar
    };
});

if (import.meta.hot) {
   import.meta.hot.accept(acceptHMRUpdate(useSnackbarStore, import.meta.hot))
}
