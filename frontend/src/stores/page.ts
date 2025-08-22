import { ref, computed } from "vue";
import { acceptHMRUpdate, defineStore } from "pinia";

export const usePageStore = defineStore('pageStore', () => {

    const _isPending = ref<boolean>(false);
    const changesExist = ref<boolean>(false);
    const isForceNav = ref<boolean>(false);
    const isWarningShown = ref<boolean>(false);
    const tempNavTo = ref<Object | null>(null);
    const prevRoute = ref<string>('');
    const pages = computed(() => [
        {
            title: 'Home',
            id: 1,
            icon: 'mdi-calendar-blank-multiple',
            to: '/',
            isShow: true
        }
    ]);

    const isPending = computed(() => { return _isPending.value });

    function $reset(): void {
        changesExist.value = false;
        isForceNav.value = false;
        isWarningShown.value = false;
        tempNavTo.value = null;
        _isPending.value = false;
    }

    return {
        pages, changesExist, isForceNav, isWarningShown, tempNavTo, isPending, prevRoute,
        $reset
    }
});

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(usePageStore, import.meta.hot))
}