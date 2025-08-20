import { ref, computed } from "vue";
import { acceptHMRUpdate, defineStore } from "pinia";
import en from '@/languages/en.json';
import de from '@/languages/de.json';

export const useAppStore = defineStore("appStore", () => {
  const isMobile = ref<any>();
  const isMenu = ref<boolean>(!isMobile.value);

  const brandIcon = computed(() => { return 'mdi-calendar-arrow-right'; });
  const siteName = computed(() => { return 'Patientenverwaltungssystem'; });
  const tagLine = computed(() => { return 'Pohlig Programmieraufgabe'; });

  const userLang: string = navigator.language.substring(0, 2);

  const txt = computed(() => { 
    const lang_id = userLang;
    switch (lang_id) {
      case 'de': return { ...de };
      default: return { ...en };
    }
  });
  
  const langs = ref<Array<any>>([
    { id: 'en', name: txt.value.language.en },
    { id: 'de', name: txt.value.language.de }
  ]);

  return {
    brandIcon, isMenu, isMobile, langs, siteName, tagLine, txt
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAppStore, import.meta.hot))
}