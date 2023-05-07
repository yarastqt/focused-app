import { Theme } from './types'

export const darkTheme: Theme = {
  colorScheme: 'dark',

  color: {
    brandBgBase: 'rgba(255, 253, 250, 1)',
    brandBgPressed: 'rgba(255, 253, 250, 0.9)',
    brandTextOn: 'rgba(20, 20, 25, 1)',

    lineNormal: 'rgba(193, 199, 200, 1)',

    surface0: 'rgba(20, 20, 25, 1)',

    textPrimary: 'rgba(255, 253, 250, 1)',
    textSecondary: 'rgba(255, 253, 250, 0.5)',
  },

  typography: {
    textL: {
      fontFamily: 'Rubik-Light',
      fontSize: 24,
    },
  },

  shadow: {},
}
