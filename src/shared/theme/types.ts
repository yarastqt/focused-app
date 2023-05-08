import type { ShadowStyleIOS } from 'react-native'

export type ColorSchemeVariant = 'light' | 'dark' | 'system'
export type ColorSchemeValue = 'light' | 'dark'

export type Theme = {
  colorScheme: ColorSchemeValue

  color: {
    brandBgBase: string
    brandBgPressed: string
    brandTextOn: string

    lineNormal: string

    surface0: string
    surfaceSubmerged: string

    textPrimary: string
    textSecondary: string
  }

  typography: {
    textL: {
      fontFamily: string
      fontSize: number
    }
    textM: {
      fontFamily: string
      fontSize: number
    }
  }

  shadow: {
    elevated50: ShadowStyleIOS
  }
}
