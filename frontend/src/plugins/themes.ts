import type { ThemeDefinition } from "vuetify";

export const theme_light: ThemeDefinition = {
   dark: false,
   colors: {
      primary: '#0c62c4',
      secondary: '#4a4a50',
      tertiary: '#2a86efff',
      accent: '#ffa928',
      info: '#20a2f0',
      success: '#0aa669',
      warning: '#ff9b00',
      surface: '#d9d9dd',
      surfaceLight: '#eeeef2',
      surfaceDark: '#b9b9bc',
      surfaceEdgeTop: '#fdfdff',
      surfaceEdgeRight: '#c6c6c8',
      surfaceEdgeBottom: '#b4b4b6',
      surfaceEdgeLeft: '#e4e4e9'
   }
};

export const theme_dark: ThemeDefinition = {
   dark: true,
   colors: {
      primary: '#023167',
      secondary: '#ababb0',
      tertiary: '#1a3351ff',
      accent: '#ffa928',
      info: '#20a2f0',
      success: '#0aa669',
      warning: '#ff9b00',
      surface: '#202022',
      surfaceLight: '#2d2d30',
      surfaceDark: '#1c1c1d',
      surfaceEdgeTop: '#323235',
      surfaceEdgeRight: '#1a1a1b',
      surfaceEdgeBottom: '#0a0a10',
      surfaceEdgeLeft: '#29292a'
   }
};