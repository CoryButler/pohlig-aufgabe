import { ref, computed } from "vue";
import { acceptHMRUpdate, defineStore } from "pinia";
import en from '@/languages/en.json';
import de from '@/languages/de.json';

export const useAppStore = defineStore("appStore", () => {
  /* Public variables */
  const brandIcon = computed(() => { return 'mdi-circle-outline'; });
  const isAdmin = ref<boolean>(false);
  const isDark = ref<boolean>(false);
  const isMobile = ref<any>();
  const isMenu = ref<boolean>(!isMobile.value);
  const userLang = ref<string>(navigator.language.substring(0, 2));
  const txt = computed(() => { 
    const lang_id = userLang.value;
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
    brandIcon, isAdmin, isDark, isMenu, isMobile, langs, txt, userLang
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAppStore, import.meta.hot))
}