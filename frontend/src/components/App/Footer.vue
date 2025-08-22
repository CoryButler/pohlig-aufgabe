<script setup lang="ts">
  import { useAppStore } from '@/stores/app';
  import { usePageStore } from '@/stores/page';

  const { txt } = storeToRefs(useAppStore());
  const { pages } = storeToRefs(usePageStore());
</script>

<template>
  <v-footer
    class="w-100 d-flex justify-center flex-column text-center"
    style="bottom: 0px; position: fixed;">
    <v-row v-if="pages.filter(p => p.isShow).length > 1"
      no-gutters
      class="justify-center rounded-pill py-0 engrave">
      <v-btn
        v-for="(page, i) in pages.filter(p => p.isShow)"
        :to="page.to"
        :key="i"
        :value="page.id"
        class="mx-2 my-n1"
        color="primary"
        style="opacity: 0.7;"
        variant="plain">
        {{ page.title }}
      </v-btn>
    </v-row>
      <v-col class="pt-2 pb-0 color-primary">
        {{ new Date().getFullYear() }} — <span class="brand-font">{{ txt.labels.siteName }}</span>
      </v-col>
  </v-footer>
</template>