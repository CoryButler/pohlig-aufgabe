import type { ThemeDefinition } from "vuetify";

export const theme_light: ThemeDefinition = {
    dark: false,
    colors: {
        primary: '#0054b3',
        secondary: '#4a4a50',
        tertiary: '#2963a7',
        accent: '#ffa928',
        success: '#00942c',
        background: '#a4b6ca',
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
        primary: '#076ce1',
        secondary: '#ababb0',
        tertiary: '#3e8eea',
        accent: '#ffa928',
        background: '#1b2027',
        success: '#00942c',
        surface: '#202022',
        surfaceLight: '#28282a',
        surfaceDark: '#1c1c1d',
        surfaceEdgeTop: '#323235',
        surfaceEdgeRight: '#1a1a1b',
        surfaceEdgeBottom: '#0a0a10',
        surfaceEdgeLeft: '#29292a'
    }
};