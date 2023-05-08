import { Theme } from './types'

export const lightTheme: Theme = {
  colorScheme: 'light',

  color: {
    brandBgBase: 'rgba(20, 20, 25, 1)',
    brandBgPressed: 'rgba(20, 20, 25, 0.9)',
    brandTextOn: 'rgba(255, 253, 250, 1)',

    lineNormal: 'rgba(58, 52, 28, 0.2)',

    surface0: 'rgba(255, 253, 250, 1)',
    surfaceSubmerged: 'rgba(58, 52, 28, 0.1)',

    textPrimary: 'rgba(20, 20, 25, 1)',
    textSecondary: 'rgba(58, 52, 28, 0.5)',
  },

  typography: {
    textL: {
      fontFamily: 'Rubik-Light',
      fontSize: 24,
    },
    textM: {
      fontFamily: 'Rubik-Regular',
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
