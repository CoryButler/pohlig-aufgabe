<script setup lang="ts">
    import { useTheme } from 'vuetify';
    import { useAppStore } from '@/stores/app';
  import { useLocale } from 'vuetify'

  const { current } = useLocale()

    /* Store variables */
    const { isAdmin, isDark, langs, txt, userLang } = storeToRefs(useAppStore());

    /* Private variables */
    const _menu = ref<boolean>(false);
    const _theme = useTheme();

    watch(isDark, () => { setTheme(); });
    watch(userLang, () => { current.value = userLang.value; });

    function setTheme(): void {
        _theme.global.name.value = isDark.value ? 'theme_dark' : 'theme_light';
    }

    function init(): void {
        setTheme();
    }

    init();
</script>

<template>
    <v-menu
        v-model="_menu"
        :close-on-content-click="false"
        location="bottom">
        <template v-slot:activator="{ props }">
            <div v-bind="props"
                class="cursor-pointer px-3">
                <v-icon
                    icon="mdi-cog"
                    color="secondary"
                    style="background: transparent" />
            </div>
        </template>

        <v-card class="mt-3">
            <v-card-text class="px-6">
                <v-switch
                    label="Admin User"
                    v-model="isAdmin"
                    color="primary"
                    hide-details />
                <v-switch
                    :label="txt.labels.darkMode"
                    v-model="isDark"
                    color="primary"
                    hide-details />
                <v-select
                    :label="txt.labels.language"
                    v-model="userLang"
                    :items="langs"
                    item-title="name"
                    item-value="id"
                    color="primary"
                    hide-details />
            </v-card-text>
            
            <v-card-actions>
                <v-spacer />
                <v-btn
                    class="px-2"
                    color="secondary">
                    {{ txt.buttons.logOut }}
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-menu>
</template>