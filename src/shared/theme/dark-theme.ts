import { Theme } from './types'

export const darkTheme: Theme = {
  colorScheme: 'dark',

  color: {
    brandBgBase: 'rgba(255, 253, 250, 1)',
    brandBgPressed: 'rgba(255, 253, 250, 0.9)',
    brandTextOn: 'rgba(20, 20, 25, 1)',

    lineNormal: 'rgba(193, 199, 200, 1)',

    surface0: 'rgba(20, 20, 25, 1)',
    surfaceSubmerged: 'rgba(58, 52, 28, 0.2)',

    textPrimary: 'rgba(255, 253, 250, 1)',
    textSecondary: 'rgba(255, 253, 250, 0.5)',
  },

  typography: {
    textL: {
      fontFamily: 'Rubik-Light',
      fontSize: 24,
    },
    textM: {
      fontFamily: 'Rubik-Light',
      fontSize: 16,
    },
  },

  shadow: {
    elevated50: {
      shadowColor: 'rgba(20, 20, 25, 0.1)',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 1,
      shadowRadius: 6,
    },
  },
}
