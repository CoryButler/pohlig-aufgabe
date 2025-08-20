/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import '../styles/settings.scss'

// Composables
import { createVuetify } from 'vuetify'
import { theme_dark, theme_light } from './themes.ts'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
    defaults: {
         global: {
            ripple: true
         },
         VAppBar: {
            elevation: 2
         },
         VBtn: {
            class: 'text-body-1',
            rounded: 'lg'
         },
         VCard: {
            class: 'emboss',
            density: 'compact',
            elevation: 8,
            rounded: 'lg'
         },
         VCardActions: {
            VBtn: {
               class: 'text-body-1 rounded-pill',
               density: 'compact'
            }
         },
         VCardText: {
            class: 'pa-3 text-body-1',
            style: 'background: linear-gradient(rgb(var(--v-theme-surfaceEdgeRight)) 0px, rgb(var(--v-theme-surface)) 32px, rgb(var(--v-theme-surface)) calc(100% - 32px), rgb(var(--v-theme-surfaceEdgeLeft)) 100%); border-top: 1px solid rgb(var(--v-theme-surfaceEdgeBottom)); border-bottom: 1px solid rgb(var(--v-theme-surfaceEdgeTop));'
         },
         VCardTitle: {
            class: "align-center d-flex"
         },
         VCheckbox: {
            color: 'secondary'
         },
         VCombobox: {
            class: 'py-2',
            color: 'secondary',
            density: 'compact',
            variant: 'underlined',
            validateOn: 'blur'
         },
         VDataTableServer: {
            fixedHeader: true,
            noDataText: 'no data available'
         },
         VDivider: {
            class: 'border-opacity-25'
         },
         VFooter: {
            elevation: 8,
            style: 'border-top: 1px solid var(--v-theme-surfaceLight)'
         },
         VNavigationDrawer: {
            elevation: 4
         },
         VRadioGroup: {
            color: 'secondary'
         },
         VSelect: {
            class: 'py-2',
            color: 'secondary',
            density: 'compact',
            variant: 'underlined',
            validateOn: 'blur'
         },
         VSheet: {
            border: true
         },
         VTextarea: {
            density: 'compact',
            variant: 'underlined'
         },
         VTextField: {
            class: 'py-2',
            color: 'secondary',
            density: 'compact',
            hideDetails: 'auto',
            variant: 'underlined',
            validateOn: 'blur'
         },
         VToolbar: {
            color: 'surface',
            density: 'compact',
            VBtn: {
               class: 'mr-2',
               style: 'background: rgba(var(--v-theme-surfaceLight), 0.6); height: calc(var(--v-btn-height) - 8px);'
            }
         },
         VToolbarTitle: {
            class: 'mx-0'
         },
         VTooltip: {
            location: 'top'
         }
      },
      display: {
         mobileBreakpoint: 'md',
      },
      theme: {
         defaultTheme: 'system',
         variations: {
            colors: ['primary', 'secondary', 'surfaceDark'],
            lighten: 3,
            darken: 3
         },
         themes: {
            theme_dark,
            theme_light
         }
      }
})
