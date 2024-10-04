import { createContext, useState, useMemo } from 'react';
import { createTheme } from '@mui/material';

export const tokens = (mode: 'light' | 'dark') => ({
  ...(mode === 'dark'
    ? {
        red: {
          100: '#ffcccc',
          200: '#ff9999',
          300: '#ff6666',
          400: '#ff3333',
          500: '#ff0000',
          600: '#cc0000',
          700: '#990000',
          800: '#660000',
          900: '#330000',
        },
        yellow: {
          100: '#ffffcc',
          200: '#ffff99',
          300: '#ffff66',
          400: '#ffff33',
          500: '#ffff00',
          600: '#cccc00',
          700: '#999900',
          800: '#666600',
          900: '#333300',
        },
        gray: {
          100: '#e0e0e0',
          200: '#c2c2c2',
          300: '#a3a3a3',
          400: '#858585',
          500: '#666666',
          600: '#525252',
          700: '#3d3d3d',
          800: '#292929',
          900: '#141414',
        },
        primary: {
          100: '#d0d1d5',
          200: '#a1a4ab',
          300: '#727681',
          400: '#434957',
          500: '#141b2d',
          600: '#101624',
          700: '#0c101b',
          800: '#080b12',
          900: '#040509',
        },
        greenAccent: {
          100: '#dbf5ee',
          200: '#b7ebde',
          300: '#94e2cd',
          400: '#70d8bd',
          500: '#4cceac',
          600: '#3da58a',
          700: '#2e7c67',
          800: '#1e5245',
          900: '#0f2922',
        },
        redAccent: {
          100: '#f8dcdb',
          200: '#f1b9b7',
          300: '#e99592',
          400: '#e2726e',
          500: '#db4f4a',
          600: '#af3f3b',
          700: '#832f2c',
          800: '#58201e',
          900: '#2c100f',
        },
        blueAccent: {
          100: '#e1e2fe',
          200: '#c3c6fd',
          300: '#a4a9fc',
          400: '#868dfb',
          500: '#6870fa',
          600: '#535ac8',
          700: '#3e4396',
          800: '#2a2d64',
          900: '#151632',
        },
        chartColors: {
          red: '#ff0000',
          blue: '#0000ff',
          green: '#009900',
          purple: '#ff33cc',
          yellow: '#ffff00',
          orange: '#ff9933',
          light: '#d9d9d9',
        },
      }
    : {
        red: {
          900: '#330000',
          800: '#660000',
          700: '#990000',
          600: '#cc0000',
          500: '#ff0000',
          400: '#ff3333',
          300: '#ff6666',
          200: '#ff9999',
          100: '#ffcccc',
        },
        yellow: {
          900: '#333300',
          800: '#666600',
          700: '#999900',
          600: '#cccc00',
          500: '#ffff00',
          400: '#ffff33',
          300: '#ffff66',
          200: '#ffff99',
          100: '#ffffcc',
        },
        gray: {
          900: '#141414',
          800: '#292929',
          700: '#3d3d3d',
          600: '#525252',
          500: '#666666',
          400: '#858585',
          300: '#a3a3a3',
          200: '#c2c2c2',
          100: '#e0e0e0',
        },
        primary: {
          900: '#040509',
          800: '#080b12',
          700: '#0c101b',
          600: '#101624',
          500: '#141b2d',
          400: '#434957',
          300: '#727681',
          200: '#a1a4ab',
          100: '#d0d1d5',
        },
        greenAccent: {
          900: '#0f2922',
          800: '#1e5245',
          700: '#2e7c67',
          600: '#3da58a',
          500: '#4cceac',
          400: '#70d8bd',
          300: '#94e2cd',
          200: '#b7ebde',
          100: '#dbf5ee',
        },
        redAccent: {
          900: '#2c100f',
          800: '#58201e',
          700: '#832f2c',
          600: '#af3f3b',
          500: '#db4f4a',
          400: '#e2726e',
          300: '#e99592',
          200: '#f1b9b7',
          100: '#f8dcdb',
        },
        blueAccent: {
          900: '#151632',
          800: '#2a2d64',
          700: '#3e4396',
          600: '#535ac8',
          500: '#6870fa',
          400: '#868dfb',
          300: '#a4a9fc',
          200: '#c3c6fd',
          100: '#e1e2fe',
        },
        chartColors: {
          red: '#ff0000',
          blue: '#0000ff',
          green: '#009900',
          purple: '#ff33cc',
          yellow: '#ffff00',
          orange: '#ff9933',
          light: '#d9d9d9',
        },
      }),
});

export const themeSettings = (mode: 'light' | 'dark') => {
  const colors = tokens(mode);

  return {
    palette: {
      mode: mode,
      ...(mode === 'dark'
        ? {
            primary: {
              main: colors.primary[500],
            },
            secondary: {
              main: colors.greenAccent[500],
            },
            neutral: {
              dark: colors.gray[700],
              main: colors.gray[500],
              light: colors.gray[100],
            },
            background: {
              default: colors.primary[500],
            },
          }
        : {
            primary: {
              main: colors.primary[100],
            },
            secondary: {
              main: colors.greenAccent[500],
            },
            neutral: {
              dark: colors.gray[700],
              main: colors.gray[500],
              light: colors.gray[100],
            },
            background: {
              default: '#fcfcfc',
            },
          }),
    },
    typography: {
      fontFamily: ['Source Sans Pro', 'Sans-serif'].join(','),
      fontSize: 12,
      h1: {
        fontFamily: ['Source Sans Pro', 'Sans-serif'].join(','),
        fontSize: 40,
      },
      h2: {
        fontFamily: ['Source Sans Pro', 'Sans-serif'].join(','),
        fontSize: 32,
      },
      h3: {
        fontFamily: ['Source Sans Pro', 'Sans-serif'].join(','),
        fontSize: 24,
      },
      h4: {
        fontFamily: ['Source Sans Pro', 'Sans-serif'].join(','),
        fontSize: 20,
      },
      h5: {
        fontFamily: ['Source Sans Pro', 'Sans-serif'].join(','),
        fontSize: 16,
      },
      h6: {
        fontFamily: ['Source Sans Pro', 'Sans-serif'].join(','),
        fontSize: 14,
      },
    },
  };
};

export const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

export const useMode = () => {
  const [mode, setMode] = useState<'light' | 'dark'>('dark');

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => setMode((prev) => (prev === 'light' ? 'dark' : 'light')),
    }),
    []
  );

  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return { theme: theme, colorMode: colorMode };
};
